import snapshot from "../../../data/figma-variants.json"

export type VariantSetKey = keyof typeof snapshot.sets

export type VariantProps = Readonly<Record<string, string>>

export type FigmaVariant = {
  name: string
  props: VariantProps
}

export type FigmaVariantSet = {
  key: VariantSetKey
  node: string
  name: string
  axes: Readonly<Record<string, readonly string[]>>
  variants: readonly FigmaVariant[]
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
      props: parseVariantName(name),
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
