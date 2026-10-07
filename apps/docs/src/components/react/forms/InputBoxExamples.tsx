"use client"

import { InputBox } from "@umc-product/react"

const PHONE_PARTS = ["010", "1234", "5678"]

function PhoneSlot() {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1">
      {PHONE_PARTS.map((part, index) => (
        <span key={part} className="flex min-w-0 flex-1 items-center gap-1">
          {index > 0 && <span aria-hidden="true">-</span>}
          <input
            className="umc-input-box__input text-center"
            aria-label={`전화번호 ${index + 1}번째 칸`}
            defaultValue={part}
            inputMode="numeric"
          />
        </span>
      ))}
    </span>
  )
}

export function InputBoxCustom() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="input-box-lg input-box-hover"
      >
        <InputBox>
          <PhoneSlot />
        </InputBox>
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="input-box-md">
        <InputBox size="md">
          <PhoneSlot />
        </InputBox>
      </div>
    </div>
  )
}

export function InputBoxStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]" data-spec-id="input-box-invalid">
        <InputBox invalid>
          <PhoneSlot />
        </InputBox>
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="input-box-disabled">
        <InputBox disabled>
          <PhoneSlot />
        </InputBox>
      </div>
    </div>
  )
}
