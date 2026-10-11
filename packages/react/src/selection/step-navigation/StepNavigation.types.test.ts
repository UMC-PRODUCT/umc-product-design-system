import { describe, expectTypeOf, it } from "vitest"

import type { StepNavigationProps } from "./StepNavigation.tsx"

describe("StepNavigationProps", () => {
  it("steps는 ReactNode 배열이다", () => {
    expectTypeOf<StepNavigationProps["steps"]>().toEqualTypeOf<
      import("react").ReactNode[]
    >()
  })

  it("currentStep은 number 타입이다", () => {
    expectTypeOf<StepNavigationProps["currentStep"]>().toEqualTypeOf<number>()
  })

  it("aria-label을 받는다", () => {
    expectTypeOf<StepNavigationProps>().toHaveProperty("aria-label")
  })
})
