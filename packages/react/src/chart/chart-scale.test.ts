import { describe, expect, it } from "vitest"

import { formatCount, largestOf, ratioOf } from "./chart-scale.ts"

describe("largestOf", () => {
  it("가장 큰 값을 돌려준다", () => {
    expect(largestOf([12, 40, 7])).toBe(40)
  })

  it("음수, NaN, 무한대는 건너뛰고 셀 값이 없으면 0이다", () => {
    expect(largestOf([-5, Number.NaN, Number.POSITIVE_INFINITY, 3])).toBe(3)
    expect(largestOf([])).toBe(0)
    expect(largestOf([0, -1])).toBe(0)
  })
})

describe("ratioOf", () => {
  it("값을 최댓값으로 나눈 비율이다", () => {
    expect(ratioOf(25, 100)).toBe(0.25)
  })

  it("최댓값을 넘으면 1에서 멈춘다", () => {
    expect(ratioOf(150, 100)).toBe(1)
  })

  it.each([
    { case: "값이 0", value: 0, max: 100 },
    { case: "값이 음수", value: -3, max: 100 },
    { case: "값이 NaN", value: Number.NaN, max: 100 },
    { case: "최댓값이 0", value: 5, max: 0 },
    { case: "최댓값이 NaN", value: 5, max: Number.NaN },
  ])("$case이면 0이다", ({ value, max }) => {
    expect(ratioOf(value, max)).toBe(0)
  })
})

describe("formatCount", () => {
  it("천 단위마다 쉼표를 넣는다", () => {
    expect(formatCount(1234)).toBe("1,234")
    expect(formatCount(32)).toBe("32")
  })
})
