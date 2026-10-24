"use client"

import {
  Field,
  FieldControl,
  InputBox,
  TextInfoButton,
  type FieldCaptionSize,
} from "@umc-product/react"

import { NotImplemented } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

function renderControl({
  placeholder,
  defaultValue,
}: {
  placeholder?: string
  defaultValue?: string
}) {
  return (
    <InputBox>
      <FieldControl
        className="umc-input-box__input"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </InputBox>
  )
}

export function FieldDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-root field-label field-required field-caption"
      >
        <Field label="학교 이메일" required caption="학교 도메인만 받습니다">
          {renderControl({ placeholder: "umc@school.ac.kr" })}
        </Field>
      </div>
    </div>
  )
}

export function FieldCaptionTones() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-primary"
      >
        <Field
          label="닉네임"
          caption="사용할 수 있는 닉네임입니다"
          captionColor="primary"
        >
          {renderControl({ defaultValue: "umc" })}
        </Field>
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-error field-label-error"
      >
        <Field
          label="닉네임"
          invalid
          errorMessage="이미 사용 중인 닉네임입니다"
        >
          {renderControl({ defaultValue: "umc" })}
        </Field>
      </div>
      <div
        className="w-full max-w-[326px]"
        data-spec-id="field-caption-disabled field-label-disabled"
      >
        <Field label="닉네임" caption="수정할 수 없습니다" disabled>
          {renderControl({ defaultValue: "umc" })}
        </Field>
      </div>
    </div>
  )
}

export function FieldCaptionSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[326px]">
        <Field label="학교 이메일" caption="학교 도메인만 받습니다">
          {renderControl({ placeholder: "umc@school.ac.kr" })}
        </Field>
      </div>
      <div className="w-full max-w-[326px]" data-spec-id="field-caption-lg">
        <Field
          label="학교 이메일"
          caption="학교 도메인만 받습니다"
          captionSize="lg"
        >
          {renderControl({ placeholder: "umc@school.ac.kr" })}
        </Field>
      </div>
    </div>
  )
}

export function FieldWithInfo() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="w-full max-w-[326px]">
        <Field
          label="개별 지원 코드"
          info={<TextInfoButton>개별 지원 코드란?</TextInfoButton>}
        >
          {renderControl({ placeholder: "코드 입력" })}
        </Field>
      </div>
    </div>
  )
}

function FieldLabelCell({ variant }: { variant: FigmaVariant }) {
  if (variant.props["Caption"] === "True") {
    return (
      <NotImplemented reason="레이블 옆 회색 보조 문구는 쓰임새를 확인할 때까지 넣지 않았습니다" />
    )
  }
  const state = variant.props["State"]
  return (
    <Field
      label="레이블"
      required
      invalid={state === "Error"}
      disabled={state === "Disabled"}
    >
      {null}
    </Field>
  )
}

const FIGMA_CAPTION_SIZES: Readonly<Record<string, FieldCaptionSize>> = {
  "13px": "md",
  "14px": "lg",
}

function FieldCaptionCell({ variant }: { variant: FigmaVariant }) {
  const type = variant.props["Type"]
  return (
    <Field
      caption="도움말을 적어 주세요"
      captionColor={type === "Primary" ? "primary" : "neutral"}
      captionSize={lookup(FIGMA_CAPTION_SIZES, variant, "Size")}
      invalid={type === "Error"}
      errorMessage={type === "Error" ? "오류 메시지를 적어 주세요" : undefined}
      disabled={type === "Disabled"}
    >
      {null}
    </Field>
  )
}

export function FieldAllVariants() {
  return (
    <>
      <VariantGrid
        set="text-field-label"
        rows={["State"]}
        columns={["Caption"]}
        order={{ Caption: ["False", "True"] }}
        render={(variant) => <FieldLabelCell variant={variant} />}
      />
      <VariantGrid
        set="help-text"
        rows={["Type"]}
        columns={["Size"]}
        order={{ Size: ["13px", "14px"] }}
        render={(variant) => <FieldCaptionCell variant={variant} />}
      />
    </>
  )
}
