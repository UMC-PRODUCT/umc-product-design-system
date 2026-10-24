import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Calendar } from "./Calendar.tsx"

const dateOf = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day)

const OCTOBER = dateOf(2026, 10, 1)

const dayButton = (label: string) =>
  screen.getByRole("button", { name: new RegExp(`^${label}`) })

const cellOf = (label: string) => dayButton(label).closest('[role="gridcell"]')

describe("Calendar", () => {
  it("달 제목을 이름으로 가진 격자에 요일과 앞뒤 달 날짜까지 그린다", () => {
    render(<Calendar defaultMonth={OCTOBER} />)
    expect(screen.getByRole("grid", { name: "2026년 10월" })).toBeVisible()
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    expect(screen.getByRole("columnheader", { name: "월요일" })).toBeVisible()
    expect(screen.getAllByRole("gridcell")).toHaveLength(35)
    expect(dayButton("2026년 9월 28일 월요일")).toBeVisible()
    expect(dayButton("2026년 11월 1일 일요일")).toBeVisible()
  })

  it("이전, 다음 달 버튼으로 달을 옮기고 onMonthChange를 부른다", async () => {
    const onMonthChange = vi.fn()
    render(<Calendar defaultMonth={OCTOBER} onMonthChange={onMonthChange} />)
    await userEvent.click(screen.getByRole("button", { name: "다음 달" }))
    expect(screen.getByRole("grid", { name: "2026년 11월" })).toBeVisible()
    expect(onMonthChange).toHaveBeenLastCalledWith(dateOf(2026, 11, 1))
    await userEvent.click(screen.getByRole("button", { name: "이전 달" }))
    await userEvent.click(screen.getByRole("button", { name: "이전 달" }))
    expect(screen.getByRole("grid", { name: "2026년 09월" })).toBeVisible()
  })

  it("날짜를 누르면 고르고 onValueChange를 부른다", async () => {
    const onValueChange = vi.fn()
    render(<Calendar defaultMonth={OCTOBER} onValueChange={onValueChange} />)
    await userEvent.click(dayButton("2026년 10월 12일 월요일"))
    expect(onValueChange).toHaveBeenCalledWith(dateOf(2026, 10, 12))
    expect(cellOf("2026년 10월 12일 월요일")).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  it("앞뒤 달 날짜를 누르면 그 달로 옮기며 고른다", async () => {
    const onValueChange = vi.fn()
    render(<Calendar defaultMonth={OCTOBER} onValueChange={onValueChange} />)
    await userEvent.click(dayButton("2026년 11월 1일 일요일"))
    expect(screen.getByRole("grid", { name: "2026년 11월" })).toBeVisible()
    expect(onValueChange).toHaveBeenCalledWith(dateOf(2026, 11, 1))
  })

  it("고를 수 없는 날은 눌러도 고르지 않는다", async () => {
    const onValueChange = vi.fn()
    render(
      <Calendar
        defaultMonth={OCTOBER}
        isDateDisabled={(date) => date.getDate() === 13}
        onValueChange={onValueChange}
      />,
    )
    const disabled = dayButton("2026년 10월 13일 화요일")
    expect(disabled).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(disabled)
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("기간과 일정 점을 날짜 이름에 담는다", () => {
    render(
      <Calendar
        defaultMonth={OCTOBER}
        ranges={[{ start: dateOf(2026, 10, 22), end: dateOf(2026, 11, 1) }]}
        markedDates={[dateOf(2026, 10, 26)]}
      />,
    )
    expect(
      screen.getByRole("button", {
        name: "2026년 10월 22일 목요일, 기간 시작",
      }),
    ).toBeVisible()
    expect(
      screen.getByRole("button", {
        name: "2026년 10월 26일 월요일, 기간 중, 일정 있음",
      }),
    ).toBeVisible()
    expect(
      screen.getByRole("button", { name: "2026년 11월 1일 일요일, 기간 끝" }),
    ).toBeVisible()
    expect(cellOf("2026년 10월 26일 월요일")).toHaveAttribute(
      "data-range",
      "middle",
    )
  })

  it("격자에는 고른 날짜 하나만 Tab으로 들어가고 화살표와 Home, End, PageDown으로 옮긴다", async () => {
    const onValueChange = vi.fn()
    render(
      <Calendar
        defaultMonth={OCTOBER}
        defaultValue={dateOf(2026, 10, 1)}
        onValueChange={onValueChange}
      />,
    )
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    expect(dayButton("2026년 10월 1일 목요일")).toHaveFocus()

    await userEvent.keyboard("{ArrowLeft}")
    expect(dayButton("2026년 9월 30일 수요일")).toHaveFocus()
    expect(screen.getByRole("grid", { name: "2026년 09월" })).toBeVisible()

    await userEvent.keyboard("{ArrowDown}")
    expect(dayButton("2026년 10월 7일 수요일")).toHaveFocus()
    expect(screen.getByRole("grid", { name: "2026년 10월" })).toBeVisible()

    await userEvent.keyboard("{Home}")
    expect(dayButton("2026년 10월 5일 월요일")).toHaveFocus()
    await userEvent.keyboard("{End}")
    expect(dayButton("2026년 10월 11일 일요일")).toHaveFocus()

    await userEvent.keyboard("{PageDown}")
    expect(dayButton("2026년 11월 11일 수요일")).toHaveFocus()
    expect(screen.getByRole("grid", { name: "2026년 11월" })).toBeVisible()

    await userEvent.keyboard("{Enter}")
    expect(onValueChange).toHaveBeenLastCalledWith(dateOf(2026, 11, 11))
  })

  it("제어형 value와 month를 따른다", async () => {
    const onMonthChange = vi.fn()
    render(
      <Calendar
        month={OCTOBER}
        value={dateOf(2026, 10, 12)}
        onMonthChange={onMonthChange}
      />,
    )
    expect(cellOf("2026년 10월 12일 월요일")).toHaveAttribute(
      "aria-selected",
      "true",
    )
    await userEvent.click(screen.getByRole("button", { name: "다음 달" }))
    expect(onMonthChange).toHaveBeenCalledWith(dateOf(2026, 11, 1))
    expect(screen.getByRole("grid", { name: "2026년 10월" })).toBeVisible()
  })

  it("머리 배치가 start이면 제목 뒤에 두 버튼을 모아 둔다", () => {
    render(<Calendar defaultMonth={OCTOBER} headerLayout="start" />)
    const [previous, next] = screen.getAllByRole("button").slice(0, 2)
    expect(previous).toHaveAccessibleName("이전 달")
    expect(next).toHaveAccessibleName("다음 달")
    expect(previous?.parentElement).toBe(next?.parentElement)
    expect(previous?.parentElement).toHaveClass("umc-calendar__nav")
  })
})
