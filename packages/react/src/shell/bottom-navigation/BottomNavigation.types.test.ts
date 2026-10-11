import { describe, expectTypeOf, it } from "vitest"

import type {
  BottomNavigationItemProps,
  BottomNavigationProps,
} from "./BottomNavigation.tsx"

describe("BottomNavigation types", () => {
  it("accepts ReactNode children", () => {
    expectTypeOf<BottomNavigationProps["children"]>().not.toBeNever()
  })

  it("className is optional", () => {
    expectTypeOf<BottomNavigationProps["className"]>().toEqualTypeOf<
      string | undefined
    >()
  })
})

describe("BottomNavigationItem types", () => {
  it("href is required string", () => {
    expectTypeOf<BottomNavigationItemProps["href"]>().toEqualTypeOf<string>()
  })

  it("label is required string", () => {
    expectTypeOf<BottomNavigationItemProps["label"]>().toEqualTypeOf<string>()
  })

  it("currentPath is optional string", () => {
    expectTypeOf<BottomNavigationItemProps["currentPath"]>().toEqualTypeOf<
      string | undefined
    >()
  })

  it("does not expose aria-current (omitted via Omit)", () => {
    expectTypeOf<BottomNavigationItemProps>().not.toHaveProperty("aria-current")
  })
})
