import { describe, expectTypeOf, it } from "vitest"

import {
  type SideNavigationItem,
  type SideNavigationLeaf,
  type SideNavigationProps,
} from "./SideNavigation.tsx"

describe("SideNavigationProps", () => {
  it("items는 SideNavigationItem 배열이다", () => {
    expectTypeOf<SideNavigationProps["items"]>().toEqualTypeOf<
      SideNavigationItem[]
    >()
  })

  it("SideNavigationItem은 children으로 SideNavigationLeaf 배열을 받는다", () => {
    expectTypeOf<SideNavigationItem["children"]>().toEqualTypeOf<
      SideNavigationLeaf[] | undefined
    >()
  })

  it("SideNavigationLeaf는 label과 href를 가진다", () => {
    expectTypeOf<SideNavigationLeaf>().toMatchTypeOf<{
      label: React.ReactNode
      href: string
    }>()
  })
})
