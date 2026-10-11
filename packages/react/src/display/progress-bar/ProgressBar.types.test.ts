import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  ProgressBar,
  type ProgressBarColor,
  type ProgressBarProps,
  type ProgressBarSize,
} from "./ProgressBar.tsx"

describe("ProgressBarProps", () => {
  it("value는 number 타입이다", () => {
    expectTypeOf<ProgressBarProps["value"]>().toEqualTypeOf<number>()
  })

  it("max는 optional number다", () => {
    expectTypeOf<ProgressBarProps["max"]>().toEqualTypeOf<number | undefined>()
  })

  it("size는 md 또는 lg만 받는다", () => {
    expectTypeOf<ProgressBarProps["size"]>().toEqualTypeOf<
      "md" | "lg" | undefined
    >()
  })

  it("color는 네 가지 값만 받는다", () => {
    expectTypeOf<ProgressBarProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "success" | "error" | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<ProgressBarProps>().toHaveProperty("aria-label")
    expectTypeOf<ProgressBarProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("color prop은 ProgressBarColor 유니온만 받는다", () => {
    expectTypeOf<ProgressBarProps["color"]>().toEqualTypeOf<
      ProgressBarColor | undefined
    >()
  })

  it("ProgressBar의 props 타입이 ProgressBarProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ProgressBar>
    >().toEqualTypeOf<ProgressBarProps>()
  })

  it("ProgressBarSize 타입이 올바르다", () => {
    expectTypeOf<ProgressBarSize>().toEqualTypeOf<"md" | "lg">()
  })

  it("ProgressBarColor 타입이 올바르다", () => {
    expectTypeOf<ProgressBarColor>().toEqualTypeOf<
      "brand" | "neutral" | "success" | "error"
    >()
  })
})
