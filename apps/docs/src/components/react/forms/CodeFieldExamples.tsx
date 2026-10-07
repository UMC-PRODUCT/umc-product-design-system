"use client"

import { CodeField } from "@umc-product/react"

export function CodeFieldDefault() {
  return (
    <div>
      <div className="umc-code-field" style={{ width: "240px" }}>
        <input
          className="umc-code-field__slot"
          data-spec-id="code-field-slot-default"
          style={{ flex: "none", width: "40px" }}
          readOnly
          value="1"
        />
      </div>
    </div>
  )
}

export function CodeFieldInvalidSlot() {
  return (
    <div>
      <div className="umc-code-field" style={{ width: "240px" }}>
        <input
          className="umc-code-field__slot umc-code-field__slot--invalid"
          data-spec-id="code-field-slot-invalid"
          style={{ flex: "none", width: "40px" }}
          readOnly
          value="X"
        />
      </div>
    </div>
  )
}

export function CodeFieldSix() {
  return <CodeField label="인증코드" length={6} />
}

export function CodeFieldFour() {
  return <CodeField label="PIN 번호" length={4} mask />
}

export function CodeFieldInvalid() {
  return (
    <CodeField
      label="인증코드"
      length={6}
      invalid
      errorMessage="인증코드가 올바르지 않습니다"
    />
  )
}
