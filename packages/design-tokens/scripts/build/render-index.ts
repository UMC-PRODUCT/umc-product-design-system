import { toCssVariable } from "../shared/naming.ts"
import { toDeclarations } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"
import { tailwindColorName, textStyleUtility } from "./render-tailwind-css.ts"
import { serializeList, serializeRecordList } from "./serialize-ts.ts"

export const renderIndex = (entries: readonly ModelEntry[]): string => {
  const utilities = entries
    .filter((entry) => entry.file === "typography.json")
    .map((entry) => textStyleUtility(entry.path))
  const semanticColors = entries
    .filter((entry) => entry.file === "color.semantic.json")
    .map((entry) => ({
      cssVariable: toCssVariable(entry.path),
      tailwindColor: tailwindColorName(entry.path),
    }))
  const variables = entries
    .flatMap(toDeclarations)
    .map((declaration) => declaration.name)

  return [
    `export const textStyleUtilities = ${serializeList(utilities)} as const`,
    "",
    "export type TextStyleUtility = (typeof textStyleUtilities)[number]",
    "",
    `export const semanticColors = ${serializeRecordList(semanticColors)} as const`,
    "",
    "export type SemanticColor = (typeof semanticColors)[number]",
    "",
    `export const cssVariables = ${serializeList(variables)} as const`,
    "",
    "export type CssVariable = (typeof cssVariables)[number]",
    "",
  ].join("\n")
}
