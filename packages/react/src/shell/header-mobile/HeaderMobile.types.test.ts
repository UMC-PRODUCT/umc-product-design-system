import { describe, expectTypeOf, it } from "vitest"

import type { NavItem } from "../nav-item/nav-item.ts"
import type { HeaderDesktopProps } from "../header-desktop/HeaderDesktop.tsx"
import { type HeaderMobileProps } from "./HeaderMobile.tsx"

describe("HeaderMobileProps", () => {
  it("mode는 'light' | 'dark' | undefined만 받는다", () => {
    expectTypeOf<HeaderMobileProps["mode"]>().toEqualTypeOf<
      "light" | "dark" | undefined
    >()
  })

  it("navItems는 HeaderDesktop과 같은 NavItem 배열이다", () => {
    expectTypeOf<HeaderMobileProps["navItems"]>().toEqualTypeOf<
      NavItem[] | undefined
    >()
    expectTypeOf<HeaderMobileProps["navItems"]>().toEqualTypeOf<
      HeaderDesktopProps["navItems"]
    >()
  })

  it("onOpenChange는 다음 열림 상태를 받는다", () => {
    expectTypeOf<HeaderMobileProps["onOpenChange"]>().toEqualTypeOf<
      ((open: boolean) => void) | undefined
    >()
  })
})
