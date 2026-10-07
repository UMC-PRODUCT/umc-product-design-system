import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Field, FieldControl } from "./Field.tsx"

describe("Field", () => {
  it("label이 컨트롤과 연결된다", () => {
    render(
      <Field label="이름">
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
  })

  it("invalid이면 aria-invalid 속성이 붙는다", () => {
    render(
      <Field label="이름" invalid>
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByLabelText("이름")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })

  it("invalid이고 errorMessage가 있으면 caption을 대체하고 aria-describedby로 연결된다", () => {
    render(
      <Field
        label="이름"
        invalid
        errorMessage="필수 입력 항목입니다"
        caption="3글자 이상 입력하세요"
      >
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.queryByText("3글자 이상 입력하세요")).not.toBeInTheDocument()
    const error = screen.getByText("필수 입력 항목입니다")
    expect(error).toBeInTheDocument()
    const input = screen.getByLabelText("이름")
    expect(input).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining(error.id),
    )
  })

  it("required이면 * 표시를 렌더한다", () => {
    render(
      <Field label="이름" required>
        <FieldControl render={<input />} />
      </Field>,
    )
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument()
  })

  it("invalid이지만 errorMessage가 없으면 caption이 오류 색으로 표시된다", () => {
    render(
      <Field label="이름" invalid caption="도움말">
        <FieldControl render={<input />} />
      </Field>,
    )
    const caption = screen.getByText("도움말")
    expect(caption).toBeInTheDocument()
    expect(caption).toHaveAttribute("data-tone", "error")
  })
})
