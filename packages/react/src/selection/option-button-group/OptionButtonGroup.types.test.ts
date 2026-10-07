import { describe, expectTypeOf, it } from "vitest"

import type {
  OptionButtonGroupProps,
  OptionItem,
} from "./OptionButtonGroup.tsx"

describe("OptionButtonGroupProps", () => {
  it("single의 onValueChange 인자는 V 타입이다", () => {
    type Props = OptionButtonGroupProps<"fe" | "be">
    type SingleProps = Extract<Props, { type?: "single" }>
    expectTypeOf<
      NonNullable<SingleProps["onValueChange"]>
    >().parameters.toEqualTypeOf<["fe" | "be"]>()
  })

  it("multiple의 value는 string[] 타입이다", () => {
    type Props = OptionButtonGroupProps<"a" | "b">
    type MultipleProps = Extract<Props, { type: "multiple" }>
    expectTypeOf<MultipleProps["value"]>().toEqualTypeOf<
      ("a" | "b")[] | undefined
    >()
  })

  it("multiple의 onValueChange 인자는 V[] 타입이다", () => {
    type Props = OptionButtonGroupProps<"x" | "y">
    type MultipleProps = Extract<Props, { type: "multiple" }>
    expectTypeOf<
      NonNullable<MultipleProps["onValueChange"]>
    >().parameters.toEqualTypeOf<[("x" | "y")[]]>()
  })

  it("없는 size는 타입 오류다", () => {
    type Props = OptionButtonGroupProps
    type Size = NonNullable<Extract<Props, { type?: "single" }>["size"]>
    expectTypeOf<Size>().toEqualTypeOf<"xl" | "sm" | "xs">()
  })

  it("없는 variant는 타입 오류다", () => {
    type Props = OptionButtonGroupProps
    type Variant = NonNullable<Extract<Props, { type?: "single" }>["variant"]>
    expectTypeOf<Variant>().toEqualTypeOf<"weak" | "strong">()
  })

  it("OptionItem은 value, label, disabled를 가진다", () => {
    expectTypeOf<OptionItem<"a">>().toHaveProperty("value")
    expectTypeOf<OptionItem<"a">>().toHaveProperty("label")
    expectTypeOf<OptionItem<"a">>().toHaveProperty("disabled")
  })
})
