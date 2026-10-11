import { describe, expectTypeOf, it } from "vitest"

import {
  type ContextSwitcherOption,
  type ContextSwitcherProps,
} from "./ContextSwitcher.tsx"

describe("ContextSwitcherProps", () => {
  it("제네릭 V가 onValueChange 인자 타입에 반영된다", () => {
    type Roles = "admin" | "challenger" | "guest"
    expectTypeOf<ContextSwitcherProps<Roles>["onValueChange"]>().toEqualTypeOf<
      (value: Roles) => void
    >()
  })

  it("options의 value 타입이 V다", () => {
    type Roles = "admin" | "challenger"
    expectTypeOf<ContextSwitcherOption<Roles>["value"]>().toEqualTypeOf<Roles>()
  })

  it("value는 V 타입이다", () => {
    type Roles = "admin" | "challenger"
    expectTypeOf<ContextSwitcherProps<Roles>["value"]>().toEqualTypeOf<Roles>()
  })
})
