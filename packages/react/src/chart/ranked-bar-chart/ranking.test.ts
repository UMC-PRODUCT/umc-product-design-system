import { describe, expect, it } from "vitest"

import { rankEntriesOf, rankToneOf, valueToneOf } from "./ranking.ts"

const summaryOf = (values: readonly number[]) =>
  rankEntriesOf(values.map((value, index) => ({ key: `${index}`, value }))).map(
    ({ item, rank, tied }) => [item.value, rank, tied],
  )

describe("rankEntriesOf", () => {
  it("값이 큰 순서로 정렬하고 1위부터 순위를 매긴다", () => {
    expect(summaryOf([30, 100, 60])).toEqual([
      [100, 1, false],
      [60, 2, false],
      [30, 3, false],
    ])
  })

  it("같은 값은 같은 순위이고 다음 순위는 그 수만큼 건너뛴다", () => {
    expect(summaryOf([100, 89, 89, 60])).toEqual([
      [100, 1, false],
      [89, 2, true],
      [89, 2, true],
      [60, 4, false],
    ])
  })

  it("같은 값끼리는 넘긴 순서를 지킨다", () => {
    const entries = rankEntriesOf([
      { key: "platinum", value: 4 },
      { key: "cassiopeia", value: 4 },
    ])
    expect(entries.map(({ item }) => item.key)).toEqual([
      "platinum",
      "cassiopeia",
    ])
  })

  it("0, 음수, NaN은 순위가 없고 맨 뒤에 둔다", () => {
    expect(summaryOf([0, 5, -3, Number.NaN])).toEqual([
      [5, 1, false],
      [0, undefined, false],
      [-3, undefined, false],
      [Number.NaN, undefined, false],
    ])
  })
})

describe("순위 색", () => {
  it("값 높이에서는 4위부터 같은 색이다", () => {
    expect([1, 2, 3, 4, 9].map(valueToneOf)).toEqual([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4th",
    ])
  })

  it("순위 높이에서는 5위부터 같은 모양이다", () => {
    expect([1, 4, 5, 8].map(rankToneOf)).toEqual(["1st", "4th", "5th", "5th"])
  })

  it("순위가 없으면 none이다", () => {
    expect(valueToneOf(undefined)).toBe("none")
    expect(rankToneOf(undefined)).toBe("none")
  })
})
