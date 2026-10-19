import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { TextArea } from "./TextArea.tsx"

const counterOf = () => document.querySelector(".umc-text-area__counter")

describe("TextArea", () => {
  it("label과 textarea가 연결된다", () => {
    render(<TextArea label="공지 내용" />)
    expect(screen.getByLabelText("공지 내용").tagName).toBe("TEXTAREA")
  })

  it("maxLength를 넘기면 글자 수를 현재/최대로 보여 준다", () => {
    render(<TextArea aria-label="내용" maxLength={300} defaultValue="안녕" />)
    expect(counterOf()).toHaveTextContent("2/300")
  })

  it("입력하면 글자 수가 늘어난다", async () => {
    render(<TextArea aria-label="내용" maxLength={300} />)
    await userEvent.type(screen.getByLabelText("내용"), "공지")
    expect(counterOf()).toHaveTextContent("2/300")
  })

  it("value를 넘기면 그 길이를 센다", () => {
    render(
      <TextArea
        aria-label="내용"
        maxLength={10}
        value="다섯 글자"
        onChange={() => {}}
      />,
    )
    expect(counterOf()).toHaveTextContent("5/10")
  })

  it("maxLength가 없으면 글자 수를 그리지 않는다", () => {
    render(<TextArea aria-label="내용" defaultValue="안녕" />)
    expect(counterOf()).toBeNull()
  })

  it("disabled여도 글자 수를 보여 준다", () => {
    render(<TextArea aria-label="내용" maxLength={300} disabled />)
    expect(counterOf()).toHaveTextContent("0/300")
    expect(document.querySelector(".umc-text-area")).toHaveAttribute(
      "data-disabled",
    )
  })

  it("onChange를 그대로 부른다", async () => {
    const onChange = vi.fn()
    render(<TextArea aria-label="내용" maxLength={300} onChange={onChange} />)
    await userEvent.type(screen.getByLabelText("내용"), "가")
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("invalid이면 aria-invalid와 오류 문구를 단다", () => {
    render(
      <TextArea label="공지 내용" invalid errorMessage="내용을 적어 주세요" />,
    )
    expect(screen.getByLabelText("공지 내용")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
    expect(screen.getByText("내용을 적어 주세요")).toBeInTheDocument()
    expect(document.querySelector(".umc-text-area")).toHaveAttribute(
      "data-invalid",
    )
  })

  it("ref는 textarea를 가리킨다", () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextArea aria-label="내용" ref={ref} />)
    expect(ref.current).toBe(screen.getByLabelText("내용"))
  })

  it("className은 바깥 틀에 붙는다", () => {
    render(<TextArea aria-label="내용" className="mt-4" />)
    expect(document.querySelector(".umc-field")).toHaveClass("mt-4")
  })

  it("바깥 틀에 높이 변수를 받는 클래스를 단다", () => {
    render(
      <TextArea
        aria-label="내용"
        className="[--umc-text-area-min-height:240px]"
      />,
    )
    expect(document.querySelector(".umc-field")).toHaveClass(
      "umc-text-area-field",
      "[--umc-text-area-min-height:240px]",
    )
  })
})
