"use client"

import { TextArea } from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import {
  forcedInputStates,
  hasInputValue,
  INPUT_SIZES,
  INPUT_STATE_ORDER,
  isDisabledState,
} from "../variants/input-states.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

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

function TextAreaVariantCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className="w-[260px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextArea
          aria-label="예시 입력"
          size={lookup(INPUT_SIZES, variant, "Size")}
          placeholder="내용을 입력하세요"
          defaultValue={
            hasInputValue(variant) ? "UMC 9기 활동을 돌아보며" : undefined
          }
          disabled={isDisabledState(variant)}
        />
      </ForceState>
    </div>
  )
}

export function TextAreaAllVariants() {
  return (
    <VariantGrid
      set="input-box"
      only={{ Type: ["Text Area"] }}
      rows={["State"]}
      columns={["Size"]}
      order={{ State: INPUT_STATE_ORDER }}
      render={(variant) => <TextAreaVariantCell variant={variant} />}
    />
  )
}
