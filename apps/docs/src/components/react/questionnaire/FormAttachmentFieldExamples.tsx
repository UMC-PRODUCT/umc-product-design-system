"use client"

import {
  FormAttachmentField,
  FormQuestion,
  GuidanceMessage,
  type FormAttachment,
  type FormAttachmentRejection,
} from "@umc-product/react"
import { useId, useState, type KeyboardEvent } from "react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const REJECTION_MESSAGES: Readonly<
  Record<FormAttachmentRejection["reason"], string>
> = {
  type: "PDF 파일만 올릴 수 있어요",
  size: "200MB 이하 파일만 올릴 수 있어요",
}

const LINK_PATTERN = /^https?:\/\/\S+$/

export function FormAttachmentFieldDefault() {
  const [attachment, setAttachment] = useState<FormAttachment | null>(null)
  const [rejection, setRejection] = useState<FormAttachmentRejection>()
  const messageId = useId()

  const attachLink = (event: KeyboardEvent<HTMLInputElement>) => {
    const link = event.currentTarget.value.trim()
    if (event.key !== "Enter" || !LINK_PATTERN.test(link)) return
    setAttachment({ label: link, href: link })
  }

  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[840px] flex-col gap-3">
        <FormQuestion
          number="05"
          title="포트폴리오를 첨부해 주세요"
          description="링크를 입력하고 Enter를 누르거나 PDF 파일을 올려 주세요"
        >
          <FormAttachmentField
            attachment={attachment}
            onKeyDown={attachLink}
            onFileSelect={(file) => {
              setRejection(undefined)
              setAttachment({ label: file.name })
            }}
            onReject={setRejection}
            onAttachmentRemove={() => setAttachment(null)}
            aria-describedby={rejection === undefined ? undefined : messageId}
          />
        </FormQuestion>
        {rejection !== undefined && (
          <GuidanceMessage id={messageId} color="error" role="status">
            {REJECTION_MESSAGES[rejection.reason]}
          </GuidanceMessage>
        )}
      </div>
    </div>
  )
}

export function FormAttachmentFieldReadOnly() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[840px]">
        <FormQuestion number="05" title="포트폴리오를 첨부해 주세요" readOnly>
          <FormAttachmentField
            attachment={{
              label: "https://umc.dev/portfolio",
              href: "https://umc.dev/portfolio",
            }}
          />
        </FormQuestion>
      </div>
    </div>
  )
}

type FieldState = {
  forced: readonly ForcedState[]
  value?: string
  attachment?: FormAttachment
  readOnly?: boolean
  preview?: boolean
  specId?: string
}

const SAMPLE_ATTACHMENT: FormAttachment = {
  label: "portfolio.pdf",
  href: "#portfolio",
}

const FIELD_STATES: Readonly<Record<string, FieldState>> = {
  Default: {
    forced: [],
    specId: [
      "form-attachment-field-root",
      "form-attachment-field-box",
      "form-attachment-field-input",
      "form-attachment-field-upload",
    ].join(" "),
  },
  Hover: { forced: ["hover"], specId: "form-attachment-field-hover" },
  Focus: { forced: ["focus-within"] },
  Typing: {
    forced: ["focus-within"],
    value: "https://umc.dev/portfolio",
    specId: "form-attachment-field-typing form-attachment-field-remove",
  },
  Filled: {
    forced: [],
    attachment: SAMPLE_ATTACHMENT,
    specId: "form-attachment-field-clip form-attachment-field-name",
  },
  "Read Only": { forced: [], attachment: SAMPLE_ATTACHMENT, readOnly: true },
}

const PREVIEW_STATES: Readonly<Record<string, FieldState>> = {
  Default: {
    forced: [],
    preview: true,
    specId: "form-attachment-field-preview",
  },
  Hover: {
    forced: ["hover"],
    preview: true,
    specId: "form-attachment-field-preview-hover",
  },
  Focus: { forced: ["focus-within"], preview: true },
}

function renderFieldVariant(variant: FigmaVariant) {
  const states =
    variant.props["Mode"] === "Form Create (생성 중)"
      ? PREVIEW_STATES
      : FIELD_STATES
  const state = states[variant.props["State"] ?? ""]
  if (state === undefined) {
    throw new Error(`${variant.name}: 대응하는 상태가 없습니다`)
  }
  return (
    <div className="w-[520px]" data-spec-id={state.specId}>
      <ForceState states={state.forced}>
        <FormAttachmentField
          aria-label="포트폴리오"
          defaultValue={state.value}
          attachment={state.attachment}
          readOnly={state.readOnly}
          preview={state.preview}
        />
      </ForceState>
    </div>
  )
}

export function FormAttachmentFieldAllVariants() {
  return (
    <VariantGrid
      set="form-attachment-field"
      rows={["State"]}
      columns={["Mode"]}
      order={{
        State: ["Default", "Hover", "Focus", "Typing", "Filled", "Read Only"],
        Mode: ["Form Respond (입력 중)", "Form Create (생성 중)"],
      }}
      render={renderFieldVariant}
    />
  )
}
