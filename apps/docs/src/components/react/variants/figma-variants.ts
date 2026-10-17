import snapshot from "../../../data/figma-variants.json"

export type VariantSetKey = keyof typeof snapshot.sets

export type VariantProps = Readonly<Record<string, string>>

export type FigmaVariant = {
  name: string
  props: VariantProps
}

export type DerivedAxes = Readonly<
  Record<string, (props: VariantProps) => string>
>

export const withDerivedAxes = (
  variant: FigmaVariant,
  derivedAxes: DerivedAxes,
): FigmaVariant => {
  const derivedProps = Object.entries(derivedAxes).map(([axis, derive]) => {
    if (axis in variant.props) {
      throw new Error(
        `${variant.name}: 계산할 축 ${axis}가 피그마 축과 이름이 같습니다`,
      )
    }
    return [axis, derive(variant.props)] as const
  })
  return {
    name: variant.name,
    props: { ...variant.props, ...Object.fromEntries(derivedProps) },
  }
}

export type FigmaVariantSet = {
  key: VariantSetKey
  node: string
  name: string
  axes: Readonly<Record<string, readonly string[]>>
  variants: readonly FigmaVariant[]
}

const VARIANT_NAME_CORRECTIONS: Readonly<Record<string, string>> = {
  "Part=Tag, Size=Part, Style=PM": "Part=PM, Size=Sm, Style=Outlined",
}

const parseVariantName = (name: string): VariantProps =>
  Object.fromEntries(
    name.split(", ").map((part) => {
      const [axis = "", ...value] = part.split("=")
      return [axis, value.join("=")]
    }),
  )

export const variantSet = (key: VariantSetKey): FigmaVariantSet => {
  const set = snapshot.sets[key]
  return {
    key,
    node: set.node,
    name: set.name,
    axes: set.axes,
    variants: set.variants.map((name) => ({
      name,
      props: parseVariantName(VARIANT_NAME_CORRECTIONS[name] ?? name),
    })),
  }
}

export const lookup = <T>(
  values: Readonly<Record<string, T>>,
  variant: FigmaVariant,
  axis: string,
): T => {
  const value = variant.props[axis]
  const found = value === undefined ? undefined : values[value]
  if (found === undefined) {
    throw new Error(
      `${variant.name}: ${axis}=${value}에 대응하는 값이 없습니다`,
    )
  }
  return found
}

export const figmaSnapshot = {
  fileKey: snapshot.fileKey,
  fetchedAt: snapshot.fetchedAt,
}
