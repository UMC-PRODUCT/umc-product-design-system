import { toCamelKey, toCssVariable } from "../shared/naming.ts"
import { TYPOGRAPHY_PROPERTIES, typographyVariable } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"
import {
  formatPropertyAccess,
  serializeRecord,
  setNested,
  type NestedRecord,
} from "./serialize-ts.ts"

const VARS_SOURCE_FILES: ReadonlySet<string> = new Set([
  "color.semantic.json",
  "shadow.json",
  "layout.json",
])

const varsKeysOf = (entry: ModelEntry): string[] | null =>
  VARS_SOURCE_FILES.has(entry.file) ? entry.path.map(toCamelKey) : null

const typographyKeyOf = (entry: ModelEntry): string | null => {
  if (entry.file !== "typography.json") {
    return null
  }
  const styleName = entry.path.at(-1)
  if (styleName === undefined) {
    throw new Error("typography 토큰 경로가 비어 있습니다")
  }
  return toCamelKey(styleName)
}

export const vanillaExtractAccessorOf = (entry: ModelEntry): string | null => {
  const varsKeys = varsKeysOf(entry)
  if (varsKeys !== null) {
    return formatPropertyAccess("vars", varsKeys)
  }
  const typographyKey = typographyKeyOf(entry)
  return typographyKey === null
    ? null
    : formatPropertyAccess("typography", [typographyKey])
}

export const renderVanillaExtract = (
  entries: readonly ModelEntry[],
): string => {
  const vars: NestedRecord = {}
  const typography: NestedRecord = {}
  for (const entry of entries) {
    const varsKeys = varsKeysOf(entry)
    if (varsKeys !== null) {
      setNested(vars, varsKeys, `var(${toCssVariable(entry.path)})`)
    }
    const typographyKey = typographyKeyOf(entry)
    if (typographyKey === null) {
      continue
    }
    typography[typographyKey] = Object.fromEntries(
      TYPOGRAPHY_PROPERTIES.map(({ key, cssProperty }) => [
        key,
        `var(${typographyVariable(entry, cssProperty)})`,
      ]),
    )
  }

  return [
    `export const vars = ${serializeRecord(vars)} as const`,
    "",
    `export const typography = ${serializeRecord(typography)} as const`,
    "",
  ].join("\n")
}
