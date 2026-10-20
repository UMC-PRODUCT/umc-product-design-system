import type { ComponentProps, ReactElement, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Button, type ButtonIconOnlySize, type ButtonProps } from "./Button.tsx"

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

  describe("아이콘 전용", () => {
    it("aria-label이나 aria-labelledby가 있어야 한다", () => {
      expectTypeOf<{ icon: ReactElement }>().not.toMatchTypeOf<ButtonProps>()
      expectTypeOf<{
        icon: ReactElement
        "aria-label": string
      }>().toMatchTypeOf<ButtonProps>()
      expectTypeOf<{
        icon: ReactElement
        "aria-labelledby": string
      }>().toMatchTypeOf<ButtonProps>()
    })

    it("라벨, 앞뒤 아이콘과 함께 쓸 수 없다", () => {
      expectTypeOf<{
        icon: ReactElement
        "aria-label": string
        children: string
      }>().not.toMatchTypeOf<ButtonProps>()
      expectTypeOf<{
        icon: ReactElement
        "aria-label": string
        leadingIcon: ReactElement
      }>().not.toMatchTypeOf<ButtonProps>()
    })

    it("피그마에 없는 lg 크기는 받지 않는다", () => {
      expectTypeOf<ButtonIconOnlySize>().toEqualTypeOf<"md" | "sm" | "xs">()
      expectTypeOf<{
        icon: ReactElement
        "aria-label": string
        size: "lg"
      }>().not.toMatchTypeOf<ButtonProps>()
    })
  })
})
