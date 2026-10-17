import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { TextAreaProps } from "./TextArea.tsx"

describe("TextAreaProps 타입", () => {
  it("네이티브 textarea 속성을 받는다", () => {
    expectTypeOf<TextAreaProps>().toHaveProperty("maxLength")
    expectTypeOf<TextAreaProps>().toHaveProperty("placeholder")
    expectTypeOf<TextAreaProps>().toHaveProperty("rows")
  })

  it("Field의 레이블과 도움말 props를 받는다", () => {
    expectTypeOf<TextAreaProps["label"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
    expectTypeOf<TextAreaProps["errorMessage"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("크기 변형이 없다", () => {
    expectTypeOf<TextAreaProps>().not.toHaveProperty("size")
  })
})
