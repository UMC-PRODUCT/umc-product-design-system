"use client"

import { TextArea } from "@umc-product/react"

export function TextAreaDefault() {
  return (
    <div data-spec-id="text-area-lg-default">
      <TextArea label="내용" placeholder="내용을 입력하세요" />
    </div>
  )
}

export function TextAreaCaption() {
  return <TextArea label="소개" caption="500자 이내로 작성하세요" rows={4} />
}

export function TextAreaInvalid() {
  return (
    <TextArea
      label="내용"
      invalid
      errorMessage="필수 입력 항목입니다"
      placeholder="내용을 입력하세요"
    />
  )
}

export function TextAreaDisabled() {
  return <TextArea label="내용" disabled defaultValue="수정 불가 텍스트" />
}
