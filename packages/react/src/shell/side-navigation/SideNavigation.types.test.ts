import { describe, expectTypeOf, it } from "vitest"

import {
  type SideNavigationGroup,
  type SideNavigationItem,
  type SideNavigationLeaf,
  type SideNavigationLink,
  type SideNavigationProps,
} from "./SideNavigation.tsx"

describe("SideNavigationProps", () => {
  it("items는 SideNavigationItem 배열이다", () => {
    expectTypeOf<SideNavigationProps["items"]>().toEqualTypeOf<
      SideNavigationItem[]
    >()
  })

  it("SideNavigationItem은 링크 항목 또는 그룹 항목이다", () => {
    expectTypeOf<SideNavigationItem>().toEqualTypeOf<
      SideNavigationLink | SideNavigationGroup
    >()
  })

  it("그룹은 SideNavigationLeaf 배열을 children으로 반드시 가진다", () => {
    expectTypeOf<SideNavigationGroup["children"]>().toEqualTypeOf<
      SideNavigationLeaf[]
    >()
  })

  it("href도 children도 없는 항목은 받지 않는다", () => {
    expectTypeOf<{ label: string }>().not.toMatchTypeOf<SideNavigationItem>()
  })

  it("SideNavigationLeaf는 label과 href를 가진다", () => {
    expectTypeOf<SideNavigationLeaf>().toMatchTypeOf<{
      label: React.ReactNode
      href: string
    }>()
  })
})
