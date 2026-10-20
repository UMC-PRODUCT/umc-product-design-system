import { ChartLegend, type ChartColor } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import {
  APPLICANT_SERIES,
  PART_SERIES,
  ROUND_SERIES,
} from "./chart-sample-data.ts"

export function ChartLegendDefault() {
  return (
    <div className="umc-example">
      <ChartLegend
        series={PART_SERIES}
        aria-label="파트"
        data-spec-id="chart-legend-list chart-legend-item"
      />
    </div>
  )
}

export function ChartLegendColors() {
  return (
    <div className="umc-example umc-example-stack">
      <ChartLegend
        series={[...PART_SERIES, APPLICANT_SERIES]}
        aria-label="파트와 지원자 수"
      />
      <ChartLegend
        series={[
          ...ROUND_SERIES,
          { key: "fourth", label: "4차 지원", color: "teal-200" },
          APPLICANT_SERIES,
        ]}
        aria-label="지원 차수"
        data-spec-id="chart-legend-teal"
      />
    </div>
  )
}

export function ChartLegendWrap() {
  return (
    <div className="umc-example">
      <div className="w-45">
        <ChartLegend
          series={[...PART_SERIES, APPLICANT_SERIES]}
          aria-label="파트와 지원자 수"
        />
      </div>
    </div>
  )
}

const FIGMA_COLORS: Readonly<Record<string, ChartColor>> = {
  "Teal-500": "teal-500",
  "Teal-400": "teal-400",
  "Teal-300": "teal-300",
  "Teal-200": "teal-200",
  "Gray-200": "reference",
  "Purple-500": "pm",
  "Pink-500": "design",
  "Yellow-500": "web-pe",
  "Blue-500": "mobile-pe",
}

export function ChartLegendAllVariants() {
  return (
    <VariantGrid
      set="chart-legend-item"
      rows={["Property 1"]}
      columns={[]}
      render={(variant: FigmaVariant) => (
        <ChartLegend
          series={[
            {
              key: variant.name,
              label: "라벨",
              color: lookup(FIGMA_COLORS, variant, "Property 1"),
            },
          ]}
        />
      )}
    />
  )
}
