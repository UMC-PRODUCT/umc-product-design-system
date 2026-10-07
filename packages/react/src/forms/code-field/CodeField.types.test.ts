import { describe, expectTypeOf, it } from "vitest"

import type { CodeFieldProps } from "./CodeField.tsx"

describe("CodeFieldProps 타입", () => {
  it("length는 선택적 number이다", () => {
    expectTypeOf<CodeFieldProps["length"]>().toEqualTypeOf<number | undefined>()
  })

  it("onValueChange는 string을 받는다", () => {
    expectTypeOf<
      NonNullable<CodeFieldProps["onValueChange"]>
    >().parameters.toEqualTypeOf<[string]>()
  })

  it("onValueComplete는 string을 받는다", () => {
    expectTypeOf<
      NonNullable<CodeFieldProps["onValueComplete"]>
    >().parameters.toEqualTypeOf<[string]>()
  })

  it("mask는 선택적 boolean이다", () => {
    expectTypeOf<CodeFieldProps["mask"]>().toEqualTypeOf<boolean | undefined>()
  })
})
