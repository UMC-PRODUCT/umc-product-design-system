import { parseTokenTree } from "../shared/schema.ts"
import { fontTokensFromVariables } from "./font-variables.ts"
import { resolveVariable } from "./variable-path.ts"

export type FontCrossCheck = {
  mcpOnlyVariables: string[]
  unusedFontTokens: string[]
}

const referencedFontAliases = (typographyTree: unknown): Set<string> =>
  new Set(
    parseTokenTree(typographyTree, "typography.json").flatMap(({ token }) =>
      token.$type === "typography"
        ? [
            token.$value.fontFamily,
            token.$value.fontSize,
            token.$value.fontWeight,
          ].filter((value): value is string => typeof value === "string")
        : [],
    ),
  )

export const crossCheckFonts = (
  exportFontTree: unknown,
  exportVariableNames: ReadonlySet<string>,
  mcpVariables: ReadonlyMap<string, string>,
  typographyTree: unknown,
): FontCrossCheck => {
  const exportValues = new Map(
    parseTokenTree(exportFontTree, "font.json").map((entry) => [
      entry.path.join("."),
      JSON.stringify(entry.token.$value),
    ]),
  )

  const mismatches = parseTokenTree(
    fontTokensFromVariables(mcpVariables).tree,
    "mcp",
  )
    .filter(
      (entry) =>
        exportValues.get(entry.path.join(".")) !==
        JSON.stringify(entry.token.$value),
    )
    .map(
      (entry) =>
        `${entry.path.join(".")}: MCP ${JSON.stringify(entry.token.$value)}, export ${exportValues.get(entry.path.join(".")) ?? "없음"}`,
    )
  if (mismatches.length > 0) {
    throw new Error(
      `텍스트 스타일 원문의 변수 값이 export와 다릅니다:\n${mismatches.join("\n")}`,
    )
  }

  const referenced = referencedFontAliases(typographyTree)
  return {
    mcpOnlyVariables: [...mcpVariables.keys()].filter(
      (name) =>
        resolveVariable(name)?.rule.file === "font.json" &&
        !exportVariableNames.has(name),
    ),
    unusedFontTokens: [...exportValues.keys()].filter(
      (path) => !referenced.has(`{${path}}`),
    ),
  }
}
