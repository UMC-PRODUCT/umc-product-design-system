import {
  ChartLegend,
  RankedBarChart,
  type RankedBarChartHeightBy,
  type RankedBarChartItem,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { APPLICANT_SERIES } from "./chart-sample-data.ts"

const APPLIED: readonly RankedBarChartItem[] = [
  { key: "neon", label: "Neon", value: 100 },
  { key: "chromium", label: "Chromium", value: 89 },
  { key: "platinum", label: "Platinum", value: 71 },
  { key: "cassiopeia", label: "Cassiopeia", value: 60 },
  { key: "nova", label: "Nova", value: 30 },
  { key: "orion", label: "Orion", value: 21 },
  { key: "aurora", label: "Aurora", value: 4 },
  { key: "titan", label: "Titan", value: 4 },
  { key: "lumen", label: "Lumen", value: 1 },
  { key: "vega", label: "Vega", value: 0 },
]

const EVALUATION: readonly {
  key: string
  label: string
  evaluated: number
  applied: number
}[] = [
  { key: "neon", label: "Neon", evaluated: 100, applied: 103 },
  { key: "chromium", label: "Chromium", evaluated: 89, applied: 120 },
  { key: "platinum", label: "Platinum", evaluated: 71, applied: 90 },
  { key: "cassiopeia", label: "Cassiopeia", evaluated: 60, applied: 67 },
  { key: "nova", label: "Nova", evaluated: 30, applied: 50 },
  { key: "orion", label: "Orion", evaluated: 21, applied: 26 },
  { key: "aurora", label: "Aurora", evaluated: 4, applied: 50 },
  { key: "titan", label: "Titan", evaluated: 4, applied: 40 },
  { key: "lumen", label: "Lumen", evaluated: 1, applied: 90 },
  { key: "vega", label: "Vega", evaluated: 0, applied: 50 },
]

const EVALUATED: readonly RankedBarChartItem[] = EVALUATION.map(
  ({ key, label, evaluated, applied }) => ({
    key,
    label,
    value: evaluated,
    reference: applied,
    tooltip: {
      summary: `${evaluated}명 평가 완료`,
      referenceSummary: `${applied}명 지원`,
    },
  }),
)

export function RankedBarChartDefault() {
  return (
    <div className="umc-example">
      <RankedBarChart
        className="w-full max-w-247"
        items={APPLIED}
        unit="명"
        aria-label="지부별 지원 현황"
        data-spec-id="ranked-bar-chart"
      />
    </div>
  )
}

export function RankedBarChartReference() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-247 flex-col items-end gap-5">
        <ChartLegend
          series={[
            { key: "evaluated", label: "평가 완료", color: "teal-500" },
            APPLICANT_SERIES,
          ]}
          aria-label="평가 완료와 지원자 수"
        />
        <RankedBarChart
          className="w-full"
          items={EVALUATED}
          unit="명"
          aria-label="지부별 평가 현황"
          data-spec-id="ranked-bar-chart-reference"
        />
      </div>
    </div>
  )
}

export function RankedBarChartByRank() {
  return (
    <div className="umc-example">
      <RankedBarChart
        heightBy="rank"
        items={[
          { key: "neon", label: "Neon", value: 42 },
          { key: "chromium", label: "Chromium", value: 38 },
          { key: "platinum", label: "Platinum", value: 25 },
          { key: "cassiopeia", label: "Cassiopeia", value: 12 },
          { key: "nova", label: "Nova", value: 3 },
          { key: "vega", label: "Vega", value: 0 },
        ]}
        unit="명"
        aria-label="지부별 출석 순위"
        data-spec-id="ranked-bar-chart-rank"
      />
    </div>
  )
}

const LEADING_VALUES: readonly number[] = [100, 99, 98, 97]

const FIGMA_RANK_INDEXES: Readonly<Record<string, number>> = {
  "1st": 0,
  "2nd": 1,
  "3rd": 2,
  "4th": 3,
  "5th": 4,
  None: 0,
}

const FIGMA_RANGE_VALUES: Readonly<Record<string, number>> = {
  "5층: 81~100": 90,
  "4층: 61~80": 70,
  "3층: 41~60": 50,
  "2층: 21~40": 30,
  "*1층:14~20": 17,
  "*1층: 1~13": 7,
  "0": 0,
}

const itemsRankedAt = (
  rankIndex: number,
  value: number,
): RankedBarChartItem[] => [
  ...LEADING_VALUES.slice(0, rankIndex).map((leading, index) => ({
    key: `leading-${index}`,
    label: `${index + 1}위`,
    value: leading,
  })),
  { key: "target", label: "항목", value },
]

const renderRankedVariant = (
  variant: FigmaVariant,
  heightBy: RankedBarChartHeightBy,
) => {
  const isNone = variant.props["Rank"] === "None"
  const value =
    heightBy === "rank"
      ? isNone
        ? 0
        : 10
      : lookup(FIGMA_RANGE_VALUES, variant, "Value Range")
  return (
    <div className="umc-example-last-bar">
      <RankedBarChart
        heightBy={heightBy}
        max={100}
        unit="명"
        items={itemsRankedAt(
          lookup(FIGMA_RANK_INDEXES, variant, "Rank"),
          value,
        )}
      />
    </div>
  )
}

export function RankedBarChartAllVariants() {
  return (
    <div className="flex flex-col gap-6">
      <VariantGrid
        set="web-bar-chart-ranked-bar"
        rows={["Value Range"]}
        columns={["Rank"]}
        render={(variant: FigmaVariant) =>
          renderRankedVariant(variant, "value")
        }
      />
      <VariantGrid
        set="web-bar-chart-fixed-ranked-bar"
        rows={[]}
        columns={["Rank"]}
        render={(variant: FigmaVariant) => renderRankedVariant(variant, "rank")}
      />
    </div>
  )
}
