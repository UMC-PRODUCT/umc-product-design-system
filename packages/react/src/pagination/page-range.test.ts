import { describe, expect, it } from "vitest"

import { clampPage, lastPageOf, pageRangeOf } from "./page-range.ts"

describe("lastPageOf", () => {
  it("정수 페이지 수를 그대로 쓰고 소수는 내린다", () => {
    expect(lastPageOf(10)).toBe(10)
    expect(lastPageOf(4.9)).toBe(4)
  })

  it("0보다 작거나 숫자가 아니면 0으로 본다", () => {
    expect(lastPageOf(-3)).toBe(0)
    expect(lastPageOf(Number.NaN)).toBe(0)
    expect(lastPageOf(Number.POSITIVE_INFINITY)).toBe(0)
  })
})

describe("clampPage", () => {
  it("1과 마지막 페이지 사이로 맞춘다", () => {
    expect(clampPage(0, 10)).toBe(1)
    expect(clampPage(11, 10)).toBe(10)
    expect(clampPage(5, 10)).toBe(5)
  })

  it("소수는 내리고 숫자가 아니면 1로 본다", () => {
    expect(clampPage(2.7, 10)).toBe(2)
    expect(clampPage(Number.NaN, 10)).toBe(1)
  })
})

describe("pageRangeOf", () => {
  it("현재 페이지를 둘째 칸에 두고 visibleCount개를 보여 준다", () => {
    expect(pageRangeOf(2, 20, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(5, 20, 4)).toEqual([4, 5, 6, 7])
    expect(pageRangeOf(6, 20, 4)).toEqual([5, 6, 7, 8])
  })

  it("양 끝에서는 범위가 처음과 마지막 페이지를 넘지 않는다", () => {
    expect(pageRangeOf(1, 20, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(19, 20, 4)).toEqual([17, 18, 19, 20])
    expect(pageRangeOf(20, 20, 4)).toEqual([17, 18, 19, 20])
  })

  it("피그마 예시(4페이지)의 첫, 중간, 마지막은 모두 1~4를 보여 준다", () => {
    expect(pageRangeOf(1, 4, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(2, 4, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(4, 4, 4)).toEqual([1, 2, 3, 4])
  })

  it("페이지가 visibleCount보다 적으면 전부 보여 준다", () => {
    expect(pageRangeOf(2, 3, 4)).toEqual([1, 2, 3])
  })

  it("visibleCount가 1보다 작거나 숫자가 아니면 현재 페이지 하나만 보여 준다", () => {
    expect(pageRangeOf(3, 10, 1)).toEqual([3])
    expect(pageRangeOf(3, 10, 0)).toEqual([3])
    expect(pageRangeOf(3, 10, Number.NaN)).toEqual([3])
  })
})
