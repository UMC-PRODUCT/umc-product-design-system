import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { TextArea } from "./TextArea.tsx"

describe("TextArea", () => {
  it("label과 textarea가 연결된다", () => {
    render(<TextArea label="내용" />)
    expect(screen.getByLabelText("내용")).toBeInTheDocument()
  })

  it("invalid이면 aria-invalid를 단다", () => {
    render(<TextArea label="내용" invalid errorMessage="필수 입력" />)
    expect(screen.getByLabelText("내용")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })

  it("required이면 * 표시를 렌더한다", () => {
    render(<TextArea label="내용" required />)
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument()
  })

  it("caption이 표시된다", () => {
    render(<TextArea label="내용" caption="500자 이내로 작성하세요" />)
    expect(screen.getByText("500자 이내로 작성하세요")).toBeInTheDocument()
  })

  it("invalid이고 errorMessage가 있으면 caption을 대체한다", () => {
    render(
      <TextArea
        label="내용"
        invalid
        errorMessage="필수 입력 항목입니다"
        caption="도움말"
      />,
    )
    expect(screen.queryByText("도움말")).not.toBeInTheDocument()
    expect(screen.getByText("필수 입력 항목입니다")).toBeInTheDocument()
  })
})
