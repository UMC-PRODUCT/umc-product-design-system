import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  ProgressSummary,
  type ProgressSummaryProps,
} from "./ProgressSummary.tsx"

describe("ProgressSummaryProps 타입", () => {
  it("label은 꼭 받는 ReactNode다", () => {
    expectTypeOf<ProgressSummaryProps["label"]>().toEqualTypeOf<ReactNode>()
  })

  it("value와 max는 꼭 받는 개수다", () => {
    expectTypeOf<ProgressSummaryProps["value"]>().toEqualTypeOf<number>()
    expectTypeOf<ProgressSummaryProps["max"]>().toEqualTypeOf<number>()
  })

  it("children은 받지 않는다", () => {
    expectTypeOf<ProgressSummaryProps>().not.toHaveProperty("children")
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<ProgressSummaryProps>().toHaveProperty("aria-describedby")
    expectTypeOf<ProgressSummaryProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("ProgressSummary의 props 타입이 ProgressSummaryProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ProgressSummary>
    >().toEqualTypeOf<ProgressSummaryProps>()
  })
})
