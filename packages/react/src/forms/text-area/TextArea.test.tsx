import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

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

  it("textarea 요소에 ref와 onChange를 그대로 연결한다", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextArea label="내용" ref={ref} onChange={onChange} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    await user.type(screen.getByLabelText("내용"), "안녕")
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0]?.[0].target).toBe(ref.current)
  })

  it("기본 2줄 높이로 시작한다", () => {
    render(<TextArea label="내용" />)
    expect(screen.getByLabelText("내용")).toHaveAttribute("rows", "2")
  })
})
