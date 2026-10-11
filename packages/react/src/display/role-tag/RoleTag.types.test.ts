import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { RoleTag, type RoleTagProps } from "./RoleTag.tsx"

describe("RoleTagProps", () => {
  it("color는 5가지 값만 받는다", () => {
    expectTypeOf<RoleTagProps["color"]>().toEqualTypeOf<
      "challenger-super-admin" | "product" | "central" | "chapter" | "campus"
    >()
  })

  it("color가 HTML 네이티브 string 타입이 아니다", () => {
    expectTypeOf<RoleTagProps["color"]>().not.toEqualTypeOf<string>()
    expectTypeOf<RoleTagProps["color"]>().not.toEqualTypeOf<
      string | undefined
    >()
  })

  it("size는 피그마 값만 받는다", () => {
    expectTypeOf<RoleTagProps["size"]>().toEqualTypeOf<
      "sm" | "md" | "lg" | undefined
    >()
  })

  it("children이 필수 ReactNode다", () => {
    expectTypeOf<Pick<RoleTagProps, "children">>().not.toEqualTypeOf<{
      children?: ReactNode
    }>()
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<RoleTagProps>().toHaveProperty("aria-label")
    expectTypeOf<RoleTagProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("RoleTag의 props 타입이 RoleTagProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof RoleTag>>().toEqualTypeOf<RoleTagProps>()
  })
})
