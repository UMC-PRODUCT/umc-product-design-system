"use client"

import { Button, Dialog } from "@umc-product/react"
import { useState } from "react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

function DialogPreviewItem({
  specId,
  type,
}: {
  specId?: string
  type: "alert" | "confirm"
}) {
  const hasTwoButtons = type === "alert"
  return (
    <div
      data-spec-id={specId}
      style={{
        padding: "16px",
        background: "#f4f5f5",
        borderRadius: "24px",
        width: "311px",
      }}
    >
      <div className="umc-dialog__text" data-layout={type}>
        <div className="umc-dialog__title">제목을 입력하세요</div>
        <div className="umc-dialog__description">
          다이얼로그 설명 문구가 들어갑니다.
        </div>
      </div>
      {hasTwoButtons ? (
        <div className="umc-dialog__button-area" data-variant="default">
          <button
            className="umc-button"
            data-variant="fill"
            data-color="neutral"
            data-size="md"
            type="button"
          >
            <span className="umc-button__label">취소</span>
          </button>
          <button
            className="umc-button"
            data-variant="fill"
            data-color="primary"
            data-size="md"
            type="button"
          >
            <span className="umc-button__label">확인</span>
          </button>
        </div>
      ) : (
        <div className="umc-dialog__button-area" data-variant="weak">
          <button
            className="umc-text-button"
            data-color="brand"
            data-size="xs"
            data-variant="plain"
            type="button"
          >
            <span className="umc-text-button__label">확인</span>
          </button>
        </div>
      )}
    </div>
  )
}

export function DialogStaticPreview() {
  return (
    <div className="umc-example umc-example-stack">
      <DialogPreviewItem
        specId="dialog-alert dialog-alert-title dialog-alert-description dialog-alert-button-area"
        type="alert"
      />
      <DialogPreviewItem specId="dialog-confirm-button-area" type="confirm" />
    </div>
  )
}

export function DialogInteractiveAlert() {
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
      <Dialog
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

export function DialogInteractiveConfirm() {
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
      <Dialog
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

export function DialogAllVariants() {
  return (
    <VariantGrid
      set="dialog"
      rows={["Type"]}
      columns={[]}
      render={(variant: FigmaVariant) => (
        <DialogPreviewItem type={lookup(DIALOG_TYPES, variant, "Type")} />
      )}
    />
  )
}

export function DialogButtonAreaVariants() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        data-figma-set="dialog-button-area"
        data-figma-variant="Type=Default"
      >
        <DialogPreviewItem type="alert" />
      </div>
      <div data-figma-set="dialog-button-area" data-figma-variant="Type=Weak">
        <DialogPreviewItem type="confirm" />
      </div>
    </div>
  )
}
