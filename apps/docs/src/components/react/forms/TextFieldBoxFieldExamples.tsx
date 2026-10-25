"use client"

import { TextFieldBoxField, Select, TextFieldBox } from "@umc-product/react"
import { useEffect, useRef, type ReactNode } from "react"

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

const PHONE_PARTS = ["010", "1234", "5678"]

function renderPhoneSlot() {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1">
      {PHONE_PARTS.map((part, index) => (
        <span key={part} className="flex min-w-0 flex-1 items-center gap-1">
          {index > 0 && <span aria-hidden="true">-</span>}
          <input
            className="umc-text-field-box-field__input text-center"
            aria-label={`전화번호 ${index + 1}번째 칸`}
            defaultValue={part}
            inputMode="numeric"
          />
        </span>
      ))}
    </span>
  )
}

export function TextFieldBoxFieldCustom() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-box-field-lg text-field-box-field-hover"
      >
        <TextFieldBoxField>{renderPhoneSlot()}</TextFieldBoxField>
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-box-field-md"
      >
        <TextFieldBoxField size="md">{renderPhoneSlot()}</TextFieldBoxField>
      </div>
    </div>
  )
}

export function TextFieldBoxFieldStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-box-field-invalid"
      >
        <TextFieldBoxField invalid>{renderPhoneSlot()}</TextFieldBoxField>
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="text-field-box-field-disabled"
      >
        <TextFieldBoxField disabled>{renderPhoneSlot()}</TextFieldBoxField>
      </div>
    </div>
  )
}

function renderEmptyPhoneSlot() {
  return (
    <span className="flex min-w-0 flex-1 items-center gap-1">
      {PHONE_PARTS.map((part, index) => (
        <span key={part} className="flex min-w-0 flex-1 items-center gap-1">
          {index > 0 && <span aria-hidden="true">-</span>}
          <input
            className="umc-text-field-box-field__input text-center"
            aria-label={`전화번호 ${index + 1}번째 칸`}
            placeholder={"0".repeat(part.length)}
            inputMode="numeric"
          />
        </span>
      ))}
    </span>
  )
}

function TextFieldBoxFieldVariantCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className="w-[260px]">
      <ForceState states={forcedInputStates(variant)}>
        <TextFieldBoxField
          size={lookup(INPUT_SIZES, variant, "Size")}
          disabled={isDisabledState(variant)}
        >
          {hasInputValue(variant) ? renderPhoneSlot() : renderEmptyPhoneSlot()}
        </TextFieldBoxField>
      </ForceState>
    </div>
  )
}

function RevealPassword({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current
      ?.querySelector<HTMLButtonElement>(
        ".umc-text-field-box-field__password-toggle",
      )
      ?.click()
  }, [])
  return <div ref={ref}>{children}</div>
}

const ACCESSORY_PARTS = [
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
]

function AccessoryCell({ variant }: { variant: FigmaVariant }) {
  const type = variant.props["Type"]
  if (type === "Down Chevron" || type === "Up Chevron") {
    return (
      <div className="w-[260px]">
        <ForceState states={type === "Up Chevron" ? ["popup-open"] : []}>
          <Select
            aria-label="파트"
            options={ACCESSORY_PARTS}
            placeholder="파트를 선택하세요"
          />
        </ForceState>
      </div>
    )
  }
  if (type === "visibility" || type === "Hidden") {
    const field = (
      <TextFieldBox
        aria-label="비밀번호"
        type="password"
        defaultValue="umc1234"
      />
    )
    return (
      <div className="w-[260px]">
        {type === "Hidden" ? <RevealPassword>{field}</RevealPassword> : field}
      </div>
    )
  }
  return (
    <div className="w-[260px]">
      <TextFieldBox
        aria-label="예시 입력"
        defaultValue="UMC"
        invalid={type === "Error"}
      />
    </div>
  )
}

export function TextFieldBoxFieldAllVariants() {
  return (
    <>
      <VariantGrid
        set="text-field-box-field"
        only={{ Type: ["Custom"] }}
        rows={["State"]}
        columns={["Size"]}
        order={{ State: INPUT_STATE_ORDER }}
        render={(variant) => <TextFieldBoxFieldVariantCell variant={variant} />}
      />
      <VariantGrid
        set="input-accessory"
        rows={["Usage", "Type"]}
        columns={[]}
        render={(variant) => <AccessoryCell variant={variant} />}
      />
    </>
  )
}
