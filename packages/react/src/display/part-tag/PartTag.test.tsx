import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { PartTag } from "./PartTag.tsx"

describe("PartTag", () => {
  it("기본 변형을 data 속성으로 단다", () => {
    render(<PartTag />)
    const tag = screen.getByText("PM")
    expect(tag).toHaveAttribute("data-part", "pm")
    expect(tag).toHaveAttribute("data-variant", "filled")
    expect(tag).toHaveAttribute("data-size", "sm")
    expect(tag).toHaveClass("umc-part-tag")
  })

  it("파트별 기본 레이블을 렌더한다", () => {
    const { rerender } = render(<PartTag part="pm" />)
    expect(screen.getByText("PM")).toBeInTheDocument()

    rerender(<PartTag part="design" />)
    expect(screen.getByText("Design")).toBeInTheDocument()

    rerender(<PartTag part="web-pe" />)
    expect(screen.getByText("Web PE")).toBeInTheDocument()

    rerender(<PartTag part="mobile-pe" />)
    expect(screen.getByText("Mobile PE")).toBeInTheDocument()
  })

  it("children이 있으면 기본 레이블 대신 쓴다", () => {
    render(<PartTag part="pm">PM 2기</PartTag>)
    expect(screen.getByText("PM 2기")).toBeInTheDocument()
    expect(screen.queryByText("PM")).not.toBeInTheDocument()
  })

  it("variant와 size를 data 속성으로 옮긴다", () => {
    render(<PartTag part="design" variant="outlined" size="lg" />)
    const tag = screen.getByText("Design")
    expect(tag).toHaveAttribute("data-part", "design")
    expect(tag).toHaveAttribute("data-variant", "outlined")
    expect(tag).toHaveAttribute("data-size", "lg")
  })

  it("className을 umc-part-tag 뒤에 붙이고 ref와 네이티브 속성을 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <PartTag ref={ref} className="ml-2" aria-label="파트 태그">
        PM
      </PartTag>,
    )
    const tag = screen.getByText("PM")
    expect(tag.className).toBe("umc-part-tag ml-2")
    expect(tag).toHaveAttribute("aria-label", "파트 태그")
    expect(ref.current).toBe(tag)
  })
})
