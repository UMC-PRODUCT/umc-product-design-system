import { describe, expectTypeOf, it } from "vitest"

import type { NumericStepperProps } from "./NumericStepper.tsx"

describe("NumericStepperProps 타입", () => {
  it("value는 number | null | undefined이다", () => {
    expectTypeOf<NumericStepperProps["value"]>().toEqualTypeOf<
      number | null | undefined
    >()
  })

  it("onValueChange는 number | null을 받는다", () => {
    expectTypeOf<
      NonNullable<NumericStepperProps["onValueChange"]>
    >().parameters.toEqualTypeOf<[number | null]>()
  })

  it("min, max, step은 선택적 number이다", () => {
    expectTypeOf<NumericStepperProps["min"]>().toEqualTypeOf<
      number | undefined
    >()
    expectTypeOf<NumericStepperProps["max"]>().toEqualTypeOf<
      number | undefined
    >()
    expectTypeOf<NumericStepperProps["step"]>().toEqualTypeOf<
      number | undefined
    >()
  })
})
