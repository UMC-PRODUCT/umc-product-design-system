"use client"

import {
  CheckButton,
  Checkbox,
  type CheckboxColor,
  type CheckboxSize,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PARTS = ["PM", "Design", "Web PE", "Mobile PE"]

export function CheckboxBasics() {
  return (
    <div className="umc-example">
      <Checkbox defaultChecked color="brand">
        면접 진행
      </Checkbox>
      <Checkbox labelPlacement="end">개인정보 수집 동의</Checkbox>
      <Checkbox aria-label="전체 선택" />
    </div>
  )
}

type StateRow = {
  label: string
  color?: CheckboxColor
  invalid?: boolean
  disabled?: boolean
  specIds: [unchecked: string, checked: string]
}

const STATE_ROWS: readonly StateRow[] = [
  {
    label: "neutral",
    specIds: [
      "checkbox-md checkbox-md-label checkbox-md-control",
      "checkbox-md-checked",
    ],
  },
  {
    label: "brand",
    color: "brand",
    specIds: ["checkbox-brand-control", "checkbox-brand-checked"],
  },
  {
    label: "invalid",
    invalid: true,
    specIds: ["checkbox-invalid-control", "checkbox-invalid-checked"],
  },
  {
    label: "disabled",
    disabled: true,
    specIds: ["checkbox-disabled-control", "checkbox-disabled-checked"],
  },
]

export function CheckboxStates() {
  return (
    <div className="umc-scroll">
      <table className="umc-table">
        <thead>
          <tr>
            <th>상태</th>
            <th>체크 안 함</th>
            <th>체크</th>
          </tr>
        </thead>
        <tbody>
          {STATE_ROWS.map((row) => (
            <tr key={row.label}>
              <td>
                <code>{row.label}</code>
              </td>
              {row.specIds.map((specIds, index) => (
                <td key={specIds}>
                  <span data-spec-id={specIds}>
                    <Checkbox
                      color={row.color}
                      invalid={row.invalid}
                      disabled={row.disabled}
                      defaultChecked={index === 1}
                    >
                      라벨
                    </Checkbox>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CheckboxSizes() {
  return (
    <div className="umc-example">
      <Checkbox>Md 라벨</Checkbox>
      <span data-spec-id="checkbox-lg checkbox-lg-label checkbox-lg-control">
        <Checkbox size="lg">Lg 라벨</Checkbox>
      </span>
      <span data-spec-id="checkbox-lg-checked">
        <Checkbox size="lg" defaultChecked color="brand">
          Lg 라벨
        </Checkbox>
      </span>
    </div>
  )
}

export function CheckboxRecruitingForm() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="flex flex-wrap items-center gap-8">
        <span className="text-[15px] text-[var(--umc-color-text-neutral-medium)]">
          모집 파트
        </span>
        <div className="flex flex-wrap items-center gap-6">
          {PARTS.map((part) => (
            <Checkbox key={part} name="part" value={part} labelPlacement="end">
              {part}
            </Checkbox>
          ))}
        </div>
      </div>
      <Checkbox color="brand" defaultChecked>
        면접 진행
      </Checkbox>
    </div>
  )
}

export function CheckButtonExample() {
  return (
    <div className="umc-example">
      <span data-spec-id="check-button-off">
        <CheckButton aria-label="공지 읽음 표시" />
      </span>
      <span data-spec-id="check-button-on">
        <CheckButton aria-label="공지 읽음 표시" defaultChecked />
      </span>
    </div>
  )
}

const FIGMA_SIZES: Readonly<Record<string, CheckboxSize>> = {
  Md: "md",
  Lg: "lg",
}

const FIGMA_COLORS: Readonly<Record<string, CheckboxColor>> = {
  Neutral: "neutral",
  Brand: "brand",
  Error: "neutral",
}

const checkboxPropsOf = (variant: FigmaVariant) => {
  const invalid = variant.props["Color"] === "Error"
  return {
    size: lookup(FIGMA_SIZES, variant, "Size"),
    color: lookup(FIGMA_COLORS, variant, "Color"),
    invalid,
    disabled: !invalid && variant.props["Disabled"] === "True",
    defaultChecked: variant.props["Selected"] === "True",
  }
}

const GRID_LAYOUT = {
  sections: ["Size"],
  rows: ["Selected"],
  columns: ["Color", "Disabled"],
  order: {
    Size: ["Md", "Lg"],
    Color: ["Neutral", "Brand", "Error"],
    Selected: ["False", "True"],
    Disabled: ["False", "True"],
  },
} as const

export function CheckboxAllVariants() {
  return (
    <>
      <VariantGrid
        set="check-box"
        {...GRID_LAYOUT}
        render={(variant) => (
          <Checkbox {...checkboxPropsOf(variant)}>라벨</Checkbox>
        )}
      />
      <VariantGrid
        set="check-box-control"
        {...GRID_LAYOUT}
        render={(variant) => (
          <Checkbox {...checkboxPropsOf(variant)} aria-label="라벨" />
        )}
      />
      <VariantGrid
        set="check-button"
        rows={["Selected"]}
        columns={[]}
        order={{ Selected: ["False", "True"] }}
        render={(variant) => (
          <CheckButton
            aria-label="체크"
            defaultChecked={variant.props["Selected"] === "True"}
          />
        )}
      />
    </>
  )
}
