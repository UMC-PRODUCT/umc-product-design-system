import { toDeclarations } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"
import { shadowUtility, textStyleUtility } from "./render-tailwind-css.ts"
import { serializeList } from "./serialize-ts.ts"

export const renderIndex = (entries: readonly ModelEntry[]): string => {
  const utilities = entries
    .filter((entry) => entry.file === "typography.json")
    .map((entry) => textStyleUtility(entry.path))
  const shadows = entries
    .filter((entry) => entry.file === "shadow.json")
    .map((entry) => shadowUtility(entry.path))
  const variables = entries
    .flatMap(toDeclarations)
    .map((declaration) => declaration.name)

  return [
    `export const textStyleUtilities = ${serializeList(utilities)} as const`,
    "",
    "export type TextStyleUtility = (typeof textStyleUtilities)[number]",
    "",
    `export const shadowUtilities = ${serializeList(shadows)} as const`,
    "",
    "export type ShadowUtility = (typeof shadowUtilities)[number]",
    "",
    `export const cssVariables = ${serializeList(variables)} as const`,
    "",
    "export type CssVariable = (typeof cssVariables)[number]",
    "",
  ].join("\n")
}
