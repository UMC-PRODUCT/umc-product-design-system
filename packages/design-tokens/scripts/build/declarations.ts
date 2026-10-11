import { parseAlias, toCssVariable } from "../shared/naming.ts"
import type { CanonicalToken } from "../shared/schema.ts"
import { formatDimension, round4, type Dimension } from "../shared/units.ts"
import type { ModelEntry } from "./model.ts"

const FONT_FAMILY_FALLBACK =
  'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'

type TypographyValue = Extract<
  CanonicalToken,
  { $type: "typography" }
>["$value"]

export const TYPOGRAPHY_PROPERTIES = [
  { key: "fontFamily", cssProperty: "font-family" },
  { key: "fontSize", cssProperty: "font-size" },
  { key: "fontWeight", cssProperty: "font-weight" },
  { key: "lineHeight", cssProperty: "line-height" },
  { key: "letterSpacing", cssProperty: "letter-spacing" },
] as const satisfies readonly {
  key: keyof TypographyValue
  cssProperty: string
}[]

type TypographyKey = (typeof TYPOGRAPHY_PROPERTIES)[number]["key"]

type ShadowLayer = Extract<
  CanonicalToken,
  { $type: "shadow" }
>["$value"][number]

const formatShadowLength = ({ value, unit }: Dimension): string =>
  value === 0 ? "0" : `${round4(value)}${unit}`

const formatShadowLayer = (layer: ShadowLayer): string =>
  [
    ...(layer.inset ? ["inset"] : []),
    formatShadowLength(layer.offsetX),
    formatShadowLength(layer.offsetY),
    formatShadowLength(layer.blur),
    formatShadowLength(layer.spread),
    layer.color,
  ].join(" ")

export const formatShadow = (layers: readonly ShadowLayer[]): string =>
  layers.map(formatShadowLayer).join(", ")

export type Declaration = {
  name: string
  value: string
}

const aliasToVar = (value: string): string | null => {
  const path = parseAlias(value)
  return path ? `var(${toCssVariable(path)})` : null
}

const formatScalar = (value: string | number): string =>
  typeof value === "string" ? (aliasToVar(value) ?? value) : String(value)

const formatFontFamily = (value: string): string =>
  aliasToVar(value) ?? `"${value}", ${FONT_FAMILY_FALLBACK}`

const formatSize = (value: string | Dimension): string =>
  typeof value === "string" ? formatScalar(value) : formatDimension(value)

const formatTypographyField = (
  value: TypographyValue,
  key: TypographyKey,
): string => {
  switch (key) {
    case "fontFamily":
      return formatFontFamily(value.fontFamily)
    case "fontSize":
      return formatSize(value.fontSize)
    case "fontWeight":
      return formatScalar(value.fontWeight)
    case "lineHeight":
      return String(value.lineHeight)
    case "letterSpacing":
      return formatDimension(value.letterSpacing)
  }
}

export const typographyVariable = (
  entry: ModelEntry,
  cssProperty: string,
): string => `${toCssVariable(entry.path)}-${cssProperty}`

export const toDeclarations = (entry: ModelEntry): Declaration[] => {
  const { token } = entry
  const name = toCssVariable(entry.path)
  switch (token.$type) {
    case "color":
    case "number":
    case "fontWeight":
      return [{ name, value: formatScalar(token.$value) }]
    case "dimension":
      return [{ name, value: formatSize(token.$value) }]
    case "fontFamily":
      return [{ name, value: formatFontFamily(token.$value) }]
    case "typography":
      return TYPOGRAPHY_PROPERTIES.map(({ key, cssProperty }) => ({
        name: typographyVariable(entry, cssProperty),
        value: formatTypographyField(token.$value, key),
      }))
    case "shadow":
      return [{ name, value: formatShadow(token.$value) }]
  }
}
