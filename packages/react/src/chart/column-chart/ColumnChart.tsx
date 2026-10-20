import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { formatCount, largestOf, ratioOf } from "../chart-scale.ts"

export type ColumnChartMode = "neutral" | "primary-weak" | "primary-strong"

export type ColumnChartItem = {
  key: string
  label: ReactNode
  value: number
  mode?: ColumnChartMode
}

export type ColumnChartProps = Omit<ComponentPropsWithRef<"ul">, "children"> & {
  items: readonly ColumnChartItem[]
  max?: number
  formatValue?: (value: number) => ReactNode
}

type ColumnStyle = CSSProperties & {
  "--umc-column-chart-ratio": string
}

export function ColumnChart({
  items,
  max,
  formatValue = formatCount,
  className,
  ...props
}: ColumnChartProps) {
  const scale = max ?? largestOf(items.map((item) => item.value))

  return (
    <ul {...props} className={cx("umc-column-chart", className)}>
      {items.map(({ key, label, value, mode = "neutral" }) => {
        const style: ColumnStyle = {
          "--umc-column-chart-ratio": String(ratioOf(value, scale)),
        }
        return (
          <li
            key={key}
            className="umc-column-chart__column"
            data-mode={mode}
            style={style}
          >
            <span className="umc-column-chart__label">{label}</span>
            <span className="umc-column-chart__plot">
              <span className="umc-column-chart__value">
                {formatValue(value)}
              </span>
              <span className="umc-column-chart__bar" aria-hidden="true" />
            </span>
          </li>
        )
      })}
    </ul>
  )
}
