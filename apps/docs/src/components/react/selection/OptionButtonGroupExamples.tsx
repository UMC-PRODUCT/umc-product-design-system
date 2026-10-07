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

const ROUND_OPTIONS: OptionItem[] = [
  { value: "1", label: "1차" },
  { value: "2", label: "2차" },
  { value: "3", label: "3차" },
  { value: "4", label: "4차" },
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
        defaultValue={["react", "ts"]}
      />
    </div>
  )
}

export function OptionButtonGroupVariants() {
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="option-button-weak-xl-selected option-button-weak-indicator option-button-unselected-xl option-button-unselected-xl-end">
        <OptionButtonGroup
          options={PART_OPTIONS}
          aria-label="파트 (weak)"
          variant="weak"
          size="xl"
          defaultValue="fe"
        />
      </div>
      <div data-spec-id="option-button-strong-xl-selected option-button-strong-indicator">
        <OptionButtonGroup
          options={PART_OPTIONS}
          aria-label="파트 (strong)"
          variant="strong"
          size="xl"
          defaultValue="fe"
        />
      </div>
    </div>
  )
}

export function OptionButtonGroupSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <OptionButtonGroup
        options={ROUND_OPTIONS}
        aria-label="차수 (xl)"
        size="xl"
        defaultValue="2"
      />
      <div data-spec-id="option-button-weak-sm-selected option-button-unselected-sm">
        <OptionButtonGroup
          options={ROUND_OPTIONS}
          aria-label="차수 (sm)"
          size="sm"
          defaultValue="2"
        />
      </div>
      <div data-spec-id="option-button-weak-xs-selected option-button-unselected-xs-start option-button-unselected-xs-end">
        <OptionButtonGroup
          options={ROUND_OPTIONS}
          aria-label="차수 (xs)"
          size="xs"
          defaultValue="2"
        />
      </div>
    </div>
  )
}

export function OptionButtonGroupDisabled() {
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="option-button-unselected-xl-disabled">
        <OptionButtonGroup
          options={[
            { value: "fe", label: "프론트엔드" },
            { value: "be", label: "백엔드", disabled: true },
            { value: "de", label: "디자인" },
          ]}
          aria-label="파트 선택 (일부 비활성)"
          size="xl"
          defaultValue="fe"
        />
      </div>
      <div data-spec-id="option-button-weak-xl-selected-disabled">
        <OptionButtonGroup
          options={PART_OPTIONS}
          aria-label="파트 선택 (전체 비활성)"
          size="xl"
          defaultValue="fe"
          disabled
        />
      </div>
    </div>
  )
}

export function OptionButtonGroupControlled() {
  const [part, setPart] = useState<string>("fe")

  return (
    <div className="umc-example umc-example-stack">
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
