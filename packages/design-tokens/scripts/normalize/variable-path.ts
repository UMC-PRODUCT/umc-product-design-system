import { toSegment, type TokenPath } from "../shared/naming.ts"
import { VARIABLE_RULES, type VariableRule } from "./rules.ts"

const STEP_SUFFIX_PATTERN = /-\d+$/

export type ResolvedVariable = {
  path: TokenPath
  rule: VariableRule
}

export const ruleMatches = (rule: VariableRule, figmaName: string): boolean =>
  rule.match === "exact"
    ? figmaName === rule.figmaName
    : figmaName.startsWith(rule.figmaName)

const dropRepeatedParentName = (segments: readonly string[]): string[] =>
  segments.reduce<string[]>((result, segment) => {
    const parent = result.at(-1)
    if (parent === segment) {
      return result
    }
    if (parent !== undefined && segment.startsWith(`${parent}-`)) {
      return [...result, segment.slice(parent.length + 1)]
    }
    return [...result, segment]
  }, [])

export const resolveVariable = (
  figmaName: string,
  rules: readonly VariableRule[] = VARIABLE_RULES,
): ResolvedVariable | null => {
  const rule = rules.find((candidate) => ruleMatches(candidate, figmaName))
  if (!rule) {
    return null
  }
  if (rule.match === "exact") {
    return { path: rule.tokenPath, rule }
  }
  const segments = figmaName
    .slice(rule.figmaName.length)
    .split("/")
    .filter((segment) => segment.length > 0)
    .map(toSegment)
    .map((segment) =>
      rule.stripStepSuffix ? segment.replace(STEP_SUFFIX_PATTERN, "") : segment,
    )
  return {
    path: [...rule.tokenPath, ...dropRepeatedParentName(segments)],
    rule,
  }
}

export const resolveVariablePath = (figmaName: string): TokenPath | null =>
  resolveVariable(figmaName)?.path ?? null

export const findUnusedRules = (
  figmaNames: readonly string[],
  rules: readonly VariableRule[] = VARIABLE_RULES,
): VariableRule[] =>
  rules.filter((rule) => !figmaNames.some((name) => ruleMatches(rule, name)))
