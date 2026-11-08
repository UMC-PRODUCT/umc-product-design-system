"use client"

import { Accordion, AccordionItem } from "@umc-product/react"
import type { ReactNode } from "react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PLACEHOLDER_TITLE = "UMC는 어떤 동아리이고, 어떤 활동을 하나요?"

const PLACEHOLDER_BODY =
  "UMC는 기획, 디자인, 개발 분야의 대학생들이 함께 공부하고 실제 서비스를 만들어보는 전국 단위 IT 연합 동아리예요.\n스터디 → 프로젝트 → 데모데이 순서로 약 6개월 동안 활동해요. 스터디로 기본기를 쌓은 뒤 프로젝트 팀을 구성해 하나의 서비스를 기획하고, 디자인하고, 개발하며 완성해요. 완성한 프로젝트는 데모데이를 통해 다른 팀과 공유하고, 함께 돌아보는 시간을 가져요."

type FaqItem = {
  value: string
  title: ReactNode
  body: ReactNode
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    value: "edit-project",
    title: "프로젝트 등록 후 수정이 가능한가요?",
    body: "답변이 들어가는 자리예요. 줄바꿈은 그대로 보여요.",
  },
  {
    value: "edit-form",
    title: "지원 폼 문항을 수정하면 어떻게 되나요?",
    body: "Plan 챌린저가 문항을 수정하면 차수에 따라 지원자에게 보이는 문항이 달라지고\nPlan 챌린저 또한 차수별로 서로 다른 문항 구성의 지원서를 검토하게 돼요.\n매칭이 진행되는 동안에는 지원 폼 문항을 수정할 수 없다는 점 유의해 주세요!",
  },
  {
    value: "decision",
    title: (
      <>
        지원자 합/불 처리는 언제부터 가능한가요?
        <br />한 번 불합격 처리한 지원자를 다시 합격으로 바꿀 수 있나요?
      </>
    ),
    body: "답변이 들어가는 자리예요.",
  },
  {
    value: "empty-part",
    title: "지원자가 아무도 없는 파트는 어떻게 처리되나요?",
    body: "답변이 들어가는 자리예요.",
  },
]

const SPEC_IDS = [
  "accordion",
  "accordion-item",
  "accordion-item-trigger",
  "accordion-item-title-container",
  "accordion-item-prefix",
  "accordion-item-title",
  "accordion-item-icon",
  "accordion-item-hover",
  "accordion-item-expanded",
  "accordion-item-body",
].join(" ")

export function AccordionPreview() {
  return (
    <div className="umc-example umc-example-flush">
      <div data-spec-id={SPEC_IDS}>
        <Accordion defaultValue={["activity"]}>
          <AccordionItem
            value="about"
            title={PLACEHOLDER_TITLE}
            body={PLACEHOLDER_BODY}
          />
          <AccordionItem
            value="activity"
            title={PLACEHOLDER_TITLE}
            body={PLACEHOLDER_BODY}
          />
        </Accordion>
      </div>
    </div>
  )
}

export function AccordionFaq() {
  return (
    <div className="umc-example umc-example-flush">
      <Accordion defaultValue={["edit-form"]}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.value} {...item} />
        ))}
      </Accordion>
    </div>
  )
}

export function AccordionMultiple() {
  return (
    <div className="umc-example umc-example-flush">
      <Accordion multiple defaultValue={["edit-project", "empty-part"]}>
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.value} {...item} />
        ))}
      </Accordion>
    </div>
  )
}

export function AccordionWithoutPrefix() {
  return (
    <div className="umc-example umc-example-flush">
      <Accordion>
        <AccordionItem
          value="notice"
          prefix={null}
          title="이용 안내"
          body="접두를 넘기지 않으면 Q가 붙고, null을 넘기면 제목만 보여요."
        />
      </Accordion>
    </div>
  )
}

function AccordionVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  return (
    <ForceState states={state === "Hover" ? ["hover"] : []}>
      <Accordion defaultValue={state === "Expanded" ? ["about"] : []}>
        <AccordionItem
          value="about"
          title={PLACEHOLDER_TITLE}
          body={PLACEHOLDER_BODY}
        />
      </Accordion>
    </ForceState>
  )
}

export function AccordionAllVariants() {
  return (
    <VariantGrid
      set="web-accordion-item"
      rows={["State"]}
      columns={[]}
      render={(variant) => <AccordionVariantCell variant={variant} />}
    />
  )
}
