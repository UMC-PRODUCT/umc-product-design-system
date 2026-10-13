import type { ComponentProps, CSSProperties, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { Skeleton, type SkeletonProps } from "./Skeleton.tsx"

describe("SkeletonProps", () => {
  it("width와 height는 CSS 길이 값을 받는다", () => {
    expectTypeOf<SkeletonProps["width"]>().toEqualTypeOf<
      CSSProperties["width"] | undefined
    >()
    expectTypeOf<SkeletonProps["height"]>().toEqualTypeOf<
      CSSProperties["height"] | undefined
    >()
  })

  it("children을 받지 않는다", () => {
    expectTypeOf<SkeletonProps>().not.toHaveProperty("children")
  })

  it("네이티브 span 속성과 ref를 받는다", () => {
    expectTypeOf<SkeletonProps>().toHaveProperty("className")
    expectTypeOf<SkeletonProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("Skeleton의 props 타입이 SkeletonProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof Skeleton>
    >().toEqualTypeOf<SkeletonProps>()
  })
})
