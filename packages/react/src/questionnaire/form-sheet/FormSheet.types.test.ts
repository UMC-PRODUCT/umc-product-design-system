import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { FormSheet, type FormSheetProps } from "./FormSheet.tsx"

describe("FormSheetProps 타입", () => {
  it("머리와 본문은 필수다", () => {
    expectTypeOf<FormSheetProps["header"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormSheetProps["children"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormSheetProps>().toHaveProperty("header")
    expectTypeOf<Pick<FormSheetProps, "header">>().not.toEqualTypeOf<{
      header?: ReactNode
    }>()
  })

  it("오른쪽 위 조작, 설명, 아래 조작 칸은 선택이다", () => {
    expectTypeOf<FormSheetProps["action"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormSheetProps["description"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormSheetProps["control"]>().toEqualTypeOf<ReactNode>()
  })

  it("FormSheet의 props 타입이 FormSheetProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormSheet>
    >().toEqualTypeOf<FormSheetProps>()
  })
})
