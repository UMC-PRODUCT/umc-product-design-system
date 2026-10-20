import type { ComponentProps } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { FormQuestionTypeOption } from "../form-question-type-list/FormQuestionTypeList.tsx"
import {
  FormQuestionToolbar,
  type FormQuestionToolbarProps,
} from "./FormQuestionToolbar.tsx"

describe("FormQuestionToolbarProps 타입", () => {
  it("유형 목록은 FormQuestionTypeList와 같은 모양이다", () => {
    expectTypeOf<FormQuestionToolbarProps["items"]>().toEqualTypeOf<
      readonly FormQuestionTypeOption[]
    >()
  })

  it("열림 상태는 주고받고, 누른 유형은 값으로 넘긴다", () => {
    expectTypeOf<FormQuestionToolbarProps["onOpenChange"]>().toEqualTypeOf<
      ((open: boolean) => void) | undefined
    >()
    expectTypeOf<FormQuestionToolbarProps["onTypeSelect"]>().toEqualTypeOf<
      ((value: string) => void) | undefined
    >()
  })

  it("고른 표시를 두지 않으므로 value는 받지 않는다", () => {
    expectTypeOf<FormQuestionToolbarProps>().not.toHaveProperty("value")
  })

  it("FormQuestionToolbar의 props 타입이 FormQuestionToolbarProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormQuestionToolbar>
    >().toEqualTypeOf<FormQuestionToolbarProps>()
  })
})
