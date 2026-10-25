import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { TextFieldLineField } from "./TextFieldLineField.tsx"

describe("TextFieldLineField", () => {
  it("기본 클래스를 단다", () => {
    render(<TextFieldLineField data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveClass("umc-text-field-line-field")
  })

  it("invalid이면 data-invalid 속성을 단다", () => {
    render(<TextFieldLineField invalid data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("data-invalid")
  })

  it("disabled이면 data-disabled 속성을 단다", () => {
    render(<TextFieldLineField disabled data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveAttribute("data-disabled")
  })

  it("children을 렌더하고 className을 덧붙인다", () => {
    render(
      <TextFieldLineField className="mt-4" data-testid="field">
        <span>내용</span>
      </TextFieldLineField>,
    )
    expect(screen.getByText("내용")).toBeInTheDocument()
    expect(screen.getByTestId("field")).toHaveClass("mt-4")
  })
})
