"use client"

import {
  useId,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from "react"

import { cx } from "../../internal/cx.ts"
import { formatCount, largestOf, ratioOf } from "../chart-scale.ts"
import type { ChartTooltipContent } from "../chart-tooltip/ChartTooltip.tsx"
import {
  ChartTooltipDescription,
  ChartTooltipLayer,
  ChartTooltipTrigger,
  useChartTooltipHandle,
} from "../chart-tooltip/ChartTooltipLayer.tsx"
import { useRovingFocus } from "../use-roving-focus.ts"
import {
  rankEntriesOf,
  rankToneOf,
  valueToneOf,
  type RankTone,
} from "./ranking.ts"

export type RankedBarChartHeightBy = "value" | "rank"

export type RankedBarChartItem = {
  key: string
  label: ReactNode
  value: number
  reference?: number
  tooltip?: ChartTooltipContent
}

export type RankedBarChartProps = Omit<
  ComponentPropsWithRef<"ul">,
  "children"
> & {
  items: readonly RankedBarChartItem[]
  unit?: ReactNode
  max?: number
  heightBy?: RankedBarChartHeightBy
  formatValue?: (value: number) => ReactNode
}

type ColumnStyle = CSSProperties & {
  "--umc-ranked-bar-chart-bar-height": string
  "--umc-ranked-bar-chart-label-lines": string
  "--umc-ranked-bar-chart-reference-height"?: string
}

const PLOT_HEIGHT = 200
const INSIDE_LABEL_MIN_HEIGHT = 28
const OUTSIDE_BAR_MIN_HEIGHT = 2
const EMPTY_BAR_HEIGHT = 1
const REFERENCE_MIN_HEIGHT = 32
const INSIDE_LABEL_TOP_PADDING = 8
const LABEL_LINE_HEIGHT = 16.8
const INSIDE_LABEL_MAX_LINES = 6

const RANK_HEIGHTS: Readonly<Record<RankTone, number>> = {
  "1st": 143,
  "2nd": 107.25,
  "3rd": 71.5,
  "4th": 35.75,
  "5th": 8,
  none: 5,
}

const valueBarHeightOf = (value: number, max: number) => {
  const height = ratioOf(value, max) * PLOT_HEIGHT
  if (height === 0) return EMPTY_BAR_HEIGHT
  return Math.max(height, OUTSIDE_BAR_MIN_HEIGHT)
}

const insideLabelLinesOf = (barHeight: number) =>
  Math.min(
    INSIDE_LABEL_MAX_LINES,
    Math.max(
      1,
      Math.floor((barHeight - INSIDE_LABEL_TOP_PADDING) / LABEL_LINE_HEIGHT),
    ),
  )

const referenceHeightOf = (reference: number, max: number) =>
  Math.max(ratioOf(reference, max) * PLOT_HEIGHT, REFERENCE_MIN_HEIGHT)

const rankTextOf = (rank: number | undefined, tied: boolean) => {
  if (rank === undefined) return undefined
  return tied ? `공동 ${rank}위` : `${rank}위`
}

export function RankedBarChart({
  items,
  unit,
  max,
  heightBy = "value",
  formatValue = formatCount,
  className,
  ...props
}: RankedBarChartProps) {
  const baseId = useId()
  const handle = useChartTooltipHandle()
  const rovingPropsOf = useRovingFocus(items.length)
  const entries = rankEntriesOf(items)
  const scalesByValue = heightBy === "value"
  const scale =
    max ??
    largestOf(
      items.flatMap((item) => [
        item.value,
        ...(item.reference === undefined ? [] : [item.reference]),
      ]),
    )

  const amountOf = (value: number) => (
    <>
      {formatValue(value)}
      {unit}
    </>
  )

  const referenceOf = (item: RankedBarChartItem) =>
    scalesByValue ? item.reference : undefined

  const contentOf = (item: RankedBarChartItem): ChartTooltipContent => {
    const reference = referenceOf(item)
    return (
      item.tooltip ?? {
        summary: amountOf(item.value),
        referenceSummary:
          reference === undefined ? undefined : amountOf(reference),
      }
    )
  }

  const descriptionLeadOf = (
    item: RankedBarChartItem,
    rank: number | undefined,
    tied: boolean,
  ): ReactNode[] => {
    const rankText = rankTextOf(rank, tied)
    const reference = referenceOf(item)
    const amount =
      reference === undefined ? (
        amountOf(item.value)
      ) : (
        <>
          {amountOf(item.value)} / {amountOf(reference)}
        </>
      )
    return rankText === undefined ? [amount] : [rankText, amount]
  }

  return (
    <ul
      {...props}
      className={cx("umc-ranked-bar-chart", className)}
      data-height-by={heightBy}
    >
      {entries.map(({ item, rank, tied }, index) => {
        const tone = scalesByValue ? valueToneOf(rank) : rankToneOf(rank)
        const barHeight = scalesByValue
          ? valueBarHeightOf(item.value, scale)
          : RANK_HEIGHTS[tone]
        const hidesAmount = !scalesByValue && tone === "none"
        const labelInside = barHeight >= INSIDE_LABEL_MIN_HEIGHT
        const reference = referenceOf(item)
        const hasReference = reference !== undefined
        const style: ColumnStyle = {
          "--umc-ranked-bar-chart-bar-height": `${barHeight}px`,
          "--umc-ranked-bar-chart-label-lines": String(
            insideLabelLinesOf(barHeight),
          ),
          ...(hasReference && {
            "--umc-ranked-bar-chart-reference-height": `${referenceHeightOf(reference ?? 0, scale)}px`,
          }),
        }
        const triggerId = `${baseId}-bar-${index}`
        const descriptionId = `${baseId}-description-${index}`
        return (
          <li
            key={item.key}
            className="umc-ranked-bar-chart__item"
            data-tone={tone}
            data-label={labelInside ? "inside" : "outside"}
            style={style}
          >
            <ChartTooltipTrigger
              {...rovingPropsOf(index)}
              handle={handle}
              payload={item.key}
              id={triggerId}
              className="umc-ranked-bar-chart__column"
              aria-describedby={descriptionId}
            >
              {hasReference && (
                <span
                  className="umc-ranked-bar-chart__reference"
                  aria-hidden="true"
                />
              )}
              {!hidesAmount && (
                <span
                  className="umc-ranked-bar-chart__amount"
                  aria-hidden="true"
                >
                  <span className="umc-ranked-bar-chart__number">
                    {formatValue(item.value)}
                  </span>
                  {unit !== undefined && (
                    <span className="umc-ranked-bar-chart__unit">{unit}</span>
                  )}
                </span>
              )}
              {labelInside ? (
                <span className="umc-ranked-bar-chart__bar">
                  <span className="umc-ranked-bar-chart__label">
                    {item.label}
                  </span>
                </span>
              ) : (
                <span className="umc-ranked-bar-chart__stack">
                  <span
                    className={
                      hidesAmount
                        ? "umc-visually-hidden"
                        : "umc-ranked-bar-chart__label"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="umc-ranked-bar-chart__bar" />
                </span>
              )}
            </ChartTooltipTrigger>
            <ChartTooltipDescription
              id={descriptionId}
              leading={descriptionLeadOf(item, rank, tied)}
              content={item.tooltip ?? {}}
            />
          </li>
        )
      })}
      <ChartTooltipLayer
        handle={handle}
        contentOf={(key) => {
          const item = items.find((candidate) => candidate.key === key)
          return item === undefined
            ? undefined
            : { title: item.label, ...contentOf(item) }
        }}
      />
    </ul>
  )
}
