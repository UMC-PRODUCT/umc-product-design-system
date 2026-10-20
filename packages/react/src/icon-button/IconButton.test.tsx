import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { IconButton } from "./IconButton.tsx"

describe("IconButton", () => {
  it("기본은 type=button이고 피그마 기본 변형(Primary, Weak, Md)을 data 속성으로 단다", () => {
    render(<IconButton icon={<svg />} aria-label="닫기" />)
    const button = screen.getByRole("button", { name: "닫기" })
    expect(button).toHaveAttribute("type", "button")
    expect(button).toHaveClass("umc-icon-button")
    expect(button).toHaveAttribute("data-color", "primary")
    expect(button).toHaveAttribute("data-variant", "weak")
    expect(button).toHaveAttribute("data-size", "md")
  })

  it("아이콘은 화면 낭독기에서 숨긴다", () => {
    render(<IconButton icon={<svg data-testid="icon" />} aria-label="닫기" />)
    const wrapper = screen.getByTestId("icon").parentElement
    expect(wrapper).toHaveClass("umc-icon-button__icon")
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("aria-labelledby로 이름을 붙일 수 있다", () => {
    render(
      <>
        <span id="settings-label">표 설정</span>
        <IconButton icon={<svg />} aria-labelledby="settings-label" />
      </>,
    )
    expect(screen.getByRole("button", { name: "표 설정" })).toBeInTheDocument()
  })

  it("className을 umc-icon-button 뒤에 붙이고 네이티브 속성과 ref를 넘긴다", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <IconButton
        ref={ref}
        icon={<svg />}
        aria-label="닫기"
        className="ml-auto"
        aria-expanded="false"
        color="error"
        variant="fill"
        size="lg"
      />,
    )
    const button = screen.getByRole("button", { name: "닫기" })
    expect(button.className).toBe("umc-icon-button ml-auto")
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(button).toHaveAttribute("data-color", "error")
    expect(button).toHaveAttribute("data-variant", "fill")
    expect(button).toHaveAttribute("data-size", "lg")
    expect(ref.current).toBe(button)
  })

  it("사용자가 준 data 속성이 스타일용 속성을 덮어쓰지 못한다", () => {
    render(
      <IconButton
        icon={<svg />}
        aria-label="닫기"
        size="lg"
        data-size="xl"
        data-color="blue"
      />,
    )
    const button = screen.getByRole("button", { name: "닫기" })
    expect(button).toHaveAttribute("data-size", "lg")
    expect(button).toHaveAttribute("data-color", "primary")
  })

  it("누르면 onClick을 부르고, 비활성이면 부르지 않는다", async () => {
    const onClick = vi.fn()
    const { rerender } = render(
      <IconButton icon={<svg />} aria-label="닫기" onClick={onClick} />,
    )
    await userEvent.click(screen.getByRole("button", { name: "닫기" }))
    expect(onClick).toHaveBeenCalledTimes(1)
    rerender(
      <IconButton
        icon={<svg />}
        aria-label="닫기"
        onClick={onClick}
        disabled
      />,
    )
    await userEvent.click(screen.getByRole("button", { name: "닫기" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
