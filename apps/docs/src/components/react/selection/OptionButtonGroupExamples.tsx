"use client"

import { useState } from "react"

import { OptionButtonGroup, type OptionItem } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

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

const OPTION_SIZES = { Xl: "xl", Sm: "sm", Xs: "xs" } as const
const DIRECTION_INDEX = { Left: 0, Middle: 1, Right: 2 } as const
const CHECK_SIZES = { "20px": "xl", "16px": "sm" } as const
const PREVIEW_LABELS = ["옵션 1", "옵션 2", "옵션 3"]
const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"]

function OptionButtonVariantCell({ variant }: { variant: FigmaVariant }) {
  const target = lookup(DIRECTION_INDEX, variant, "Direction")
  const disabled = variant.props["Disabled"] === "True"
  const options = PREVIEW_LABELS.map((label, index) => ({
    value: String(index),
    label,
    disabled: disabled && index === target,
  }))
  return (
    <OptionButtonGroup
      aria-label="옵션"
      size={lookup(OPTION_SIZES, variant, "Size")}
      variant={variant.props["Type"] === "Strong" ? "strong" : "weak"}
      options={options}
      defaultValue={
        variant.props["Selected"] === "True" ? String(target) : null
      }
    />
  )
}

export function OptionButtonGroupAllVariants() {
  return (
    <>
      <VariantGrid
        set="option-button"
        sections={["Size"]}
        rows={["Selected", "Type", "Disabled"]}
        columns={["Direction"]}
        order={{
          Size: ["Xl", "Sm", "Xs"],
          Selected: ["False", "True"],
          Type: ["Default", "Weak", "Strong"],
          Disabled: ["False", "True"],
          Direction: ["Left", "Middle", "Right"],
        }}
        render={(variant) => <OptionButtonVariantCell variant={variant} />}
      />
      <VariantGrid
        set="option-check"
        rows={[]}
        columns={["Size"]}
        render={(variant) => (
          <OptionButtonGroup
            aria-label="선택된 옵션"
            size={lookup(CHECK_SIZES, variant, "Size")}
            options={[{ value: "checked", label: "선택" }]}
            defaultValue="checked"
          />
        )}
      />
      <VariantGrid
        set="option-group"
        rows={["Selected Option"]}
        columns={[]}
        render={(variant) => (
          <OptionButtonGroup
            aria-label="요일"
            options={WEEKDAYS.map((label, index) => ({
              value: String(index + 1),
              label,
            }))}
            defaultValue={variant.props["Selected Option"] ?? null}
          />
        )}
      />
    </>
  )
}
