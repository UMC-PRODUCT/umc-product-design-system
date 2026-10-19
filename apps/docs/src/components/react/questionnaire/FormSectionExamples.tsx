"use client"

import {
  FormEditableQuestion,
  FormQuestionEditor,
  FormQuestionToolbar,
  FormQuestionTypeList,
  FormSection,
  TextArea,
  type FormSectionVariant,
} from "@umc-product/react"
import type { ReactNode } from "react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { QUESTION_TYPES } from "./question-types.tsx"
import {
  QuestionListEditor,
  type DraftQuestion,
} from "./QuestionListEditor.tsx"

const COMMON_QUESTIONS: readonly DraftQuestion[] = [
  {
    id: "introduction",
    type: "long",
    title: "자기소개를 적어 주세요",
    description: "",
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
      { id: "design", label: "Design" },
      { id: "web", label: "Web Product Engineering" },
      { id: "mobile", label: "Mobile Product Engineering" },
    ],
  },
]

const PM_QUESTIONS: readonly DraftQuestion[] = [
  {
    id: "pm-experience",
    type: "short",
    title: "기획해 본 서비스를 소개해 주세요",
    description: "",
    required: false,
    options: [],
  },
]

export function FormSectionDefault() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[900px] flex-col gap-10">
        <FormSection title="공통 문항">
          <QuestionListEditor initialQuestions={COMMON_QUESTIONS} />
        </FormSection>
        <FormSection variant="toggle" title="PM" optionalLabel="(선택 사항)">
          <QuestionListEditor initialQuestions={PM_QUESTIONS} />
        </FormSection>
      </div>
    </div>
  )
}

type SectionHeader = {
  variant: FormSectionVariant
  title: string
  optionalLabel?: string
}

const SECTION_HEADERS: Readonly<Record<string, SectionHeader>> = {
  "Static(공통 문항)": { variant: "static", title: "공통 문항" },
  "Toggle(파트 문항)": {
    variant: "toggle",
    title: "섹션 라벨",
    optionalLabel: "(선택 사항)",
  },
  Common: { variant: "static", title: "공통 문항" },
  Custom: {
    variant: "toggle",
    title: "섹션 라벨",
    optionalLabel: "(선택 사항)",
  },
}

const CONTROL_SPEC_IDS: Readonly<Record<string, string>> = {
  "Static(공통 문항) · True": [
    "form-section-static-tab",
    "form-section-static-curve",
    "form-section-static-bar",
  ].join(" "),
  "Toggle(파트 문항) · True": [
    "form-section-toggle-header",
    "form-section-toggle-title",
    "form-section-toggle-optional",
    "form-section-toggle-switch",
  ].join(" "),
  "Toggle(파트 문항) · False": "form-section-toggle-off",
}

function renderControlVariant(variant: FigmaVariant) {
  const header = lookup(SECTION_HEADERS, variant, "Type")
  const specKey = `${variant.props["Type"]} · ${variant.props["Enabled"]}`
  return (
    <div className="w-[640px]" data-spec-id={CONTROL_SPEC_IDS[specKey]}>
      <FormSection
        {...header}
        defaultEnabled={variant.props["Enabled"] === "True"}
      >
        {null}
      </FormSection>
    </div>
  )
}

export function FormSectionControlAllVariants() {
  return (
    <VariantGrid
      set="form-section-control"
      rows={["Type"]}
      columns={["Enabled"]}
      order={{ Enabled: ["True", "False"] }}
      render={renderControlVariant}
    />
  )
}

function SampleEditor({ active = false }: { active?: boolean }) {
  return (
    <FormQuestionEditor
      active={active}
      required
      dragHandleProps={{}}
      toolbar={<FormQuestionTypeList items={QUESTION_TYPES} value="short" />}
    >
      <FormEditableQuestion number="00">
        <TextArea
          placeholder="작성하세요"
          maxLength={500}
          readOnly
          aria-label="답 칸"
        />
      </FormEditableQuestion>
    </FormQuestionEditor>
  )
}

const SECTION_BODIES: Readonly<Record<string, () => ReactNode>> = {
  Default: () => <SampleEditor />,
  Focus: () => (
    <>
      <SampleEditor />
      <FormQuestionToolbar items={QUESTION_TYPES} />
    </>
  ),
  "Add Menu Open": () => (
    <>
      <SampleEditor />
      <FormQuestionToolbar items={QUESTION_TYPES} defaultOpen />
    </>
  ),
  "Question Editing": () => (
    <>
      <SampleEditor />
      <SampleEditor active />
    </>
  ),
}

function renderSectionVariant(variant: FigmaVariant) {
  const header = lookup(SECTION_HEADERS, variant, "Section Type")
  const body = lookup(SECTION_BODIES, variant, "State")
  const isCustomDefault =
    variant.props["Section Type"] === "Custom" &&
    variant.props["State"] === "Default"
  return (
    <div
      className="w-[720px]"
      data-spec-id={isCustomDefault ? "form-section-body" : undefined}
    >
      <FormSection
        {...header}
        defaultEnabled={variant.props["Use Section"] === "True"}
      >
        {body()}
      </FormSection>
    </div>
  )
}

export function FormQuestionSectionAllVariants() {
  return (
    <VariantGrid
      set="form-question-section"
      sections={["Section Type"]}
      rows={["State"]}
      columns={["Use Section"]}
      order={{
        "Section Type": ["Common", "Custom"],
        State: ["Default", "Focus", "Add Menu Open", "Question Editing"],
        "Use Section": ["True", "False"],
      }}
      render={renderSectionVariant}
    />
  )
}
