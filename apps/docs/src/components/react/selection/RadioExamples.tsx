"use client"

import { Radio, RadioGroup, type RadioColor } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const RECRUITING_TYPES = [
  { value: "regular", label: "정규 모집" },
  { value: "extra", label: "추가 모집" },
  { value: "closed", label: "모집 마감", disabled: true },
]

export function RadioBasics() {
  return (
    <div className="umc-example">
      <RadioGroup aria-label="모집 유형" defaultValue="regular">
        {RECRUITING_TYPES.map((type) => (
          <label
            key={type.value}
            className="inline-flex items-center gap-2 text-[15px]"
          >
            <Radio value={type.value} disabled={type.disabled} />
            {type.label}
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}

type StateCell = {
  label: string
  specId: string
  color?: RadioColor
  checked?: boolean
  disabled?: boolean
}

const STATE_CELLS: readonly StateCell[] = [
  { label: "neutral", specId: "radio-neutral" },
  { label: "primary", specId: "radio-primary", color: "primary" },
  {
    label: "선택",
    specId: "radio-checked radio-checked-dot",
    color: "primary",
    checked: true,
  },
  { label: "비활성", specId: "radio-disabled", disabled: true },
  {
    label: "비활성 선택",
    specId: "radio-disabled-checked radio-disabled-checked-dot",
    color: "primary",
    checked: true,
    disabled: true,
  },
]

export function RadioStates() {
  return (
    <div className="umc-example">
      {STATE_CELLS.map((cell) => (
        <span
          key={cell.label}
          className="inline-flex items-center gap-2"
          data-spec-id={cell.specId}
        >
          <RadioGroup
            aria-label={cell.label}
            defaultValue={cell.checked ? "option" : undefined}
          >
            <Radio
              value="option"
              color={cell.color}
              disabled={cell.disabled}
              aria-label={cell.label}
            />
          </RadioGroup>
          <code>{cell.label}</code>
        </span>
      ))}
    </div>
  )
}

const FIGMA_COLORS: Readonly<Record<string, RadioColor>> = {
  Neutral: "neutral",
  Primary: "primary",
}

function RadioVariantCell({ variant }: { variant: FigmaVariant }) {
  return (
    <RadioGroup
      aria-label={variant.name}
      defaultValue={variant.props["Selected"] === "True" ? "option" : undefined}
    >
      <Radio
        value="option"
        color={lookup(FIGMA_COLORS, variant, "Color")}
        disabled={variant.props["Disabled"] === "True"}
        aria-label="옵션"
      />
    </RadioGroup>
  )
}

export function RadioAllVariants() {
  return (
    <VariantGrid
      set="radio-button"
      rows={["Selected", "Disabled"]}
      columns={["Color"]}
      order={{
        Selected: ["False", "True"],
        Disabled: ["False", "True"],
        Color: ["Neutral", "Primary"],
      }}
      render={(variant) => <RadioVariantCell variant={variant} />}
    />
  )
}
