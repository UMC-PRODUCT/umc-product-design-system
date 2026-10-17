import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type {
  GuidanceMessageColor,
  GuidanceMessageProps,
} from "./GuidanceMessage.tsx"

describe("GuidanceMessageProps 타입", () => {
  it("color는 neutral, success, warning, error 네 가지다", () => {
    expectTypeOf<GuidanceMessageColor>().toEqualTypeOf<
      "neutral" | "success" | "warning" | "error"
    >()
    expectTypeOf<GuidanceMessageProps["color"]>().toEqualTypeOf<
      GuidanceMessageColor | undefined
    >()
  })

  it("문구는 ReactNode다", () => {
    expectTypeOf<GuidanceMessageProps["children"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("showIcon은 boolean이다", () => {
    expectTypeOf<GuidanceMessageProps["showIcon"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })
})
