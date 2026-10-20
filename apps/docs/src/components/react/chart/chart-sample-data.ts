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

const BASE_DATE = new Date(2026, 9, 20)
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const

export const dayAt = (offset: number) =>
  new Date(
    BASE_DATE.getFullYear(),
    BASE_DATE.getMonth(),
    BASE_DATE.getDate() + offset,
  )

export const dateLabelOf = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`

export const dayLabelOf = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}(${WEEKDAYS[date.getDay()] ?? ""})`
