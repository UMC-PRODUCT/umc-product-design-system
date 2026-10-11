import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  DotBadge,
  type DotBadgeColor,
  type DotBadgeProps,
  type DotBadgeSize,
} from "./DotBadge.tsx"

describe("DotBadgeProps", () => {
  it("color는 다섯 가지 값만 받는다", () => {
    expectTypeOf<DotBadgeProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "error" | "warning" | "success" | undefined
    >()
  })

  it("size는 두 가지 값만 받는다", () => {
    expectTypeOf<DotBadgeProps["size"]>().toEqualTypeOf<
      "sm" | "md" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<DotBadgeProps>().toHaveProperty("aria-label")
    expectTypeOf<DotBadgeProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("DotBadge의 props 타입이 DotBadgeProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof DotBadge>
    >().toEqualTypeOf<DotBadgeProps>()
  })

  it("DotBadgeColor 타입이 올바르다", () => {
    expectTypeOf<DotBadgeColor>().toEqualTypeOf<
      "brand" | "neutral" | "error" | "warning" | "success"
    >()
  })

  it("DotBadgeSize 타입이 올바르다", () => {
    expectTypeOf<DotBadgeSize>().toEqualTypeOf<"sm" | "md">()
  })
})
