import { z } from "zod"

import { isValidSegment, type TokenPath } from "./naming.ts"

const ALIAS_PATTERN = /^\{[a-z0-9-]+(?:\.[a-z0-9-]+)*\}$/
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/

const alias = z.string().regex(ALIAS_PATTERN)

const dimension = z.object({
  value: z.number(),
  unit: z.enum(["px", "em"]),
})

const fontWeight = z.number().int().min(1).max(1000)

const meta = {
  $description: z.string().optional(),
  $extensions: z.record(z.string(), z.unknown()).optional(),
}

const colorToken = z.object({
  $type: z.literal("color"),
  $value: z.union([alias, z.string().regex(HEX_COLOR_PATTERN)]),
  ...meta,
})

const dimensionToken = z.object({
  $type: z.literal("dimension"),
  $value: z.union([alias, dimension]),
  ...meta,
})

const numberToken = z.object({
  $type: z.literal("number"),
  $value: z.union([alias, z.number()]),
  ...meta,
})

const fontFamilyToken = z.object({
  $type: z.literal("fontFamily"),
  $value: z.union([alias, z.string().min(1)]),
  ...meta,
})

const fontWeightToken = z.object({
  $type: z.literal("fontWeight"),
  $value: z.union([alias, fontWeight]),
  ...meta,
})

const typographyToken = z.object({
  $type: z.literal("typography"),
  $value: z.object({
    fontFamily: z.union([alias, z.string().min(1)]),
    fontSize: z.union([alias, dimension]),
    fontWeight: z.union([alias, fontWeight]),
    lineHeight: z.number().positive(),
    letterSpacing: dimension,
  }),
  ...meta,
})

export const canonicalTokenSchema = z.discriminatedUnion("$type", [
  colorToken,
  dimensionToken,
  numberToken,
  fontFamilyToken,
  fontWeightToken,
  typographyToken,
])

export type CanonicalToken = z.infer<typeof canonicalTokenSchema>

export type TokenEntry = {
  path: TokenPath
  token: CanonicalToken
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

export const parseTokenTree = (tree: unknown, source: string): TokenEntry[] => {
  const entries: TokenEntry[] = []
  const problems: string[] = []

  const visit = (node: unknown, path: string[]) => {
    const location = `${source}:${path.join(".") || "(root)"}`
    if (!isRecord(node)) {
      problems.push(`${location} 그룹이 객체가 아닙니다`)
      return
    }
    if ("$value" in node) {
      const result = canonicalTokenSchema.safeParse(node)
      if (result.success) {
        entries.push({ path, token: result.data })
      } else {
        problems.push(`${location} ${z.prettifyError(result.error)}`)
      }
      return
    }
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) {
        continue
      }
      if (!isValidSegment(key)) {
        problems.push(`${location} 하위 키 "${key}"가 경로 규칙을 어깁니다`)
        continue
      }
      visit(child, [...path, key])
    }
  }

  visit(tree, [])
  if (problems.length > 0) {
    throw new Error(problems.join("\n"))
  }
  return entries
}
