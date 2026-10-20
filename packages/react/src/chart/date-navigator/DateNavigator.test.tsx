import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { DateNavigator } from "./DateNavigator.tsx"

describe("DateNavigator", () => {
  it("날짜를 이전, 다음 버튼 사이에 그린다", () => {
    render(
      <DateNavigator aria-label="날짜" onPrevious={vi.fn()} onNext={vi.fn()}>
        2026년 10월 20일
      </DateNavigator>,
    )
    const group = screen.getByRole("group", { name: "날짜" })
    expect(group).toHaveTextContent("2026년 10월 20일")
    expect(screen.getByRole("button", { name: "이전" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "다음" })).toBeInTheDocument()
  })

  it("날짜가 바뀌면 화면 낭독기가 읽도록 알림 영역에 둔다", () => {
    render(<DateNavigator>2026년 10월 20일</DateNavigator>)
    expect(screen.getByText("2026년 10월 20일")).toHaveAttribute(
      "aria-live",
      "polite",
    )
  })

  it("버튼을 누르면 onPrevious, onNext를 부른다", async () => {
    const user = userEvent.setup()
    const onPrevious = vi.fn()
    const onNext = vi.fn()
    render(
      <DateNavigator onPrevious={onPrevious} onNext={onNext}>
        2026년 10월 20일
      </DateNavigator>,
    )
    await user.click(screen.getByRole("button", { name: "이전" }))
    await user.click(screen.getByRole("button", { name: "다음" }))
    expect(onPrevious).toHaveBeenCalledOnce()
    expect(onNext).toHaveBeenCalledOnce()
  })

  it("키보드로 버튼에 가서 Enter로 누를 수 있다", async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(
      <DateNavigator onPrevious={vi.fn()} onNext={onNext}>
        2026년 10월 20일
      </DateNavigator>,
    )
    await user.tab()
    await user.tab()
    expect(screen.getByRole("button", { name: "다음" })).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(onNext).toHaveBeenCalledOnce()
  })

  it("콜백이 없는 쪽 버튼은 비활성이다", () => {
    render(<DateNavigator onPrevious={vi.fn()}>2026년 10월 20일</DateNavigator>)
    expect(screen.getByRole("button", { name: "이전" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled()
  })

  it("버튼 이름을 previousLabel, nextLabel로 바꿀 수 있다", () => {
    render(
      <DateNavigator previousLabel="이전 주" nextLabel="다음 주">
        10월 셋째 주
      </DateNavigator>,
    )
    expect(screen.getByRole("button", { name: "이전 주" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "다음 주" })).toBeInTheDocument()
  })

  it("화살표 그림은 화면 낭독기에서 숨긴다", () => {
    render(<DateNavigator>2026년 10월 20일</DateNavigator>)
    for (const svg of document.querySelectorAll(".umc-date-navigator svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true")
    }
  })

  it("className을 umc-date-navigator 뒤에 붙이고 ref를 루트에 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <DateNavigator ref={ref} className="mb-8">
        2026년 10월 20일
      </DateNavigator>,
    )
    const group = screen.getByRole("group")
    expect(group).toHaveClass("umc-date-navigator", "mb-8")
    expect(ref.current).toBe(group)
  })
})
