"use client"

import {
  FormChoiceListEditor,
  FormEditableQuestion,
  type FormChoiceDraftOption,
} from "@umc-product/react"
import { useId, useRef, useState } from "react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ChoiceType = "single" | "multiple"

type ChoiceEditorDemoProps = {
  type: ChoiceType
  number: string
  title: string
  initialOptions: readonly FormChoiceDraftOption[]
}

function ChoiceEditorDemo({
  type,
  number,
  title,
  initialOptions,
}: ChoiceEditorDemoProps) {
  const idPrefix = useId()
  const nextId = useRef(0)
  const [options, setOptions] = useState(initialOptions)

  return (
    <div className="umc-example">
      <div className="w-full max-w-[840px]">
        <FormEditableQuestion
          number={number}
          required
          titleProps={{ defaultValue: title }}
        >
          <FormChoiceListEditor
            type={type}
            options={options}
            onOptionChange={(id, label) =>
              setOptions((current) =>
                current.map((option) =>
                  option.id === id ? { ...option, label } : option,
                ),
              )
            }
            onOptionAdd={() => {
              nextId.current += 1
              const id = `${idPrefix}-${nextId.current}`
              setOptions((current) => [...current, { id, label: "" }])
            }}
            onOptionRemove={(id) =>
              setOptions((current) =>
                current.filter((option) => option.id !== id),
              )
            }
          />
        </FormEditableQuestion>
      </div>
    </div>
  )
}

export function FormChoiceListEditorSingle() {
  return (
    <ChoiceEditorDemo
      type="single"
      number="02"
      title="지원 파트를 골라 주세요"
      initialOptions={[
        { id: "pm", label: "PM" },
        { id: "design", label: "Design" },
        { id: "web", label: "" },
      ]}
    />
  )
}

export function FormChoiceListEditorMultiple() {
  return (
    <ChoiceEditorDemo
      type="multiple"
      number="04"
      title="면접이 가능한 요일을 모두 골라 주세요"
      initialOptions={[
        { id: "mon", label: "월요일" },
        { id: "wed", label: "수요일" },
      ]}
    />
  )
}

const keepOptions = () => {}

const FILLED_OPTIONS = (label: string): readonly FormChoiceDraftOption[] => [
  { id: "first", label },
  { id: "second", label },
]

const LIST_SPEC_IDS: Readonly<Record<ChoiceType, string | undefined>> = {
  single: undefined,
  multiple: [
    "form-choice-list-editor-box",
    "form-choice-list-editor-option",
    "form-choice-list-editor-input",
    "form-choice-list-editor-checkbox",
  ].join(" "),
}

const OPTION_LABELS: Readonly<Record<ChoiceType, string>> = {
  single: "단일 선택 옵션",
  multiple: "복수 선택 옵션",
}

function renderListVariant(type: ChoiceType) {
  return (
    <div className="w-[360px]" data-spec-id={LIST_SPEC_IDS[type]}>
      <FormChoiceListEditor
        type={type}
        options={FILLED_OPTIONS(OPTION_LABELS[type])}
        onOptionAdd={keepOptions}
        onOptionRemove={keepOptions}
      />
    </div>
  )
}

export function FormRadioOptionListEditAllVariants() {
  return (
    <VariantGrid
      set="form-radio-button-option-list"
      rows={[]}
      columns={["Mode"]}
      only={{ Mode: ["Edit"] }}
      render={() => renderListVariant("single")}
    />
  )
}

export function FormCheckboxOptionListEditAllVariants() {
  return (
    <VariantGrid
      set="form-check-box-option-list"
      rows={[]}
      columns={["Mode"]}
      only={{ Mode: ["Edit"] }}
      render={() => renderListVariant("multiple")}
    />
  )
}

type ItemState = {
  options: readonly FormChoiceDraftOption[]
  addable?: boolean
  hover?: boolean
  specIds: Readonly<Record<ChoiceType, string | undefined>>
}

const ITEM_STATES: Readonly<Record<string, ItemState>> = {
  Add: {
    options: [],
    addable: true,
    specIds: {
      single: undefined,
      multiple: [
        "form-choice-list-editor-add",
        "form-choice-list-editor-add-label",
        "form-choice-list-editor-add-checkbox",
      ].join(" "),
    },
  },
  Default: {
    options: [{ id: "option", label: "" }],
    specIds: { single: undefined, multiple: undefined },
  },
  Filled: {
    options: [{ id: "option", label: "선택 옵션" }],
    specIds: { single: undefined, multiple: undefined },
  },
  Hover: {
    options: [{ id: "option", label: "선택 옵션" }],
    hover: true,
    specIds: {
      single: "form-choice-list-editor-radio",
      multiple: "form-choice-list-editor-hover form-choice-list-editor-remove",
    },
  },
}

function renderItemVariant(variant: FigmaVariant, type: ChoiceType) {
  const state = ITEM_STATES[variant.props["State"] ?? ""]
  if (state === undefined) {
    throw new Error(`${variant.name}: 대응하는 상태가 없습니다`)
  }
  return (
    <div className="w-[240px]" data-spec-id={state.specIds[type]}>
      <ForceState states={state.hover ? ["hover"] : []}>
        <FormChoiceListEditor
          type={type}
          options={state.options}
          onOptionAdd={state.addable ? keepOptions : undefined}
          onOptionRemove={keepOptions}
        />
      </ForceState>
    </div>
  )
}

export function FormRadioOptionItemEditAllVariants() {
  return (
    <VariantGrid
      set="radio-button-option-item"
      rows={["State"]}
      columns={["Mode"]}
      only={{ Mode: ["Edit"] }}
      order={{ State: ["Default", "Filled", "Hover", "Add"] }}
      render={(variant) => renderItemVariant(variant, "single")}
    />
  )
}

export function FormCheckboxOptionItemEditAllVariants() {
  return (
    <VariantGrid
      set="check-box-option-item"
      rows={["State"]}
      columns={["Mode"]}
      only={{ Mode: ["Edit"] }}
      order={{ State: ["Default", "Filled", "Hover", "Add"] }}
      render={(variant) => renderItemVariant(variant, "multiple")}
    />
  )
}
