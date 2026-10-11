import { describe, expectTypeOf, it } from "vitest"

import type {
  TopNavigationButtonIconProps,
  TopNavigationButtonProps,
  TopNavigationButtonTextProps,
  TopNavigationProps,
} from "./TopNavigation.tsx"

describe("TopNavigation types", () => {
  it("accepts ReactNode as title", () => {
    expectTypeOf<TopNavigationProps["title"]>().not.toBeNever()
  })

  it("titleAlign is optional start|center", () => {
    expectTypeOf<TopNavigationProps["titleAlign"]>().toEqualTypeOf<
      "start" | "center" | undefined
    >()
  })

  it("back is optional", () => {
    expectTypeOf<TopNavigationProps["back"]>().not.toBeNever()
    const full: TopNavigationProps = { title: "홈" }
    expectTypeOf(full.back).toEqualTypeOf<
      { label?: string; onClick?: () => void; href?: string } | undefined
    >()
  })
})

describe("TopNavigationButton types", () => {
  it("icon variant requires aria-label", () => {
    expectTypeOf<
      TopNavigationButtonIconProps["aria-label"]
    >().toEqualTypeOf<string>()
  })

  it("icon variant disallows color prop", () => {
    expectTypeOf<TopNavigationButtonIconProps["color"]>().toEqualTypeOf<
      never | undefined
    >()
  })

  it("text variant accepts primary|neutral color", () => {
    expectTypeOf<TopNavigationButtonTextProps["color"]>().toEqualTypeOf<
      "primary" | "neutral" | undefined
    >()
  })

  it("union discriminates on variant field", () => {
    expectTypeOf<TopNavigationButtonProps>().toMatchTypeOf<
      TopNavigationButtonIconProps | TopNavigationButtonTextProps
    >()
  })
})
