import { toSegment } from "../shared/naming.ts"
import type { CanonicalToken } from "../shared/schema.ts"
import { px } from "../shared/units.ts"
import { EFFECT_STYLES } from "./rules.ts"
import {
  createNoteCollector,
  type StyleNote,
  type StyleSource,
} from "./style-sources.ts"

const EFFECT_PATTERN =
  /^Effect\(type: (DROP_SHADOW|INNER_SHADOW), color: (#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?), offset: \((-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?)\), radius: (\d+(?:\.\d+)?), spread: (-?\d+(?:\.\d+)?)\)$/
const EFFECT_SEPARATOR = /;\s*/

type ShadowToken = Extract<CanonicalToken, { $type: "shadow" }>

export type ShadowLayer = ShadowToken["$value"][number]

export type EffectStyleResult = {
  tree: { shadow: Record<string, unknown> }
  chosen: { figmaName: string; file: string; path: string }[]
  notes: StyleNote[]
}

const isEffect = (definition: string): boolean =>
  definition.startsWith("Effect(")

const toNumber = (figmaName: string, value: string | undefined): number => {
  const parsed = Number(value)
  if (value === undefined || !Number.isFinite(parsed)) {
    throw new Error(`${figmaName}: 그림자 숫자를 읽지 못했습니다`)
  }
  return parsed
}

export const parseEffects = (
  figmaName: string,
  definition: string,
): ShadowLayer[] =>
  definition.split(EFFECT_SEPARATOR).map((part) => {
    const match = EFFECT_PATTERN.exec(part.trim())
    const [, type, color] = match ?? []
    if (!match || type === undefined || color === undefined) {
      throw new Error(`${figmaName}: 그림자 effect 형식이 아닙니다: ${part}`)
    }
    return {
      inset: type === "INNER_SHADOW",
      offsetX: px(toNumber(figmaName, match[3])),
      offsetY: px(toNumber(figmaName, match[4])),
      blur: px(toNumber(figmaName, match[5])),
      spread: px(toNumber(figmaName, match[6])),
      color: color.toLowerCase(),
    }
  })

const insertToken = (
  tree: Record<string, unknown>,
  path: readonly string[],
  token: ShadowToken,
) => {
  const parents = path.slice(0, -1)
  const leaf = path.at(-1)
  if (leaf === undefined) {
    throw new Error("그림자 토큰 경로가 비어 있습니다")
  }
  let node = tree
  for (const segment of parents) {
    const next = (node[segment] ?? {}) as Record<string, unknown>
    node[segment] = next
    node = next
  }
  node[leaf] = token
}

export const collectEffectStyles = (
  sources: readonly StyleSource[],
  accepted: readonly string[] = EFFECT_STYLES,
): EffectStyleResult => {
  const definitions = new Map<string, { definition: string; file: string }>()
  const { notes, add } = createNoteCollector()

  for (const source of sources) {
    for (const [figmaName, definition] of Object.entries(source.raw)) {
      if (!isEffect(definition)) {
        continue
      }
      if (!accepted.includes(figmaName)) {
        add(figmaName, definition, source.file, "outside-library")
        continue
      }
      const chosen = definitions.get(figmaName)
      if (!chosen) {
        definitions.set(figmaName, { definition, file: source.file })
      } else if (chosen.definition !== definition) {
        add(figmaName, definition, source.file, "differs")
      }
    }
  }

  const missing = accepted.filter((figmaName) => !definitions.has(figmaName))
  if (missing.length > 0) {
    throw new Error(`원문에서 찾지 못한 그림자 스타일: ${missing.join(", ")}`)
  }

  const tree: Record<string, unknown> = {}
  const chosen = accepted.map((figmaName) => {
    const found = definitions.get(figmaName)
    if (!found) {
      throw new Error(`원문에서 찾지 못한 그림자 스타일: ${figmaName}`)
    }
    const path = figmaName.split("/").map(toSegment)
    insertToken(tree, path, {
      $type: "shadow",
      $value: parseEffects(figmaName, found.definition),
      $extensions: { "umc.figma": { style: figmaName, source: found.file } },
    })
    return { figmaName, file: found.file, path: path.join(".") }
  })

  return {
    tree: { shadow: (tree.shadow ?? {}) as Record<string, unknown> },
    chosen,
    notes,
  }
}
