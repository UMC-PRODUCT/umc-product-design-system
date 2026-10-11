import { describe, expectTypeOf, it } from "vitest"

import { type RadioGroupProps, type RadioProps } from "./RadioGroup.tsx"

describe("RadioGroupProps", () => {
  it("값은 문자열로 주고받고 null은 선택 없음이다", () => {
    expectTypeOf<RadioGroupProps["value"]>().toEqualTypeOf<
      string | null | undefined
    >()
    expectTypeOf<RadioGroupProps["onValueChange"]>().toEqualTypeOf<
      ((value: string) => void) | undefined
    >()
  })

  it("Radio의 color는 피그마 값만 받고 value는 필수다", () => {
    expectTypeOf<RadioProps["color"]>().toEqualTypeOf<
      "neutral" | "primary" | undefined
    >()
    expectTypeOf<RadioProps["value"]>().toEqualTypeOf<string>()
  })
})
