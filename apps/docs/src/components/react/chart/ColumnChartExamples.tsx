import {
  ColumnChart,
  DateNavigator,
  SegmentedControl,
  type ColumnChartItem,
  type ColumnChartMode,
} from "@umc-product/react"
import { useState } from "react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { dateLabelOf, dayAt, dayLabelOf } from "./chart-sample-data.ts"

const DAY_COUNT = 8
const CHAPTERS = ["A 지부", "B 지부", "C 지부"]

const applicantsOf = (chapter: number, offset: number) =>
  Math.max(0, (((chapter + 3) * 7 + (offset + 40) * 5) % 19) - 4)

const daysEndingAt = (chapter: number, endOffset: number): ColumnChartItem[] =>
  Array.from({ length: DAY_COUNT }, (_, index) => {
    const offset = endOffset - (DAY_COUNT - 1 - index)
    const isLast = index === DAY_COUNT - 1
    return {
      key: String(offset),
      label: dayLabelOf(dayAt(offset)),
      value: applicantsOf(chapter, offset),
      mode: isLast ? "primary-strong" : "neutral",
    }
  })

const withUnit = (value: number) => `${value}명`

export function ColumnChartDefault() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-85.5">
        <ColumnChart
          items={daysEndingAt(0, 0)}
          formatValue={withUnit}
          aria-label="최근 8일 지원자 수"
        />
      </div>
    </div>
  )
}

export function ColumnChartModes() {
  return (
    <div className="umc-example">
      <div className="w-50">
        <ColumnChart
          items={[
            { key: "neutral", label: "17(토)", value: 12, mode: "neutral" },
            {
              key: "primary-weak",
              label: "18(일)",
              value: 12,
              mode: "primary-weak",
            },
            {
              key: "primary-strong",
              label: "19(월)",
              value: 12,
              mode: "primary-strong",
            },
          ]}
          formatValue={withUnit}
          data-spec-id="column-chart-modes"
        />
      </div>
    </div>
  )
}

const SCALE_ITEMS: readonly ColumnChartItem[] = [
  { key: "mon", label: "월", value: 6 },
  { key: "tue", label: "화", value: 12 },
  { key: "wed", label: "수", value: 18, mode: "primary-strong" },
]

export function ColumnChartScale() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-50">
        <ColumnChart
          items={SCALE_ITEMS}
          formatValue={withUnit}
          aria-label="가장 큰 값 기준"
        />
      </div>
      <div className="w-50">
        <ColumnChart
          items={SCALE_ITEMS}
          max={30}
          formatValue={withUnit}
          aria-label="정원 30명 기준"
        />
      </div>
    </div>
  )
}

export function ColumnChartWithNavigator() {
  const [chapter, setChapter] = useState(CHAPTERS[0] ?? "")
  const [endOffset, setEndOffset] = useState(0)
  const chapterIndex = CHAPTERS.indexOf(chapter)

  return (
    <div className="umc-example">
      <div className="flex w-full max-w-89.5 flex-col gap-6">
        <SegmentedControl
          items={CHAPTERS.map((name) => ({ value: name, label: name }))}
          value={chapter}
          onValueChange={setChapter}
          aria-label="지부"
        />
        <div className="flex flex-col gap-8 px-2">
          <DateNavigator
            aria-label="마지막 날짜"
            onPrevious={() => setEndOffset((offset) => offset - 1)}
            onNext={
              endOffset < 0
                ? () => setEndOffset((offset) => offset + 1)
                : undefined
            }
          >
            {dateLabelOf(dayAt(endOffset))}
          </DateNavigator>
          <ColumnChart
            items={daysEndingAt(chapterIndex, endOffset)}
            formatValue={withUnit}
            aria-label={`${chapter} 최근 8일 지원자 수`}
          />
        </div>
      </div>
    </div>
  )
}

const FIGMA_MODES: Readonly<Record<string, ColumnChartMode>> = {
  Neutral: "neutral",
  "Primary Weak": "primary-weak",
  "Primary Strong": "primary-strong",
}

export function ColumnChartAllVariants() {
  return (
    <VariantGrid
      set="bar-chart-column"
      rows={[]}
      columns={["Appearance"]}
      render={(variant: FigmaVariant) => (
        <ColumnChart
          items={[
            {
              key: variant.name,
              label: "00(월)",
              value: 1,
              mode: lookup(FIGMA_MODES, variant, "Appearance"),
            },
          ]}
          formatValue={() => "00명"}
        />
      )}
    />
  )
}
