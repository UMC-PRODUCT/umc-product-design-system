"use client"

import { Select, type SelectOption } from "@umc-product/react"
import { useState } from "react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import {
  hasInputValue,
  INPUT_SIZES,
  INPUT_STATE_ORDER,
  isDisabledState,
  stateOf,
} from "../variants/input-states.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type Part = "plan" | "design" | "web" | "android" | "ios" | "spring" | "node"

const PARTS: SelectOption<Part>[] = [
  { value: "plan", label: "Plan" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "spring", label: "SpringBoot" },
  { value: "node", label: "Node.js", disabled: true },
]

const SORTS: SelectOption<"recent" | "registered" | "name">[] = [
  { value: "recent", label: "최신 순" },
  { value: "registered", label: "등록 순" },
  { value: "name", label: "이름 순" },
]

const SCHOOLS: SelectOption[] = [
  { value: "dongguk", label: "동국대학교", caption: "서울" },
  { value: "gachon", label: "가천대학교", caption: "경기" },
  { value: "inha", label: "인하대학교", caption: "인천" },
]

export function SelectDefault() {
  const [part, setPart] = useState<Part | null>(null)
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[350px]"
        data-spec-id="select-trigger select-trigger-hover select-placeholder select-icon select-list select-item select-item-highlighted"
      >
        <Select
          label="파트"
          required
          placeholder="파트를 선택하세요"
          options={PARTS}
          value={part}
          onValueChange={setPart}
        />
      </div>
      <div
        className="w-full max-w-[350px]"
        data-spec-id="select-filled select-item-selected"
      >
        <Select label="파트" options={PARTS} defaultValue="web" />
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="select-md">
        <Select
          label="파트"
          size="md"
          options={PARTS}
          placeholder="파트를 선택하세요"
        />
      </div>
    </div>
  )
}

export function SelectFilter() {
  return (
    <div className="umc-example">
      <div className="w-[140px]" data-spec-id="select-filter">
        <Select
          variant="filter"
          size="md"
          aria-label="정렬"
          options={SORTS}
          defaultValue="registered"
        />
      </div>
      <div className="w-[140px]">
        <Select variant="filter" size="md" options={SORTS} placeholder="정렬" />
      </div>
    </div>
  )
}

export function SelectLine() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[358px]">
        <Select
          shape="line"
          label="파트"
          options={PARTS}
          placeholder="파트를 선택하세요"
        />
      </div>
      <div className="w-full max-w-[358px]">
        <Select shape="line" label="파트" options={PARTS} defaultValue="web" />
      </div>
    </div>
  )
}

export function SelectSearchable() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]">
        <Select
          label="학교"
          searchable
          searchPlaceholder="학교 이름으로 검색"
          itemSize="md"
          options={SCHOOLS}
          placeholder="학교를 선택하세요"
        />
      </div>
    </div>
  )
}

const GENERATIONS: SelectOption[] = [
  { value: "11", label: "11기", caption: "2026" },
  { value: "10", label: "10기", caption: "2026" },
  { value: "9", label: "9기", caption: "2025" },
  { value: "8", label: "8기", caption: "2025" },
]

export function SelectInline() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[200px]"
        data-spec-id="select-item-inline-selected select-item-inline-selected-label select-item-inline-selected-caption"
      >
        <Select
          label="기수"
          size="md"
          itemSize="xs"
          itemLayout="inline"
          options={GENERATIONS}
          defaultValue="11"
        />
      </div>
    </div>
  )
}

export function SelectStates() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[350px]" data-spec-id="select-invalid">
        <Select
          label="파트"
          options={PARTS}
          placeholder="파트를 선택하세요"
          invalid
          errorMessage="파트를 선택해 주세요"
        />
      </div>
      <div className="w-full max-w-[350px]" data-spec-id="select-disabled">
        <Select
          label="파트"
          options={PARTS}
          placeholder="파트를 선택하세요"
          disabled
        />
      </div>
    </div>
  )
}

const FORCED_SELECT_STATES: Readonly<Record<string, readonly ForcedState[]>> = {
  Hover: ["hover"],
  "Focused & Hover": ["hover"],
}

function SelectVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = stateOf(variant)
  const isFilter = state === "Filtered"
  return (
    <div className={isFilter ? "w-[140px]" : "w-[260px]"}>
      <ForceState states={FORCED_SELECT_STATES[state] ?? []}>
        <Select
          aria-label={isFilter ? "정렬" : "파트"}
          options={isFilter ? SORTS : PARTS}
          size={lookup(INPUT_SIZES, variant, "Size")}
          variant={isFilter ? "filter" : "default"}
          placeholder={isFilter ? "정렬" : "파트를 선택하세요"}
          defaultValue={
            hasInputValue(variant) ? (isFilter ? "recent" : "web") : null
          }
          disabled={isDisabledState(variant)}
        />
      </ForceState>
    </div>
  )
}

export function SelectAllVariants() {
  return (
    <VariantGrid
      set="text-field-box-field"
      only={{ Type: ["Select"] }}
      rows={["State"]}
      columns={["Size"]}
      order={{ State: INPUT_STATE_ORDER }}
      render={(variant) => <SelectVariantCell variant={variant} />}
    />
  )
}
