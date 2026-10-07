"use client"

import { VerificationCodeField } from "@umc-product/react"

export function VerificationCodeFieldDefault() {
  return (
    <div data-spec-id="verification-code-field-lg-default">
      <VerificationCodeField
        label="인증번호"
        placeholder="숫자 6자리"
        maxLength={6}
        inputMode="numeric"
      />
    </div>
  )
}

export function VerificationCodeFieldWithTimer() {
  return (
    <VerificationCodeField
      label="인증번호"
      placeholder="숫자 6자리"
      timer={<span style={{ color: "#008a80" }}>3:00</span>}
      caption="인증번호가 발송되었습니다"
    />
  )
}

export function VerificationCodeFieldWithInfo() {
  return (
    <VerificationCodeField
      label="인증번호"
      infoSlot="인증번호는 3분 내에 입력해주세요"
    />
  )
}

export function VerificationCodeFieldInvalid() {
  return (
    <VerificationCodeField
      label="인증번호"
      invalid
      errorMessage="인증번호가 올바르지 않습니다"
    />
  )
}
