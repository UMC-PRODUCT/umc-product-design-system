"use client"

import { InputBox, TextField } from "@umc-product/react"

export function TextFieldDefault() {
  return (
    <div data-spec-id="text-field-lg-default">
      <TextField label="이름" placeholder="홍길동" />
    </div>
  )
}

export function TextFieldInputFont() {
  return (
    <InputBox data-spec-id="text-field-input-font">
      <input className="umc-input-box__input" defaultValue="입력 글꼴" />
    </InputBox>
  )
}

export function TextFieldError() {
  return (
    <div data-spec-id="text-field-lg-error">
      <TextField
        label="이메일"
        invalid
        errorMessage="올바른 이메일 형식이 아닙니다"
        defaultValue="invalid"
      />
    </div>
  )
}

export function TextFieldDisabled() {
  return (
    <div data-spec-id="text-field-lg-disabled">
      <TextField label="이름" disabled defaultValue="홍길동" />
    </div>
  )
}

export function TextFieldPassword() {
  return <TextField label="비밀번호" type="password" placeholder="••••••••" />
}

export function TextFieldUnit() {
  return <TextField label="금액" unit="원" placeholder="0" type="number" />
}

export function TextFieldSizes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField label="Lg (기본)" size="lg" placeholder="48px 높이" />
      <TextField label="Md" size="md" placeholder="40px 높이" />
    </div>
  )
}
