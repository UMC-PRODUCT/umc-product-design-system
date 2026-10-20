import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Pagination, type PaginationProps } from "./Pagination.tsx"

describe("PaginationProps", () => {
  it("totalPages는 필수이고 page는 숫자로 받는다", () => {
    expectTypeOf<PaginationProps["totalPages"]>().toEqualTypeOf<number>()
    expectTypeOf<PaginationProps["page"]>().toEqualTypeOf<number | undefined>()
    expectTypeOf<{ page: number }>().not.toMatchTypeOf<PaginationProps>()
  })

  it("onPageChange는 옮겨 갈 페이지 번호를 받는다", () => {
    expectTypeOf<PaginationProps["onPageChange"]>().toEqualTypeOf<
      ((page: number) => void) | undefined
    >()
  })

  it("번호 접근성 이름은 페이지 번호로 만든다", () => {
    expectTypeOf<PaginationProps["pageLabel"]>().toEqualTypeOf<
      ((page: number) => string) | undefined
    >()
  })

  it("children은 받지 않고 nav 속성과 ref를 받는다", () => {
    expectTypeOf<PaginationProps>().not.toHaveProperty("children")
    expectTypeOf<PaginationProps>().toHaveProperty("aria-label")
    expectTypeOf<PaginationProps["ref"]>().toEqualTypeOf<
      Ref<HTMLElement> | undefined
    >()
  })

  it("Pagination의 props 타입이 PaginationProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof Pagination>
    >().toEqualTypeOf<PaginationProps>()
  })
})
