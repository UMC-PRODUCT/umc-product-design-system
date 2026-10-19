import type { ComponentProps, ComponentPropsWithRef, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormQuestionEditor,
  type FormQuestionEditorProps,
} from "./FormQuestionEditor.tsx"

describe("FormQuestionEditorProps 타입", () => {
  it("이동 핸들에는 type과 children을 뺀 버튼 props를 넘긴다", () => {
    expectTypeOf<FormQuestionEditorProps["dragHandleProps"]>().toEqualTypeOf<
      Omit<ComponentPropsWithRef<"button">, "type" | "children"> | undefined
    >()
  })

  it("필수 항목과 질문 사용은 boolean으로 주고받는다", () => {
    expectTypeOf<FormQuestionEditorProps["onRequiredChange"]>().toEqualTypeOf<
      ((required: boolean) => void) | undefined
    >()
    expectTypeOf<
      FormQuestionEditorProps["onQuestionEnabledChange"]
    >().toEqualTypeOf<((enabled: boolean) => void) | undefined>()
  })

  it("질문 본문은 꼭 받는다", () => {
    expectTypeOf<
      FormQuestionEditorProps["children"]
    >().toEqualTypeOf<ReactNode>()
  })

  it("FormQuestionEditor의 props 타입이 FormQuestionEditorProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormQuestionEditor>
    >().toEqualTypeOf<FormQuestionEditorProps>()
  })
})
