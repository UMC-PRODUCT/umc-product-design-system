"use client"

import { TextArea } from "@umc-product/react"

export function TextAreaDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-area-box text-area-input"
      >
        <TextArea
          label="지원 동기"
          placeholder="UMC에 지원한 이유를 적어 주세요"
          caption="500자 이내"
        />
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="text-area-md">
        <TextArea
          label="한 줄 소개"
          size="md"
          placeholder="자신을 소개해 주세요"
        />
      </div>
    </div>
  )
}

export function TextAreaStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]" data-spec-id="text-area-invalid">
        <TextArea
          label="지원 동기"
          defaultValue="짧은 답변"
          invalid
          errorMessage="50자 이상 적어 주세요"
        />
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="text-area-disabled">
        <TextArea
          label="지원 동기"
          placeholder="제출 후에는 수정할 수 없습니다"
          disabled
        />
      </div>
    </div>
  )
}
