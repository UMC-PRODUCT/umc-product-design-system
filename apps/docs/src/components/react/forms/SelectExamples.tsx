"use client"

import { Select, type SelectOption } from "@umc-product/react"
import { useState } from "react"

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
