import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { ScrollFog, type ScrollFogProps } from "./ScrollFog.tsx"

describe("ScrollFogProps", () => {
  it("side는 피그마 방향 값만 받는다", () => {
    expectTypeOf<ScrollFogProps["side"]>().toEqualTypeOf<
      "top" | "bottom" | "left" | "right" | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<ScrollFogProps>().toHaveProperty("onClick")
    expectTypeOf<ScrollFogProps>().toHaveProperty("className")
    expectTypeOf<ScrollFogProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("ScrollFog의 props 타입이 ScrollFogProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ScrollFog>
    >().toEqualTypeOf<ScrollFogProps>()
  })
})
