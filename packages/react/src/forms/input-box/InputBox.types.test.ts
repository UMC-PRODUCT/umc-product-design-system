import { describe, expectTypeOf, it } from "vitest"

import type { InputBoxProps } from "./InputBox.tsx"

describe("InputBoxProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<InputBoxProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("invalid, disabled는 boolean을 받는다", () => {
    expectTypeOf<InputBoxProps["invalid"]>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<InputBoxProps["disabled"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("네이티브 div 속성을 받는다", () => {
    expectTypeOf<InputBoxProps>().toHaveProperty("onClick")
    expectTypeOf<InputBoxProps>().toHaveProperty("aria-label")
  })
})
