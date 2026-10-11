import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Chip, type ChipProps } from "./Chip.tsx"

describe("ChipProps", () => {
  it("variant, color, size는 피그마 값만 받는다", () => {
    expectTypeOf<ChipProps["variant"]>().toEqualTypeOf<
      "weak" | "fill" | undefined
    >()
    expectTypeOf<ChipProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
    expectTypeOf<ChipProps["size"]>().toEqualTypeOf<"sm" | "md" | undefined>()
  })

  it("color가 문자열 타입이 아니라 ChipColor 유니언 타입이다", () => {
    expectTypeOf<ChipProps["color"]>().not.toEqualTypeOf<string>()
    expectTypeOf<ChipProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
  })

  it("selected는 boolean이거나 undefined다", () => {
    expectTypeOf<ChipProps["selected"]>().toEqualTypeOf<boolean | undefined>()
  })

  it("네이티브 button 속성과 ref를 받는다", () => {
    expectTypeOf<ChipProps>().toHaveProperty("onClick")
    expectTypeOf<ChipProps>().toHaveProperty("disabled")
    expectTypeOf<ChipProps["ref"]>().toEqualTypeOf<
      Ref<HTMLButtonElement> | undefined
    >()
  })

  it("Chip의 props 타입이 ChipProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof Chip>>().toEqualTypeOf<ChipProps>()
  })
})
