import { describe, expect, it } from "vitest"

import { mergeTextStyleSources, type StyleSource } from "./style-sources.ts"

const BRAND = "Typography/Base/FontFamily/Brand"
const MEDIUM = "Typography/Base/FontWeight/Medium"

const fontOf = (size: string, letterSpacing: number, family = `"${BRAND}"`) =>
  `Font(family: ${family}, style: ${MEDIUM}, size: ${size}, weight: 500, lineHeight: 1.399999976158142, letterSpacing: ${letterSpacing})`

const source = (file: string, raw: Record<string, string>): StyleSource => ({
  file,
  raw,
})

const primary = source("primary.json", {
  [BRAND]: "Pretendard Variable",
  [MEDIUM]: "Medium",
  "Typography/Base/FontSize/16px": "16",
  "Label/3-Medium": fontOf("Typography/Base/FontSize/16px", -2),
})

describe("mergeTextStyleSources", () => {
  it("기준 원문과 정의가 다르면 기준 원문을 지키고 메모로 남긴다", () => {
    const result = mergeTextStyleSources([
      primary,
      source("header.json", {
        [BRAND]: "Pretendard Variable",
        [MEDIUM]: "Medium",
        "Typography/Base/FontSize/16px": "16",
        "Label/3-Medium": fontOf("Typography/Base/FontSize/16px", -3),
      }),
    ])
    expect(result.raw["Label/3-Medium"]).toBe(
      fontOf("Typography/Base/FontSize/16px", -2),
    )
    expect(result.notes).toEqual([
      expect.objectContaining({
        figmaName: "Label/3-Medium",
        files: ["header.json"],
        reason: "differs",
      }),
    ])
  })

  it("기준 원문에 없는 3기 스타일과 그 스타일이 참조하는 변수를 함께 받는다", () => {
    const result = mergeTextStyleSources([
      primary,
      source("option-button.json", {
        [BRAND]: "Pretendard Variable",
        [MEDIUM]: "Medium",
        "Typography/Base/FontSize/20px": "20",
        "Title/2-Medium": fontOf("Typography/Base/FontSize/20px", -2),
      }),
    ])
    expect(result.raw["Title/2-Medium"]).toBe(
      fontOf("Typography/Base/FontSize/20px", -2),
    )
    expect(result.raw["Typography/Base/FontSize/20px"]).toBe("20")
    expect(result.notes).toEqual([])
  })

  it("글꼴을 값으로 직접 적은 정의는 2기 스타일로 보고 받지 않는다", () => {
    const result = mergeTextStyleSources([
      primary,
      source("legacy.json", {
        "Heading/7-Semibold":
          'Font(family: "Pretendard Variable", style: SemiBold, size: 18, weight: 600, lineHeight: 1.399999976158142, letterSpacing: -1)',
      }),
    ])
    expect(result.raw["Heading/7-Semibold"]).toBeUndefined()
    expect(result.notes).toEqual([
      expect.objectContaining({
        figmaName: "Heading/7-Semibold",
        reason: "unbound-family",
      }),
    ])
  })

  it("이름 규칙 밖의 스타일은 받지 않는다", () => {
    const result = mergeTextStyleSources([
      primary,
      source("legacy.json", {
        "Mobile Web/Body/2-Medium":
          'Font(family: "Pretendard Variable", style: Medium, size: 15, weight: 500, lineHeight: 23, letterSpacing: -3)',
      }),
    ])
    expect(result.raw["Mobile Web/Body/2-Medium"]).toBeUndefined()
    expect(result.notes).toEqual([
      expect.objectContaining({
        figmaName: "Mobile Web/Body/2-Medium",
        reason: "outside-pattern",
      }),
    ])
  })

  it("여러 원문에 같은 다른 정의가 있으면 메모 한 줄에 파일을 모은다", () => {
    const stale = {
      [BRAND]: "Pretendard Variable",
      [MEDIUM]: "Medium",
      "Typography/Base/FontSize/16px": "16",
      "Label/3-Medium": fontOf("Typography/Base/FontSize/16px", -3),
    }
    const result = mergeTextStyleSources([
      primary,
      source("a.json", stale),
      source("b.json", stale),
    ])
    expect(result.notes).toEqual([
      expect.objectContaining({ files: ["a.json", "b.json"] }),
    ])
  })

  it("받으려는 스타일이 참조하는 변수 값이 기준 원문과 다르면 실패한다", () => {
    expect(() =>
      mergeTextStyleSources([
        primary,
        source("broken.json", {
          [BRAND]: "Pretendard Variable",
          [MEDIUM]: "Medium",
          "Typography/Base/FontSize/16px": "15",
          "Title/4-Semibold": fontOf("Typography/Base/FontSize/16px", 0),
        }),
      ]),
    ).toThrow("Typography/Base/FontSize/16px")
  })
})
