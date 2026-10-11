import { describe, expect, it } from "vitest"

import { formatDimension, percentToEm, px, round4 } from "./units.ts"

describe("round4", () => {
  it.each([
    [1.2000000476837158, 1.2],
    [1.399999976158142, 1.4],
    [1.350000023841858, 1.35],
    [1.4500000476837158, 1.45],
    [-0.00001, 0],
  ])("%f를 %f로 반올림한다", (input, expected) => {
    expect(round4(input)).toBe(expected)
  })
})

describe("formatDimension", () => {
  it.each([
    [px(16), "1rem"],
    [px(13), "0.8125rem"],
    [px(11), "0.6875rem"],
    [px(17), "1.0625rem"],
    [px(216), "13.5rem"],
    [percentToEm(-3), "-0.03em"],
    [percentToEm(-1.5), "-0.015em"],
    [percentToEm(-2.5), "-0.025em"],
    [percentToEm(0), "0em"],
  ])("%o를 %s로 출력한다", (dimension, expected) => {
    expect(formatDimension(dimension)).toBe(expected)
  })
})
