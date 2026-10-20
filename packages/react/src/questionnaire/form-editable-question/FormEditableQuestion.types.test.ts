import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormEditableQuestion,
  type FormEditableQuestionProps,
} from "./FormEditableQuestion.tsx"

describe("FormEditableQuestionProps 타입", () => {
  it("제목과 설명 입력에 네이티브 type은 넘기지 않는다", () => {
    expectTypeOf<
      NonNullable<FormEditableQuestionProps["titleProps"]>
    >().not.toHaveProperty("type")
    expectTypeOf<
      NonNullable<FormEditableQuestionProps["descriptionProps"]>
    >().not.toHaveProperty("type")
  })

  it("답 미리보기는 꼭 받는다", () => {
    expectTypeOf<
      FormEditableQuestionProps["children"]
    >().toEqualTypeOf<ReactNode>()
  })

  it("FormEditableQuestion의 props 타입이 FormEditableQuestionProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormEditableQuestion>
    >().toEqualTypeOf<FormEditableQuestionProps>()
  })
})
