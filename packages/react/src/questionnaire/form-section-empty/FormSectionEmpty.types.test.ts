import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormSectionEmpty,
  type FormSectionEmptyProps,
} from "./FormSectionEmpty.tsx"

describe("FormSectionEmptyProps 타입", () => {
  it("끄는 동안 놓을 수 있는 자리인지는 boolean으로 받는다", () => {
    expectTypeOf<FormSectionEmptyProps["dropTarget"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("문구는 넘기지 않아도 된다", () => {
    expectTypeOf<FormSectionEmptyProps["children"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("FormSectionEmpty의 props 타입이 FormSectionEmptyProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormSectionEmpty>
    >().toEqualTypeOf<FormSectionEmptyProps>()
  })
})
