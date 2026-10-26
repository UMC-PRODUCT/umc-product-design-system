import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { DialogColor, DialogProps } from "./Dialog.tsx"

type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

describe("DialogProps", () => {
  it("color는 primary, neutral, error 세 가지다", () => {
    expectTypeOf<DialogColor>().toEqualTypeOf<"brand" | "neutral" | "error">()
    expectTypeOf<DialogProps["color"]>().toEqualTypeOf<
      DialogColor | undefined
    >()
  })

  it("반드시 넘길 값은 title과 confirmLabel뿐이다", () => {
    expectTypeOf<RequiredKeys<DialogProps>>().toEqualTypeOf<
      "title" | "confirmLabel"
    >()
  })

  it("icon과 children은 ReactNode다", () => {
    expectTypeOf<DialogProps["icon"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<DialogProps["children"]>().toEqualTypeOf<ReactNode>()
  })

  it("onConfirm과 onCancel은 인자 없이 호출된다", () => {
    expectTypeOf<
      NonNullable<DialogProps["onConfirm"]>
    >().parameters.toEqualTypeOf<[]>()
    expectTypeOf<
      NonNullable<DialogProps["onCancel"]>
    >().parameters.toEqualTypeOf<[]>()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    expectTypeOf<NonNullable<DialogProps["onOpenChange"]>>()
      .parameter(0)
      .toEqualTypeOf<boolean>()
  })
})
