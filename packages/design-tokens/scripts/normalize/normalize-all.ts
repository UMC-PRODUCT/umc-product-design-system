import { readFileSync } from "node:fs"
import { join } from "node:path"

import { z } from "zod"

import type { Outputs } from "../shared/files.ts"
import { readManifest } from "../shared/manifest.ts"
import { paths } from "../shared/paths.ts"
import { parseTokenTree } from "../shared/schema.ts"
import {
  listExportFiles,
  PREVIOUS_SNAPSHOT_COUNT,
  readFigmaExport,
} from "./figma-export.ts"
import { crossCheckFonts } from "./font-check.ts"
import { renderNormalizationReport } from "./report.ts"
import {
  EXCLUDED_TEXT_STYLES,
  OPEN_QUESTIONS,
  VARIABLE_RULES,
} from "./rules.ts"
import { parseTextStyles, splitVariableDefs } from "./text-styles.ts"
import { findUnusedRules } from "./variable-path.ts"
import { normalizeVariables } from "./variables.ts"

const variableDefsSchema = z.record(z.string(), z.string())

const serializeTokens = (tree: unknown, fileName: string): string => {
  parseTokenTree(tree, fileName)
  return `${JSON.stringify(tree, null, 2)}\n`
}

export const normalizeAll = (): Outputs => {
  const exportVariables = readFigmaExport()
  if (exportVariables.length === 0) {
    throw new Error(
      "figma/export/에 피그마 Variables JSON이 없습니다. pnpm figma:inspect로 확인하세요",
    )
  }

  const raw = variableDefsSchema.parse(
    JSON.parse(readFileSync(paths.textStylesSource, "utf8")),
  )
  const mcpVariables = splitVariableDefs(raw).variables
  const variables = normalizeVariables(exportVariables)
  const textStyles = parseTextStyles(raw)
  const exportVariableNames = new Set(
    exportVariables.map((variable) => variable.name),
  )
  const fontCrossCheck = crossCheckFonts(
    variables.trees.get("font.json"),
    exportVariableNames,
    mcpVariables,
    textStyles.tree,
  )

  const unusedRules = findUnusedRules([
    ...exportVariableNames,
    ...mcpVariables.keys(),
  ])
  if (unusedRules.length > 0) {
    throw new Error(
      `입력에 맞는 변수가 없는 규칙이 있습니다: ${unusedRules.map((rule) => rule.figmaName).join(", ")}`,
    )
  }

  const tokenOutputs = [...variables.trees].map(
    ([fileName, tree]) =>
      [
        join(paths.tokensDir, fileName),
        serializeTokens(tree, fileName),
      ] as const,
  )

  return new Map([
    ...tokenOutputs,
    [
      join(paths.tokensDir, "typography.json"),
      serializeTokens(textStyles.tree, "typography.json"),
    ],
    [
      paths.normalizationReport,
      renderNormalizationReport({
        sources: readManifest().sources,
        counts: listExportFiles().map((file) => ({
          file,
          count: exportVariables.filter(
            (variable) => variable.sourceFile === file,
          ).length,
          previous: PREVIOUS_SNAPSHOT_COUNT[file],
        })),
        questions: OPEN_QUESTIONS,
        rules: VARIABLE_RULES,
        variableExclusions: variables.excluded,
        codeSyntaxDuplicates: variables.codeSyntaxDuplicates,
        scopeWarnings: variables.scopeWarnings,
        composedSemantics: variables.composedSemantics,
        fontCrossCheck,
        textStyleExclusions: EXCLUDED_TEXT_STYLES,
        textStyleWarnings: textStyles.warnings,
        mappings: variables.mappings,
      }),
    ],
  ])
}
