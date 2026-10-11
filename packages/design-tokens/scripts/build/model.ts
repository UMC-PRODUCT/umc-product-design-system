import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { parseAlias, type TokenPath } from "../shared/naming.ts"
import { paths } from "../shared/paths.ts"
import { parseTokenTree, type CanonicalToken } from "../shared/schema.ts"
import { TOKEN_FILE_ORDER, type TokenFileName } from "../shared/token-files.ts"

export type TokenFile = {
  file: TokenFileName
  tree: unknown
}

export type ModelEntry = {
  path: TokenPath
  token: CanonicalToken
  file: TokenFileName
}

type TokenType = CanonicalToken["$type"]

type AliasReference = {
  field: string
  target: TokenPath
  expectedType: TokenType
}

const toReference = (
  field: string,
  value: unknown,
  expectedType: TokenType,
): AliasReference[] => {
  const target = typeof value === "string" ? parseAlias(value) : null
  return target ? [{ field, target, expectedType }] : []
}

const aliasReferences = (token: CanonicalToken): AliasReference[] =>
  token.$type === "typography"
    ? [
        ...toReference("fontFamily", token.$value.fontFamily, "fontFamily"),
        ...toReference("fontSize", token.$value.fontSize, "dimension"),
        ...toReference("fontWeight", token.$value.fontWeight, "fontWeight"),
      ]
    : toReference("$value", token.$value, token.$type)

const pathKey = (path: TokenPath): string => path.join(".")

const findCycle = (
  start: ModelEntry,
  byPath: ReadonlyMap<string, ModelEntry>,
): boolean => {
  const visited = new Set<string>([pathKey(start.path)])
  let current: ModelEntry | undefined = start
  while (current) {
    const next = aliasReferences(current.token).find(
      (reference) => reference.field === "$value",
    )
    if (!next) {
      return false
    }
    const nextKey = pathKey(next.target)
    if (visited.has(nextKey)) {
      return true
    }
    visited.add(nextKey)
    current = byPath.get(nextKey)
  }
  return false
}

export const buildModel = (files: readonly TokenFile[]): ModelEntry[] => {
  const entries = files.flatMap(({ file, tree }) =>
    parseTokenTree(tree, file).map((entry) => ({ ...entry, file })),
  )
  const problems: string[] = []
  const byPath = new Map<string, ModelEntry>()

  for (const entry of entries) {
    const key = pathKey(entry.path)
    const existing = byPath.get(key)
    if (existing) {
      problems.push(
        `${key}: ${existing.file}와 ${entry.file}에 같은 경로가 있습니다`,
      )
      continue
    }
    byPath.set(key, entry)
  }

  for (const entry of entries) {
    for (const reference of aliasReferences(entry.token)) {
      const target = byPath.get(pathKey(reference.target))
      const location = `${pathKey(entry.path)}.${reference.field}`
      if (!target) {
        problems.push(
          `${location}: 참조 대상 ${pathKey(reference.target)}가 없습니다`,
        )
      } else if (target.token.$type !== reference.expectedType) {
        problems.push(
          `${location}: ${reference.expectedType}를 기대했지만 ${pathKey(reference.target)}는 ${target.token.$type}입니다`,
        )
      }
    }
    if (findCycle(entry, byPath)) {
      problems.push(`${pathKey(entry.path)}: 순환 참조가 있습니다`)
    }
  }

  if (problems.length > 0) {
    throw new Error(problems.join("\n"))
  }
  return entries
}

export const loadTokenModel = (tokensDir: string = paths.tokensDir) => {
  const knownFiles = new Set<string>(TOKEN_FILE_ORDER)
  const presentFiles = readdirSync(tokensDir).filter((name) =>
    name.endsWith(".json"),
  )
  const unknownFiles = presentFiles.filter((name) => !knownFiles.has(name))
  if (unknownFiles.length > 0) {
    throw new Error(`알 수 없는 토큰 파일입니다: ${unknownFiles.join(", ")}`)
  }
  return buildModel(
    TOKEN_FILE_ORDER.filter((file) => presentFiles.includes(file)).map(
      (file) => ({
        file,
        tree: JSON.parse(
          readFileSync(join(tokensDir, file), "utf8"),
        ) as unknown,
      }),
    ),
  )
}
