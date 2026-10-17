import { describe, expectTypeOf, it } from "vitest"

import type { TextFieldAreaProps } from "./TextFieldArea.tsx"

describe("TextFieldAreaProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<TextFieldAreaProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("네이티브 textarea 속성을 받는다", () => {
    expectTypeOf<TextFieldAreaProps>().toHaveProperty("rows")
    expectTypeOf<TextFieldAreaProps>().toHaveProperty("maxLength")
    expectTypeOf<TextFieldAreaProps>().toHaveProperty("placeholder")
  })
})
