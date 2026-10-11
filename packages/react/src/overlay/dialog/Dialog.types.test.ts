import { describe, expectTypeOf, it } from "vitest"

import type { DialogProps } from "./Dialog.tsx"

describe("DialogProps", () => {
  it("confirmLabel은 ReactNode다", () => {
    expectTypeOf<DialogProps["confirmLabel"]>().not.toBeUndefined()
  })

  it("cancelLabel은 ReactNode이거나 undefined다", () => {
    expectTypeOf<DialogProps["cancelLabel"]>().toEqualTypeOf<
      import("react").ReactNode
    >()
  })

  it("open은 boolean이거나 undefined다", () => {
    expectTypeOf<DialogProps["open"]>().toEqualTypeOf<boolean | undefined>()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    type OnOpenChange = NonNullable<DialogProps["onOpenChange"]>
    expectTypeOf<OnOpenChange>().parameter(0).toEqualTypeOf<boolean>()
  })

  it("onConfirm은 인자 없이 호출된다", () => {
    type OnConfirm = NonNullable<DialogProps["onConfirm"]>
    expectTypeOf<OnConfirm>().parameters.toEqualTypeOf<[]>()
  })

  it("onCancel은 인자 없이 호출된다", () => {
    type OnCancel = NonNullable<DialogProps["onCancel"]>
    expectTypeOf<OnCancel>().parameters.toEqualTypeOf<[]>()
  })
})
