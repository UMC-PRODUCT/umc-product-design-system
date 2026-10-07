import { describe, expectTypeOf, it } from "vitest"

import { type BreadcrumbItem, type PageHeaderProps } from "./PageHeader.tsx"

describe("PageHeaderProps", () => {
  it("title은 ReactNode다", () => {
    expectTypeOf<PageHeaderProps["title"]>().toEqualTypeOf<React.ReactNode>()
  })

  it("description은 선택 항목이다", () => {
    expectTypeOf<PageHeaderProps["description"]>().toEqualTypeOf<
      React.ReactNode | undefined
    >()
  })

  it("BreadcrumbItem의 href는 선택 항목이다", () => {
    expectTypeOf<BreadcrumbItem["href"]>().toEqualTypeOf<string | undefined>()
  })
})
