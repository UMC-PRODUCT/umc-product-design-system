import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { StatusTag, type StatusTagProps } from "./StatusTag.tsx"

describe("StatusTagProps", () => {
  it("color는 피그마 값만 받는다", () => {
    expectTypeOf<StatusTagProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "warning" | "error" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<StatusTagProps>().toHaveProperty("aria-label")
    expectTypeOf<StatusTagProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("StatusTag의 props 타입이 StatusTagProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof StatusTag>
    >().toEqualTypeOf<StatusTagProps>()
  })
})
