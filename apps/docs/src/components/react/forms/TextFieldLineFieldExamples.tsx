"use client"

import {
  Select,
  TextFieldLine,
  TextFieldLineField,
  type SelectOption,
} from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import {
  forcedInputStates,
  hasInputValue,
  INPUT_STATE_ORDER,
  isDisabledState,
} from "../variants/input-states.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PHONE_PARTS = ["010", "1234", "5678"]

const PARTS: SelectOption[] = [
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
]

function renderPhoneSlot(filled: boolean) {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1">
      {PHONE_PARTS.map((part, index) => (
        <span key={part} className="flex min-w-0 flex-1 items-center gap-1">
          {index > 0 && <span aria-hidden="true">-</span>}
          <input
            className="umc-text-field-line-field__input text-center"
            aria-label={`전화번호 ${index + 1}번째 칸`}
            defaultValue={filled ? part : undefined}
            placeholder={filled ? undefined : "0".repeat(part.length)}
            inputMode="numeric"
          />
        </span>
      ))}
    </span>
  )
}

export function TextFieldLineFieldCustom() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-field text-field-line-field-hover text-field-line-field-focus"
      >
        <TextFieldLineField>{renderPhoneSlot(false)}</TextFieldLineField>
      </div>
      <div className="w-full max-w-[358px]">
        <TextFieldLineField>{renderPhoneSlot(true)}</TextFieldLineField>
      </div>
    </div>
  )
}

export function TextFieldLineFieldStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[358px]">
        <TextFieldLineField invalid>{renderPhoneSlot(true)}</TextFieldLineField>
      </div>
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-field-disabled text-field-line-field-disabled-input"
      >
        <TextFieldLineField disabled>
          {renderPhoneSlot(true)}
        </TextFieldLineField>
      </div>
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-field-selector text-field-line-field-selector-icon"
      >
        <Select
          shape="line"
          aria-label="파트"
          options={PARTS}
          placeholder="파트를 선택하세요"
        />
      </div>
    </div>
  )
}

export function TextFieldLineFieldAccessories() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-field-caret text-field-line-field-clear"
      >
        <TextFieldLine aria-label="프로젝트 이름" defaultValue="타이핑" />
      </div>
      <div
        className="w-full max-w-[358px]"
        data-spec-id="text-field-line-field-password-toggle"
      >
        <TextFieldLine
          aria-label="비밀번호"
          type="password"
          placeholder="비밀번호"
        />
      </div>
      <div className="w-full max-w-[358px]">
        <Select
          shape="line"
          aria-label="파트"
          options={PARTS}
          defaultValue="web"
        />
      </div>
    </div>
  )
}

function TextFieldLineFieldVariantCell({ variant }: { variant: FigmaVariant }) {
  const type = variant.props["Type"]
  const filled = hasInputValue(variant)
  const disabled = isDisabledState(variant)
  if (type === "Selector") {
    return (
      <div className="w-[300px]">
        <ForceState states={forcedInputStates(variant)}>
          <Select
            shape="line"
            aria-label="파트"
            options={PARTS}
            placeholder="플레이스홀더 또는 레이블"
            defaultValue={filled ? "web" : null}
            disabled={disabled}
          />
        </ForceState>
      </div>
    )
  }
  const isPassword = type === "Password"
  return (
    <div className="w-[300px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldLine
          aria-label="예시 입력"
          type={isPassword ? "password" : "text"}
          placeholder="플레이스홀더 또는 레이블"
          defaultValue={
            filled
              ? isPassword
                ? "umc1234"
                : "타이핑타이핑타이핑타이핑이야이야야"
              : undefined
          }
          disabled={disabled}
        />
      </ForceState>
    </div>
  )
}

export function TextFieldLineFieldAllVariants() {
  return (
    <VariantGrid
      set="text-field-line-field"
      rows={["State"]}
      columns={["Type"]}
      order={{
        State: INPUT_STATE_ORDER,
        Type: ["Text", "Password", "Selector"],
      }}
      render={(variant) => <TextFieldLineFieldVariantCell variant={variant} />}
    />
  )
}
