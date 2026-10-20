import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { ChartColor, ChartSeries } from "../chart-series.ts"
import { ChartLegend, type ChartLegendProps } from "./ChartLegend.tsx"

describe("ChartLegendProps 타입", () => {
  it("색은 파트 4종, 청록 4단계, 비교값 중 하나다", () => {
    expectTypeOf<ChartColor>().toEqualTypeOf<
      | "pm"
      | "design"
      | "web-pe"
      | "mobile-pe"
      | "teal-500"
      | "teal-400"
      | "teal-300"
      | "teal-200"
      | "reference"
    >()
  })

  it("계열은 key, 이름, 색을 꼭 받는다", () => {
    expectTypeOf<ChartSeries>().toEqualTypeOf<{
      key: string
      label: ReactNode
      color: ChartColor
    }>()
    expectTypeOf<ChartLegendProps["series"]>().toEqualTypeOf<
      readonly ChartSeries[]
    >()
  })

  it("children은 받지 않는다", () => {
    expectTypeOf<ChartLegendProps>().not.toHaveProperty("children")
  })

  it("네이티브 ul 속성과 ref를 받는다", () => {
    expectTypeOf<ChartLegendProps>().toHaveProperty("aria-label")
    expectTypeOf<ChartLegendProps["ref"]>().toEqualTypeOf<
      Ref<HTMLUListElement> | undefined
    >()
  })

  it("ChartLegend의 props 타입이 ChartLegendProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ChartLegend>
    >().toEqualTypeOf<ChartLegendProps>()
  })
})
