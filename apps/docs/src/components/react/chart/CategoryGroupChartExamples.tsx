import {
  CategoryGroupChart,
  ChartLegend,
  type CategoryGroupChartGroup,
  type CategoryGroupChartSeries,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { APPLICANT_SERIES } from "./chart-sample-data.ts"

const PARTS: readonly CategoryGroupChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
  { key: "web-pe", label: "Web PE", color: "web-pe" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe" },
]

const ROUNDS: readonly CategoryGroupChartSeries[] = [
  { key: "first", label: "1차 지원", color: "teal-500" },
  { key: "second", label: "2차 지원", color: "teal-400" },
  { key: "third", label: "3차 지원", color: "teal-300" },
]

const SCHOOLS = [
  "한국대 ERICA",
  "중앙대",
  "건국대",
  "가천대",
  "동국대",
  "동덕여대",
  "성신여대",
  "항공대",
  "홍익대 서울",
  "홍익대 세종",
  "한성대",
  "숭실대",
  "한양대 ERICA",
  "서울여대",
  "명지대",
]

const PROJECTS = [
  "UMC",
  "유엠씨",
  "토마토맛",
  "습관기록",
  "숨쉬기",
  "밥먹기",
  "수면기록",
  "블루베리",
]

const countOf = (seed: number, step: number, limit: number) =>
  (seed * 7 + step * 11) % limit

const appliedOf = (school: number) => ({
  pm: 6 + countOf(school, 1, 9),
  design: 4 + countOf(school, 2, 8),
  "web-pe": 3 + countOf(school, 3, 7),
  "mobile-pe": countOf(school, 4, 5),
})

const sumOf = (values: Readonly<Record<string, number>>) =>
  Object.values(values).reduce((total, value) => total + value, 0)

const withPeople = (value: number) => `${value}명`

const appliedGroups = (count: number): CategoryGroupChartGroup[] =>
  SCHOOLS.slice(0, count).map((name, index) => {
    const isEmpty = index === count - 1
    const values = isEmpty
      ? { pm: 0, design: 0, "web-pe": 0, "mobile-pe": 0 }
      : appliedOf(index)
    return {
      key: name,
      label: name,
      values,
      tooltip: { summary: `${sumOf(values)}명 지원` },
    }
  })

const evaluatedGroups = (count: number): CategoryGroupChartGroup[] =>
  SCHOOLS.slice(0, count).map((name, index) => {
    const references = appliedOf(index)
    const values = {
      pm: Math.max(references.pm - countOf(index, 5, 4), 0),
      design: Math.max(references.design - countOf(index, 6, 5), 0),
      "web-pe": Math.max(references["web-pe"] - countOf(index, 7, 6), 0),
      "mobile-pe": Math.max(references["mobile-pe"] - countOf(index, 8, 3), 0),
    }
    return {
      key: name,
      label: name,
      values,
      references,
      tooltip: {
        summary: `${sumOf(values)}명 평가 완료`,
        referenceSummary: `${sumOf(references)}명 지원`,
      },
    }
  })

const roundGroups = (count: number): CategoryGroupChartGroup[] =>
  PROJECTS.slice(0, count).map((name, index) => ({
    key: name,
    label: name,
    values: {
      first: 18 + countOf(index, 1, 6),
      second: 10 + countOf(index, 2, 6),
      third: 1 + countOf(index, 3, 3),
    },
  }))

export function CategoryGroupChartDefault() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-247 flex-col items-end gap-6">
        <ChartLegend series={PARTS} aria-label="파트" />
        <CategoryGroupChart
          className="w-full"
          series={PARTS}
          groups={appliedGroups(15)}
          formatValue={withPeople}
          aria-label="학교별 지원 현황"
          data-spec-id="category-group-chart"
        />
      </div>
    </div>
  )
}

export function CategoryGroupChartReference() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-247 flex-col items-end gap-6">
        <ChartLegend
          series={[...PARTS, APPLICANT_SERIES]}
          aria-label="파트와 지원자 수"
        />
        <CategoryGroupChart
          className="w-full"
          series={PARTS}
          groups={evaluatedGroups(15)}
          formatValue={withPeople}
          aria-label="학교별 평가 현황"
          data-spec-id="category-group-chart-reference"
        />
      </div>
    </div>
  )
}

export function CategoryGroupChartRounds() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-247 flex-col items-end gap-6">
        <ChartLegend series={ROUNDS} aria-label="지원 차수" />
        <CategoryGroupChart
          className="w-full"
          series={ROUNDS}
          groups={roundGroups(8)}
          formatValue={withPeople}
          aria-label="프로젝트별 지원 현황"
          data-spec-id="category-group-chart-rounds"
        />
      </div>
    </div>
  )
}

export function CategoryGroupChartWrap() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-120">
        <CategoryGroupChart
          series={PARTS}
          groups={appliedGroups(12)}
          formatValue={withPeople}
          aria-label="학교별 지원 현황"
        />
      </div>
    </div>
  )
}

type FigmaSet =
  | "bar-chart-category-group"
  | "bar-chart-category-group-reference-bar"
  | "bar-chart-category-group-related-series"
  | "bar-chart-category-group-related-series-reference-bar"

const FIGMA_EMPTY: Readonly<Record<string, boolean>> = {
  Default: false,
  None: true,
}

const FIGMA_PART_VALUES = { pm: 100, design: 67, "web-pe": 44, "mobile-pe": 11 }
const FIGMA_PART_REFERENCES = {
  pm: 8,
  design: 29,
  "web-pe": 41,
  "mobile-pe": 68,
}
const FIGMA_ROUND_VALUES = { first: 100, second: 67, third: 11 }
const FIGMA_ROUND_REFERENCES = { first: 29, second: 41, third: 68 }

const zeroOf = (values: Readonly<Record<string, number>>) =>
  Object.fromEntries(Object.keys(values).map((key) => [key, 0]))

type FigmaGroupOptions = {
  related: boolean
  withReference: boolean
}

const renderFigmaGroup = (
  variant: FigmaVariant,
  { related, withReference }: FigmaGroupOptions,
) => {
  const empty = lookup(FIGMA_EMPTY, variant, "Data State")
  const values = related ? FIGMA_ROUND_VALUES : FIGMA_PART_VALUES
  const references = related ? FIGMA_ROUND_REFERENCES : FIGMA_PART_REFERENCES
  return (
    <CategoryGroupChart
      series={related ? ROUNDS : PARTS}
      max={100}
      groups={[
        {
          key: variant.name,
          label: "항목",
          values: empty ? zeroOf(values) : values,
          references: withReference
            ? empty
              ? zeroOf(references)
              : references
            : undefined,
        },
      ]}
    />
  )
}

function FigmaSetGrid({
  set,
  ...options
}: FigmaGroupOptions & { set: FigmaSet }) {
  return (
    <VariantGrid
      set={set}
      rows={[]}
      columns={["Data State"]}
      render={(variant: FigmaVariant) => renderFigmaGroup(variant, options)}
    />
  )
}

export function CategoryGroupChartAllVariants() {
  return (
    <div className="flex flex-col gap-6">
      <FigmaSetGrid
        set="bar-chart-category-group"
        related={false}
        withReference={false}
      />
      <FigmaSetGrid
        set="bar-chart-category-group-reference-bar"
        related={false}
        withReference
      />
      <FigmaSetGrid
        set="bar-chart-category-group-related-series"
        related
        withReference={false}
      />
      <FigmaSetGrid
        set="bar-chart-category-group-related-series-reference-bar"
        related
        withReference
      />
    </div>
  )
}
