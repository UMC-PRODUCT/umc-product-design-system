"use client"

import { TextFieldBox } from "@umc-product/react"

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

export function TextFieldBoxDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-label text-field-box text-field-box-hover text-field-box-focus text-field-placeholder text-field-caption"
      >
        <TextFieldBox
          label="이름"
          placeholder="이름을 입력하세요"
          caption="실명으로 입력해 주세요"
          unit="님"
        />
      </div>
    </div>
  )
}

export function TextFieldBoxFilled() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-value text-field-typing text-field-clear text-field-unit"
      >
        <TextFieldBox label="금액" defaultValue="30000" unit="원" />
      </div>
    </div>
  )
}

export function TextFieldBoxSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]">
        <TextFieldBox label="Lg" placeholder="48px" />
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-md text-field-md-input"
      >
        <TextFieldBox label="Md" size="md" placeholder="44px" unit="개" />
      </div>
    </div>
  )
}

export function TextFieldBoxPassword() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-password-toggle"
      >
        <TextFieldBox label="비밀번호" type="password" placeholder="비밀번호" />
      </div>
    </div>
  )
}

export function TextFieldBoxInvalid() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-invalid text-field-invalid-label text-field-invalid-caption"
      >
        <TextFieldBox
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
        <TextFieldBox
          label="이메일"
          defaultValue="umc@"
          invalid
          errorMessage="이메일 형식이 아닙니다"
        />
      </div>
    </div>
  )
}

export function TextFieldBoxDisabled() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="text-field-disabled text-field-disabled-label text-field-disabled-unit"
      >
        <TextFieldBox
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
        <TextFieldBox
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

function TextFieldBoxCell({ variant }: { variant: FigmaVariant }) {
  const isPassword = variant.props["Type"] === "Password"
  return (
    <div className="w-[260px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldBox
          aria-label="예시 입력"
          size={lookup(INPUT_SIZES, variant, "Size")}
          type={isPassword ? "password" : "text"}
          placeholder={
            isPassword ? "비밀번호를 입력하세요" : "텍스트를 입력하세요"
          }
          defaultValue={
            hasInputValue(variant)
              ? isPassword
                ? "umc1234"
                : "UMC"
              : undefined
          }
          disabled={isDisabledState(variant)}
        />
      </ForceState>
    </div>
  )
}

function TextFieldBoxComposedCell({ variant }: { variant: FigmaVariant }) {
  const invalid = variant.props["Error"] === "True"
  return (
    <div className="w-[260px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldBox
          label="레이블"
          caption="도움말을 적어 주세요"
          invalid={invalid}
          errorMessage={invalid ? "오류 메시지를 적어 주세요" : undefined}
          placeholder="텍스트를 입력하세요"
          defaultValue={hasInputValue(variant) ? "UMC" : undefined}
          disabled={isDisabledState(variant)}
        />
      </ForceState>
    </div>
  )
}

export function TextFieldBoxAllVariants() {
  return (
    <>
      <VariantGrid
        set="text-field-box-field"
        only={{ Type: ["Text", "Password"] }}
        sections={["Type"]}
        rows={["State"]}
        columns={["Size"]}
        order={{ State: INPUT_STATE_ORDER }}
        render={(variant) => <TextFieldBoxCell variant={variant} />}
      />
      <VariantGrid
        set="text-field-box"
        rows={["State"]}
        columns={["Error"]}
        order={{ State: INPUT_STATE_ORDER, Error: ["False", "True"] }}
        render={(variant) => <TextFieldBoxComposedCell variant={variant} />}
      />
    </>
  )
}
