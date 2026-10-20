import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import type { ChartColor } from "../chart-series.ts"

export type ChartTooltipItem = {
  key: string
  label: ReactNode
  color: ChartColor
  value: ReactNode
  reference?: ReactNode
}

export type ChartTooltipContent = {
  summary?: ReactNode
  referenceSummary?: ReactNode
  items?: readonly ChartTooltipItem[]
  caption?: ReactNode
}

export type ChartTooltipBodyProps = ChartTooltipContent & {
  title: ReactNode
}

export type ChartTooltipProps = Omit<
  ComponentPropsWithRef<"div">,
  "title" | "children"
> &
  ChartTooltipBodyProps

const NO_ITEMS: readonly ChartTooltipItem[] = []

const isComparison = (
  referenceSummary: ReactNode,
  items: readonly ChartTooltipItem[],
) =>
  referenceSummary !== undefined ||
  items.some((item) => item.reference !== undefined)

export function ChartTooltipArrowGlyph() {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 0H0L6.58579 6.58579C7.36684 7.36684 8.63317 7.36684 9.41421 6.58579L16 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ChartTooltipBody({
  title,
  summary,
  referenceSummary,
  items = NO_ITEMS,
  caption,
}: ChartTooltipBodyProps) {
  const comparison = isComparison(referenceSummary, items)
  return (
    <div
      className="umc-chart-tooltip__body"
      data-comparison={comparison ? "" : undefined}
    >
      <div className="umc-chart-tooltip__header">
        <span className="umc-chart-tooltip__title">{title}</span>
        {(summary !== undefined || referenceSummary !== undefined) && (
          <span className="umc-chart-tooltip__summary">
            {summary !== undefined && (
              <span className="umc-chart-tooltip__summary-value">
                {summary}
              </span>
            )}
            {referenceSummary !== undefined && (
              <span className="umc-chart-tooltip__summary-reference">
                {" / "}
                {referenceSummary}
              </span>
            )}
          </span>
        )}
      </div>
      {items.length > 0 && (
        <ul className="umc-chart-tooltip__items">
          {items.map(({ key, label, color, value, reference }) => (
            <li
              key={key}
              className="umc-chart-tooltip__item umc-chart-color"
              data-color={color}
            >
              <span className="umc-chart-tooltip__item-label">
                <span className="umc-chart-tooltip__dot" aria-hidden="true" />
                {label}
              </span>
              <span className="umc-chart-tooltip__values">
                <span>{value}</span>
                {reference !== undefined && (
                  <>
                    <span className="umc-chart-tooltip__slash">/</span>
                    <span className="umc-chart-tooltip__reference">
                      {reference}
                    </span>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {caption !== undefined && (
        <p className="umc-chart-tooltip__caption">{caption}</p>
      )}
    </div>
  )
}

export function ChartTooltip({
  title,
  summary,
  referenceSummary,
  items,
  caption,
  className,
  ...props
}: ChartTooltipProps) {
  return (
    <div {...props} className={cx("umc-chart-tooltip", className)}>
      <span className="umc-chart-tooltip__arrow" data-side="bottom">
        <ChartTooltipArrowGlyph />
      </span>
      <ChartTooltipBody
        title={title}
        summary={summary}
        referenceSummary={referenceSummary}
        items={items}
        caption={caption}
      />
    </div>
  )
}
