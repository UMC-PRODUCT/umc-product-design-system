import { InputBox } from "@umc-product/react"

export function InputBoxDefault() {
  return (
    <InputBox data-spec-id="input-box-lg-default">
      <input className="umc-input-box__input" placeholder="입력하세요" />
    </InputBox>
  )
}

export function InputBoxMd() {
  return (
    <InputBox size="md">
      <input className="umc-input-box__input" placeholder="md 크기" />
    </InputBox>
  )
}

export function InputBoxInvalid() {
  return (
    <InputBox invalid>
      <input className="umc-input-box__input" placeholder="오류 상태" />
    </InputBox>
  )
}

export function InputBoxDisabled() {
  return (
    <InputBox disabled data-spec-id="input-box-lg-disabled">
      <input className="umc-input-box__input" placeholder="비활성" disabled />
    </InputBox>
  )
}

export function InputBoxPadding() {
  return (
    <InputBox data-spec-id="input-box-lg-padding">
      <input className="umc-input-box__input" placeholder="여백 확인" />
    </InputBox>
  )
}
