import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Bubble, type BubbleDirection, type BubbleProps } from "./Bubble.tsx"

describe("BubbleProps", () => {
  it("direction은 두 가지 값만 받는다", () => {
    expectTypeOf<BubbleProps["direction"]>().toEqualTypeOf<
      "incoming" | "outgoing" | undefined
    >()
  })

  it("children이 필수 ReactNode다", () => {
    expectTypeOf<Pick<BubbleProps, "children">>().not.toEqualTypeOf<{
      children?: ReactNode
    }>()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<BubbleProps>().toHaveProperty("aria-label")
    expectTypeOf<BubbleProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("BubbleDirection 타입이 올바르다", () => {
    expectTypeOf<BubbleDirection>().toEqualTypeOf<"incoming" | "outgoing">()
  })

  it("Bubble의 props 타입이 BubbleProps와 같다", () => {
    expectTypeOf<ComponentProps<typeof Bubble>>().toEqualTypeOf<BubbleProps>()
  })
})
