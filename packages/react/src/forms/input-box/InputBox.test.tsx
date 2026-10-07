import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { InputBox } from "./InputBox.tsx"

describe("InputBox", () => {
  it("기본 클래스와 data 속성을 단다", () => {
    render(<InputBox data-testid="box" />)
    const box = screen.getByTestId("box")
    expect(box).toHaveClass("umc-input-box")
    expect(box).toHaveAttribute("data-size", "lg")
  })

  it("size md를 data-size로 단다", () => {
    render(<InputBox size="md" data-testid="box" />)
    expect(screen.getByTestId("box")).toHaveAttribute("data-size", "md")
  })

  it("invalid이면 data-invalid 속성을 단다", () => {
    render(<InputBox invalid data-testid="box" />)
    expect(screen.getByTestId("box")).toHaveAttribute("data-invalid")
  })

  it("disabled이면 data-disabled 속성을 단다", () => {
    render(<InputBox disabled data-testid="box" />)
    expect(screen.getByTestId("box")).toHaveAttribute("data-disabled")
  })

  it("children을 렌더한다", () => {
    render(
      <InputBox>
        <span>내용</span>
      </InputBox>,
    )
    expect(screen.getByText("내용")).toBeInTheDocument()
  })
})
