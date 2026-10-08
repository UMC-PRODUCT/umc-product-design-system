import { z } from "zod"

import { parseAlias, toCssVariable, type TokenPath } from "../shared/naming.ts"
import type { CanonicalToken } from "../shared/schema.ts"
import type { TokenFileName } from "../shared/token-files.ts"
import type { Dimension } from "../shared/units.ts"
import { formatShadow } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"
import { tailwindNameOf, tailwindUtilityOf } from "./render-tailwind-css.ts"

const TIER_BY_FILE: Record<TokenFileName, string> = {
  "color.primitive.json": "color-primitive",
  "color.semantic.json": "color-semantic",
  "font.json": "font",
  "spacing.json": "spacing",
  "radius.json": "radius",
  "typography.json": "typography",
  "shadow.json": "shadow",
  "layout.json": "layout",
}

type ResolvedTypography = {
  fontFamily: string
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
}

type ManifestEntry = {
  name: string
  cssVariable: string
  tier: string
  type: CanonicalToken["$type"]
  value: string
  alias: string | null
  figmaName: string | null
  codeSyntax: string | null
  utility: string | null
  tailwindName: string | null
  typography: ResolvedTypography | null
}

const figmaExtensionSchema = z.looseObject({
  name: z.string().optional(),
  style: z.string().optional(),
  codeSyntax: z.string().optional(),
})

const formatDesignDimension = ({ value, unit }: Dimension): string =>
  `${value}${unit}`

const createResolver = (entries: readonly ModelEntry[]) => {
  const byPath = new Map(entries.map((entry) => [entry.path.join("."), entry]))

  const resolveValue = (value: unknown): string => {
    if (typeof value === "string") {
      const target = parseAlias(value)
      if (!target) {
        return value
      }
      const targetEntry = byPath.get(target.join("."))
      if (!targetEntry || targetEntry.token.$type === "typography") {
        throw new Error(`${target.join(".")}를 값으로 풀 수 없습니다`)
      }
      return resolveValue(targetEntry.token.$value)
    }
    if (typeof value === "number") {
      return String(value)
    }
    return formatDesignDimension(value as Dimension)
  }

  return resolveValue
}

const aliasName = (value: unknown): string | null =>
  typeof value === "string" ? (parseAlias(value)?.join(".") ?? null) : null

const figmaExtensionOf = (token: CanonicalToken) =>
  figmaExtensionSchema.safeParse(token.$extensions?.["umc.figma"]).data

const pathName = (path: TokenPath): string => path.join(".")

export const renderManifest = (entries: readonly ModelEntry[]): string => {
  const resolveValue = createResolver(entries)

  const manifest: ManifestEntry[] = entries.map((entry) => {
    const { token } = entry
    const figma = figmaExtensionOf(token)
    const typography =
      token.$type === "typography"
        ? {
            fontFamily: resolveValue(token.$value.fontFamily),
            fontSize: resolveValue(token.$value.fontSize),
            fontWeight: resolveValue(token.$value.fontWeight),
            lineHeight: String(token.$value.lineHeight),
            letterSpacing: formatDesignDimension(token.$value.letterSpacing),
          }
        : null
    const value = (() => {
      if (typography) {
        return `${typography.fontSize} / ${typography.fontWeight} / ${typography.lineHeight} / ${typography.letterSpacing}`
      }
      if (token.$type === "shadow") {
        return formatShadow(token.$value)
      }
      return resolveValue(token.$value)
    })()
    return {
      name: pathName(entry.path),
      cssVariable: toCssVariable(entry.path),
      tier: TIER_BY_FILE[entry.file],
      type: token.$type,
      value,
      alias:
        token.$type === "typography" || token.$type === "shadow"
          ? null
          : aliasName(token.$value),
      figmaName: figma?.name ?? figma?.style ?? null,
      codeSyntax: figma?.codeSyntax ?? null,
      utility: tailwindUtilityOf(entry),
      tailwindName: tailwindNameOf(entry),
      typography,
    }
  })

  return [
    "export type TokenManifestEntry = {",
    "  name: string",
    "  cssVariable: string",
    "  tier: string",
    '  type: "color" | "dimension" | "number" | "fontFamily" | "fontWeight" | "typography" | "shadow"',
    "  value: string",
    "  alias: string | null",
    "  figmaName: string | null",
    "  codeSyntax: string | null",
    "  utility: string | null",
    "  tailwindName: string | null",
    "  typography: {",
    "    fontFamily: string",
    "    fontSize: string",
    "    fontWeight: string",
    "    lineHeight: string",
    "    letterSpacing: string",
    "  } | null",
    "}",
    "",
    `export const tokenManifest: readonly TokenManifestEntry[] = ${JSON.stringify(manifest, null, 2)}`,
    "",
  ].join("\n")
}
