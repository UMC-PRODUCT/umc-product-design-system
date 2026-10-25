import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldLineProps } from "./TextFieldLine.tsx"

describe("TextFieldLineProps 타입", () => {
  it("크기와 단위 prop이 없다", () => {
    expectTypeOf<TextFieldLineProps>().not.toHaveProperty("size")
    expectTypeOf<TextFieldLineProps>().not.toHaveProperty("unit")
  })

  it("clearable은 boolean을 받는다", () => {
    expectTypeOf<TextFieldLineProps["clearable"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("네이티브 input 속성과 ref를 받는다", () => {
    expectTypeOf<TextFieldLineProps>().toHaveProperty("name")
    expectTypeOf<TextFieldLineProps>().toHaveProperty("onChange")
    expectTypeOf<TextFieldLineProps>().toHaveProperty("placeholder")
    expectTypeOf<TextFieldLineProps>().toHaveProperty("ref")
  })
})
