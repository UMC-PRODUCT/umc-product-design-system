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

  it("validationType은 숫자, 영문, 영문과 숫자 중 하나이다", () => {
    expectTypeOf<CodeFieldProps["validationType"]>().toEqualTypeOf<
      "numeric" | "alpha" | "alphanumeric" | undefined
    >()
  })

  it("normalizeValue는 string을 받아 string을 돌려준다", () => {
    expectTypeOf<NonNullable<CodeFieldProps["normalizeValue"]>>().toEqualTypeOf<
      (value: string) => string
    >()
  })

  it("mask는 선택적 boolean이다", () => {
    expectTypeOf<CodeFieldProps["mask"]>().toEqualTypeOf<boolean | undefined>()
  })
})
