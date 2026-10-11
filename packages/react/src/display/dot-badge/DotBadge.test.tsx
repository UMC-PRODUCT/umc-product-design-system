import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { DotBadge } from "./DotBadge.tsx"

describe("DotBadge", () => {
  it("기본 data 속성이 피그마 기본 변형과 같다", () => {
    const { container } = render(<DotBadge />)
    const el = container.querySelector(".umc-dot-badge")
    expect(el).toHaveAttribute("data-color", "brand")
    expect(el).toHaveAttribute("data-size", "sm")
  })

  it("aria-label이 없으면 aria-hidden이 true다", () => {
    const { container } = render(<DotBadge />)
    const el = container.querySelector(".umc-dot-badge")
    expect(el).toHaveAttribute("aria-hidden", "true")
    expect(el).not.toHaveAttribute("role")
  })

  it("aria-label이 있으면 role이 img이고 aria-hidden이 없다", () => {
    render(<DotBadge aria-label="새 알림" />)
    const el = screen.getByRole("img", { name: "새 알림" })
    expect(el).toBeInTheDocument()
    expect(el).not.toHaveAttribute("aria-hidden")
  })

  it("aria-labelledby가 있으면 role이 img이고 aria-hidden이 없다", () => {
    const { container } = render(
      <>
        <span id="badge-label">긴급</span>
        <DotBadge aria-labelledby="badge-label" />
      </>,
    )
    const el = container.querySelector(".umc-dot-badge")
    expect(el).toHaveAttribute("role", "img")
    expect(el).not.toHaveAttribute("aria-hidden")
  })

  it("color와 size를 data 속성으로 옮긴다", () => {
    const { container } = render(<DotBadge color="error" size="md" />)
    const el = container.querySelector(".umc-dot-badge")
    expect(el).toHaveAttribute("data-color", "error")
    expect(el).toHaveAttribute("data-size", "md")
  })

  it("className을 umc-dot-badge 뒤에 붙인다", () => {
    const { container } = render(<DotBadge className="ml-1" />)
    const el = container.querySelector(".umc-dot-badge")
    expect(el?.className).toBe("umc-dot-badge ml-1")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    const { container } = render(<DotBadge ref={ref} />)
    expect(ref.current).toBe(container.querySelector(".umc-dot-badge"))
    expect(ref.current?.tagName).toBe("SPAN")
  })
})
