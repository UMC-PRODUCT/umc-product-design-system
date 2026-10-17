"use client"

import { Button, AppDialog } from "@umc-product/react"
import { useState } from "react"

import {
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PREVIEW_TITLE = "제목을 입력하세요"
const PREVIEW_DESCRIPTION = "다이얼로그 설명 문구가 들어갑니다."
const CONFIRM_LABEL = "확인"
const CANCEL_LABEL = "취소"

function AppDialogPreviewItem({
  specId,
  type,
}: {
  specId?: string
  type: "alert" | "confirm"
}) {
  const hasTwoButtons = type === "alert"
  const code = componentCodeOf(AppDialog, {
    open: true,
    title: PREVIEW_TITLE,
    description: PREVIEW_DESCRIPTION,
    confirmLabel: CONFIRM_LABEL,
    cancelLabel: hasTwoButtons ? CANCEL_LABEL : undefined,
  })
  return (
    <div
      className="umc-app-dialog__popup"
      data-spec-id={specId}
      style={{ position: "static", translate: "none", zIndex: "auto" }}
      {...codeAttributeOf(code)}
    >
      <div className="umc-app-dialog__text" data-layout={type}>
        <div className="umc-app-dialog__title">{PREVIEW_TITLE}</div>
        <div className="umc-app-dialog__description">{PREVIEW_DESCRIPTION}</div>
      </div>
      {hasTwoButtons ? (
        <div className="umc-app-dialog__button-area" data-variant="default">
          <button
            className="umc-button"
            data-variant="weak"
            data-color="neutral"
            data-size="md"
            type="button"
          >
            <span className="umc-button__label">{CANCEL_LABEL}</span>
          </button>
          <button
            className="umc-button"
            data-variant="fill"
            data-color="primary"
            data-size="md"
            type="button"
          >
            <span className="umc-button__label">{CONFIRM_LABEL}</span>
          </button>
        </div>
      ) : (
        <div className="umc-app-dialog__button-area" data-variant="weak">
          <button
            className="umc-text-button"
            data-color="brand"
            data-size="xs"
            data-variant="plain"
            type="button"
          >
            <span className="umc-text-button__label">{CONFIRM_LABEL}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export function AppDialogStaticPreview() {
  return (
    <div
      className="umc-example umc-example-stack"
      style={{ background: "var(--umc-color-fill-neutral-medium-100)" }}
    >
      <AppDialogPreviewItem
        specId="app-dialog-alert app-dialog-alert-title app-dialog-alert-description app-dialog-alert-button-area"
        type="alert"
      />
      <AppDialogPreviewItem
        specId="app-dialog-confirm-button-area app-dialog-confirm-button"
        type="confirm"
      />
    </div>
  )
}

export function AppDialogInteractiveAlert() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <Button
        size="sm"
        variant="weak"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Alert 다이얼로그 열기
      </Button>
      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="정말 삭제할까요?"
        description="삭제한 데이터는 복구할 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </div>
  )
}

export function AppDialogInteractiveConfirm() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <Button
        size="sm"
        variant="weak"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Confirm 다이얼로그 열기
      </Button>
      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="저장되었습니다."
        description="변경 사항이 저장되었습니다."
        confirmLabel="확인"
        onConfirm={() => setOpen(false)}
      />
    </div>
  )
}

const DIALOG_TYPES: Record<string, "alert" | "confirm"> = {
  Alert: "alert",
  Confirm: "confirm",
}

export function AppDialogAllVariants() {
  return (
    <VariantGrid
      set="app-dialog"
      rows={["Type"]}
      columns={[]}
      render={(variant: FigmaVariant) => (
        <AppDialogPreviewItem type={lookup(DIALOG_TYPES, variant, "Type")} />
      )}
    />
  )
}

export function AppDialogButtonAreaVariants() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        data-figma-set="app-dialog-button-area"
        data-figma-variant="Type=Default"
      >
        <AppDialogPreviewItem type="alert" />
      </div>
      <div
        data-figma-set="app-dialog-button-area"
        data-figma-variant="Type=Weak"
      >
        <AppDialogPreviewItem type="confirm" />
      </div>
    </div>
  )
}
