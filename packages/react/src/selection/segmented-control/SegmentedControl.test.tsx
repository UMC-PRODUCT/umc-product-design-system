import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SegmentedControl } from "./SegmentedControl.tsx"

const ITEMS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "done", label: "완료" },
] as const

describe("SegmentedControl", () => {
  it("radiogroup 역할을 가진다", () => {
    render(<SegmentedControl items={[...ITEMS]} aria-label="상태 필터" />)
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("각 항목은 radio 역할을 가진다", () => {
    render(<SegmentedControl items={[...ITEMS]} aria-label="상태 필터" />)
    expect(screen.getAllByRole("radio")).toHaveLength(3)
  })

  it("항목을 클릭하면 onValueChange가 호출된다", async () => {
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        items={[...ITEMS]}
        aria-label="상태 필터"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("radio", { name: "진행 중" }))
    expect(onValueChange).toHaveBeenCalledWith("active")
  })

  it("value prop으로 선택 상태를 제어한다", () => {
    render(
      <SegmentedControl
        items={[...ITEMS]}
        aria-label="상태 필터"
        value="active"
      />,
    )
    expect(screen.getByRole("radio", { name: "진행 중" })).toHaveAttribute(
      "data-checked",
      "",
    )
    expect(screen.getByRole("radio", { name: "전체" })).toHaveAttribute(
      "data-unchecked",
      "",
    )
  })

  it("defaultValue로 초기 선택을 지정한다", () => {
    render(
      <SegmentedControl
        items={[...ITEMS]}
        aria-label="상태 필터"
        defaultValue="done"
      />,
    )
    expect(screen.getByRole("radio", { name: "완료" })).toHaveAttribute(
      "data-checked",
      "",
    )
  })

  it("umc-segmented-control 클래스를 가진다", () => {
    render(<SegmentedControl items={[...ITEMS]} aria-label="상태 필터" />)
    expect(screen.getByRole("radiogroup")).toHaveClass("umc-segmented-control")
  })
})
