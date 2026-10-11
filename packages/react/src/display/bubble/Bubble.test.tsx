import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { Bubble } from "./Bubble.tsx"

describe("Bubble", () => {
  it("기본 direction이 incoming이고 data 속성으로 단다", () => {
    render(<Bubble>UMC PRODUCT 모여라</Bubble>)
    const bubble = screen.getByText("UMC PRODUCT 모여라").closest(".umc-bubble")
    expect(bubble).toHaveAttribute("data-direction", "incoming")
    expect(bubble).toHaveClass("umc-bubble")
  })

  it("children을 bubble body 안에 렌더한다", () => {
    render(<Bubble>안녕하세요</Bubble>)
    const body = document.querySelector(".umc-bubble__body")
    expect(body).toBeInTheDocument()
    expect(body).toHaveTextContent("안녕하세요")
  })

  it("incoming 방향에서 꼬리 SVG가 bubble body 앞에 온다", () => {
    render(<Bubble direction="incoming">텍스트</Bubble>)
    const wrapper = document.querySelector(".umc-bubble")
    const children = Array.from(wrapper?.children ?? [])
    expect(children[0]?.tagName).toBe("svg")
    expect(children[1]).toHaveClass("umc-bubble__body")
  })

  it("outgoing 방향에서 꼬리 SVG가 bubble body 뒤에 온다", () => {
    render(<Bubble direction="outgoing">텍스트</Bubble>)
    const wrapper = document.querySelector(".umc-bubble")
    const children = Array.from(wrapper?.children ?? [])
    expect(children[0]).toHaveClass("umc-bubble__body")
    expect(children[1]?.tagName).toBe("svg")
  })

  it("꼬리 SVG에 aria-hidden이 있다", () => {
    render(<Bubble>텍스트</Bubble>)
    const svg = document.querySelector(".umc-bubble__tail")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })

  it("direction을 data 속성으로 옮긴다", () => {
    render(<Bubble direction="outgoing">텍스트</Bubble>)
    const bubble = document.querySelector(".umc-bubble")
    expect(bubble).toHaveAttribute("data-direction", "outgoing")
  })

  it("className을 umc-bubble 뒤에 붙이고 ref와 네이티브 속성을 전달한다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Bubble ref={ref} className="mt-4" aria-label="말풍선">
        텍스트
      </Bubble>,
    )
    const bubble = document.querySelector(".umc-bubble")
    expect(bubble?.className).toBe("umc-bubble mt-4")
    expect(bubble).toHaveAttribute("aria-label", "말풍선")
    expect(ref.current).toBe(bubble)
  })
})
