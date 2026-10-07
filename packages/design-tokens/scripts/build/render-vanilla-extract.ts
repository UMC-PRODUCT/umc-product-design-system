import { toCamelKey, toCssVariable } from "../shared/naming.ts"
import { TYPOGRAPHY_PROPERTIES, typographyVariable } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"
import {
  serializeRecord,
  setNested,
  type NestedRecord,
} from "./serialize-ts.ts"

const VARS_SOURCE_FILES = new Set(["color.semantic.json", "layout.json"])

export const renderVanillaExtract = (
  entries: readonly ModelEntry[],
): string => {
  const vars: NestedRecord = {}
  for (const entry of entries.filter((item) =>
    VARS_SOURCE_FILES.has(item.file),
  )) {
    setNested(
      vars,
      entry.path.map(toCamelKey),
      `var(${toCssVariable(entry.path)})`,
    )
  }

  const typography: NestedRecord = {}
  for (const entry of entries.filter(
    (item) => item.file === "typography.json",
  )) {
    const styleName = entry.path.at(-1)
    if (styleName === undefined) {
      throw new Error("typography 토큰 경로가 비어 있습니다")
    }
    typography[toCamelKey(styleName)] = Object.fromEntries(
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
