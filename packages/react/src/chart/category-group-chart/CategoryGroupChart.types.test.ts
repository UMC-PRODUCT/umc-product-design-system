import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { ChartColor, ChartSeries } from "../chart-series.ts"
import type { ChartTooltipContent } from "../chart-tooltip/ChartTooltip.tsx"
import {
  CategoryGroupChart,
  type CategoryGroupChartColor,
  type CategoryGroupChartGroup,
  type CategoryGroupChartProps,
  type CategoryGroupChartSeries,
} from "./CategoryGroupChart.tsx"

describe("CategoryGroupChartProps 타입", () => {
  it("막대 색은 피그마 막대가 있는 파트 4종과 청록 3단계다", () => {
    expectTypeOf<CategoryGroupChartColor>().toEqualTypeOf<
      | "pm"
      | "design"
      | "web-pe"
      | "mobile-pe"
      | "teal-500"
      | "teal-400"
      | "teal-300"
    >()
    expectTypeOf<CategoryGroupChartColor>().toExtend<ChartColor>()
  })

  it("계열은 범례에 그대로 넘길 수 있다", () => {
    expectTypeOf<CategoryGroupChartSeries>().toExtend<ChartSeries>()
  })

  it("묶음은 key, 이름, 계열별 값을 꼭 받고 비교값과 툴팁 내용은 고를 수 있다", () => {
    expectTypeOf<CategoryGroupChartGroup>().toEqualTypeOf<{
      key: string
      label: ReactNode
      values: Readonly<Record<string, number>>
      references?: Readonly<Record<string, number>>
      tooltip?: ChartTooltipContent
    }>()
  })

  it("max와 formatValue는 고를 수 있다", () => {
    expectTypeOf<CategoryGroupChartProps["max"]>().toEqualTypeOf<
      number | undefined
    >()
    expectTypeOf<CategoryGroupChartProps["formatValue"]>().toEqualTypeOf<
      ((value: number) => ReactNode) | undefined
    >()
  })

  it("children은 받지 않고 ref는 목록에 붙는다", () => {
    expectTypeOf<CategoryGroupChartProps>().not.toHaveProperty("children")
    expectTypeOf<CategoryGroupChartProps["ref"]>().toEqualTypeOf<
      Ref<HTMLUListElement> | undefined
    >()
  })

  it("CategoryGroupChart의 props 타입이 CategoryGroupChartProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof CategoryGroupChart>
    >().toEqualTypeOf<CategoryGroupChartProps>()
  })
})
