"use client"

import { FormQuestionToolbar, FormQuestionTypeList } from "@umc-product/react"
import { useState } from "react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import {
  QUESTION_TYPES,
  isQuestionType,
  labelOfQuestionType,
  type QuestionType,
} from "./question-types.tsx"

export function FormQuestionToolbarDefault() {
  const [added, setAdded] = useState<readonly QuestionType[]>([])

  return (
    <div className="umc-example umc-example-stack">
      <p role="status" className="m-0 text-sm">
        {added.length === 0
          ? "아직 더한 질문이 없습니다"
          : `더한 질문: ${added.map(labelOfQuestionType).join(", ")}`}
      </p>
      <FormQuestionToolbar
        items={QUESTION_TYPES}
        onTypeSelect={(value) => {
          if (isQuestionType(value)) setAdded((current) => [...current, value])
        }}
      />
    </div>
  )
}

export function FormQuestionTypeListDefault() {
  const [type, setType] = useState<QuestionType>("short")

  return (
    <div className="umc-example umc-example-stack">
      <FormQuestionTypeList
        items={QUESTION_TYPES}
        value={type}
        onValueChange={(value) => {
          if (isQuestionType(value)) setType(value)
        }}
      />
      <p role="status" className="m-0 text-sm">
        지금 유형: {labelOfQuestionType(type)}
      </p>
    </div>
  )
}

function renderToolbarVariant(variant: FigmaVariant) {
  const expanded = variant.props["Variant"] === "Expanded"
  return (
    <div
      data-spec-id={
        expanded
          ? "form-question-toolbar-expanded form-question-type-list"
          : "form-question-toolbar-default"
      }
    >
      <FormQuestionToolbar items={QUESTION_TYPES} defaultOpen={expanded} />
    </div>
  )
}

export function FormQuestionToolbarAllVariants() {
  return (
    <VariantGrid
      set="form-question-toolbar"
      rows={[]}
      columns={["Variant"]}
      order={{ Variant: ["Default", "Expanded"] }}
      render={renderToolbarVariant}
    />
  )
}

const TYPE_ITEM_SPEC_IDS: Readonly<Record<string, string>> = {
  Default: [
    "form-question-type-item",
    "form-question-type-item-icon",
    "form-question-type-item-label",
  ].join(" "),
  Selected: [
    "form-question-type-item-selected",
    "form-question-type-item-selected-icon",
    "form-question-type-item-selected-label",
  ].join(" "),
}

function renderTypeItemVariant(variant: FigmaVariant) {
  const state = variant.props["State"] ?? ""
  return (
    <div data-spec-id={TYPE_ITEM_SPEC_IDS[state]}>
      <FormQuestionTypeList
        items={QUESTION_TYPES.slice(0, 1)}
        value={state === "Selected" ? "short" : null}
      />
    </div>
  )
}

export function FormQuestionTypeItemAllVariants() {
  return (
    <VariantGrid
      set="form-question-type-item"
      rows={[]}
      columns={["State"]}
      render={renderTypeItemVariant}
    />
  )
}
