import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"
import type { ChartSeries } from "../chart-series.ts"

export type ChartLegendProps = Omit<ComponentPropsWithRef<"ul">, "children"> & {
  series: readonly ChartSeries[]
}

export function ChartLegend({ series, className, ...props }: ChartLegendProps) {
  return (
    <ul {...props} className={cx("umc-chart-legend", className)}>
      {series.map(({ key, label, color }) => (
        <li
          key={key}
          className="umc-chart-legend__item umc-chart-color"
          data-color={color}
        >
          <span className="umc-chart-legend__dot" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  )
}
