import { describe, expectTypeOf, it } from "vitest"

import type { FieldOwnProps, FieldProps } from "./Field.tsx"

describe("FieldProps 타입", () => {
  it("captionColor는 neutral 또는 success만 받는다", () => {
    expectTypeOf<FieldOwnProps["captionColor"]>().toEqualTypeOf<
      "neutral" | "success" | undefined
    >()
  })

  it("captionSize는 md 또는 lg만 받는다", () => {
    expectTypeOf<FieldOwnProps["captionSize"]>().toEqualTypeOf<
      "md" | "lg" | undefined
    >()
  })

  it("FieldProps는 disabled, className, children을 가진다", () => {
    expectTypeOf<FieldProps>().toHaveProperty("disabled")
    expectTypeOf<FieldProps>().toHaveProperty("className")
    expectTypeOf<FieldProps>().toHaveProperty("children")
  })
})
