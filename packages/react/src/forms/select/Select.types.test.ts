import { describe, expectTypeOf, it } from "vitest"

import type { SelectOption, SelectProps } from "./Select.tsx"

describe("Select 제네릭 타입", () => {
  it("SelectOption의 value 타입이 V에 바인딩된다", () => {
    type Fruit = "apple" | "banana"
    expectTypeOf<SelectOption<Fruit>["value"]>().toEqualTypeOf<Fruit>()
  })

  it("onValueChange 인자 타입이 V에 반영된다", () => {
    type Fruit = "apple" | "banana"
    expectTypeOf<
      NonNullable<SelectProps<Fruit>["onValueChange"]>
    >().parameters.toEqualTypeOf<[Fruit | null]>()
  })

  it("기본 V는 string이다", () => {
    expectTypeOf<SelectOption["value"]>().toEqualTypeOf<string>()
  })

  it("itemSize는 xs, sm, md만 받는다", () => {
    expectTypeOf<SelectProps["itemSize"]>().toEqualTypeOf<
      "xs" | "sm" | "md" | undefined
    >()
  })

  it("itemLayout은 default와 inline만 받는다", () => {
    expectTypeOf<SelectProps["itemLayout"]>().toEqualTypeOf<
      "default" | "inline" | undefined
    >()
  })

  it("inline 배치는 피그마처럼 Xs 항목에서만 받는다", () => {
    expectTypeOf<{
      options: SelectOption[]
      itemSize: "sm"
      itemLayout: "inline"
    }>().not.toMatchTypeOf<SelectProps>()
    expectTypeOf<{
      options: SelectOption[]
      itemSize: "xs"
      itemLayout: "inline"
    }>().toMatchTypeOf<SelectProps>()
  })
})
