"use client"

import { useState } from "react"

import { OptionButtonGroup, type OptionItem } from "@umc-product/react"

const PART_OPTIONS: OptionItem[] = [
  { value: "fe", label: "프론트엔드" },
  { value: "be", label: "백엔드" },
  { value: "de", label: "디자인" },
]

const STACK_OPTIONS: OptionItem[] = [
  { value: "react", label: "React" },
  { value: "ts", label: "TypeScript" },
  { value: "node", label: "Node.js" },
]

export function OptionButtonGroupSingle() {
  return (
    <div className="umc-example">
      <OptionButtonGroup
        options={PART_OPTIONS}
        aria-label="파트 선택"
        defaultValue="fe"
      />
    </div>
  )
}

export function OptionButtonGroupMultiple() {
  return (
    <div className="umc-example">
      <OptionButtonGroup
        type="multiple"
        options={STACK_OPTIONS}
        aria-label="기술 스택 선택"
        defaultValue={["react"]}
      />
    </div>
  )
}

export function OptionButtonGroupVariants() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "16px" }}
    >
      <OptionButtonGroup
        options={[
          {
            value: "fe",
            label: "프론트엔드",
            "data-spec-id": "option-button-weak-xl-selected",
          },
          {
            value: "be",
            label: "백엔드",
            "data-spec-id": "option-button-unselected-xl",
          },
          { value: "de", label: "디자인" },
        ]}
        aria-label="파트 (weak)"
        variant="weak"
        size="xl"
        defaultValue="fe"
      />
      <OptionButtonGroup
        options={[
          {
            value: "fe",
            label: "프론트엔드",
            "data-spec-id": "option-button-strong-xl-selected",
          },
          { value: "be", label: "백엔드" },
          { value: "de", label: "디자인" },
        ]}
        aria-label="파트 (strong)"
        variant="strong"
        size="xl"
        defaultValue="fe"
      />
    </div>
  )
}

export function OptionButtonGroupSizes() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "16px" }}
    >
      <OptionButtonGroup
        options={PART_OPTIONS}
        aria-label="파트 (xl)"
        size="xl"
        defaultValue="fe"
      />
      <OptionButtonGroup
        options={PART_OPTIONS}
        aria-label="파트 (sm)"
        size="sm"
        defaultValue="fe"
      />
      <OptionButtonGroup
        options={PART_OPTIONS}
        aria-label="파트 (xs)"
        size="xs"
        defaultValue="fe"
      />
    </div>
  )
}

export function OptionButtonGroupDisabled() {
  return (
    <div className="umc-example">
      <OptionButtonGroup
        options={[
          { value: "fe", label: "프론트엔드" },
          {
            value: "be",
            label: "백엔드",
            disabled: true,
            "data-spec-id": "option-button-unselected-xl-disabled",
          },
          { value: "de", label: "디자인" },
        ]}
        aria-label="파트 선택 (일부 비활성)"
        size="xl"
        defaultValue="fe"
      />
    </div>
  )
}

export function OptionButtonGroupControlled() {
  const [part, setPart] = useState<string>("fe")

  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "12px" }}
    >
      <OptionButtonGroup
        options={PART_OPTIONS}
        aria-label="파트"
        value={part}
        onValueChange={setPart}
      />
      <p>선택된 파트: {part}</p>
    </div>
  )
}
