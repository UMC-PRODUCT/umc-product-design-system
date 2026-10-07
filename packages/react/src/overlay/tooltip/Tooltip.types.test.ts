import { describe, expectTypeOf, it } from "vitest"

import { type TooltipProps } from "./Tooltip.tsx"

describe("TooltipProps", () => {
  it("side는 피그마 값만 받는다", () => {
    expectTypeOf<TooltipProps["side"]>().toEqualTypeOf<
      "top" | "bottom" | "left" | "right" | undefined
    >()
  })

  it("mode는 dark 또는 light만 받는다", () => {
    expectTypeOf<TooltipProps["mode"]>().toEqualTypeOf<
      "dark" | "light" | undefined
    >()
  })

  it("size는 피그마 값만 받는다", () => {
    expectTypeOf<TooltipProps["size"]>().toEqualTypeOf<
      "xs" | "sm" | "md" | undefined
    >()
  })

  it("openOn은 hover 또는 click만 받는다", () => {
    expectTypeOf<TooltipProps["openOn"]>().toEqualTypeOf<
      "hover" | "click" | undefined
    >()
  })
})
