import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldLineFieldProps } from "./TextFieldLineField.tsx"

describe("TextFieldLineFieldProps 타입", () => {
  it("invalid, disabled는 boolean을 받는다", () => {
    expectTypeOf<TextFieldLineFieldProps["invalid"]>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<TextFieldLineFieldProps["disabled"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("크기 prop이 없다", () => {
    expectTypeOf<TextFieldLineFieldProps>().not.toHaveProperty("size")
  })

  it("네이티브 div 속성을 받는다", () => {
    expectTypeOf<TextFieldLineFieldProps>().toHaveProperty("onClick")
    expectTypeOf<TextFieldLineFieldProps>().toHaveProperty("aria-label")
  })
})
