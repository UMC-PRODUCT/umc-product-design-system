import { describe, expect, it } from "vitest"

import {
  isValidSegment,
  parseAlias,
  toAlias,
  toCamelKey,
  toCssVariable,
  toSegment,
} from "./naming.ts"

describe("toSegment", () => {
  it.each([
    ["Neutral-Default", "neutral-default"],
    ["TealGrey-50", "teal-grey-50"],
    ["FontSize", "font-size"],
    ["48px", "48"],
    ["Margin 16", "margin-16"],
    ["Brand", "brand"],
    ["Semibold", "semibold"],
    ["Weaker-Hover(Pressed)", "weaker-hover-pressed"],
    ["Challenger&Super-Admin", "challenger-super-admin"],
    ["Text Field", "text-field"],
    ["XS", "xs"],
  ])("%s를 %s로 바꾼다", (figmaName, expected) => {
    expect(toSegment(figmaName)).toBe(expected)
  })
})

describe("isValidSegment", () => {
  it.each([
    ["neutral-default", true],
    ["500", true],
    ["Neutral", false],
    ["teal--500", false],
    ["-teal", false],
    ["", false],
  ])("%s는 %s다", (segment, expected) => {
    expect(isValidSegment(segment)).toBe(expected)
  })
})

describe("경로 변환", () => {
  it("경로를 CSS 변수 이름으로 바꾼다", () => {
    expect(toCssVariable(["color", "text", "neutral-default-900"])).toBe(
      "--umc-color-text-neutral-default-900",
    )
  })

  it("경로와 alias를 서로 바꾼다", () => {
    const alias = toAlias(["font-size", "48"])
    expect(alias).toBe("{font-size.48}")
    expect(parseAlias(alias)).toEqual(["font-size", "48"])
  })

  it("alias가 아닌 문자열은 null을 돌려준다", () => {
    expect(parseAlias("Pretendard Variable")).toBeNull()
    expect(parseAlias("{Font.Size}")).toBeNull()
  })

  it("segment를 camelCase 키로 바꾼다", () => {
    expect(toCamelKey("neutral-default")).toBe("neutralDefault")
    expect(toCamelKey("body-1-regular")).toBe("body1Regular")
  })
})
