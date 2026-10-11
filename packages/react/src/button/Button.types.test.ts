import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Button, type ButtonProps } from "./Button.tsx"

describe("ButtonProps", () => {
  it("variant, color, size는 피그마 값만 받는다", () => {
    expectTypeOf<ButtonProps["variant"]>().toEqualTypeOf<
      "fill" | "weak" | undefined
    >()
    expectTypeOf<ButtonProps["color"]>().toEqualTypeOf<
      "primary" | "neutral" | "red" | "white" | undefined
    >()
    expectTypeOf<ButtonProps["size"]>().toEqualTypeOf<
      "lg" | "md" | "sm" | "xs" | undefined
    >()
  })

  it("네이티브 button 속성과 ref를 받는다", () => {
    expectTypeOf<ButtonProps>().toHaveProperty("form")
    expectTypeOf<ButtonProps>().toHaveProperty("aria-label")
    expectTypeOf<ButtonProps>().toHaveProperty("onClick")
    expectTypeOf<ButtonProps["ref"]>().toEqualTypeOf<
      Ref<HTMLButtonElement> | undefined
    >()
  })

  it("Button의 props 타입이 ButtonProps와 같아 래퍼에서 그대로 쓸 수 있다", () => {
    expectTypeOf<ComponentProps<typeof Button>>().toEqualTypeOf<ButtonProps>()
  })
})
