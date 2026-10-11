import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { StepNavigation } from "./StepNavigation.tsx"

const STEPS = ["기본 정보", "세부 설정", "검토", "완료"]

describe("StepNavigation", () => {
  it("현재 단계에 aria-current=step을 단다", () => {
    render(<StepNavigation steps={STEPS} currentStep={2} />)
    const items = screen.getAllByRole("listitem")
    expect(items[1]).toHaveAttribute("aria-current", "step")
    expect(items[0]).not.toHaveAttribute("aria-current")
    expect(items[2]).not.toHaveAttribute("aria-current")
  })

  it("단계 항목은 버튼이 아니다", () => {
    render(<StepNavigation steps={STEPS} currentStep={1} />)
    expect(screen.queryAllByRole("button")).toHaveLength(0)
  })

  it("단계 수만큼 항목을 렌더한다", () => {
    render(<StepNavigation steps={STEPS} currentStep={1} />)
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
  })

  it("aria-label을 전달한다", () => {
    render(
      <StepNavigation steps={STEPS} currentStep={1} aria-label="등록 단계" />,
    )
    expect(screen.getByRole("navigation")).toHaveAccessibleName("등록 단계")
  })

  it("현재 단계에만 data-active를 단다", () => {
    render(<StepNavigation steps={STEPS} currentStep={3} />)
    const items = screen.getAllByRole("listitem")
    expect(items[2]).toHaveAttribute("data-active", "")
    expect(items[0]).not.toHaveAttribute("data-active")
  })

  it("className을 루트 요소에 붙인다", () => {
    render(<StepNavigation steps={STEPS} currentStep={1} className="custom" />)
    expect(screen.getByRole("navigation")).toHaveClass(
      "umc-step-navigation",
      "custom",
    )
  })
})
