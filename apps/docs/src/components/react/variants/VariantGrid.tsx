import type { ReactNode } from "react"

import {
  variantSet,
  type FigmaVariant,
  type VariantProps,
  type VariantSetKey,
} from "./figma-variants.ts"

type AxisValues = Readonly<Record<string, readonly string[]>>

type Combo = readonly string[]

export type CellTone = "muted" | "dark"

export type VariantGridProps = {
  set: VariantSetKey
  rows: readonly string[]
  columns: readonly string[]
  sections?: readonly string[]
  only?: AxisValues
  order?: AxisValues
  tone?: (variant: FigmaVariant) => CellTone | undefined
  render: (variant: FigmaVariant) => ReactNode
}

const UNRANKED = Number.MAX_SAFE_INTEGER

const comboLabel = (combo: Combo) => combo.join(" · ")

const matchesCombo = (
  props: VariantProps,
  axes: readonly string[],
  combo: Combo,
) => axes.every((axis, index) => props[axis] === combo[index])

const matchesFilter = (props: VariantProps, only: AxisValues) =>
  Object.entries(only).every(([axis, values]) =>
    values.includes(props[axis] ?? ""),
  )

const combosOf = (
  variants: readonly FigmaVariant[],
  axes: readonly string[],
  rank: (axis: string, value: string) => number,
): Combo[] => {
  const unique = new Map<string, Combo>()
  for (const variant of variants) {
    const combo = axes.map((axis) => variant.props[axis] ?? "")
    unique.set(comboLabel(combo), combo)
  }
  const compare = (left: Combo, right: Combo) => {
    for (const [index, axis] of axes.entries()) {
      const difference =
        rank(axis, left[index] ?? "") - rank(axis, right[index] ?? "")
      if (difference !== 0) return difference
    }
    return 0
  }
  return [...unique.values()].sort(compare)
}

export function VariantGrid({
  set: key,
  rows,
  columns,
  sections = [],
  only = {},
  order = {},
  tone,
  render,
}: VariantGridProps) {
  const set = variantSet(key)
  const variants = set.variants.filter((variant) =>
    matchesFilter(variant.props, only),
  )
  const rank = (axis: string, value: string) => {
    const index = (order[axis] ?? set.axes[axis] ?? []).indexOf(value)
    return index === -1 ? UNRANKED : index
  }
  const scope =
    variants.length === set.variants.length
      ? `변형 ${variants.length}개`
      : `변형 ${set.variants.length}개 중 ${variants.length}개`

  return (
    <div className="umc-variant-grid not-content" data-figma-set={key}>
      <p className="umc-variant-grid__source">
        피그마 <code>{set.name}</code> · {scope}
      </p>
      {combosOf(variants, sections, rank).map((sectionCombo) => {
        const sectionVariants = variants.filter((variant) =>
          matchesCombo(variant.props, sections, sectionCombo),
        )
        const rowCombos = combosOf(sectionVariants, rows, rank)
        const columnCombos = combosOf(sectionVariants, columns, rank)
        const cellOf = (rowCombo: Combo, columnCombo: Combo) => {
          const found = sectionVariants.filter(
            (variant) =>
              matchesCombo(variant.props, rows, rowCombo) &&
              matchesCombo(variant.props, columns, columnCombo),
          )
          if (found.length > 1) {
            throw new Error(
              `${key}: 한 칸에 변형이 ${found.length}개입니다. 축을 더 나누세요(${found.map((variant) => variant.name).join(" / ")})`,
            )
          }
          return found[0]
        }
        return (
          <section
            className="umc-variant-grid__section"
            key={comboLabel(sectionCombo)}
          >
            {sections.length > 0 && (
              <p className="umc-variant-grid__caption">
                {sections
                  .map((axis, index) => `${axis}=${sectionCombo[index]}`)
                  .join(", ")}
              </p>
            )}
            <div className="umc-variant-grid__scroll">
              <table className="umc-variant-grid__table">
                <thead>
                  <tr>
                    <th scope="col" className="umc-variant-grid__corner">
                      {[comboLabel(rows), comboLabel(columns)]
                        .filter(Boolean)
                        .join(" \\ ")}
                    </th>
                    {columnCombos.map((columnCombo) => (
                      <th scope="col" key={comboLabel(columnCombo)}>
                        {comboLabel(columnCombo)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowCombos.map((rowCombo) => (
                    <tr key={comboLabel(rowCombo)}>
                      <th scope="row">{comboLabel(rowCombo)}</th>
                      {columnCombos.map((columnCombo) => {
                        const variant = cellOf(rowCombo, columnCombo)
                        return variant ? (
                          <td
                            key={comboLabel(columnCombo)}
                            data-figma-variant={variant.name}
                            data-tone={tone?.(variant)}
                          >
                            {render(variant)}
                          </td>
                        ) : (
                          <td
                            key={comboLabel(columnCombo)}
                            className="umc-variant-grid__empty"
                            title="피그마에 없는 조합"
                          >
                            —
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </div>
  )
}
