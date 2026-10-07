import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldProps } from "./TextField.tsx"

describe("TextFieldProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<TextFieldProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("size가 xl 같은 없는 값은 타입 오류다", () => {
    type SizeType = TextFieldProps["size"]
    expectTypeOf<"xl">().not.toMatchTypeOf<SizeType>()
  })

  it("네이티브 input 속성과 ref를 받는다", () => {
    expectTypeOf<TextFieldProps>().toHaveProperty("name")
    expectTypeOf<TextFieldProps>().toHaveProperty("onChange")
    expectTypeOf<TextFieldProps>().toHaveProperty("placeholder")
    expectTypeOf<TextFieldProps>().toHaveProperty("ref")
  })
})
