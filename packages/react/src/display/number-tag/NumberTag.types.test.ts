import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { NumberTag, type NumberTagProps } from "./NumberTag.tsx"

describe("NumberTagProps", () => {
  it("color, variant는 피그마 값만 받는다", () => {
    expectTypeOf<NumberTagProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
    expectTypeOf<NumberTagProps["variant"]>().toEqualTypeOf<
      "primary" | "secondary" | "tertiary" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<NumberTagProps>().toHaveProperty("aria-label")
    expectTypeOf<NumberTagProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("NumberTag의 props 타입이 NumberTagProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof NumberTag>
    >().toEqualTypeOf<NumberTagProps>()
  })
})
