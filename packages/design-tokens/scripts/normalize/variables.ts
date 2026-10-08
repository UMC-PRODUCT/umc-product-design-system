import { toAlias, toCssVariable, type TokenPath } from "../shared/naming.ts"
import type { CanonicalToken } from "../shared/schema.ts"
import type { TokenFileName } from "../shared/token-files.ts"
import { px } from "../shared/units.ts"
import {
  parseFigmaAlias,
  type FigmaColorValue,
  type FigmaVariable,
} from "./figma-export.ts"
import {
  EXCLUDED_VARIABLES,
  FONT_WEIGHT_BY_NAME,
  type Exclusion,
  type VariableRule,
} from "./rules.ts"
import { resolveVariable, type ResolvedVariable } from "./variable-path.ts"

const OPAQUE_ALPHA = 1
const ALPHA_CHANNEL_MAX = 255

export type TokenTree = { [key: string]: TokenTree | CanonicalToken }

export type VariableMapping = {
  figmaName: string
  tokenPath: string
  cssVariable: string
  codeSyntax: string | null
  file: TokenFileName
}

export type VariableWarning = {
  figmaName: string
  message: string
}

export type CodeSyntaxDuplicate = {
  codeSyntax: string
  figmaNames: string[]
}

export type VariableNormalization = {
  trees: ReadonlyMap<TokenFileName, TokenTree>
  mappings: VariableMapping[]
  excluded: readonly Exclusion[]
  codeSyntaxDuplicates: CodeSyntaxDuplicate[]
  scopeWarnings: VariableWarning[]
  composedSemantics: string[]
}

const toHex = ({ hex, alpha }: FigmaColorValue): string => {
  const base = hex.toLowerCase()
  if (alpha >= OPAQUE_ALPHA) {
    return base
  }
  const alphaChannel = Math.round(alpha * ALPHA_CHANNEL_MAX)
    .toString(16)
    .padStart(2, "0")
  return `${base}${alphaChannel}`
}

const toToken = (
  variable: FigmaVariable,
  rule: VariableRule,
  aliasPathOf: (figmaName: string) => TokenPath,
): CanonicalToken => {
  const aliasTarget =
    typeof variable.value === "string" ? parseFigmaAlias(variable.value) : null
  const alias = aliasTarget ? toAlias(aliasPathOf(aliasTarget)) : null

  switch (rule.kind) {
    case "color": {
      if (variable.type !== "color") {
        throw new Error(`color 타입이어야 하는데 ${variable.type}입니다`)
      }
      if (alias) {
        return { $type: "color", $value: alias }
      }
      if (typeof variable.value === "object") {
        return { $type: "color", $value: toHex(variable.value) }
      }
      throw new Error("색 값도 참조도 아닙니다")
    }
    case "px": {
      if (variable.type !== "number") {
        throw new Error(`number 타입이어야 하는데 ${variable.type}입니다`)
      }
      if (alias) {
        return { $type: "dimension", $value: alias }
      }
      if (typeof variable.value === "number") {
        return { $type: "dimension", $value: px(variable.value) }
      }
      throw new Error("숫자도 참조도 아닙니다")
    }
    case "font-weight": {
      const weight =
        typeof variable.value === "string"
          ? FONT_WEIGHT_BY_NAME[variable.value]
          : undefined
      if (variable.type !== "string" || weight === undefined) {
        throw new Error(`알 수 없는 굵기 값입니다 (${String(variable.value)})`)
      }
      return { $type: "fontWeight", $value: weight }
    }
    case "font-family": {
      if (
        variable.type !== "string" ||
        typeof variable.value !== "string" ||
        alias
      ) {
        throw new Error("서체 이름 문자열이 아닙니다")
      }
      return { $type: "fontFamily", $value: variable.value }
    }
  }
}

const insertToken = (
  tree: TokenTree,
  path: TokenPath,
  token: CanonicalToken,
): void => {
  const groupKeys = path.slice(0, -1)
  const leafKey = path.at(-1)
  if (leafKey === undefined) {
    throw new Error("빈 토큰 경로입니다")
  }
  let group = tree
  for (const key of groupKeys) {
    const child = group[key] ?? {}
    if ("$value" in child) {
      throw new Error(`${path.join(".")}의 상위 ${key}가 이미 토큰입니다`)
    }
    group[key] = child
    group = child as TokenTree
  }
  group[leafKey] = token
}

const findCodeSyntaxDuplicates = (
  variables: readonly FigmaVariable[],
): CodeSyntaxDuplicate[] =>
  Object.entries(
    Object.groupBy(
      variables.filter((variable) => variable.webCodeSyntax !== undefined),
      (variable) => variable.webCodeSyntax ?? "",
    ),
  )
    .map(([codeSyntax, items]) => ({
      codeSyntax,
      figmaNames: (items ?? []).map((variable) => variable.name),
    }))
    .filter((duplicate) => duplicate.figmaNames.length > 1)
    .sort(
      (left, right) =>
        right.figmaNames.length - left.figmaNames.length ||
        left.codeSyntax.localeCompare(right.codeSyntax),
    )

const findScopeWarnings = (
  variables: readonly FigmaVariable[],
): VariableWarning[] => {
  const primitives = variables.filter((variable) =>
    variable.name.startsWith("Primitives/"),
  )
  const primitivesWithAllScopes = primitives.filter((variable) =>
    variable.scopes.includes("ALL_SCOPES"),
  )
  const borderWithoutStroke = variables
    .filter(
      (variable) =>
        variable.name.startsWith("Semantic/Border/") &&
        !variable.scopes.includes("STROKE"),
    )
    .map((variable) => ({
      figmaName: variable.name,
      message: `Border인데 STROKE scope가 없습니다 (${variable.scopes.join(", ")})`,
    }))
  const textWithoutTextFill = variables
    .filter(
      (variable) =>
        variable.name.startsWith("Semantic/Text/") &&
        !variable.scopes.includes("TEXT_FILL"),
    )
    .map((variable) => ({
      figmaName: variable.name,
      message: `Text인데 TEXT_FILL scope가 없습니다 (${variable.scopes.join(", ")})`,
    }))
  const primitiveWarnings =
    primitivesWithAllScopes.length > 0
      ? [
          {
            figmaName: "Primitives/*",
            message: `primitive ${primitives.length}개 중 ${primitivesWithAllScopes.length}개가 ALL_SCOPES라 디자이너 선택 목록에 그대로 노출됩니다`,
          },
        ]
      : []
  return [...primitiveWarnings, ...borderWithoutStroke, ...textWithoutTextFill]
}

export const normalizeVariables = (
  variables: readonly FigmaVariable[],
  exclusions: readonly Exclusion[] = EXCLUDED_VARIABLES,
): VariableNormalization => {
  const variableNames = new Set(variables.map((variable) => variable.name))
  const staleExclusions = exclusions.filter(
    (exclusion) => !variableNames.has(exclusion.figmaName),
  )
  if (staleExclusions.length > 0) {
    throw new Error(
      `입력에 없는 변수 제외 규칙이 있습니다: ${staleExclusions.map((exclusion) => exclusion.figmaName).join(", ")}`,
    )
  }

  const excludedNames = new Set(
    exclusions.map((exclusion) => exclusion.figmaName),
  )
  const included = variables.filter(
    (variable) => !excludedNames.has(variable.name),
  )
  const problems: string[] = []
  const resolved = new Map<string, ResolvedVariable>()
  for (const variable of included) {
    const result = resolveVariable(variable.name)
    if (result) {
      resolved.set(variable.name, result)
    } else {
      problems.push(`${variable.name}: 정규화 규칙이 없습니다`)
    }
  }

  const aliasPathOf = (figmaName: string): TokenPath => {
    if (excludedNames.has(figmaName)) {
      throw new Error(`제외한 변수 ${figmaName}를 참조합니다`)
    }
    const target = resolved.get(figmaName)
    if (!target) {
      throw new Error(`참조 대상 ${figmaName}가 없습니다`)
    }
    return target.path
  }

  const trees = new Map<TokenFileName, TokenTree>()
  const ownerByPath = new Map<string, string>()
  const mappings: VariableMapping[] = []

  for (const variable of included) {
    const target = resolved.get(variable.name)
    if (!target) {
      continue
    }
    const pathKey = target.path.join(".")
    const owner = ownerByPath.get(pathKey)
    if (owner) {
      problems.push(
        `${variable.name}: ${owner}와 같은 경로 ${pathKey}가 됩니다`,
      )
      continue
    }
    try {
      const token: CanonicalToken = {
        ...toToken(variable, target.rule, aliasPathOf),
        $extensions: {
          "umc.figma": {
            name: variable.name,
            variableId: variable.variableId,
            ...(variable.webCodeSyntax === undefined
              ? {}
              : { codeSyntax: variable.webCodeSyntax }),
          },
        },
      }
      const tree = trees.get(target.rule.file) ?? {}
      trees.set(target.rule.file, tree)
      insertToken(tree, target.path, token)
      ownerByPath.set(pathKey, variable.name)
      mappings.push({
        figmaName: variable.name,
        tokenPath: pathKey,
        cssVariable: toCssVariable(target.path),
        codeSyntax: variable.webCodeSyntax ?? null,
        file: target.rule.file,
      })
    } catch (error) {
      problems.push(
        `${variable.name}: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  if (problems.length > 0) {
    throw new Error(problems.join("\n"))
  }

  return {
    trees,
    mappings,
    excluded: exclusions,
    codeSyntaxDuplicates: findCodeSyntaxDuplicates(included),
    scopeWarnings: findScopeWarnings(variables),
    composedSemantics: included
      .filter(
        (variable) =>
          variable.name.startsWith("Semantic/") &&
          typeof variable.value === "object",
      )
      .map((variable) => variable.name),
  }
}
