import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Tag, type TagProps } from "./Tag.tsx"

describe("TagProps", () => {
  it("variant, color, size는 피그마 값만 받는다", () => {
    expectTypeOf<TagProps["variant"]>().toEqualTypeOf<
      "weak" | "fill" | undefined
    >()
    expectTypeOf<TagProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "warning" | "success" | "error" | undefined
    >()
    expectTypeOf<TagProps["size"]>().toEqualTypeOf<
      "sm" | "md" | "lg" | undefined
    >()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<TagProps>().toHaveProperty("aria-label")
    expectTypeOf<TagProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("Tag의 props 타입이 TagProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof Tag>>().toEqualTypeOf<TagProps>()
  })
})
