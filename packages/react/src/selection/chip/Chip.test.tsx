import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { Chip } from "./Chip.tsx"

describe("Chip", () => {
  it("기본 type은 button이다", () => {
    render(<Chip>필터</Chip>)
    expect(screen.getByRole("button", { name: "필터" })).toHaveAttribute(
      "type",
      "button",
    )
  })

  it("selected를 넘기지 않으면 aria-pressed가 없다", () => {
    render(<Chip>필터</Chip>)
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed")
  })

  it("selected=true이면 aria-pressed=true다", () => {
    render(<Chip selected>필터</Chip>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true")
  })

  it("selected=false이면 aria-pressed=false다", () => {
    render(<Chip selected={false}>필터</Chip>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false")
  })

  it("aria-haspopup이 있으면 aria-pressed를 달지 않는다", () => {
    render(
      <Chip selected aria-haspopup="menu">
        필터
      </Chip>,
    )
    const button = screen.getByRole("button")
    expect(button).not.toHaveAttribute("aria-pressed")
    expect(button).toHaveAttribute("aria-haspopup", "menu")
  })

  it("selected=true이면 data-selected가 있다", () => {
    render(<Chip selected>필터</Chip>)
    expect(screen.getByRole("button")).toHaveAttribute("data-selected")
  })

  it("selected=false이면 data-selected가 없다", () => {
    render(<Chip selected={false}>필터</Chip>)
    expect(screen.getByRole("button")).not.toHaveAttribute("data-selected")
  })

  it("selected가 없으면 data-selected가 없다", () => {
    render(<Chip>필터</Chip>)
    expect(screen.getByRole("button")).not.toHaveAttribute("data-selected")
  })

  it("leadingIcon은 aria-hidden 래퍼로 렌더된다", () => {
    render(<Chip leadingIcon={<svg data-testid="icon" />}>필터</Chip>)
    const icon = screen.getByTestId("icon")
    const wrapper = icon.closest(".umc-chip__icon")
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("trailingIcon은 aria-hidden 래퍼로 렌더된다", () => {
    render(<Chip trailingIcon={<svg data-testid="icon" />}>필터</Chip>)
    const icon = screen.getByTestId("icon")
    const wrapper = icon.closest(".umc-chip__icon")
    expect(wrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("ref를 button 엘리먼트에 전달한다", () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Chip ref={ref}>필터</Chip>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("disabled이면 클릭이 일어나지 않는다", async () => {
    const onClick = vi.fn()
    render(
      <Chip disabled onClick={onClick}>
        필터
      </Chip>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("data-variant, data-color, data-size 속성을 붙인다", () => {
    render(
      <Chip variant="fill" color="neutral" size="md">
        필터
      </Chip>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("data-variant", "fill")
    expect(button).toHaveAttribute("data-color", "neutral")
    expect(button).toHaveAttribute("data-size", "md")
  })

  it("메뉴 트리거로 쓸 때 aria-haspopup을 전달받는다", () => {
    render(
      <Chip aria-haspopup="menu" aria-expanded={false}>
        더 보기
      </Chip>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-haspopup", "menu")
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("className을 기본 클래스와 합친다", () => {
    render(<Chip className="my-class">필터</Chip>)
    expect(screen.getByRole("button")).toHaveClass("umc-chip", "my-class")
  })
})
