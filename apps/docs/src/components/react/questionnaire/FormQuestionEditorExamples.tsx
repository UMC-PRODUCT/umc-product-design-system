"use client"

import {
  FormAttachmentField,
  FormChoiceListEditor,
  FormEditableQuestion,
  FormQuestionEditor,
  FormQuestionTypeList,
  TextArea,
  type FormChoiceDraftOption,
} from "@umc-product/react"
import { useState, type ReactNode } from "react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { QUESTION_TYPES } from "./question-types.tsx"
import {
  QuestionListEditor,
  type DraftQuestion,
} from "./QuestionListEditor.tsx"

const SAMPLE_QUESTIONS: readonly DraftQuestion[] = [
  {
    id: "introduction",
    type: "long",
    title: "자기소개를 적어 주세요",
    description: "지원 동기와 함께 적어 주세요",
    required: true,
    options: [],
  },
  {
    id: "part",
    type: "single",
    title: "지원 파트를 골라 주세요",
    description: "",
    required: true,
    options: [
      { id: "pm", label: "PM" },
      { id: "design", label: "Design" },
      { id: "web", label: "Web" },
    ],
  },
]

export function FormQuestionEditorDefault() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[900px]">
        <QuestionListEditor initialQuestions={SAMPLE_QUESTIONS} />
      </div>
    </div>
  )
}

export function FormQuestionEditorQuestionEnabled() {
  const [required, setRequired] = useState(false)
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="umc-example">
      <div className="w-full max-w-[900px]">
        <FormQuestionEditor
          active
          required={required}
          onRequiredChange={setRequired}
          questionEnabled={enabled}
          onQuestionEnabledChange={setEnabled}
        >
          <FormEditableQuestion
            number="03"
            titleProps={{ defaultValue: "포트폴리오를 첨부해 주세요" }}
          >
            <FormAttachmentField preview aria-label="03번 첨부 칸" />
          </FormEditableQuestion>
        </FormQuestionEditor>
      </div>
    </div>
  )
}

export function FormQuestionEditorDisabled() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[900px]">
        <FormQuestionEditor disabled required>
          <FormEditableQuestion
            number="01"
            titleProps={{ defaultValue: "자기소개를 적어 주세요" }}
            descriptionProps={{
              defaultValue: "모집 기간이 지나 고칠 수 없어요",
            }}
          >
            <TextArea
              placeholder="작성하세요"
              maxLength={500}
              disabled
              aria-label="01번 답 칸"
            />
          </FormEditableQuestion>
        </FormQuestionEditor>
      </div>
    </div>
  )
}

type EditorState = {
  forced: readonly ForcedState[]
  active?: boolean
  disabled?: boolean
  specId: string
}

const EDITOR_STATES: Readonly<Record<string, EditorState>> = {
  Default: { forced: [], specId: "form-question-editor-default" },
  "Hover&Pressed": {
    forced: ["hover"],
    specId: [
      "form-question-editor-card",
      "form-question-editor-hover-bar",
      "form-question-editor-hover-handle",
    ].join(" "),
  },
  Focus: {
    forced: [],
    active: true,
    specId: [
      "form-question-editor-root",
      "form-question-editor-focus",
      "form-question-editor-focus-bar",
      "form-question-editor-focus-handle",
      "form-question-editor-actions",
      "form-question-editor-required",
      "form-question-editor-delete",
    ].join(" "),
  },
  Disabled: {
    forced: [],
    disabled: true,
    specId: "form-question-editor-disabled-title",
  },
}

function renderEditorVariant(variant: FigmaVariant) {
  const state = lookup(EDITOR_STATES, variant, "State")
  return (
    <div className="w-[720px]" data-spec-id={state.specId}>
      <ForceState states={state.forced}>
        <FormQuestionEditor
          active={state.active}
          disabled={state.disabled}
          required
          dragHandleProps={{}}
          toolbar={
            <FormQuestionTypeList items={QUESTION_TYPES} value="short" />
          }
        >
          <FormEditableQuestion number="00">
            <TextArea
              placeholder="작성하세요"
              maxLength={500}
              readOnly={!state.disabled}
              disabled={state.disabled}
              aria-label="답 칸"
            />
          </FormEditableQuestion>
        </FormQuestionEditor>
      </ForceState>
    </div>
  )
}

export function FormQuestionEditorAllVariants() {
  return (
    <VariantGrid
      set="form-question-editor"
      rows={["State"]}
      columns={[]}
      order={{ State: ["Default", "Hover&Pressed", "Focus", "Disabled"] }}
      render={renderEditorVariant}
    />
  )
}

const keepOptions = () => {}

const choiceOptionsOf = (
  label: string,
  filled: boolean,
): readonly FormChoiceDraftOption[] =>
  filled
    ? [
        { id: "first", label },
        { id: "second", label },
      ]
    : [{ id: "first", label: "" }]

const EDIT_ANSWERS: Readonly<Record<string, (filled: boolean) => ReactNode>> = {
  "Short Text (주관식)": () => (
    <TextArea
      placeholder="작성하세요"
      maxLength={500}
      readOnly
      aria-label="답 칸"
    />
  ),
  "Long Text (장문형)": () => (
    <TextArea
      placeholder="작성하세요"
      maxLength={1000}
      readOnly
      aria-label="답 칸"
    />
  ),
  "Multi Select (복수 선택)": (filled) => (
    <FormChoiceListEditor
      type="multiple"
      options={choiceOptionsOf("복수 선택 옵션", filled)}
      onOptionAdd={keepOptions}
    />
  ),
  "Single Select (단일 선택)": (filled) => (
    <FormChoiceListEditor
      type="single"
      options={choiceOptionsOf("단일 선택 옵션", filled)}
      onOptionAdd={keepOptions}
    />
  ),
  "File Upload (파일 업로드&포트폴리오 업로드)": () => (
    <FormAttachmentField preview aria-label="첨부 칸" />
  ),
}

const EDIT_SPEC_IDS: Readonly<Record<string, string>> = {
  "Short Text (주관식) · Empty": [
    "form-editable-question-root",
    "form-editable-question-header",
    "form-editable-question-number-empty",
    "form-editable-question-title",
    "form-editable-question-required",
    "form-editable-question-description",
    "form-editable-question-answer",
  ].join(" "),
  "Multi Select (복수 선택) · Filled": [
    "form-editable-question-filled",
    "form-editable-question-number-filled",
    "form-editable-question-title-filled",
    "form-editable-question-description-filled",
  ].join(" "),
}

function renderEditVariant(variant: FigmaVariant) {
  const filled = variant.props["Question State"] === "Filled"
  const answerOf = lookup(EDIT_ANSWERS, variant, "Type")
  const specKey = `${variant.props["Type"]} · ${variant.props["Question State"]}`
  return (
    <div className="w-[520px]" data-spec-id={EDIT_SPEC_IDS[specKey]}>
      <FormEditableQuestion
        number="00"
        required
        titleProps={filled ? { defaultValue: "질문입니다" } : undefined}
        descriptionProps={filled ? { defaultValue: "설명" } : undefined}
      >
        {answerOf(filled)}
      </FormEditableQuestion>
    </div>
  )
}

export function FormQuestionEditModeAllVariants() {
  return (
    <VariantGrid
      set="form-question"
      rows={["Type"]}
      columns={["Question State"]}
      only={{ Mode: ["Edit (폼 생성)"] }}
      render={renderEditVariant}
    />
  )
}
