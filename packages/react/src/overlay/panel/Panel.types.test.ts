import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { PanelCloseButtonProps, PanelProps } from "./Panel.tsx"

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

describe("PanelProps", () => {
  it("반드시 넘길 값은 title과 children뿐이다", () => {
    expectTypeOf<RequiredKeys<PanelProps>>().toEqualTypeOf<
      "title" | "children"
    >()
  })

  it("headSlot, control, actions는 ReactNode다", () => {
    expectTypeOf<PanelProps["headSlot"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<PanelProps["control"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<PanelProps["actions"]>().toEqualTypeOf<ReactNode>()
  })

  it("PanelCloseButton은 반드시 넘길 값이 없고 label은 문자열이다", () => {
    expectTypeOf<RequiredKeys<PanelCloseButtonProps>>().toEqualTypeOf<never>()
    expectTypeOf<PanelCloseButtonProps["label"]>().toEqualTypeOf<
      string | undefined
    >()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    expectTypeOf<NonNullable<PanelProps["onOpenChange"]>>()
      .parameter(0)
      .toEqualTypeOf<boolean>()
  })
})
