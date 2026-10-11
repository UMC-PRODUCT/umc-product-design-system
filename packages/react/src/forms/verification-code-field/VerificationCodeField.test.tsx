import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { VerificationCodeField } from "./VerificationCodeField.tsx"

describe("VerificationCodeField", () => {
  it("label과 input이 연결된다", () => {
    render(<VerificationCodeField label="인증번호" />)
    expect(screen.getByLabelText("인증번호")).toBeInTheDocument()
  })

  it("timer slot이 표시된다", () => {
    render(<VerificationCodeField label="인증번호" timer="3:00" />)
    expect(screen.getByText("3:00")).toBeInTheDocument()
  })

  it("info가 표시된다", () => {
    render(
      <VerificationCodeField label="인증번호" info="인증번호를 입력하세요" />,
    )
    expect(screen.getByText("인증번호를 입력하세요")).toBeInTheDocument()
  })

  it("invalid이면 aria-invalid를 단다", () => {
    render(
      <VerificationCodeField
        label="인증번호"
        invalid
        errorMessage="인증번호가 틀렸습니다"
      />,
    )
    expect(screen.getByLabelText("인증번호")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })

  it("errorMessage가 표시된다", () => {
    render(
      <VerificationCodeField
        label="인증번호"
        invalid
        errorMessage="인증번호가 틀렸습니다"
      />,
    )
    expect(screen.getByText("인증번호가 틀렸습니다")).toBeInTheDocument()
  })

  it("required이면 * 표시를 렌더한다", () => {
    render(<VerificationCodeField label="인증번호" required />)
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument()
  })
})
