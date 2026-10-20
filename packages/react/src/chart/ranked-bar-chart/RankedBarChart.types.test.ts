import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { ChartTooltipContent } from "../chart-tooltip/ChartTooltip.tsx"
import {
  RankedBarChart,
  type RankedBarChartHeightBy,
  type RankedBarChartItem,
  type RankedBarChartProps,
} from "./RankedBarChart.tsx"

describe("RankedBarChartProps 타입", () => {
  it("높이 기준은 값 또는 순위다", () => {
    expectTypeOf<RankedBarChartHeightBy>().toEqualTypeOf<"value" | "rank">()
  })

  it("항목은 key, 이름, 값을 꼭 받고 비교값과 툴팁 내용은 고를 수 있다", () => {
    expectTypeOf<RankedBarChartItem>().toEqualTypeOf<{
      key: string
      label: ReactNode
      value: number
      reference?: number
      tooltip?: ChartTooltipContent
    }>()
  })

  it("단위, max, 높이 기준, formatValue는 고를 수 있다", () => {
    expectTypeOf<RankedBarChartProps["unit"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<RankedBarChartProps["max"]>().toEqualTypeOf<
      number | undefined
    >()
    expectTypeOf<RankedBarChartProps["heightBy"]>().toEqualTypeOf<
      RankedBarChartHeightBy | undefined
    >()
    expectTypeOf<RankedBarChartProps["formatValue"]>().toEqualTypeOf<
      ((value: number) => ReactNode) | undefined
    >()
  })

  it("children은 받지 않고 ref는 목록에 붙는다", () => {
    expectTypeOf<RankedBarChartProps>().not.toHaveProperty("children")
    expectTypeOf<RankedBarChartProps["ref"]>().toEqualTypeOf<
      Ref<HTMLUListElement> | undefined
    >()
  })

  it("RankedBarChart의 props 타입이 RankedBarChartProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof RankedBarChart>
    >().toEqualTypeOf<RankedBarChartProps>()
  })
})
