"use client"

import { TextFieldArea } from "@umc-product/react"

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

export function TextFieldAreaDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-area-box text-field-area-input"
      >
        <TextFieldArea
          label="주소"
          placeholder="도로명 주소를 입력하세요"
          caption="건물 이름과 호수까지 적어 주세요"
        />
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="text-field-area-md">
        <TextFieldArea
          label="한 줄 소개"
          size="md"
          placeholder="자신을 소개해 주세요"
        />
      </div>
    </div>
  )
}

export function TextFieldAreaStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-area-invalid"
      >
        <TextFieldArea
          label="주소"
          defaultValue="서울특별시"
          invalid
          errorMessage="상세 주소까지 적어 주세요"
        />
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-area-disabled"
      >
        <TextFieldArea
          label="주소"
          placeholder="제출 후에는 수정할 수 없습니다"
          disabled
        />
      </div>
    </div>
  )
}

function TextFieldAreaVariantCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className="w-[260px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldArea
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

export function TextFieldAreaAllVariants() {
  return (
    <VariantGrid
      set="text-field-box-field"
      only={{ Type: ["Text Area"] }}
      rows={["State"]}
      columns={["Size"]}
      order={{ State: INPUT_STATE_ORDER }}
      render={(variant) => <TextFieldAreaVariantCell variant={variant} />}
    />
  )
}
