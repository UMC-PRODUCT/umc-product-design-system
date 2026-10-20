import {
  FormChoiceList,
  FormQuestion,
  type FormChoiceOption,
} from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PARTS: readonly FormChoiceOption[] = [
  { value: "pm", label: "PM" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
]

const DAYS: readonly FormChoiceOption[] = [
  { value: "mon", label: "월요일" },
  { value: "wed", label: "수요일" },
  { value: "fri", label: "금요일" },
  { value: "sat", label: "토요일" },
]

const LIST_SPEC_IDS = [
  "form-question-choice-root",
  "form-choice-list-box",
  "form-choice-list-option",
  "form-choice-list-label",
  "form-choice-list-selected",
  "form-choice-list-selected-label",
].join(" ")

export function FormChoiceListSingle() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[840px]" data-spec-id={LIST_SPEC_IDS}>
        <FormQuestion number="03" title="지원 파트를 골라 주세요" required>
          <FormChoiceList type="single" options={PARTS} defaultValue="design" />
        </FormQuestion>
      </div>
    </div>
  )
}

export function FormChoiceListMultiple() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[840px]">
        <FormQuestion
          number="04"
          title="면접이 가능한 요일을 모두 골라 주세요"
          description="두 개 이상 고르면 일정을 잡기 쉬워요"
        >
          <FormChoiceList
            type="multiple"
            options={DAYS}
            defaultValue={["wed", "sat"]}
          />
        </FormQuestion>
      </div>
    </div>
  )
}

export function FormChoiceListDisabledOption() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[840px]">
        <FormQuestion
          number="03"
          title="지원 파트를 골라 주세요"
          description="모집이 끝난 파트는 고를 수 없어요"
          required
        >
          <FormChoiceList
            type="single"
            options={PARTS.map((part) =>
              part.value === "mobile" ? { ...part, disabled: true } : part,
            )}
          />
        </FormQuestion>
      </div>
    </div>
  )
}

function renderListVariant(type: "single" | "multiple") {
  return (
    <div className="w-[360px]">
      {type === "single" ? (
        <FormChoiceList
          type="single"
          options={PARTS.slice(0, 3)}
          defaultValue="pm"
          aria-label="단일 선택 옵션"
        />
      ) : (
        <FormChoiceList
          type="multiple"
          options={PARTS.slice(0, 3)}
          defaultValue={["pm"]}
          aria-label="복수 선택 옵션"
        />
      )}
    </div>
  )
}

export function FormRadioOptionListAllVariants() {
  return (
    <VariantGrid
      set="form-radio-button-option-list"
      rows={[]}
      columns={["Mode"]}
      only={{ Mode: ["Respond"] }}
      render={() => renderListVariant("single")}
    />
  )
}

export function FormCheckboxOptionListAllVariants() {
  return (
    <VariantGrid
      set="form-check-box-option-list"
      rows={[]}
      columns={["Mode"]}
      only={{ Mode: ["Respond"] }}
      render={() => renderListVariant("multiple")}
    />
  )
}

const OPTION = { value: "option", label: "선택 옵션" } as const

function renderItemVariant(variant: FigmaVariant, type: "single" | "multiple") {
  const disabled = variant.props["Disabled"] === "True"
  const selected = variant.props["State"] === "Selected"
  const options = [{ ...OPTION, disabled }]
  const list =
    type === "single" ? (
      <FormChoiceList
        type="single"
        options={options}
        defaultValue={selected ? OPTION.value : null}
        aria-label="단일 선택 옵션"
      />
    ) : (
      <FormChoiceList
        type="multiple"
        options={options}
        defaultValue={selected ? [OPTION.value] : []}
        aria-label="복수 선택 옵션"
      />
    )
  const specId = disabled
    ? `form-choice-list-disabled${selected ? "-selected" : ""}`
    : variant.props["State"] === "Hover"
      ? "form-choice-list-hover"
      : undefined
  return (
    <div className="w-[240px]" data-spec-id={specId}>
      <ForceState states={variant.props["State"] === "Hover" ? ["hover"] : []}>
        {list}
      </ForceState>
    </div>
  )
}

export function FormRadioOptionItemAllVariants() {
  return (
    <VariantGrid
      set="radio-button-option-item"
      rows={["State"]}
      columns={["Mode", "Disabled"]}
      only={{ Mode: ["Respond"] }}
      render={(variant) => renderItemVariant(variant, "single")}
    />
  )
}

export function FormCheckboxOptionItemAllVariants() {
  return (
    <VariantGrid
      set="check-box-option-item"
      rows={["State"]}
      columns={["Mode", "Disabled"]}
      only={{ Mode: ["Respond"] }}
      render={(variant) => renderItemVariant(variant, "multiple")}
    />
  )
}
