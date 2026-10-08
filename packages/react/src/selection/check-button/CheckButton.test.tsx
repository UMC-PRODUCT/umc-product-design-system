import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CheckButton } from "./CheckButton.tsx"

describe("CheckButton", () => {
  it("테두리 없는 체크를 체크박스 역할로 그린다", () => {
    render(<CheckButton aria-label="공지 읽음" />)
    const checkbox = screen.getByRole("checkbox", { name: "공지 읽음" })
    expect(checkbox).toHaveClass("umc-check-button")
    expect(checkbox).toHaveAttribute("aria-checked", "false")
    expect(checkbox.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
  })

  it("누르면 체크가 바뀌고 새 값을 넘긴다", async () => {
    const onCheckedChange = vi.fn()
    render(
      <CheckButton aria-label="공지 읽음" onCheckedChange={onCheckedChange} />,
    )
    await userEvent.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-checked", "")
  })

  it("비활성이면 바뀌지 않는다", async () => {
    const onCheckedChange = vi.fn()
    render(
      <CheckButton
        aria-label="공지 읽음"
        disabled
        onCheckedChange={onCheckedChange}
      />,
    )
    await userEvent.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
