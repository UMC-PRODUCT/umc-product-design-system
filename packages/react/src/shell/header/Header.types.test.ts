import { describe, expectTypeOf, it } from "vitest"

import { type HeaderProps } from "./Header.tsx"

describe("HeaderProps", () => {
  it("mode는 'light' | 'dark' | undefined만 받는다", () => {
    expectTypeOf<HeaderProps["mode"]>().toEqualTypeOf<
      "light" | "dark" | undefined
    >()
  })

  it("navItems는 label과 href를 가진 배열이다", () => {
    expectTypeOf<NonNullable<HeaderProps["navItems"]>[number]>().toMatchTypeOf<{
      label: React.ReactNode
      href: string
    }>()
  })
})
