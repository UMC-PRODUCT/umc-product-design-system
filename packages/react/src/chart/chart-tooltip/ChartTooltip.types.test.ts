import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { ChartColor } from "../chart-series.ts"
import {
  ChartTooltip,
  type ChartTooltipContent,
  type ChartTooltipItem,
  type ChartTooltipProps,
} from "./ChartTooltip.tsx"

describe("ChartTooltipProps 타입", () => {
  it("title은 꼭 받는 ReactNode다", () => {
    expectTypeOf<ChartTooltipProps["title"]>().toEqualTypeOf<ReactNode>()
  })

  it("항목은 key, 이름, 색, 값을 꼭 받고 비교값은 고를 수 있다", () => {
    expectTypeOf<ChartTooltipItem>().toEqualTypeOf<{
      key: string
      label: ReactNode
      color: ChartColor
      value: ReactNode
      reference?: ReactNode
    }>()
  })

  it("차트가 넘기는 내용은 제목 없이 모두 고를 수 있다", () => {
    expectTypeOf<ChartTooltipContent>().toEqualTypeOf<{
      summary?: ReactNode
      referenceSummary?: ReactNode
      items?: readonly ChartTooltipItem[]
      caption?: ReactNode
    }>()
  })

  it("children은 받지 않고 네이티브 title 속성 대신 제목을 받는다", () => {
    expectTypeOf<ChartTooltipProps>().not.toHaveProperty("children")
    expectTypeOf<ChartTooltipProps["title"]>().not.toEqualTypeOf<
      string | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<ChartTooltipProps>().toHaveProperty("aria-label")
    expectTypeOf<ChartTooltipProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("ChartTooltip의 props 타입이 ChartTooltipProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ChartTooltip>
    >().toEqualTypeOf<ChartTooltipProps>()
  })
})
