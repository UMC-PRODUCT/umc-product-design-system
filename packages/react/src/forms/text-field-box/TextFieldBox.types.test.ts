import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldBoxProps } from "./TextFieldBox.tsx"

describe("TextFieldBoxProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<TextFieldBoxProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("size가 xl 같은 없는 값은 타입 오류다", () => {
    type SizeType = TextFieldBoxProps["size"]
    expectTypeOf<"xl">().not.toMatchTypeOf<SizeType>()
  })

  it("네이티브 input 속성과 ref를 받는다", () => {
    expectTypeOf<TextFieldBoxProps>().toHaveProperty("name")
    expectTypeOf<TextFieldBoxProps>().toHaveProperty("onChange")
    expectTypeOf<TextFieldBoxProps>().toHaveProperty("placeholder")
    expectTypeOf<TextFieldBoxProps>().toHaveProperty("ref")
  })
})
