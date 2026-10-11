import {
  tokenManifest,
  type TokenManifestEntry,
} from "@umc-product/design-tokens/manifest"

import type { ColorTokenRow } from "./color-tokens.ts"

const COLOR_TIERS: ReadonlySet<string> = new Set([
  "color-semantic",
  "color-primitive",
])

const referenceOf = (alias: string | null): string | null =>
  alias === null ? null : alias.split(".").slice(1).join("-")

const toColorTokenRow = (token: TokenManifestEntry): ColorTokenRow => ({
  figmaName: token.figmaName ?? token.name,
  codeSyntax: token.codeSyntax,
  cssVariable: token.cssVariable,
  utility: token.utility,
  tailwindName: token.tailwindName,
  vanillaExtract: token.vanillaExtract,
  value: token.value,
  reference: referenceOf(token.alias),
})

const isColorToken = (token: TokenManifestEntry): boolean =>
  COLOR_TIERS.has(token.tier)

export const colorTokenRows: readonly ColorTokenRow[] = tokenManifest
  .filter(isColorToken)
  .map(toColorTokenRow)

export const semanticColorRows = (group: string): ColorTokenRow[] =>
  tokenManifest
    .filter(
      (token) =>
        token.tier === "color-semantic" && token.name.split(".")[1] === group,
    )
    .map(toColorTokenRow)
