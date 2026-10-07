import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ScrollFog } from "./ScrollFog.tsx"

describe("ScrollFog", () => {
  it("기본값은 data-side=right이고 umc-scroll-fog 클래스를 단다", () => {
    render(<ScrollFog data-testid="fog" />)
    const el = screen.getByTestId("fog")
    expect(el).toHaveClass("umc-scroll-fog")
    expect(el).toHaveAttribute("data-side", "right")
  })

  it("side prop을 data-side로 단다", () => {
    render(<ScrollFog side="bottom" data-testid="fog" />)
    expect(screen.getByTestId("fog")).toHaveAttribute("data-side", "bottom")
  })

  it("aria-hidden=true를 항상 달아 보조 기술에서 숨긴다", () => {
    render(<ScrollFog data-testid="fog" />)
    expect(screen.getByTestId("fog")).toHaveAttribute("aria-hidden", "true")
  })

  it("className을 umc-scroll-fog 뒤에 붙인다", () => {
    render(<ScrollFog className="extra" data-testid="fog" />)
    expect(screen.getByTestId("fog").className).toBe("umc-scroll-fog extra")
  })

  it("ref를 전달한다", () => {
    const ref = { current: null }
    render(<ScrollFog ref={ref} data-testid="fog" />)
    expect(ref.current).toBe(screen.getByTestId("fog"))
  })

  it("top 방향을 지원한다", () => {
    render(<ScrollFog side="top" data-testid="fog" />)
    expect(screen.getByTestId("fog")).toHaveAttribute("data-side", "top")
  })

  it("left 방향을 지원한다", () => {
    render(<ScrollFog side="left" data-testid="fog" />)
    expect(screen.getByTestId("fog")).toHaveAttribute("data-side", "left")
  })
})
