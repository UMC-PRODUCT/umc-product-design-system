import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { DraggableChip, type DraggableChipProps } from "./DraggableChip.tsx"

describe("DraggableChipProps", () => {
  it("variant와 color는 피그마 값만 받는다", () => {
    expectTypeOf<DraggableChipProps["variant"]>().toEqualTypeOf<
      "weak" | "fill" | undefined
    >()
    expectTypeOf<DraggableChipProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
  })

  it("color가 문자열 타입이 아니라 DraggableChipColor 유니언 타입이다", () => {
    expectTypeOf<DraggableChipProps["color"]>().not.toEqualTypeOf<string>()
    expectTypeOf<DraggableChipProps["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<DraggableChipProps>().toHaveProperty("onPointerDown")
    expectTypeOf<DraggableChipProps>().toHaveProperty("tabIndex")
    expectTypeOf<DraggableChipProps>().toHaveProperty("style")
    expectTypeOf<DraggableChipProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("DraggableChip의 props 타입이 DraggableChipProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof DraggableChip>
    >().toEqualTypeOf<DraggableChipProps>()
  })
})
