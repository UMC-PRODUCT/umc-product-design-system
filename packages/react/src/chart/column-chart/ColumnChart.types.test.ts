import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  ColumnChart,
  type ColumnChartItem,
  type ColumnChartMode,
  type ColumnChartProps,
} from "./ColumnChart.tsx"

describe("ColumnChartProps 타입", () => {
  it("mode는 피그마 Appearance 3종이다", () => {
    expectTypeOf<ColumnChartMode>().toEqualTypeOf<
      "neutral" | "primary-weak" | "primary-strong"
    >()
  })

  it("항목은 key, 이름, 값을 꼭 받고 mode는 고를 수 있다", () => {
    expectTypeOf<ColumnChartItem>().toEqualTypeOf<{
      key: string
      label: ReactNode
      value: number
      mode?: ColumnChartMode
    }>()
  })

  it("max와 formatValue는 고를 수 있다", () => {
    expectTypeOf<ColumnChartProps["max"]>().toEqualTypeOf<number | undefined>()
    expectTypeOf<ColumnChartProps["formatValue"]>().toEqualTypeOf<
      ((value: number) => ReactNode) | undefined
    >()
  })

  it("children은 받지 않고 ref는 목록에 붙는다", () => {
    expectTypeOf<ColumnChartProps>().not.toHaveProperty("children")
    expectTypeOf<ColumnChartProps["ref"]>().toEqualTypeOf<
      Ref<HTMLUListElement> | undefined
    >()
  })

  it("ColumnChart의 props 타입이 ColumnChartProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ColumnChart>
    >().toEqualTypeOf<ColumnChartProps>()
  })
})
