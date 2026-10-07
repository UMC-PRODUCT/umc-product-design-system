import { describe, expectTypeOf, it } from "vitest"

import type { SegmentedControlProps } from "./SegmentedControl.tsx"

describe("SegmentedControlProps", () => {
  it("items 배열의 value는 V 타입이다", () => {
    type Props = SegmentedControlProps<"a" | "b">
    expectTypeOf<Props["items"]>().toEqualTypeOf<
      Array<{
        value: "a" | "b"
        label: import("react").ReactNode
        "data-spec-id"?: string
      }>
    >()
  })

  it("onValueChange의 인자는 V 타입이다", () => {
    type Props = SegmentedControlProps<"a" | "b">
    expectTypeOf<
      NonNullable<Props["onValueChange"]>
    >().parameters.toEqualTypeOf<["a" | "b"]>()
  })

  it("value와 defaultValue는 V | undefined 타입이다", () => {
    type Props = SegmentedControlProps<"x">
    expectTypeOf<Props["value"]>().toEqualTypeOf<"x" | undefined>()
    expectTypeOf<Props["defaultValue"]>().toEqualTypeOf<"x" | undefined>()
  })
})
