import {
  FormAttachmentField,
  FormChoiceList,
  FormQuestion,
  FormTextAnswer,
  type FormChoiceOption,
} from "@umc-product/react"
import type { ReactNode } from "react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PARTS: readonly FormChoiceOption[] = [
  { value: "pm", label: "PM" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
]

export function FormQuestionDefault() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[840px] flex-col gap-10">
        <div data-spec-id="form-question-text-root form-question-answer">
          <FormQuestion
            number="01"
            title="자기소개를 적어 주세요"
            required
            description="지원 동기와 함께 500자 이내로 적어 주세요"
          >
            <FormTextAnswer placeholder="작성하세요" maxLength={500} />
          </FormQuestion>
        </div>
        <FormQuestion number="02" title="UMC에서 이루고 싶은 목표가 있나요?">
          <FormTextAnswer placeholder="작성하세요" maxLength={1000} />
        </FormQuestion>
      </div>
    </div>
  )
}

export function FormQuestionReadOnly() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[840px] flex-col gap-10">
        <FormQuestion
          number="01"
          title="자기소개를 적어 주세요"
          required
          readOnly
        >
          <FormTextAnswer
            maxLength={500}
            defaultValue="서비스를 끝까지 만들어 보고 싶어 지원했습니다"
          />
        </FormQuestion>
        <FormQuestion
          number="02"
          title="지원 파트를 골라 주세요"
          required
          readOnly
        >
          <FormChoiceList type="single" options={PARTS} defaultValue="design" />
        </FormQuestion>
      </div>
    </div>
  )
}

const ANSWERS: Readonly<Record<string, () => ReactNode>> = {
  "Short Text (주관식)": () => (
    <FormTextAnswer maxLength={500} defaultValue="Value" />
  ),
  "Long Text (장문형)": () => (
    <FormTextAnswer maxLength={1000} defaultValue="Value" />
  ),
  "Multi Select (복수 선택)": () => (
    <FormChoiceList type="multiple" options={PARTS} defaultValue={["pm"]} />
  ),
  "Single Select (단일 선택)": () => (
    <FormChoiceList type="single" options={PARTS} defaultValue="pm" />
  ),
  "File Upload (파일 업로드&포트폴리오 업로드)": () => (
    <FormAttachmentField
      attachment={{ label: "portfolio.pdf", href: "#portfolio" }}
    />
  ),
}

function renderQuestionVariant(variant: FigmaVariant) {
  return (
    <div className="w-[520px]">
      <FormQuestion
        number="00"
        title="질문입니다"
        required
        description="설명"
        readOnly={variant.props["Mode"] === "Read Only"}
      >
        {lookup(ANSWERS, variant, "Type")()}
      </FormQuestion>
    </div>
  )
}

export function FormQuestionAllVariants() {
  return (
    <VariantGrid
      set="form-question"
      rows={["Type"]}
      columns={["Mode"]}
      only={{ Mode: ["Respond (폼 응답)", "Read Only"] }}
      render={renderQuestionVariant}
    />
  )
}
