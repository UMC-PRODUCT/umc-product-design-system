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
  it("현재 페이지가 든 묶음을 visibleCount개씩 끊어 보여 준다", () => {
    expect(pageRangeOf(1, 10, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(4, 10, 4)).toEqual([1, 2, 3, 4])
    expect(pageRangeOf(5, 10, 4)).toEqual([5, 6, 7, 8])
  })

  it("마지막 묶음은 남은 페이지만 보여 준다", () => {
    expect(pageRangeOf(9, 10, 4)).toEqual([9, 10])
    expect(pageRangeOf(2, 3, 4)).toEqual([1, 2, 3])
  })

  it("visibleCount가 1보다 작거나 숫자가 아니면 한 개씩 보여 준다", () => {
    expect(pageRangeOf(3, 10, 0)).toEqual([3])
    expect(pageRangeOf(3, 10, Number.NaN)).toEqual([3])
  })
})
