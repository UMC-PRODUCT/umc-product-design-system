"use client"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { TextFieldLine } from "./TextFieldLine.tsx"

describe("TextFieldLine", () => {
  it("label과 input이 연결되고 바깥 틀에 줄 클래스를 단다", () => {
    render(<TextFieldLine label="이름" className="mt-4" />)
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
    expect(document.querySelector(".umc-field")).toHaveClass(
      "umc-text-field-line",
      "mt-4",
    )
  })

  it("입력은 밑줄 칸 안에 있다", () => {
    render(<TextFieldLine label="이름" />)
    expect(
      screen.getByLabelText("이름").closest(".umc-text-field-line-field"),
    ).not.toBeNull()
  })

  it("value가 없으면 지우기 버튼이 없다", () => {
    render(<TextFieldLine label="이름" />)
    expect(
      screen.queryByRole("button", { name: "입력 내용 지우기" }),
    ).not.toBeInTheDocument()
  })

  it("비제어 입력에서 지우기 버튼이 값을 비우고 onChange를 부른다", async () => {
    const onChange = vi.fn()
    const ref = createRef<HTMLInputElement>()
    render(
      <TextFieldLine
        label="이름"
        defaultValue="초기값"
        onChange={onChange}
        ref={ref}
      />,
    )
    await userEvent.click(
      screen.getByRole("button", { name: "입력 내용 지우기" }),
    )
    expect(onChange).toHaveBeenCalled()
    expect(ref.current?.value).toBe("")
  })

  it("clearable={false}이면 value가 있어도 지우기 버튼이 없다", () => {
    render(
      <TextFieldLine
        label="이름"
        clearable={false}
        value="내용"
        onChange={() => {}}
      />,
    )
    expect(
      screen.queryByRole("button", { name: "입력 내용 지우기" }),
    ).not.toBeInTheDocument()
  })

  it("password type이면 비밀번호 보기 토글이 있고 지우기 버튼은 없다", async () => {
    render(
      <TextFieldLine label="비밀번호" type="password" defaultValue="umc1234" />,
    )
    expect(
      screen.queryByRole("button", { name: "입력 내용 지우기" }),
    ).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: "비밀번호 표시" }))
    expect(screen.getByLabelText("비밀번호")).toHaveAttribute("type", "text")
  })

  it("invalid이면 aria-invalid와 오류 문구를 달고 칸에 data-invalid를 단다", () => {
    render(<TextFieldLine label="이름" invalid errorMessage="필수 입력" />)
    expect(screen.getByLabelText("이름")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
    expect(screen.getByText("필수 입력")).toBeInTheDocument()
    expect(
      document.querySelector(".umc-text-field-line-field"),
    ).toHaveAttribute("data-invalid")
  })

  it("disabled이면 칸에 data-disabled를 달고 지우기 버튼을 숨긴다", () => {
    render(<TextFieldLine label="이름" defaultValue="값" disabled />)
    expect(screen.getByLabelText("이름")).toBeDisabled()
    expect(
      document.querySelector(".umc-text-field-line-field"),
    ).toHaveAttribute("data-disabled")
    expect(
      screen.queryByRole("button", { name: "입력 내용 지우기" }),
    ).not.toBeInTheDocument()
  })
})
