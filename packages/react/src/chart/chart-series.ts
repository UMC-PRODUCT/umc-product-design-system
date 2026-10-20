import type { ReactNode } from "react"

export type ChartColor =
  | "pm"
  | "design"
  | "web-pe"
  | "mobile-pe"
  | "teal-500"
  | "teal-400"
  | "teal-300"
  | "teal-200"
  | "reference"

export type ChartSeries = {
  key: string
  label: ReactNode
  color: ChartColor
}
