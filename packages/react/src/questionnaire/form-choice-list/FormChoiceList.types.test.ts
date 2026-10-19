import type { ComponentProps } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormChoiceList,
  type FormChoiceListProps,
  type FormMultipleChoiceListProps,
  type FormSingleChoiceListProps,
} from "./FormChoiceList.tsx"

describe("FormChoiceListProps 타입", () => {
  it("type이 single이면 값 하나를 주고받는다", () => {
    expectTypeOf<FormSingleChoiceListProps["value"]>().toEqualTypeOf<
      string | null | undefined
    >()
    expectTypeOf<FormSingleChoiceListProps["onValueChange"]>().toEqualTypeOf<
      ((value: string) => void) | undefined
    >()
  })

  it("type이 multiple이면 값 배열을 주고받는다", () => {
    expectTypeOf<FormMultipleChoiceListProps["value"]>().toEqualTypeOf<
      readonly string[] | undefined
    >()
    expectTypeOf<FormMultipleChoiceListProps["onValueChange"]>().toEqualTypeOf<
      ((value: string[]) => void) | undefined
    >()
  })

  it("type은 single과 multiple만 받는다", () => {
    expectTypeOf<FormChoiceListProps["type"]>().toEqualTypeOf<
      "single" | "multiple"
    >()
  })

  it("FormChoiceList의 props 타입이 FormChoiceListProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormChoiceList>
    >().toEqualTypeOf<FormChoiceListProps>()
  })
})
