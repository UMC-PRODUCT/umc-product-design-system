"use client"

import { TextField } from "@umc-product/react"

export function TextFieldDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-label text-field-box text-field-box-hover text-field-box-focus text-field-placeholder text-field-caption"
      >
        <TextField
          label="이름"
          placeholder="이름을 입력하세요"
          caption="실명으로 입력해 주세요"
          unit="님"
        />
      </div>
    </div>
  )
}

export function TextFieldFilled() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-value text-field-typing text-field-clear text-field-unit"
      >
        <TextField label="금액" defaultValue="30000" unit="원" />
      </div>
    </div>
  )
}

export function TextFieldSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]">
        <TextField label="Lg" placeholder="48px" />
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-md text-field-md-input"
      >
        <TextField label="Md" size="md" placeholder="44px" unit="개" />
      </div>
    </div>
  )
}

export function TextFieldPassword() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-password-toggle"
      >
        <TextField label="비밀번호" type="password" placeholder="비밀번호" />
      </div>
    </div>
  )
}

export function TextFieldInvalid() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-invalid text-field-invalid-label text-field-invalid-caption"
      >
        <TextField
          label="이메일"
          required
          placeholder="이메일을 입력하세요"
          invalid
          errorMessage="이메일 형식이 아닙니다"
        />
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-invalid-filled"
      >
        <TextField
          label="이메일"
          defaultValue="umc@"
          invalid
          errorMessage="이메일 형식이 아닙니다"
        />
      </div>
    </div>
  )
}

export function TextFieldDisabled() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-disabled text-field-disabled-label text-field-disabled-unit"
      >
        <TextField
          label="이름"
          placeholder="입력할 수 없습니다"
          caption="수정 권한이 없습니다"
          unit="님"
          disabled
        />
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-disabled-invalid"
      >
        <TextField
          label="이름"
          placeholder="입력할 수 없습니다"
          invalid
          errorMessage="확인이 필요합니다"
          disabled
        />
      </div>
    </div>
  )
}
