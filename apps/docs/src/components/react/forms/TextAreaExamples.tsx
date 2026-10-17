"use client"

import { TextArea } from "@umc-product/react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const NOTICE_MAX_LENGTH = 1000
const VARIANT_MAX_LENGTH = 300
const NOTICE_VALUE = "11기 OT는 3월 7일 토요일 오후 2시에 시작해요"

export function TextAreaDefault() {
  return (
    <div className="umc-example">
      <div
        className="w-full max-w-[734px]"
        data-spec-id="text-area-default text-area-placeholder text-area-counter"
      >
        <TextArea
          label="공지 내용"
          placeholder="챌린저에게 전할 공지를 작성하세요"
          maxLength={NOTICE_MAX_LENGTH}
        />
      </div>
    </div>
  )
}

export function TextAreaStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[734px]">
        <TextArea
          label="공지 내용"
          placeholder="챌린저에게 전할 공지를 작성하세요"
          maxLength={NOTICE_MAX_LENGTH}
          required
          invalid
          errorMessage="공지 내용을 작성하세요"
        />
      </div>
      <div className="w-full max-w-[734px]">
        <TextArea
          label="공지 내용"
          placeholder="작성 기간이 끝났어요"
          maxLength={NOTICE_MAX_LENGTH}
          disabled
        />
      </div>
    </div>
  )
}

type TextAreaState = {
  forced: readonly ForcedState[]
  value?: string
  disabled?: boolean
  specId?: string
}

const TEXT_AREA_STATES: Readonly<Record<string, TextAreaState>> = {
  Default: { forced: [] },
  Hover: { forced: ["hover"], specId: "text-area-hover" },
  Focused: { forced: ["focus-within"], specId: "text-area-focused" },
  Typing: {
    forced: ["focus-within"],
    value: NOTICE_VALUE,
    specId: "text-area-typing text-area-typing-value",
  },
  Filled: { forced: [], value: NOTICE_VALUE, specId: "text-area-filled" },
  Disabled: {
    forced: [],
    disabled: true,
    specId: "text-area-disabled text-area-disabled-value",
  },
}

function TextAreaVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = TEXT_AREA_STATES[variant.props["State"] ?? ""]
  if (state === undefined) {
    throw new Error(`${variant.name}: 대응하는 상태가 없습니다`)
  }
  return (
    <div className="w-[480px]" data-spec-id={state.specId}>
      <ForceState states={state.forced}>
        <TextArea
          aria-label="예시 입력"
          placeholder="작성하세요"
          maxLength={VARIANT_MAX_LENGTH}
          defaultValue={state.value}
          disabled={state.disabled}
        />
      </ForceState>
    </div>
  )
}

export function TextAreaAllVariants() {
  return (
    <VariantGrid
      set="text-area"
      rows={["State"]}
      columns={[]}
      order={{
        State: ["Default", "Hover", "Focused", "Typing", "Filled", "Disabled"],
      }}
      render={(variant) => <TextAreaVariantCell variant={variant} />}
    />
  )
}
