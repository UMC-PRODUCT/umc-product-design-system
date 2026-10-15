import { describe, expectTypeOf, it } from "vitest"

import type { AppDialogProps } from "./AppDialog.tsx"

describe("AppDialogProps", () => {
  it("confirmLabel은 ReactNode다", () => {
    expectTypeOf<AppDialogProps["confirmLabel"]>().not.toBeUndefined()
  })

  it("cancelLabel은 ReactNode이거나 undefined다", () => {
    expectTypeOf<AppDialogProps["cancelLabel"]>().toEqualTypeOf<
      import("react").ReactNode
    >()
  })

  it("open은 boolean이거나 undefined다", () => {
    expectTypeOf<AppDialogProps["open"]>().toEqualTypeOf<boolean | undefined>()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    type OnOpenChange = NonNullable<AppDialogProps["onOpenChange"]>
    expectTypeOf<OnOpenChange>().parameter(0).toEqualTypeOf<boolean>()
  })

  it("onConfirm은 인자 없이 호출된다", () => {
    type OnConfirm = NonNullable<AppDialogProps["onConfirm"]>
    expectTypeOf<OnConfirm>().parameters.toEqualTypeOf<[]>()
  })

  it("onCancel은 인자 없이 호출된다", () => {
    type OnCancel = NonNullable<AppDialogProps["onCancel"]>
    expectTypeOf<OnCancel>().parameters.toEqualTypeOf<[]>()
  })
})
