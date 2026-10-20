import type { ChartSeries } from "@umc-product/react"

export const PART_SERIES: readonly ChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
  { key: "web-pe", label: "Web PE", color: "web-pe" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe" },
]

export const ROUND_SERIES: readonly ChartSeries[] = [
  { key: "first", label: "1차 지원", color: "teal-500" },
  { key: "second", label: "2차 지원", color: "teal-400" },
  { key: "third", label: "3차 지원", color: "teal-300" },
]

export const APPLICANT_SERIES: ChartSeries = {
  key: "applied",
  label: "지원자 수",
  color: "reference",
}
