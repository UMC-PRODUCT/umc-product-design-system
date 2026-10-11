import { readFileSync } from "node:fs"
import { join } from "node:path"

import { z } from "zod"

import { paths } from "../shared/paths.ts"
import { MCP_STYLE_SOURCES } from "./rules.ts"
import {
  isTextStyleName,
  parseFontExpression,
  splitVariableDefs,
} from "./text-styles.ts"

const variableDefsSchema = z.record(z.string(), z.string())

export type StyleSource = {
  file: string
  raw: Readonly<Record<string, string>>
}

export type StyleNoteReason =
  "differs" | "unbound-family" | "outside-pattern" | "outside-library"

export type StyleNote = {
  figmaName: string
  definition: string
  files: string[]
  reason: StyleNoteReason
}

export type MergedTextStyles = {
  raw: Record<string, string>
  notes: StyleNote[]
}

export const readStyleSources = (): StyleSource[] =>
  MCP_STYLE_SOURCES.map(({ file }) => ({
    file,
    raw: variableDefsSchema.parse(
      JSON.parse(readFileSync(join(paths.mcpDir, file), "utf8")),
    ),
  }))

export const createNoteCollector = () => {
  const notes: StyleNote[] = []
  const add = (
    figmaName: string,
    definition: string,
    file: string,
    reason: StyleNoteReason,
  ) => {
    const existing = notes.find(
      (note) =>
        note.figmaName === figmaName &&
        note.definition === definition &&
        note.reason === reason,
    )
    if (existing) {
      existing.files.push(file)
      return
    }
    notes.push({ figmaName, definition, files: [file], reason })
  }
  return { notes, add }
}

export const mergeTextStyleSources = (
  sources: readonly StyleSource[],
): MergedTextStyles => {
  const [primary, ...supplementary] = sources
  if (!primary) {
    throw new Error("텍스트 스타일 원문이 없습니다")
  }

  const merged: Record<string, string> = { ...primary.raw }
  const { notes, add } = createNoteCollector()

  for (const source of supplementary) {
    const { variables, styles } = splitVariableDefs(source.raw)
    for (const [figmaName, definition] of styles) {
      const accepted = merged[figmaName]
      if (accepted !== undefined) {
        if (accepted !== definition) {
          add(figmaName, definition, source.file, "differs")
        }
        continue
      }
      if (!isTextStyleName(figmaName)) {
        add(figmaName, definition, source.file, "outside-pattern")
        continue
      }
      const expression = parseFontExpression(definition, variables)
      if (expression.family.kind !== "variable") {
        add(figmaName, definition, source.file, "unbound-family")
        continue
      }
      for (const argument of [
        expression.family,
        expression.style,
        expression.size,
      ]) {
        if (argument.kind !== "variable") {
          continue
        }
        const value = variables.get(argument.name)
        const known = merged[argument.name]
        if (value === undefined) {
          continue
        }
        if (known !== undefined && known !== value) {
          throw new Error(
            `${source.file}: ${figmaName}이 참조하는 변수 ${argument.name} 값 ${value}가 다른 원문의 ${known}와 다릅니다`,
          )
        }
        merged[argument.name] = value
      }
      merged[figmaName] = definition
    }
  }

  return { raw: merged, notes }
}
