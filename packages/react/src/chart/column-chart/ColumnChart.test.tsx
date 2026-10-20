import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { ColumnChart, type ColumnChartItem } from "./ColumnChart.tsx"

const WEEK: readonly ColumnChartItem[] = [
  { key: "10-13", label: "13(월)", value: 20 },
  { key: "10-14", label: "14(화)", value: 40, mode: "primary-strong" },
  { key: "10-15", label: "15(수)", value: 0 },
]

const columns = () => screen.getAllByRole("listitem")

const ratioOfColumn = (index: number) =>
  columns()[index]?.style.getPropertyValue("--umc-column-chart-ratio")

describe("ColumnChart", () => {
  it("항목마다 이름과 값을 목록 항목으로 그리고, 이름을 먼저 읽게 둔다", () => {
    render(<ColumnChart items={WEEK} aria-label="요일별 출석" />)
    expect(
      screen.getByRole("list", { name: "요일별 출석" }),
    ).toBeInTheDocument()
    expect(columns().map((column) => column.textContent)).toEqual([
      "13(월)20",
      "14(화)40",
      "15(수)0",
    ])
  })

  it("가장 큰 값을 최대 높이로 두고 나머지를 비율로 그린다", () => {
    render(<ColumnChart items={WEEK} />)
    expect(ratioOfColumn(0)).toBe("0.5")
    expect(ratioOfColumn(1)).toBe("1")
    expect(ratioOfColumn(2)).toBe("0")
  })

  it("max를 넘기면 그 값을 최대 높이로 쓰고, 넘는 값은 최대 높이에서 멈춘다", () => {
    render(
      <ColumnChart
        items={[
          { key: "a", label: "월", value: 25 },
          { key: "b", label: "화", value: 120 },
        ]}
        max={100}
      />,
    )
    expect(ratioOfColumn(0)).toBe("0.25")
    expect(ratioOfColumn(1)).toBe("1")
  })

  it("모든 값이 0이면 막대 높이가 모두 0이다", () => {
    render(
      <ColumnChart
        items={[
          { key: "a", label: "월", value: 0 },
          { key: "b", label: "화", value: 0 },
        ]}
      />,
    )
    expect(ratioOfColumn(0)).toBe("0")
    expect(ratioOfColumn(1)).toBe("0")
  })

  it("mode를 data-mode로 넘기고 기본은 neutral이다", () => {
    render(<ColumnChart items={WEEK} />)
    expect(columns().map((column) => column.dataset["mode"])).toEqual([
      "neutral",
      "primary-strong",
      "neutral",
    ])
  })

  it("값은 천 단위 쉼표로 쓰고 formatValue로 바꿀 수 있다", () => {
    const { rerender } = render(
      <ColumnChart items={[{ key: "a", label: "월", value: 1234 }]} />,
    )
    expect(screen.getByText("1,234")).toBeInTheDocument()
    rerender(
      <ColumnChart
        items={[{ key: "a", label: "월", value: 1234 }]}
        formatValue={(value) => `${value}명`}
      />,
    )
    expect(screen.getByText("1234명")).toBeInTheDocument()
  })

  it("막대는 화면 낭독기에서 숨긴다", () => {
    render(<ColumnChart items={WEEK} />)
    for (const bar of document.querySelectorAll(".umc-column-chart__bar")) {
      expect(bar).toHaveAttribute("aria-hidden", "true")
    }
  })

  it("className을 umc-column-chart 뒤에 붙이고 ref를 목록에 넘긴다", () => {
    const ref = createRef<HTMLUListElement>()
    render(<ColumnChart ref={ref} items={WEEK} className="w-full" />)
    const list = screen.getByRole("list")
    expect(list).toHaveClass("umc-column-chart", "w-full")
    expect(ref.current).toBe(list)
  })
})
