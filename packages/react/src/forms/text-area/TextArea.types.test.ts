import { describe, expectTypeOf, it } from "vitest"

import type { TextAreaProps } from "./TextArea.tsx"

describe("TextAreaProps 타입", () => {
  it("size는 lg 또는 md만 받는다", () => {
    expectTypeOf<TextAreaProps["size"]>().toEqualTypeOf<
      "lg" | "md" | undefined
    >()
  })

  it("네이티브 textarea 속성을 받는다", () => {
    expectTypeOf<TextAreaProps>().toHaveProperty("rows")
    expectTypeOf<TextAreaProps>().toHaveProperty("maxLength")
    expectTypeOf<TextAreaProps>().toHaveProperty("placeholder")
  })
})
