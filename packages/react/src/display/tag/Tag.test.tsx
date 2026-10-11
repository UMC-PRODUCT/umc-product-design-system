import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { Tag } from "./Tag.tsx"

describe("Tag", () => {
  it("기본 data 속성이 피그마 기본 변형과 같다", () => {
    render(<Tag>태그</Tag>)
    const el = screen.getByText("태그")
    expect(el).toHaveAttribute("data-variant", "weak")
    expect(el).toHaveAttribute("data-color", "brand")
    expect(el).toHaveAttribute("data-size", "sm")
    expect(el).toHaveClass("umc-tag")
  })

  it("children을 렌더링한다", () => {
    render(<Tag>UMC</Tag>)
    expect(screen.getByText("UMC")).toBeInTheDocument()
  })

  it("variant, color, size를 data 속성으로 옮긴다", () => {
    render(
      <Tag variant="fill" color="error" size="lg">
        오류
      </Tag>,
    )
    const el = screen.getByText("오류")
    expect(el).toHaveAttribute("data-variant", "fill")
    expect(el).toHaveAttribute("data-color", "error")
    expect(el).toHaveAttribute("data-size", "lg")
  })

  it("className을 umc-tag 뒤에 붙인다", () => {
    render(<Tag className="ml-2">태그</Tag>)
    const el = screen.getByText("태그")
    expect(el.className).toBe("umc-tag ml-2")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Tag ref={ref}>태그</Tag>)
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("네이티브 span 속성을 전달한다", () => {
    render(<Tag aria-label="기간 태그">2기</Tag>)
    const el = screen.getByText("2기")
    expect(el).toHaveAttribute("aria-label", "기간 태그")
  })
})
