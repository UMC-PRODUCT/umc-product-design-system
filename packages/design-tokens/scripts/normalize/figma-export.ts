import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { z } from "zod"

import { paths } from "../shared/paths.ts"

const FIGMA_ALIAS_PATTERN = /^\{([^{}]+)\}$/

export const PREVIOUS_SNAPSHOT_COUNT: Readonly<Record<string, number>> = {
  "color.mode-1.tokens.json": 196,
  "token.mode-1.tokens.json": 75,
}

const colorValueSchema = z.strictObject({
  colorSpace: z.literal("srgb"),
  components: z.tuple([z.number(), z.number(), z.number()]),
  alpha: z.number().min(0).max(1),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
})

const variableSchema = z.strictObject({
  $type: z.enum(["color", "number", "string"]),
  $value: z.union([colorValueSchema, z.number(), z.string()]),
  $extensions: z.looseObject({
    "com.figma.variableId": z.string(),
    "com.figma.scopes": z.array(z.string()).optional(),
    "com.figma.codeSyntax": z.record(z.string(), z.string()).optional(),
  }),
})

export type FigmaColorValue = z.infer<typeof colorValueSchema>

export type FigmaVariable = {
  name: string
  type: "color" | "number" | "string"
  value: FigmaColorValue | number | string
  variableId: string
  scopes: readonly string[]
  webCodeSyntax: string | undefined
  sourceFile: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

export const parseFigmaAlias = (value: string): string | null => {
  const target = FIGMA_ALIAS_PATTERN.exec(value)?.[1]
  return target ? target.split(".").join("/") : null
}

export const readFigmaTree = (
  tree: unknown,
  sourceFile: string,
): FigmaVariable[] => {
  const variables: FigmaVariable[] = []
  const problems: string[] = []

  const visit = (node: unknown, names: string[]) => {
    const location = `${sourceFile}:${names.join("/") || "(root)"}`
    if (!isRecord(node)) {
      problems.push(`${location} 그룹이 객체가 아닙니다`)
      return
    }
    if ("$value" in node) {
      const result = variableSchema.safeParse(node)
      if (!result.success) {
        problems.push(`${location} ${z.prettifyError(result.error)}`)
        return
      }
      const extensions = result.data.$extensions
      variables.push({
        name: names.join("/"),
        type: result.data.$type,
        value: result.data.$value,
        variableId: extensions["com.figma.variableId"],
        scopes: extensions["com.figma.scopes"] ?? [],
        webCodeSyntax: extensions["com.figma.codeSyntax"]?.WEB,
        sourceFile,
      })
      return
    }
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) {
        continue
      }
      if (key.includes(".") || key.includes("/")) {
        problems.push(
          `${location} 이름 "${key}"에 . 또는 /가 있어 참조를 풀 수 없습니다`,
        )
        continue
      }
      visit(child, [...names, key])
    }
  }

  visit(tree, [])
  if (problems.length > 0) {
    throw new Error(problems.join("\n"))
  }
  return variables
}

export const listExportFiles = (): string[] =>
  readdirSync(paths.figmaExportDir)
    .filter((name) => name.endsWith(".json"))
    .sort()

export const readFigmaExport = (): FigmaVariable[] =>
  listExportFiles().flatMap((fileName) =>
    readFigmaTree(
      JSON.parse(
        readFileSync(join(paths.figmaExportDir, fileName), "utf8"),
      ) as unknown,
      fileName,
    ),
  )
