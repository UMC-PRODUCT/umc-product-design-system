import { describe, expectTypeOf, it } from "vitest"

import type { VerificationCodeFieldProps } from "./VerificationCodeField.tsx"

describe("VerificationCodeFieldProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<VerificationCodeFieldProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("timer는 ReactNode이다", () => {
    expectTypeOf<VerificationCodeFieldProps["timer"]>().toEqualTypeOf<
      import("react").ReactNode
    >()
  })

  it("네이티브 input 속성을 받는다", () => {
    expectTypeOf<VerificationCodeFieldProps>().toHaveProperty("placeholder")
    expectTypeOf<VerificationCodeFieldProps>().toHaveProperty("maxLength")
  })
})
