import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  NumberBadge,
  type NumberBadgeColor,
  type NumberBadgeProps,
  type NumberBadgeSize,
  type NumberBadgeVariant,
} from "./NumberBadge.tsx"

describe("NumberBadgeProps", () => {
  it("color는 다섯 가지 값만 받는다", () => {
    expectTypeOf<NumberBadgeProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "error" | "warning" | "success" | undefined
    >()
  })

  it("variant는 두 가지 값만 받는다", () => {
    expectTypeOf<NumberBadgeProps["variant"]>().toEqualTypeOf<
      "fill" | "weak" | undefined
    >()
  })

  it("size는 두 가지 값만 받는다", () => {
    expectTypeOf<NumberBadgeProps["size"]>().toEqualTypeOf<
      "sm" | "md" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<NumberBadgeProps>().toHaveProperty("aria-label")
    expectTypeOf<NumberBadgeProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("NumberBadge의 props 타입이 NumberBadgeProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof NumberBadge>
    >().toEqualTypeOf<NumberBadgeProps>()
  })

  it("NumberBadgeColor 타입이 올바르다", () => {
    expectTypeOf<NumberBadgeColor>().toEqualTypeOf<
      "brand" | "neutral" | "error" | "warning" | "success"
    >()
  })

  it("NumberBadgeVariant 타입이 올바르다", () => {
    expectTypeOf<NumberBadgeVariant>().toEqualTypeOf<"fill" | "weak">()
  })

  it("NumberBadgeSize 타입이 올바르다", () => {
    expectTypeOf<NumberBadgeSize>().toEqualTypeOf<"sm" | "md">()
  })
})
