"use client"

import { CloseIcon } from "@umc-product/icons"
import { Button, ToastProvider, useToast } from "@umc-product/react"

export function ToastStaticPreview() {
  return (
    <div className="umc-example umc-example-stack" style={{ gap: "8px" }}>
      <div
        className="umc-toast"
        data-color="primary"
        data-spec-id="toast-primary-default"
      >
        <div className="umc-toast__main">
          <p className="umc-toast__message">저장되었습니다.</p>
        </div>
        <button className="umc-toast__close" aria-label="닫기" type="button">
          <CloseIcon size={24} aria-hidden={true} />
        </button>
      </div>
      <div
        className="umc-toast"
        data-color="error"
        data-spec-id="toast-error-default"
      >
        <div className="umc-toast__main">
          <p className="umc-toast__message">오류가 발생했습니다.</p>
        </div>
        <button className="umc-toast__close" aria-label="닫기" type="button">
          <CloseIcon size={24} aria-hidden={true} />
        </button>
      </div>
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
