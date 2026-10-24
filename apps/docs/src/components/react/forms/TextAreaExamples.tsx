"use client"

import { TextArea } from "@umc-product/react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
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

const RECRUIT_BODY = [
  "UMC 11기 챌린저를 모집합니다.",
  "서류 접수는 3월 2일부터 3월 9일까지예요.",
  "면접은 3월 14일 토요일에 온라인으로 진행해요.",
  "합격자는 3월 20일에 개별로 안내드려요.",
  "OT는 3월 28일 토요일 오후 2시에 시작해요.",
  "궁금한 점은 지부 운영진에게 문의해 주세요.",
  "모집 공고는 지부별 공유 보관함에서도 볼 수 있어요.",
  "지원서는 제출한 뒤에 수정할 수 없으니 꼼꼼히 확인해 주세요.",
  "파트별 모집 인원은 지부 상황에 따라 달라질 수 있어요.",
  "많은 관심과 지원 부탁드려요.",
].join("\n")

export function TextAreaHeight() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[734px]">
        <TextArea
          label="모집 공고 본문"
          maxLength={2000}
          defaultValue={RECRUIT_BODY}
          className="[--umc-text-area-min-height:240px] [--umc-text-area-max-height:320px]"
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
    specId:
      "text-area-disabled text-area-disabled-value text-area-disabled-counter",
  },
}

const ERROR_SPEC_IDS: Readonly<Record<string, string>> = {
  Default: "text-area-error-default",
  Hover: "text-area-error-hover",
  Focused: "text-area-error-focused",
  Typing: "text-area-error-typing",
  Filled: "text-area-error-filled",
  Disabled: "text-area-error-disabled",
}

const ERROR_FLAGS = { False: false, True: true } as const

function TextAreaVariantCell({ variant }: { variant: FigmaVariant }) {
  const stateName = variant.props["State"] ?? ""
  const state = TEXT_AREA_STATES[stateName]
  if (state === undefined) {
    throw new Error(`${variant.name}: 대응하는 상태가 없습니다`)
  }
  const invalid = lookup(ERROR_FLAGS, variant, "Error")
  return (
    <div
      className="w-[480px]"
      data-spec-id={invalid ? ERROR_SPEC_IDS[stateName] : state.specId}
    >
      <ForceState states={state.forced}>
        <TextArea
          aria-label="예시 입력"
          placeholder="작성하세요"
          maxLength={VARIANT_MAX_LENGTH}
          defaultValue={state.value}
          disabled={state.disabled}
          invalid={invalid}
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
      columns={["Error"]}
      order={{
        State: ["Default", "Hover", "Focused", "Typing", "Filled", "Disabled"],
        Error: ["False", "True"],
      }}
      render={(variant) => <TextAreaVariantCell variant={variant} />}
    />
  )
}
