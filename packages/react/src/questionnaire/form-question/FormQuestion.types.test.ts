import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { TextAreaProps } from "../../forms/text-area/TextArea.tsx"
import type { SectionHeaderLevel } from "../../shell/section-header/SectionHeader.tsx"
import { FormQuestion, type FormQuestionProps } from "./FormQuestion.tsx"
import { FormTextAnswer, type FormTextAnswerProps } from "./FormTextAnswer.tsx"

describe("FormQuestionProps 타입", () => {
  it("title과 children은 꼭 받는 ReactNode다", () => {
    expectTypeOf<FormQuestionProps["title"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormQuestionProps["children"]>().toEqualTypeOf<ReactNode>()
  })

  it("level은 SectionHeader의 제목 단계와 같다", () => {
    expectTypeOf<FormQuestionProps["level"]>().toEqualTypeOf<
      SectionHeaderLevel | undefined
    >()
  })

  it("FormQuestion의 props 타입이 FormQuestionProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormQuestion>
    >().toEqualTypeOf<FormQuestionProps>()
  })
})

describe("FormTextAnswerProps 타입", () => {
  it("TextArea와 같은 props를 받는다", () => {
    expectTypeOf<FormTextAnswerProps>().toEqualTypeOf<TextAreaProps>()
    expectTypeOf<
      ComponentProps<typeof FormTextAnswer>
    >().toEqualTypeOf<FormTextAnswerProps>()
  })
})
