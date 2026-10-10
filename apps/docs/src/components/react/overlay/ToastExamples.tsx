"use client"

import { CheckCircleIcon, CloseIcon, WarningIcon } from "@umc-product/icons"
import { Button, ToastProvider, useToast } from "@umc-product/react"

import { NotImplemented } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ToastColor = "primary" | "neutral" | "warning" | "error"

type ToastPreviewItemProps = {
  color: ToastColor
  message: string
  specId?: string
  placement?: "top" | "bottom"
  withIcon?: boolean
  actionLabel?: string
}

function ToastPreviewItem({
  color,
  message,
  specId,
  placement = "bottom",
  withIcon = false,
  actionLabel,
}: ToastPreviewItemProps) {
  return (
    <div data-spec-id={specId}>
      <div
        className="umc-toast"
        data-color={color}
        data-placement={placement}
        data-icon={withIcon ? "" : undefined}
        style={{ animation: "none" }}
      >
        <div className="umc-toast__main">
          {withIcon && (
            <span className="umc-toast__icon" aria-hidden="true">
              {color === "warning" ? (
                <WarningIcon weight="fill" />
              ) : (
                <CheckCircleIcon weight="fill" />
              )}
            </span>
          )}
          <p className="umc-toast__message">{message}</p>
        </div>
        {actionLabel !== undefined && (
          <button className="umc-toast__action" type="button">
            {actionLabel}
          </button>
        )}
        {actionLabel === undefined && placement === "bottom" && (
          <button className="umc-toast__close" aria-label="닫기" type="button">
            <CloseIcon size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export function ToastStaticPreview() {
  return (
    <div className="umc-example umc-example-stack">
      <ToastPreviewItem
        specId="toast-primary-icon toast-primary-icon-glyph toast-close"
        color="primary"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-primary-action toast-primary-action-button"
        color="primary"
        message="토스트 알림이에요"
        actionLabel="버튼"
      />
      <ToastPreviewItem
        specId="toast-neutral"
        color="neutral"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-warning toast-warning-icon"
        color="warning"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-warning-action"
        color="warning"
        message="토스트 알림이에요"
        withIcon
        actionLabel="버튼"
      />
      <ToastPreviewItem
        specId="toast-error toast-error-icon"
        color="error"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-error-action"
        color="error"
        message="토스트 알림이에요"
        withIcon
        actionLabel="버튼"
      />
      <ToastPreviewItem
        specId="toast-top-primary-icon"
        color="primary"
        placement="top"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-top-primary-action"
        color="primary"
        placement="top"
        message="토스트 알림이에요"
        actionLabel="버튼"
      />
    </div>
  )
}

function ToastTrigger({
  label,
  color,
  message,
  withAction,
}: {
  label: string
  color?: ToastColor
  message: string
  withAction?: boolean
}) {
  const toast = useToast()
  return (
    <Button
      size="sm"
      variant="weak"
      color="neutral"
      onClick={() => {
        toast.show({
          message,
          color,
          action: withAction
            ? { label: "실행 취소", onClick: () => {} }
            : undefined,
        })
      }}
    >
      {label}
    </Button>
  )
}

export function ToastColors() {
  return (
    <ToastProvider>
      <div className="umc-example" style={{ gap: "8px" }}>
        <ToastTrigger
          label="primary"
          color="primary"
          message="저장되었습니다."
        />
        <ToastTrigger
          label="neutral"
          color="neutral"
          message="변경사항이 적용되었습니다."
        />
        <ToastTrigger
          label="warning"
          color="warning"
          message="입력 내용을 다시 확인해 주세요."
        />
        <ToastTrigger
          label="error"
          color="error"
          message="오류가 발생했습니다."
        />
      </div>
    </ToastProvider>
  )
}

export function ToastWithAction() {
  return (
    <ToastProvider>
      <div className="umc-example">
        <ToastTrigger
          label="액션 버튼 있는 토스트"
          color="neutral"
          message="게시글이 삭제되었습니다."
          withAction
        />
      </div>
    </ToastProvider>
  )
}

export function ToastPlacementTop() {
  return (
    <ToastProvider placement="top">
      <div className="umc-example">
        <ToastTrigger
          label="상단 토스트"
          color="primary"
          message="상단에 표시됩니다."
        />
      </div>
    </ToastProvider>
  )
}

const TOAST_COLORS = {
  Primary: "primary",
  Neutral: "neutral",
  Warning: "warning",
  Error: "error",
} as const

const TOAST_TYPE_ORDER = [
  "Primary",
  "Neutral",
  "Warning",
  "Error",
  "Service Notice",
  "Service Notice · Neutral",
]

function ToastVariantCell({
  variant,
  placement,
}: {
  variant: FigmaVariant
  placement: "top" | "bottom"
}) {
  if (variant.props["Type"]?.startsWith("Service Notice")) {
    return (
      <NotImplemented reason="양옆 그래픽 에셋과 사용처가 정해지지 않아 넣지 않았습니다" />
    )
  }
  return (
    <ToastPreviewItem
      color={lookup(TOAST_COLORS, variant, "Type")}
      placement={placement}
      message="토스트 알림이에요"
      withIcon={variant.props["Leading Acc"] === "True"}
      actionLabel={variant.props["Text Button"] === "True" ? "버튼" : undefined}
    />
  )
}

export function ToastAllVariants() {
  return (
    <>
      <VariantGrid
        set="toast-bottom"
        rows={["Type", "Leading Acc", "Text Button"]}
        columns={[]}
        order={{
          Type: TOAST_TYPE_ORDER,
          "Leading Acc": ["True", "False"],
          "Text Button": ["False", "True"],
        }}
        render={(variant) => (
          <ToastVariantCell variant={variant} placement="bottom" />
        )}
      />
      <VariantGrid
        set="toast-top"
        rows={["Type", "Leading Acc"]}
        columns={["Text Button"]}
        order={{
          Type: TOAST_TYPE_ORDER,
          "Leading Acc": ["True", "False"],
          "Text Button": ["False", "True"],
        }}
        render={(variant) => (
          <ToastVariantCell variant={variant} placement="top" />
        )}
      />
    </>
  )
}
