import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { PartTag, type PartTagProps } from "./PartTag.tsx"

describe("PartTagProps", () => {
  it("part, variant, size는 피그마 값만 받는다", () => {
    expectTypeOf<PartTagProps["part"]>().toEqualTypeOf<
      "pm" | "design" | "web-pe" | "mobile-pe" | undefined
    >()
    expectTypeOf<PartTagProps["variant"]>().toEqualTypeOf<
      "filled" | "outlined" | undefined
    >()
    expectTypeOf<PartTagProps["size"]>().toEqualTypeOf<
      "sm" | "md" | "lg" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<PartTagProps>().toHaveProperty("aria-label")
    expectTypeOf<PartTagProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("네이티브 color 속성을 받지 않는다", () => {
    expectTypeOf<PartTagProps>().not.toHaveProperty("color")
  })

  it("PartTag의 props 타입이 PartTagProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof PartTag>>().toEqualTypeOf<PartTagProps>()
  })
})
