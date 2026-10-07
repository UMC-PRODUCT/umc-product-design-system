"use client"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { TextField } from "./TextField.tsx"

describe("TextField", () => {
  it("label과 input이 연결된다", () => {
    render(<TextField label="이름" />)
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
  })

  it("value가 없으면 지우기 버튼이 없다", () => {
    render(<TextField label="이름" clearable />)
    expect(
      screen.queryByRole("button", { name: "입력 내용 지우기" }),
    ).not.toBeInTheDocument()
  })

  it("clearable={false}이면 value가 있어도 지우기 버튼이 없다", () => {
    render(
      <TextField
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

  it("비제어 입력에서 지우기 버튼이 onChange를 호출한다", async () => {
    const onChange = vi.fn()
    const ref = createRef<HTMLInputElement>()
    render(
      <TextField
        label="이름"
        defaultValue="초기값"
        onChange={onChange}
        ref={ref}
      />,
    )
    const clearBtn = screen.getByRole("button", { name: "입력 내용 지우기" })
    await userEvent.click(clearBtn)
    expect(onChange).toHaveBeenCalled()
    expect(ref.current?.value).toBe("")
  })

  it("password type이면 비밀번호 보기 토글이 렌더된다", async () => {
    render(<TextField label="비밀번호" type="password" />)
    const toggle = screen.getByRole("button", { name: "비밀번호 표시" })
    expect(toggle).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(
      screen.getByRole("button", { name: "비밀번호 숨기기" }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText("비밀번호")).toHaveAttribute("type", "text")
    await userEvent.click(
      screen.getByRole("button", { name: "비밀번호 숨기기" }),
    )
    expect(screen.getByLabelText("비밀번호")).toHaveAttribute(
      "type",
      "password",
    )
  })

  it("unit을 렌더한다", () => {
    render(<TextField label="금액" unit="원" />)
    expect(screen.getByText("원")).toBeInTheDocument()
  })

  it("invalid이면 aria-invalid를 단다", () => {
    render(<TextField label="이름" invalid errorMessage="필수 입력" />)
    expect(screen.getByLabelText("이름")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })

  it("invalid이고 errorMessage가 있으면 errorMessage가 표시되고 aria-describedby로 연결된다", () => {
    render(
      <TextField label="이름" invalid errorMessage="필수 입력 항목입니다" />,
    )
    const error = screen.getByText("필수 입력 항목입니다")
    expect(error).toBeInTheDocument()
    const input = screen.getByLabelText("이름")
    expect(input.getAttribute("aria-describedby")).toBeTruthy()
  })
})
