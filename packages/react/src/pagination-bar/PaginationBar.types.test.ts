import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { PaginationBar, type PaginationBarProps } from "./PaginationBar.tsx"

describe("PaginationBarProps", () => {
  it("totalPages는 필수이고 page는 숫자로 받는다", () => {
    expectTypeOf<PaginationBarProps["totalPages"]>().toEqualTypeOf<number>()
    expectTypeOf<PaginationBarProps["page"]>().toEqualTypeOf<
      number | undefined
    >()
    expectTypeOf<{ page: number }>().not.toMatchTypeOf<PaginationBarProps>()
  })

  it("onPageChange는 옮겨 갈 페이지 번호를 받는다", () => {
    expectTypeOf<PaginationBarProps["onPageChange"]>().toEqualTypeOf<
      ((page: number) => void) | undefined
    >()
  })

  it("highlightNext는 불리언, controls는 문자열로 받는다", () => {
    expectTypeOf<PaginationBarProps["highlightNext"]>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<PaginationBarProps["controls"]>().toEqualTypeOf<
      string | undefined
    >()
  })

  it("점 접근성 이름은 페이지 번호로 만든다", () => {
    expectTypeOf<PaginationBarProps["pageLabel"]>().toEqualTypeOf<
      ((page: number) => string) | undefined
    >()
  })

  it("children은 받지 않고 div 속성과 ref를 받는다", () => {
    expectTypeOf<PaginationBarProps>().not.toHaveProperty("children")
    expectTypeOf<PaginationBarProps>().toHaveProperty("aria-label")
    expectTypeOf<PaginationBarProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("PaginationBar의 props 타입이 PaginationBarProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof PaginationBar>
    >().toEqualTypeOf<PaginationBarProps>()
  })
})
