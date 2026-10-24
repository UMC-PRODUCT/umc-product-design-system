import { describe, expect, it } from "vitest"

import {
  addMonths,
  dayLabelOf,
  endOfWeek,
  monthTitleOf,
  rangePositionOf,
  startOfWeek,
  weeksOfMonth,
} from "./calendar-dates.ts"

const dateOf = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day)

describe("weeksOfMonth", () => {
  it("월요일에 시작하는 주로 달을 채우고 앞뒤 달 날짜까지 담는다", () => {
    const weeks = weeksOfMonth(dateOf(2026, 10, 15))
    expect(weeks).toHaveLength(5)
    expect(weeks[0]?.[0]).toEqual(dateOf(2026, 9, 28))
    expect(weeks.at(-1)?.at(-1)).toEqual(dateOf(2026, 11, 1))
    expect(weeks.every((week) => week.length === 7)).toBe(true)
  })

  it("달이 걸친 주 수만큼 돌려준다", () => {
    expect(weeksOfMonth(dateOf(2026, 3, 1))).toHaveLength(6)
    expect(weeksOfMonth(dateOf(2021, 2, 1))).toHaveLength(4)
  })
})

describe("addMonths", () => {
  it("옮긴 달에 같은 날이 없으면 그달 마지막 날로 맞춘다", () => {
    expect(addMonths(dateOf(2026, 1, 31), 1)).toEqual(dateOf(2026, 2, 28))
    expect(addMonths(dateOf(2026, 3, 31), -1)).toEqual(dateOf(2026, 2, 28))
    expect(addMonths(dateOf(2026, 10, 15), 12)).toEqual(dateOf(2027, 10, 15))
  })
})

describe("startOfWeek, endOfWeek", () => {
  it("주는 월요일에 시작해 일요일에 끝난다", () => {
    expect(startOfWeek(dateOf(2026, 10, 25))).toEqual(dateOf(2026, 10, 19))
    expect(endOfWeek(dateOf(2026, 10, 19))).toEqual(dateOf(2026, 10, 25))
  })
})

describe("rangePositionOf", () => {
  const ranges = [
    { start: dateOf(2026, 10, 22), end: dateOf(2026, 11, 1) },
    { start: dateOf(2026, 10, 6), end: dateOf(2026, 10, 6) },
  ]

  it("기간의 시작, 중간, 끝과 하루짜리 기간을 나눈다", () => {
    expect(rangePositionOf(dateOf(2026, 10, 22), ranges)).toBe("start")
    expect(rangePositionOf(dateOf(2026, 10, 27), ranges)).toBe("middle")
    expect(rangePositionOf(dateOf(2026, 11, 1), ranges)).toBe("end")
    expect(rangePositionOf(dateOf(2026, 10, 6), ranges)).toBe("single")
    expect(rangePositionOf(dateOf(2026, 10, 21), ranges)).toBeUndefined()
  })

  it("시작과 끝이 거꾸로 와도 같은 기간으로 본다", () => {
    const reversed = [{ start: dateOf(2026, 10, 10), end: dateOf(2026, 10, 6) }]
    expect(rangePositionOf(dateOf(2026, 10, 6), reversed)).toBe("start")
    expect(rangePositionOf(dateOf(2026, 10, 9), reversed)).toBe("middle")
  })

  it("시각은 보지 않고 날짜만 비교한다", () => {
    expect(rangePositionOf(new Date(2026, 9, 22, 23, 59), ranges)).toBe("start")
  })
})

describe("이름", () => {
  it("날짜를 화면 낭독기가 읽는 이름으로 만든다", () => {
    expect(dayLabelOf(dateOf(2026, 10, 22))).toBe("2026년 10월 22일 목요일")
  })

  it("달 제목은 연도와 두 자리 달로 나눈다", () => {
    expect(monthTitleOf(dateOf(2026, 3, 1))).toEqual({
      year: "2026년",
      month: "03월",
    })
  })
})
