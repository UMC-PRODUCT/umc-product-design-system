import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Dimmed, type DimmedProps } from "./Dimmed.tsx"

describe("DimmedProps", () => {
  it("intensity는 피그마 값만 받는다", () => {
    expectTypeOf<DimmedProps["intensity"]>().toEqualTypeOf<
      "weak" | "medium" | "strong" | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<DimmedProps>().toHaveProperty("onClick")
    expectTypeOf<DimmedProps>().toHaveProperty("className")
    expectTypeOf<DimmedProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("Dimmed의 props 타입이 DimmedProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof Dimmed>>().toEqualTypeOf<DimmedProps>()
  })
})
