import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CalendarScheduleCard } from "./CalendarScheduleCard.tsx"

describe("CalendarScheduleCard", () => {
  it("회차, 이름, 기간을 그리고 상태는 화면 낭독기용 글자로 담는다", () => {
    render(
      <CalendarScheduleCard
        status="ongoing"
        label="2차"
        title="Plan-Design 매칭"
        start="10월 26일 00:00"
        end="10월 28일 23:59"
      />,
    )
    expect(screen.getByText("2차")).toBeVisible()
    expect(screen.getByText("Plan-Design 매칭")).toBeVisible()
    expect(screen.getByText("10월 26일 00:00")).toBeVisible()
    expect(screen.getByText("~")).toBeVisible()
    expect(screen.getByText("10월 28일 23:59")).toBeVisible()
    expect(screen.getByText("진행 중인 일정")).toHaveClass(
      "umc-visually-hidden",
    )
  })

  it("상태를 주지 않으면 예정 일정이다", () => {
    const { container } = render(
      <CalendarScheduleCard
        label="3차"
        title="Plan-Design 매칭"
        start="10월 29일"
      />,
    )
    expect(container.firstElementChild).toHaveAttribute(
      "data-status",
      "upcoming",
    )
    expect(screen.getByText("예정 일정")).toHaveClass("umc-visually-hidden")
  })

  it("지난 일정에만 체크 표시를 붙인다", () => {
    const { container, rerender } = render(
      <CalendarScheduleCard
        status="past"
        label="1차"
        title="Plan-Design 매칭"
        start="10월 22일 00:00"
        end="10월 25일 23:59"
      />,
    )
    expect(screen.getByText("지난 일정")).toBeInTheDocument()
    expect(
      container.querySelector(".umc-calendar-schedule-card__check"),
    ).toHaveAttribute("aria-hidden", "true")
    rerender(
      <CalendarScheduleCard
        status="upcoming"
        label="1차"
        title="Plan-Design 매칭"
        start="10월 22일 00:00"
      />,
    )
    expect(
      container.querySelector(".umc-calendar-schedule-card__check"),
    ).toBeNull()
  })

  it("끝을 주지 않으면 물결표 없이 시작만 그린다", () => {
    render(
      <CalendarScheduleCard
        label="정규"
        title="면접 결과 발표"
        start="12월 30일 12:00"
      />,
    )
    expect(screen.queryByText("~")).toBeNull()
  })
})
