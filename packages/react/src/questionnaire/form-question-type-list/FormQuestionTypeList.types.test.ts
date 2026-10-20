import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormQuestionTypeList,
  type FormQuestionTypeListProps,
  type FormQuestionTypeOption,
} from "./FormQuestionTypeList.tsx"

describe("FormQuestionTypeListProps 타입", () => {
  it("유형마다 값, 라벨, 아이콘을 받는다", () => {
    expectTypeOf<FormQuestionTypeOption>().toEqualTypeOf<{
      value: string
      label: ReactNode
      icon: ReactNode
    }>()
  })

  it("값 하나를 주고받는다", () => {
    expectTypeOf<FormQuestionTypeListProps["value"]>().toEqualTypeOf<
      string | null | undefined
    >()
    expectTypeOf<FormQuestionTypeListProps["onValueChange"]>().toEqualTypeOf<
      ((value: string) => void) | undefined
    >()
  })

  it("FormQuestionTypeList의 props 타입이 FormQuestionTypeListProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormQuestionTypeList>
    >().toEqualTypeOf<FormQuestionTypeListProps>()
  })
})
