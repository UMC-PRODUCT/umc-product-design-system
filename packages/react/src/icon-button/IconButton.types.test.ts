import type { ComponentProps, ReactElement, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { IconButton, type IconButtonProps } from "./IconButton.tsx"

describe("IconButtonProps", () => {
  it("color, variant, size는 피그마 값만 받는다", () => {
    expectTypeOf<IconButtonProps["color"]>().toEqualTypeOf<
      "brand" | "white" | "neutral" | "error" | undefined
    >()
    expectTypeOf<IconButtonProps["variant"]>().toEqualTypeOf<
      "fill" | "weak" | undefined
    >()
    expectTypeOf<IconButtonProps["size"]>().toEqualTypeOf<
      "sm" | "md" | "lg" | undefined
    >()
  })

  it("aria-label이나 aria-labelledby가 있어야 한다", () => {
    expectTypeOf<{ icon: ReactElement }>().not.toMatchTypeOf<IconButtonProps>()
    expectTypeOf<{
      icon: ReactElement
      "aria-label": string
    }>().toMatchTypeOf<IconButtonProps>()
    expectTypeOf<{
      icon: ReactElement
      "aria-labelledby": string
    }>().toMatchTypeOf<IconButtonProps>()
  })

  it("라벨 글자는 받지 않는다", () => {
    expectTypeOf<IconButtonProps>().not.toHaveProperty("children")
  })

  it("네이티브 button 속성과 ref를 받는다", () => {
    expectTypeOf<IconButtonProps>().toHaveProperty("onClick")
    expectTypeOf<IconButtonProps>().toHaveProperty("disabled")
    expectTypeOf<IconButtonProps["ref"]>().toEqualTypeOf<
      Ref<HTMLButtonElement> | undefined
    >()
  })

  it("IconButton의 props 타입이 IconButtonProps와 같아 래퍼에서 그대로 쓸 수 있다", () => {
    expectTypeOf<
      ComponentProps<typeof IconButton>
    >().toEqualTypeOf<IconButtonProps>()
  })
})
