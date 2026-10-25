"use client"

import { TextFieldLine } from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import {
  forcedInputStates,
  hasInputValue,
  INPUT_STATE_ORDER,
  isDisabledState,
} from "../variants/input-states.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function TextFieldLineDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line text-field-line-label text-field-line-caption"
      >
        <TextFieldLine
          label="프로젝트 이름"
          placeholder="프로젝트 이름을 입력하세요"
          caption="나중에 바꿀 수 있어요"
        />
      </div>
    </div>
  )
}

export function TextFieldLineFilled() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[358px]">
        <TextFieldLine label="프로젝트 이름" defaultValue="UMC 프로덕트" />
      </div>
    </div>
  )
}

export function TextFieldLinePassword() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[358px]">
        <TextFieldLine
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
        />
      </div>
    </div>
  )
}

export function TextFieldLineInvalid() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-invalid text-field-line-invalid-hover"
      >
        <TextFieldLine
          label="프로젝트 이름"
          required
          placeholder="프로젝트 이름을 입력하세요"
          invalid
          errorMessage="프로젝트 이름을 입력해 주세요"
        />
      </div>
      <div className="w-full max-w-[358px]">
        <TextFieldLine
          label="프로젝트 이름"
          defaultValue="UMC"
          invalid
          errorMessage="두 글자 이상 적어 주세요"
        />
      </div>
    </div>
  )
}

export function TextFieldLineDisabled() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-disabled"
      >
        <TextFieldLine
          label="프로젝트 이름"
          placeholder="입력할 수 없습니다"
          caption="수정 권한이 없습니다"
          disabled
        />
      </div>
    </div>
  )
}

function TextFieldLineComposedCell({ variant }: { variant: FigmaVariant }) {
  const invalid = variant.props["Error"] === "True"
  return (
    <div className="w-[300px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldLine
          label="레이블"
          required
          caption="도움말을 적어 주세요"
          invalid={invalid}
          errorMessage={invalid ? "오류 메시지를 적어 주세요" : undefined}
          placeholder="플레이스홀더 또는 레이블"
          defaultValue={hasInputValue(variant) ? "타이핑" : undefined}
          disabled={isDisabledState(variant)}
        />
      </ForceState>
    </div>
  )
}

export function TextFieldLineAllVariants() {
  return (
    <VariantGrid
      set="text-field-line"
      rows={["State"]}
      columns={["Error"]}
      order={{ State: INPUT_STATE_ORDER, Error: ["False", "True"] }}
      render={(variant) => <TextFieldLineComposedCell variant={variant} />}
    />
  )
}
