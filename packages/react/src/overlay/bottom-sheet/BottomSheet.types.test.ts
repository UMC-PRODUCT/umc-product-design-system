import { describe, expectTypeOf, it } from "vitest"

import type {
  BottomSheetActionsProps,
  BottomSheetProps,
} from "./BottomSheet.tsx"

describe("BottomSheetProps", () => {
  it("titleAlign은 start 또는 center만 받는다", () => {
    expectTypeOf<BottomSheetProps["titleAlign"]>().toEqualTypeOf<
      "start" | "center" | undefined
    >()
  })

  it("open은 boolean이거나 undefined다", () => {
    expectTypeOf<BottomSheetProps["open"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("onOpenChange는 boolean을 받는다", () => {
    type OnOpenChange = NonNullable<BottomSheetProps["onOpenChange"]>
    expectTypeOf<OnOpenChange>().parameter(0).toEqualTypeOf<boolean>()
  })

  it("children은 ReactNode다", () => {
    expectTypeOf<BottomSheetProps["children"]>().not.toBeUndefined()
  })
})

describe("BottomSheetActionsProps", () => {
  it("full 레이아웃은 secondary가 없다", () => {
    type FullLayout = Extract<BottomSheetActionsProps, { layout: "full" }>
    expectTypeOf<FullLayout>().not.toMatchTypeOf<{ secondary: unknown }>()
  })

  it("stacked 레이아웃은 secondary가 필수다", () => {
    type StackedLayout = Extract<BottomSheetActionsProps, { layout: "stacked" }>
    expectTypeOf<StackedLayout["secondary"]>().not.toBeUndefined()
  })

  it("equal 레이아웃은 secondary가 필수다", () => {
    type EqualLayout = Extract<BottomSheetActionsProps, { layout: "equal" }>
    expectTypeOf<EqualLayout["secondary"]>().not.toBeUndefined()
  })

  it("emphasis 레이아웃은 secondary가 필수다", () => {
    type EmphasisLayout = Extract<
      BottomSheetActionsProps,
      { layout: "emphasis" }
    >
    expectTypeOf<EmphasisLayout["secondary"]>().not.toBeUndefined()
  })

  it("primary-top 레이아웃은 secondary가 필수다", () => {
    type PrimaryTopLayout = Extract<
      BottomSheetActionsProps,
      { layout: "primary-top" }
    >
    expectTypeOf<PrimaryTopLayout["secondary"]>().not.toBeUndefined()
  })
})
