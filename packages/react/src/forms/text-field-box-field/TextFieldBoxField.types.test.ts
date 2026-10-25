import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldBoxFieldProps } from "./TextFieldBoxField.tsx"

describe("TextFieldBoxFieldProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<TextFieldBoxFieldProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("invalid, disabled는 boolean을 받는다", () => {
    expectTypeOf<TextFieldBoxFieldProps["invalid"]>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<TextFieldBoxFieldProps["disabled"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("네이티브 div 속성을 받는다", () => {
    expectTypeOf<TextFieldBoxFieldProps>().toHaveProperty("onClick")
    expectTypeOf<TextFieldBoxFieldProps>().toHaveProperty("aria-label")
  })
})
