import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { PanelProps } from "./Panel.tsx"

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

describe("PanelProps", () => {
  it("반드시 넘길 값은 title과 children뿐이다", () => {
    expectTypeOf<RequiredKeys<PanelProps>>().toEqualTypeOf<
      "title" | "children"
    >()
  })

  it("control과 actions는 ReactNode다", () => {
    expectTypeOf<PanelProps["control"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<PanelProps["actions"]>().toEqualTypeOf<ReactNode>()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    expectTypeOf<NonNullable<PanelProps["onOpenChange"]>>()
      .parameter(0)
      .toEqualTypeOf<boolean>()
  })
})
