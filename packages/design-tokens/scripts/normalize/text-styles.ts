import { toAlias } from "../shared/naming.ts"
import type { CanonicalToken } from "../shared/schema.ts"
import { percentToEm, px, round4, type Dimension } from "../shared/units.ts"
import {
  EXCLUDED_TEXT_STYLES,
  FONT_WEIGHT_BY_NAME,
  type Exclusion,
} from "./rules.ts"
import { resolveVariablePath } from "./variable-path.ts"

const FONT_EXPRESSION_PATTERN = /^Font\((.*)\)$/s
const FONT_ARGUMENT_PATTERN = /(\w+): ("(?:[^"\\]|\\.)*"|[^,]+)/g
const TEXT_STYLE_NAME_PATTERN =
  /^(Display|Heading|Title|Body|Label|Caption)\/(\d+)-(Bold|SemiBold|Semibold|Medium|Regular)$/
const MAX_UNITLESS_LINE_HEIGHT = 3
const CATEGORY_ORDER = [
  "display",
  "heading",
  "title",
  "body",
  "label",
  "caption",
]
const WEIGHT_ORDER = [700, 600, 500, 400]

export type FontArgument =
  { kind: "variable"; name: string } | { kind: "literal"; value: string }

export type FontExpression = {
  family: FontArgument
  style: FontArgument
  size: FontArgument
  weight: number
  lineHeight: number
  letterSpacing: number
}

export type TextStyleWarning = {
  figmaName: string
  message: string
}

export type TextStyleResult = {
  tree: { typography: Record<string, CanonicalToken> }
  warnings: TextStyleWarning[]
  excluded: readonly Exclusion[]
}

type TextStyleName = {
  category: string
  level: number
  weightWord: string
}

type ConvertedStyle = {
  key: string
  name: TextStyleName
  weight: number
  token: CanonicalToken
}

export const splitVariableDefs = (raw: Readonly<Record<string, string>>) => {
  const variables = new Map<string, string>()
  const styles = new Map<string, string>()
  for (const [name, value] of Object.entries(raw)) {
    if (value.startsWith("Font(")) {
      styles.set(name, value)
    } else {
      variables.set(name, value)
    }
  }
  return { variables, styles }
}

const unquote = (value: string): string =>
  value.startsWith('"') && value.endsWith('"')
    ? (JSON.parse(value) as string)
    : value

const toFontArgument = (
  value: string,
  variables: ReadonlyMap<string, string>,
): FontArgument =>
  variables.has(value)
    ? { kind: "variable", name: value }
    : { kind: "literal", value }

export const parseFontExpression = (
  expression: string,
  variables: ReadonlyMap<string, string>,
): FontExpression => {
  const body = FONT_EXPRESSION_PATTERN.exec(expression)?.[1]
  if (body === undefined) {
    throw new Error(`Font(...) 형식이 아닙니다: ${expression}`)
  }

  const fields = new Map<string, string>()
  for (const [, key, rawValue] of body.matchAll(FONT_ARGUMENT_PATTERN)) {
    if (key !== undefined && rawValue !== undefined) {
      fields.set(key, unquote(rawValue.trim()))
    }
  }

  const requireField = (key: string): string => {
    const value = fields.get(key)
    if (value === undefined) {
      throw new Error(`${key} 항목이 없습니다: ${expression}`)
    }
    return value
  }

  const requireNumber = (key: string): number => {
    const value = Number(requireField(key))
    if (!Number.isFinite(value)) {
      throw new Error(`${key} 값이 숫자가 아닙니다: ${expression}`)
    }
    return value
  }

  return {
    family: toFontArgument(requireField("family"), variables),
    style: toFontArgument(requireField("style"), variables),
    size: toFontArgument(requireField("size"), variables),
    weight: requireNumber("weight"),
    lineHeight: requireNumber("lineHeight"),
    letterSpacing: requireNumber("letterSpacing"),
  }
}

export const isTextStyleName = (figmaName: string): boolean =>
  TEXT_STYLE_NAME_PATTERN.test(figmaName)

const parseTextStyleName = (figmaName: string): TextStyleName | null => {
  const match = TEXT_STYLE_NAME_PATTERN.exec(figmaName)
  const category = match?.[1]
  const level = match?.[2]
  const weightWord = match?.[3]
  if (!category || !level || !weightWord) {
    return null
  }
  return { category: category.toLowerCase(), level: Number(level), weightWord }
}

const aliasOfVariable = (variableName: string): string => {
  const path = resolveVariablePath(variableName)
  if (!path) {
    throw new Error(`정규화 규칙이 없는 변수입니다: ${variableName}`)
  }
  return toAlias(path)
}

type Warn = (message: string) => void

const resolveFontFamily = (family: FontArgument, warn: Warn): string => {
  if (family.kind === "variable") {
    return aliasOfVariable(family.name)
  }
  warn(`서체 "${family.value}"가 변수에 연결되지 않았습니다`)
  return family.value
}

const resolveFontWeight = (
  style: FontArgument,
  weight: number,
  variables: ReadonlyMap<string, string>,
  warn: Warn,
): string | number => {
  if (style.kind === "literal") {
    warn(`굵기 "${style.value}"가 변수에 연결되지 않았습니다`)
    return weight
  }
  const weightName = variables.get(style.name) ?? ""
  if (FONT_WEIGHT_BY_NAME[weightName] !== weight) {
    throw new Error(`굵기 변수 ${weightName}와 weight ${weight}가 다릅니다`)
  }
  return aliasOfVariable(style.name)
}

const resolveFontSize = (
  size: FontArgument,
  variables: ReadonlyMap<string, string>,
  warn: Warn,
): { value: string | Dimension; px: number } => {
  if (size.kind === "variable") {
    return {
      value: aliasOfVariable(size.name),
      px: Number(variables.get(size.name)),
    }
  }
  warn(`크기 ${size.value}px가 변수에 연결되지 않았습니다`)
  return { value: px(Number(size.value)), px: Number(size.value) }
}

const resolveLineHeight = (
  lineHeight: number,
  sizePx: number,
  warn: Warn,
): number => {
  const isPixelLineHeight = lineHeight > MAX_UNITLESS_LINE_HEIGHT
  const ratio = round4(isPixelLineHeight ? lineHeight / sizePx : lineHeight)
  if (isPixelLineHeight) {
    warn(`행간 ${lineHeight}px를 비율 ${ratio}로 바꿨습니다`)
  }
  return ratio
}

const toTypographyToken = (
  figmaName: string,
  name: TextStyleName,
  expression: FontExpression,
  variables: ReadonlyMap<string, string>,
  warn: Warn,
): CanonicalToken => {
  if (FONT_WEIGHT_BY_NAME[name.weightWord] !== expression.weight) {
    throw new Error(
      `${figmaName}: 이름의 굵기 ${name.weightWord}와 weight ${expression.weight}가 다릅니다`,
    )
  }

  const fontSize = resolveFontSize(expression.size, variables, warn)

  return {
    $type: "typography",
    $value: {
      fontFamily: resolveFontFamily(expression.family, warn),
      fontSize: fontSize.value,
      fontWeight: resolveFontWeight(
        expression.style,
        expression.weight,
        variables,
        warn,
      ),
      lineHeight: resolveLineHeight(expression.lineHeight, fontSize.px, warn),
      letterSpacing: percentToEm(expression.letterSpacing),
    },
    $extensions: { "umc.figma": { style: figmaName } },
  }
}

const compareStyles = (left: ConvertedStyle, right: ConvertedStyle): number =>
  CATEGORY_ORDER.indexOf(left.name.category) -
    CATEGORY_ORDER.indexOf(right.name.category) ||
  left.name.level - right.name.level ||
  WEIGHT_ORDER.indexOf(left.weight) - WEIGHT_ORDER.indexOf(right.weight)

export const parseTextStyles = (
  raw: Readonly<Record<string, string>>,
  exclusions: readonly Exclusion[] = EXCLUDED_TEXT_STYLES,
): TextStyleResult => {
  const { variables, styles } = splitVariableDefs(raw)

  const staleExclusions = exclusions.filter(
    (exclusion) => !styles.has(exclusion.figmaName),
  )
  if (staleExclusions.length > 0) {
    throw new Error(
      `입력에 없는 제외 규칙이 있습니다: ${staleExclusions.map((exclusion) => exclusion.figmaName).join(", ")}`,
    )
  }

  const excludedNames = new Set(
    exclusions.map((exclusion) => exclusion.figmaName),
  )
  const warnings: TextStyleWarning[] = []
  const unknownNames: string[] = []
  const converted: ConvertedStyle[] = []

  for (const [figmaName, expressionText] of styles) {
    if (excludedNames.has(figmaName)) {
      continue
    }
    const name = parseTextStyleName(figmaName)
    if (!name) {
      unknownNames.push(figmaName)
      continue
    }
    const expression = parseFontExpression(expressionText, variables)
    const warn = (message: string) => warnings.push({ figmaName, message })
    converted.push({
      key: `${name.category}-${name.level}-${name.weightWord.toLowerCase()}`,
      name,
      weight: expression.weight,
      token: toTypographyToken(figmaName, name, expression, variables, warn),
    })
  }

  if (unknownNames.length > 0) {
    throw new Error(
      `이름 규칙 밖의 텍스트 스타일이 있습니다: ${unknownNames.join(", ")}`,
    )
  }

  const keys = converted.map((style) => style.key)
  const duplicatedKeys = keys.filter(
    (key, index) => keys.indexOf(key) !== index,
  )
  if (duplicatedKeys.length > 0) {
    throw new Error(`같은 토큰 이름이 생깁니다: ${duplicatedKeys.join(", ")}`)
  }

  const typography = Object.fromEntries(
    converted.sort(compareStyles).map((style) => [style.key, style.token]),
  )
  return { tree: { typography }, warnings, excluded: exclusions }
}
