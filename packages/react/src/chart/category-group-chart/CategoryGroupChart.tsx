"use client"

import {
  useId,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from "react"

import { cx } from "../../internal/cx.ts"
import { formatCount, largestOf, ratioOf } from "../chart-scale.ts"
import type { ChartColor } from "../chart-series.ts"
import type {
  ChartTooltipBodyProps,
  ChartTooltipContent,
} from "../chart-tooltip/ChartTooltip.tsx"
import {
  ChartTooltipDescription,
  ChartTooltipLayer,
  ChartTooltipTrigger,
  useChartTooltipHandle,
} from "../chart-tooltip/ChartTooltipLayer.tsx"
import { useRovingFocus } from "../use-roving-focus.ts"

export type CategoryGroupChartColor = Exclude<
  ChartColor,
  "teal-200" | "reference"
>

export type CategoryGroupChartSeries = {
  key: string
  label: ReactNode
  color: CategoryGroupChartColor
}

export type CategoryGroupChartGroup = {
  key: string
  label: ReactNode
  values: Readonly<Record<string, number>>
  references?: Readonly<Record<string, number>>
  tooltip?: ChartTooltipContent
}

export type CategoryGroupChartProps = Omit<
  ComponentPropsWithRef<"ul">,
  "children"
> & {
  series: readonly CategoryGroupChartSeries[]
  groups: readonly CategoryGroupChartGroup[]
  max?: number
  formatValue?: (value: number) => ReactNode
}

type BarStyle = CSSProperties & {
  "--umc-category-group-chart-ratio": string
}

const valueOf = (record: Readonly<Record<string, number>>, key: string) =>
  record[key] ?? 0

const barStyleOf = (ratio: number): BarStyle => ({
  "--umc-category-group-chart-ratio": String(ratio),
})

const plottedValuesOf = (
  series: readonly CategoryGroupChartSeries[],
  groups: readonly CategoryGroupChartGroup[],
) =>
  groups.flatMap((group) =>
    series.flatMap(({ key }) => [
      valueOf(group.values, key),
      ...(group.references === undefined
        ? []
        : [valueOf(group.references, key)]),
    ]),
  )

export function CategoryGroupChart({
  series,
  groups,
  max,
  formatValue = formatCount,
  className,
  ...props
}: CategoryGroupChartProps) {
  const baseId = useId()
  const handle = useChartTooltipHandle()
  const rovingPropsOf = useRovingFocus(groups.length)
  const scale = max ?? largestOf(plottedValuesOf(series, groups))

  const tooltipOf = (
    group: CategoryGroupChartGroup,
  ): ChartTooltipBodyProps => ({
    title: group.label,
    summary: group.tooltip?.summary,
    referenceSummary: group.tooltip?.referenceSummary,
    caption: group.tooltip?.caption,
    items:
      group.tooltip?.items ??
      series.map(({ key, label, color }) => ({
        key,
        label,
        color,
        value: formatValue(valueOf(group.values, key)),
        reference:
          group.references === undefined
            ? undefined
            : formatValue(valueOf(group.references, key)),
      })),
  })

  return (
    <ul {...props} className={cx("umc-category-group-chart", className)}>
      {groups.map((group, index) => {
        const triggerId = `${baseId}-group-${index}`
        const descriptionId = `${baseId}-description-${index}`
        const { references } = group
        return (
          <li key={group.key} className="umc-category-group-chart__item">
            <ChartTooltipTrigger
              {...rovingPropsOf(index)}
              handle={handle}
              payload={group.key}
              id={triggerId}
              className="umc-category-group-chart__group"
              aria-describedby={descriptionId}
            >
              <span
                className="umc-category-group-chart__plot"
                aria-hidden="true"
              >
                {series.map(({ key, color }) => {
                  const value = valueOf(group.values, key)
                  return (
                    <span key={key} className="umc-category-group-chart__slot">
                      {references !== undefined && (
                        <span
                          className="umc-category-group-chart__reference"
                          style={barStyleOf(
                            ratioOf(valueOf(references, key), scale),
                          )}
                        />
                      )}
                      <span
                        className="umc-category-group-chart__bar"
                        data-color={color}
                        data-empty={value > 0 ? undefined : ""}
                        style={barStyleOf(ratioOf(value, scale))}
                      />
                    </span>
                  )
                })}
              </span>
              <span className="umc-category-group-chart__label">
                {group.label}
              </span>
            </ChartTooltipTrigger>
            <ChartTooltipDescription
              id={descriptionId}
              content={tooltipOf(group)}
            />
          </li>
        )
      })}
      <ChartTooltipLayer
        handle={handle}
        contentOf={(key) => {
          const group = groups.find((candidate) => candidate.key === key)
          return group === undefined ? undefined : tooltipOf(group)
        }}
      />
    </ul>
  )
}
