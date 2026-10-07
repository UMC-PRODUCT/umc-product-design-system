import type { CanonicalToken } from "../shared/schema.ts"
import { px } from "../shared/units.ts"
import { FONT_WEIGHT_BY_NAME } from "./rules.ts"
import { resolveVariable } from "./variable-path.ts"

const GROUP_ORDER = ["font-family", "font-size", "font-weight"]

export type MergedVariable = {
  tokenPath: string
  figmaNames: string[]
}

type FontVariable = {
  group: string
  key: string
  token: CanonicalToken
  figmaNames: string[]
}

const toFontToken = (
  group: string,
  figmaName: string,
  value: string,
): CanonicalToken => {
  if (group === "font-size") {
    const size = Number(value)
    if (!Number.isFinite(size)) {
      throw new Error(`${figmaName}: 크기 값이 숫자가 아닙니다 (${value})`)
    }
    return { $type: "dimension", $value: px(size) }
  }
  if (group === "font-weight") {
    const weight = FONT_WEIGHT_BY_NAME[value]
    if (weight === undefined) {
      throw new Error(`${figmaName}: 알 수 없는 굵기 이름입니다 (${value})`)
    }
    return { $type: "fontWeight", $value: weight }
  }
  if (group === "font-family") {
    return { $type: "fontFamily", $value: value }
  }
  throw new Error(`${figmaName}: 타이포 기본 변수 그룹이 아닙니다 (${group})`)
}

const compareKeys = (
  group: string,
  left: FontVariable,
  right: FontVariable,
) => {
  if (group === "font-size") {
    return Number(left.key) - Number(right.key)
  }
  if (group === "font-weight") {
    return Number(right.token.$value) - Number(left.token.$value)
  }
  return left.key.localeCompare(right.key)
}

export const fontTokensFromVariables = (
  variables: ReadonlyMap<string, string>,
) => {
  const byPath = new Map<string, FontVariable>()

  for (const [figmaName, value] of variables) {
    const resolved = resolveVariable(figmaName)
    if (resolved?.rule.file !== "font.json") {
      continue
    }
    const { path } = resolved
    const [group, key] = path
    if (group === undefined || key === undefined || path.length !== 2) {
      throw new Error(`${figmaName}: 경로가 그룹.이름 형태가 아닙니다`)
    }

    const token = toFontToken(group, figmaName, value)
    const existing = byPath.get(path.join("."))
    if (!existing) {
      byPath.set(path.join("."), { group, key, token, figmaNames: [figmaName] })
      continue
    }
    if (
      JSON.stringify(existing.token.$value) !== JSON.stringify(token.$value)
    ) {
      throw new Error(
        `${path.join(".")}: ${existing.figmaNames.join(", ")}와 ${figmaName}의 값이 다릅니다`,
      )
    }
    existing.figmaNames.push(figmaName)
  }

  const fontVariables = [...byPath.values()]
  const tree = Object.fromEntries(
    GROUP_ORDER.map((group) => [
      group,
      Object.fromEntries(
        fontVariables
          .filter((variable) => variable.group === group)
          .sort((left, right) => compareKeys(group, left, right))
          .map((variable) => [
            variable.key,
            {
              ...variable.token,
              $extensions: { "umc.figma": { variables: variable.figmaNames } },
            },
          ]),
      ),
    ]),
  )

  const merged: MergedVariable[] = fontVariables
    .filter((variable) => variable.figmaNames.length > 1)
    .map((variable) => ({
      tokenPath: `${variable.group}.${variable.key}`,
      figmaNames: variable.figmaNames,
    }))

  return { tree, merged }
}
