import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { StatusTag } from "./StatusTag.tsx"

describe("StatusTag", () => {
  it("기본 data-color는 brand다", () => {
    render(<StatusTag>진행 중</StatusTag>)
    const el = screen.getByText("진행 중").closest(".umc-status-tag")
    expect(el).toHaveAttribute("data-color", "brand")
  })

  it("children을 렌더링한다", () => {
    render(<StatusTag>완료</StatusTag>)
    expect(screen.getByText("완료")).toBeInTheDocument()
  })

  it("color를 data-color 속성으로 옮긴다", () => {
    render(<StatusTag color="error">오류</StatusTag>)
    const el = screen.getByText("오류").closest(".umc-status-tag")
    expect(el).toHaveAttribute("data-color", "error")
  })

  it("dot 요소가 aria-hidden으로 보조기기에서 숨겨진다", () => {
    render(<StatusTag>진행 중</StatusTag>)
    const dot = document.querySelector(".umc-status-tag__dot")
    expect(dot).toHaveAttribute("aria-hidden", "true")
  })

  it("className을 umc-status-tag 뒤에 붙인다", () => {
    render(<StatusTag className="mt-1">태그</StatusTag>)
    const el = document.querySelector(".umc-status-tag")
    expect(el?.className).toBe("umc-status-tag mt-1")
  })

  it("ref를 span 요소에 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<StatusTag ref={ref}>태그</StatusTag>)
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("네이티브 span 속성을 전달한다", () => {
    render(<StatusTag aria-label="상태 태그">완료</StatusTag>)
    const el = document.querySelector(".umc-status-tag")
    expect(el).toHaveAttribute("aria-label", "상태 태그")
  })
})
