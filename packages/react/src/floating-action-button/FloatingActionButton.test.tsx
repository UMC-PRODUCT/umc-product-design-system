import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddIcon } from "@umc-product/icons"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { FloatingActionButton } from "./FloatingActionButton.tsx"

describe("FloatingActionButton", () => {
  it("aria-label을 이름으로 가진 버튼을 그리고 아이콘은 숨긴다", () => {
    render(
      <FloatingActionButton
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
      />,
    )
    const button = screen.getByRole("button", { name: "질문 추가" })
    expect(button).toHaveAttribute("type", "button")
    expect(
      button.querySelector(".umc-floating-action-button__icon"),
    ).toHaveAttribute("aria-hidden", "true")
  })

  it("누르면 onClick을 부르고, disabled이면 부르지 않는다", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(
      <FloatingActionButton
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
        onClick={onClick}
      />,
    )
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <FloatingActionButton
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
        onClick={onClick}
        disabled
      />,
    )
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("className과 ref를 버튼에 붙인다", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <FloatingActionButton
        ref={ref}
        icon={<AddIcon weight="fill" />}
        aria-label="질문 추가"
        className="fixed"
      />,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveClass("umc-floating-action-button", "fixed")
    expect(ref.current).toBe(button)
  })
})
