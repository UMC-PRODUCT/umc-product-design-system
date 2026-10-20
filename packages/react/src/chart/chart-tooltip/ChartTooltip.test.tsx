import { render, screen, within } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { ChartTooltip, type ChartTooltipItem } from "./ChartTooltip.tsx"

const SINGLE_ITEMS: readonly ChartTooltipItem[] = [
  { key: "pm", label: "PM", color: "pm", value: "10명" },
  { key: "design", label: "Design", color: "design", value: "30명" },
]

const COMPARISON_ITEMS: readonly ChartTooltipItem[] = [
  { key: "pm", label: "PM", color: "pm", value: "10명", reference: "16명" },
  {
    key: "design",
    label: "Design",
    color: "design",
    value: "30명",
    reference: "34명",
  },
]

const bodyOf = () => document.querySelector(".umc-chart-tooltip__body")

describe("ChartTooltip", () => {
  it("제목, 합계, 항목을 차례로 그린다", () => {
    render(
      <ChartTooltip
        title="한국대 ERICA"
        summary="40명 지원"
        items={SINGLE_ITEMS}
      />,
    )
    expect(screen.getByText("한국대 ERICA")).toBeInTheDocument()
    expect(screen.getByText("40명 지원")).toBeInTheDocument()
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["PM10명", "Design30명"])
  })

  it("항목에 비교값이 없으면 한 값 모양으로 그린다", () => {
    render(<ChartTooltip title="한국대 ERICA" items={SINGLE_ITEMS} />)
    expect(bodyOf()).not.toHaveAttribute("data-comparison")
    expect(screen.queryByText("/")).not.toBeInTheDocument()
  })

  it("항목에 비교값이 있으면 값 / 비교값 모양으로 그린다", () => {
    render(<ChartTooltip title="한국대 ERICA" items={COMPARISON_ITEMS} />)
    expect(bodyOf()).toHaveAttribute("data-comparison", "")
    const pm = screen.getAllByRole("listitem")[0]
    expect(pm).toHaveTextContent("PM10명/16명")
    expect(within(pm as HTMLElement).getByText("16명")).toHaveClass(
      "umc-chart-tooltip__reference",
    )
  })

  it("합계의 비교값은 / 뒤에 이어 붙인다", () => {
    render(
      <ChartTooltip
        title="한국대 ERICA"
        summary="100명 평가 완료"
        referenceSummary="120명 지원"
        items={COMPARISON_ITEMS}
      />,
    )
    expect(
      document.querySelector(".umc-chart-tooltip__summary"),
    ).toHaveTextContent("100명 평가 완료 / 120명 지원")
  })

  it("합계의 비교값만 있어도 비교 모양으로 그린다", () => {
    render(
      <ChartTooltip
        title="한국대 ERICA"
        summary="100명 평가 완료"
        referenceSummary="120명 지원"
      />,
    )
    expect(bodyOf()).toHaveAttribute("data-comparison", "")
  })

  it("caption이 있을 때만 맨 아래 보조 설명을 그린다", () => {
    const { rerender } = render(<ChartTooltip title="한국대 ERICA" />)
    expect(
      document.querySelector(".umc-chart-tooltip__caption"),
    ).not.toBeInTheDocument()
    rerender(<ChartTooltip title="한국대 ERICA" caption="10월 20일 기준" />)
    expect(screen.getByText("10월 20일 기준")).toHaveClass(
      "umc-chart-tooltip__caption",
    )
  })

  it("항목이 없으면 목록을 그리지 않는다", () => {
    render(<ChartTooltip title="한국대 ERICA" summary="0명 지원" />)
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  it("항목의 색 점과 화살표는 화면 낭독기에서 숨긴다", () => {
    render(<ChartTooltip title="한국대 ERICA" items={SINGLE_ITEMS} />)
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute(
      "data-color",
      "pm",
    )
    expect(document.querySelector(".umc-chart-tooltip__dot")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(
      document.querySelector(".umc-chart-tooltip__arrow svg"),
    ).toHaveAttribute("aria-hidden", "true")
  })

  it("className을 umc-chart-tooltip 뒤에 붙이고 ref를 루트에 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ChartTooltip
        ref={ref}
        title="한국대 ERICA"
        className="mt-2"
        data-testid="tooltip"
      />,
    )
    const root = screen.getByTestId("tooltip")
    expect(root).toHaveClass("umc-chart-tooltip", "mt-2")
    expect(ref.current).toBe(root)
  })
})
