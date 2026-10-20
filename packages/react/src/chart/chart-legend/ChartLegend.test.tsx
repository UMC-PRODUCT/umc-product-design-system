import { render, screen, within } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import type { ChartSeries } from "../chart-series.ts"
import { ChartLegend } from "./ChartLegend.tsx"

const PARTS: readonly ChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
  { key: "web-pe", label: "Web PE", color: "web-pe" },
  { key: "mobile-pe", label: "Mobile PE", color: "mobile-pe" },
]

describe("ChartLegend", () => {
  it("계열마다 이름을 목록 항목으로 그린다", () => {
    render(<ChartLegend series={PARTS} aria-label="파트" />)
    const list = screen.getByRole("list", { name: "파트" })
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["PM", "Design", "Web PE", "Mobile PE"])
  })

  it("계열 색을 data-color로 넘기고 색 점은 화면 낭독기에서 숨긴다", () => {
    render(<ChartLegend series={PARTS} />)
    const pm = screen.getByText("PM")
    expect(pm).toHaveAttribute("data-color", "pm")
    expect(pm.querySelector(".umc-chart-legend__dot")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })

  it("비교값 색(reference)도 범례 항목으로 그린다", () => {
    render(
      <ChartLegend
        series={[
          ...PARTS,
          { key: "applied", label: "지원자 수", color: "reference" },
        ]}
      />,
    )
    expect(screen.getByText("지원자 수")).toHaveAttribute(
      "data-color",
      "reference",
    )
  })

  it("className을 umc-chart-legend 뒤에 붙이고 ref를 목록에 넘긴다", () => {
    const ref = createRef<HTMLUListElement>()
    render(<ChartLegend ref={ref} series={PARTS} className="ml-auto" />)
    const list = screen.getByRole("list")
    expect(list).toHaveClass("umc-chart-legend", "ml-auto")
    expect(ref.current).toBe(list)
  })
})
