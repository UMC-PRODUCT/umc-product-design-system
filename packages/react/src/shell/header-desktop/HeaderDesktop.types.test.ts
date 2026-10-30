import { describe, expectTypeOf, it } from "vitest"

import { type HeaderDesktopProps } from "./HeaderDesktop.tsx"

describe("HeaderDesktopProps", () => {
  it("mode는 'light' | 'dark' | undefined만 받는다", () => {
    expectTypeOf<HeaderDesktopProps["mode"]>().toEqualTypeOf<
      "light" | "dark" | undefined
    >()
  })

  it("navItems는 label과 href를 가진 배열이다", () => {
    expectTypeOf<
      NonNullable<HeaderDesktopProps["navItems"]>[number]
    >().toMatchTypeOf<{
      label: React.ReactNode
      href: string
    }>()
  })
})
