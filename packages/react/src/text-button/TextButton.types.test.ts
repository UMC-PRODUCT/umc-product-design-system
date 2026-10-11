import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { TextButton, type TextButtonProps } from "./TextButton.tsx"

describe("TextButtonProps", () => {
  it("color, size, variant는 피그마 값만 받는다", () => {
    expectTypeOf<TextButtonProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
    expectTypeOf<TextButtonProps["size"]>().toEqualTypeOf<
      "xs" | "sm" | "md" | undefined
    >()
    expectTypeOf<TextButtonProps["variant"]>().toEqualTypeOf<
      "plain" | "underline" | undefined
    >()
  })

  it("네이티브 button 속성과 ref를 받는다", () => {
    expectTypeOf<TextButtonProps>().toHaveProperty("onClick")
    expectTypeOf<TextButtonProps>().toHaveProperty("disabled")
    expectTypeOf<TextButtonProps["ref"]>().toEqualTypeOf<
      Ref<HTMLButtonElement> | undefined
    >()
  })

  it("TextButton의 props 타입이 TextButtonProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof TextButton>
    >().toEqualTypeOf<TextButtonProps>()
  })
})
