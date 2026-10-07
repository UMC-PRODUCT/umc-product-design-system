import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Dimmed } from "./Dimmed.tsx"

describe("Dimmed", () => {
  it("기본값은 data-intensity=medium이고 umc-dimmed 클래스를 단다", () => {
    render(<Dimmed data-testid="dimmed" />)
    const el = screen.getByTestId("dimmed")
    expect(el).toHaveClass("umc-dimmed")
    expect(el).toHaveAttribute("data-intensity", "medium")
  })

  it("intensity prop을 data-intensity로 단다", () => {
    render(<Dimmed intensity="strong" data-testid="dimmed" />)
    expect(screen.getByTestId("dimmed")).toHaveAttribute(
      "data-intensity",
      "strong",
    )
  })

  it("클릭 핸들러를 전달한다", async () => {
    const onClick = vi.fn()
    render(<Dimmed onClick={onClick} data-testid="dimmed" />)
    await userEvent.click(screen.getByTestId("dimmed"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("className을 umc-dimmed 뒤에 붙인다", () => {
    render(<Dimmed className="extra" data-testid="dimmed" />)
    expect(screen.getByTestId("dimmed").className).toBe("umc-dimmed extra")
  })

  it("ref를 전달한다", () => {
    const ref = { current: null }
    render(<Dimmed ref={ref} data-testid="dimmed" />)
    expect(ref.current).toBe(screen.getByTestId("dimmed"))
  })
})
