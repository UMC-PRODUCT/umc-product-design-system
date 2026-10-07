"use client"

import { CheckCircleIcon, CloseIcon } from "@umc-product/icons"
import { Button, ToastProvider, useToast } from "@umc-product/react"

type ToastPreviewItemProps = {
  color: "primary" | "neutral" | "error"
  message: string
  specId: string
  withIcon?: boolean
  actionLabel?: string
}

function ToastPreviewItem({
  color,
  message,
  specId,
  withIcon = false,
  actionLabel,
}: ToastPreviewItemProps) {
  return (
    <div data-spec-id={specId}>
      <div
        className="umc-toast"
        data-color={color}
        data-icon={withIcon ? "" : undefined}
        style={{ animation: "none" }}
      >
        <div className="umc-toast__main">
          {withIcon && (
            <span className="umc-toast__icon" aria-hidden="true">
              <CheckCircleIcon weight="fill" />
            </span>
          )}
          <p className="umc-toast__message">{message}</p>
        </div>
        {actionLabel === undefined ? (
          <button className="umc-toast__close" aria-label="닫기" type="button">
            <CloseIcon size={24} aria-hidden={true} />
          </button>
        ) : (
          <button className="umc-toast__action" type="button">
            {actionLabel}
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
  color?: "primary" | "neutral" | "error"
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
