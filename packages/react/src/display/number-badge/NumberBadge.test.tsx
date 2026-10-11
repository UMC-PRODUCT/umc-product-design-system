import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { NumberBadge } from "./NumberBadge.tsx"

describe("NumberBadge", () => {
  it("기본 data 속성이 피그마 기본 변형과 같다", () => {
    render(<NumberBadge>1</NumberBadge>)
    const el = screen.getByText("1")
    expect(el).toHaveAttribute("data-color", "brand")
    expect(el).toHaveAttribute("data-variant", "fill")
    expect(el).toHaveAttribute("data-size", "sm")
    expect(el).toHaveClass("umc-number-badge")
  })

  it("children을 렌더링한다", () => {
    render(<NumberBadge>99</NumberBadge>)
    expect(screen.getByText("99")).toBeInTheDocument()
  })

  it("color, variant, size를 data 속성으로 옮긴다", () => {
    render(
      <NumberBadge color="error" variant="weak" size="md">
        5
      </NumberBadge>,
    )
    const el = screen.getByText("5")
    expect(el).toHaveAttribute("data-color", "error")
    expect(el).toHaveAttribute("data-variant", "weak")
    expect(el).toHaveAttribute("data-size", "md")
  })

  it("className을 umc-number-badge 뒤에 붙인다", () => {
    render(<NumberBadge className="ml-1">3</NumberBadge>)
    const el = screen.getByText("3")
    expect(el.className).toBe("umc-number-badge ml-1")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<NumberBadge ref={ref}>2</NumberBadge>)
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("네이티브 span 속성을 전달한다", () => {
    render(<NumberBadge aria-label="알림 3개">3</NumberBadge>)
    const el = screen.getByText("3")
    expect(el).toHaveAttribute("aria-label", "알림 3개")
  })
})
