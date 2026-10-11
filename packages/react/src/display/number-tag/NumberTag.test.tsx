import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { NumberTag } from "./NumberTag.tsx"

describe("NumberTag", () => {
  it("기본 data 속성이 피그마 기본 변형과 같다", () => {
    render(<NumberTag>1</NumberTag>)
    const el = screen.getByText("1")
    expect(el).toHaveAttribute("data-color", "neutral")
    expect(el).toHaveAttribute("data-variant", "primary")
    expect(el).toHaveClass("umc-number-tag")
  })

  it("children을 렌더링한다", () => {
    render(<NumberTag>R</NumberTag>)
    expect(screen.getByText("R")).toBeInTheDocument()
  })

  it("color, variant를 data 속성으로 옮긴다", () => {
    render(
      <NumberTag color="brand" variant="tertiary">
        3
      </NumberTag>,
    )
    const el = screen.getByText("3")
    expect(el).toHaveAttribute("data-color", "brand")
    expect(el).toHaveAttribute("data-variant", "tertiary")
  })

  it("className을 umc-number-tag 뒤에 붙인다", () => {
    render(<NumberTag className="ml-1">2</NumberTag>)
    const el = screen.getByText("2")
    expect(el.className).toBe("umc-number-tag ml-1")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<NumberTag ref={ref}>1</NumberTag>)
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("네이티브 span 속성을 전달한다", () => {
    render(<NumberTag aria-label="알림 개수">3</NumberTag>)
    const el = screen.getByText("3")
    expect(el).toHaveAttribute("aria-label", "알림 개수")
  })
})
