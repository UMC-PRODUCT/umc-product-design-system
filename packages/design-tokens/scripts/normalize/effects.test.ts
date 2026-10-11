import { describe, expect, it } from "vitest"

import { parseTokenTree } from "../shared/schema.ts"
import { collectEffectStyles, parseEffects } from "./effects.ts"
import type { StyleSource } from "./style-sources.ts"

const DROP =
  "Effect(type: DROP_SHADOW, color: #40444329, offset: (0, 4), radius: 16, spread: 0)"
const INNER_TWO_LAYERS =
  "Effect(type: INNER_SHADOW, color: #D3D8D826, offset: (1, 1), radius: 2, spread: 0); Effect(type: INNER_SHADOW, color: #FFFFFF40, offset: (-1, -1), radius: 1, spread: 0)"
const INNER_OTHER =
  "Effect(type: INNER_SHADOW, color: #E4E4E433, offset: (-1, 2.5), radius: 4, spread: 0)"

const px = (value: number) => ({ value, unit: "px" })

const source = (file: string, raw: Record<string, string>): StyleSource => ({
  file,
  raw,
})

describe("parseEffects", () => {
  it("DROP_SHADOW 하나를 px 단위 그림자 층 하나로 바꾼다", () => {
    expect(parseEffects("Shadow/Drop/Neutral_1", DROP)).toEqual([
      {
        inset: false,
        offsetX: px(0),
        offsetY: px(4),
        blur: px(16),
        spread: px(0),
        color: "#40444329",
      },
    ])
  })

  it("세미콜론으로 이은 INNER_SHADOW 두 개를 inset 층 두 개로 바꾼다", () => {
    const layers = parseEffects("Shadow/Inner/Neutral_2", INNER_TWO_LAYERS)
    expect(layers).toHaveLength(2)
    expect(layers.every((layer) => layer.inset)).toBe(true)
    expect(layers[1]?.offsetX).toEqual(px(-1))
    expect(layers[1]?.color).toBe("#ffffff40")
  })

  it("소수 오프셋을 그대로 옮긴다", () => {
    expect(
      parseEffects("Shadow/Inner/Neutral_2", INNER_OTHER)[0]?.offsetY,
    ).toEqual(px(2.5))
  })

  it("그림자가 아닌 effect는 스타일 이름을 담아 실패한다", () => {
    expect(() =>
      parseEffects(
        "iOS/Blur - 20",
        "Effect(type: BACKGROUND_BLUR, radius: 20)",
      ),
    ).toThrow("iOS/Blur - 20")
  })
})

describe("collectEffectStyles", () => {
  const accepted = ["Shadow/Drop/Neutral_1", "Shadow/Inner/Neutral_2"]

  it("먼저 나온 원문의 정의를 토큰으로 삼고 다른 정의는 메모로 남긴다", () => {
    const result = collectEffectStyles(
      [
        source("header.json", { "Shadow/Inner/Neutral_2": INNER_TWO_LAYERS }),
        source("option-button.json", {
          "Shadow/Drop/Neutral_1": DROP,
          "Shadow/Inner/Neutral_2": INNER_OTHER,
        }),
      ],
      accepted,
    )
    const entries = parseTokenTree(result.tree, "shadow.json")
    expect(entries.map((entry) => entry.path.join("."))).toEqual([
      "shadow.drop.neutral-1",
      "shadow.inner.neutral-2",
    ])
    const inner = entries.find(
      (entry) => entry.path.join(".") === "shadow.inner.neutral-2",
    )
    expect(inner?.token.$value).toHaveLength(2)
    expect(result.notes).toEqual([
      expect.objectContaining({
        figmaName: "Shadow/Inner/Neutral_2",
        files: ["option-button.json"],
        reason: "differs",
      }),
    ])
  })

  it("목록 밖의 effect 스타일은 토큰으로 만들지 않고 메모로 남긴다", () => {
    const result = collectEffectStyles(
      [
        source("a.json", {
          "Shadow/Drop/Neutral_1": DROP,
          "Shadow/Inner/Neutral_2": INNER_TWO_LAYERS,
          "Shadow/Drop/Neutral_4":
            "Effect(type: DROP_SHADOW, color: #ECEEEE, offset: (0, 4), radius: 16, spread: 0)",
        }),
      ],
      accepted,
    )
    expect(result.notes).toEqual([
      expect.objectContaining({
        figmaName: "Shadow/Drop/Neutral_4",
        reason: "outside-library",
      }),
    ])
  })

  it("목록에 있는데 어떤 원문에도 없으면 실패한다", () => {
    expect(() =>
      collectEffectStyles(
        [source("a.json", { "Shadow/Drop/Neutral_1": DROP })],
        accepted,
      ),
    ).toThrow("Shadow/Inner/Neutral_2")
  })
})
