"use client"

import { Field, FieldControl } from "@umc-product/react"

export function FieldDefault() {
  return (
    <Field label="이름" caption="20자 이내로 입력하세요">
      <FieldControl render={<input placeholder="홍길동" />} />
    </Field>
  )
}

export function FieldLabelExample() {
  return (
    <span className="umc-field__label" data-spec-id="field-label">
      레이블 예시
    </span>
  )
}

export function FieldCaptionExample() {
  return (
    <span className="umc-field__caption" data-spec-id="field-caption">
      도움말 텍스트
    </span>
  )
}

export function FieldErrorCaptionExample() {
  return (
    <span
      className="umc-field__caption umc-field__caption--error"
      data-spec-id="field-error-caption"
    >
      오류 메시지
    </span>
  )
}

export function FieldRequired() {
  return (
    <Field label="이메일" required caption="올바른 이메일 형식으로 입력하세요">
      <FieldControl
        render={<input type="email" placeholder="user@example.com" />}
      />
    </Field>
  )
}

export function FieldInvalid() {
  return (
    <Field label="비밀번호" invalid errorMessage="비밀번호가 일치하지 않습니다">
      <FieldControl render={<input type="password" />} />
    </Field>
  )
}
