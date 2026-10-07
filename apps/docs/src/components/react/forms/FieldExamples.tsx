"use client"

import {
  Field,
  FieldControl,
  InputBox,
  TextInfoButton,
} from "@umc-product/react"

function Control({
  placeholder,
  defaultValue,
}: {
  placeholder?: string
  defaultValue?: string
}) {
  return (
    <InputBox>
      <FieldControl
        className="umc-input-box__input"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </InputBox>
  )
}

export function FieldDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-root field-label field-required field-caption"
      >
        <Field label="학교 이메일" required caption="학교 도메인만 받습니다">
          <Control placeholder="umc@school.ac.kr" />
        </Field>
      </div>
    </div>
  )
}

export function FieldCaptionTones() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-primary"
      >
        <Field
          label="닉네임"
          caption="사용할 수 있는 닉네임입니다"
          captionColor="primary"
        >
          <Control defaultValue="umc" />
        </Field>
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-error field-label-error"
      >
        <Field
          label="닉네임"
          invalid
          errorMessage="이미 사용 중인 닉네임입니다"
        >
          <Control defaultValue="umc" />
        </Field>
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-disabled field-label-disabled"
      >
        <Field label="닉네임" caption="수정할 수 없습니다" disabled>
          <Control defaultValue="umc" />
        </Field>
      </div>
    </div>
  )
}

export function FieldWithInfo() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[326px]">
        <Field
          label="개별 지원 코드"
          info={<TextInfoButton>개별 지원 코드란?</TextInfoButton>}
        >
          <Control placeholder="코드 입력" />
        </Field>
      </div>
    </div>
  )
}
