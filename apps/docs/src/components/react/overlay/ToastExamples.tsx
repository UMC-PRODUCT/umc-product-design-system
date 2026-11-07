"use client"

import {
  CheckCircleIcon,
  CloseIcon,
  UnderConstructionPictogram,
  WarningIcon,
} from "@umc-product/icons"
import { Button, ToastProvider, useToast } from "@umc-product/react"
import type { ReactElement } from "react"

import {
  CODE_PLACEHOLDER,
  callCodeOf,
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ToastColor = "brand" | "neutral" | "warning" | "error"

type ToastPlacement = "top" | "bottom"

type ServiceNoticeColor = "brand" | "neutral"

const SERVICE_NOTICE_MESSAGE =
  "리크루팅 서비스는 12기 모집 때 공개될 예정이에요"

const SERVICE_NOTICE_PICTOGRAM_MODE = {
  brand: "light",
  neutral: "dark",
} as const

type ToastPreviewItemProps = {
  color: ToastColor
  message: string
  specId?: string
  placement?: ToastPlacement
  withIcon?: boolean
  actionLabel?: string
}

const toastIconOf = (color: ToastColor) =>
  color === "warning" ? (
    <WarningIcon weight="fill" />
  ) : (
    <CheckCircleIcon weight="fill" />
  )

const withPlacementCode = (show: string, placement: ToastPlacement) => {
  if (placement === "bottom") return show
  const provider = componentCodeOf(ToastProvider, {
    placement,
    children: CODE_PLACEHOLDER,
  })
  return `${provider}\n\n${show}`
}

const toastCodeOf = ({
  color,
  message,
  placement,
  icon,
  actionLabel,
}: {
  color: ToastColor
  message: string
  placement: ToastPlacement
  icon: ReactElement | undefined
  actionLabel: string | undefined
}) => {
  const show = callCodeOf("toast.show", {
    message,
    color,
    icon,
    action:
      actionLabel === undefined
        ? undefined
        : { label: actionLabel, onClick: CODE_PLACEHOLDER },
  })
  return withPlacementCode(show, placement)
}

function ToastPreviewItem({
  color,
  message,
  specId,
  placement = "bottom",
  withIcon = false,
  actionLabel,
}: ToastPreviewItemProps) {
  const icon = withIcon ? toastIconOf(color) : undefined
  const code = toastCodeOf({ color, message, placement, icon, actionLabel })
  return (
    <div data-spec-id={specId}>
      <div
        className="umc-toast"
        data-color={color}
        data-placement={placement}
        data-icon={withIcon ? "" : undefined}
        style={{ animation: "none" }}
        {...codeAttributeOf(code)}
      >
        <div className="umc-toast__main">
          {icon !== undefined && (
            <span className="umc-toast__icon" aria-hidden="true">
              {icon}
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

function ServiceNoticePreviewItem({
  color,
  message,
  specId,
  placement = "bottom",
}: {
  color: ServiceNoticeColor
  message: string
  specId?: string
  placement?: ToastPlacement
}) {
  const show = callCodeOf("toast.showServiceNotice", { message, color })
  const pictogram = (
    <span className="umc-toast__pictogram" aria-hidden="true">
      <UnderConstructionPictogram
        size={24}
        mode={SERVICE_NOTICE_PICTOGRAM_MODE[color]}
      />
    </span>
  )
  return (
    <div data-spec-id={specId}>
      <div
        className="umc-toast"
        data-kind="service-notice"
        data-color={color}
        data-placement={placement}
        {...codeAttributeOf(withPlacementCode(show, placement))}
      >
        {pictogram}
        <p className="umc-toast__message">{message}</p>
        {pictogram}
      </div>
    </div>
  )
}

export function ToastStaticPreview() {
  return (
    <div className="umc-example umc-example-stack docs-toast-preview">
      <ToastPreviewItem
        specId="toast-brand-icon toast-brand-icon-glyph toast-close"
        color="brand"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-brand-action toast-brand-action-button"
        color="brand"
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
        specId="toast-top-brand-icon"
        color="brand"
        placement="top"
        message="토스트 알림이에요"
        withIcon
      />
      <ToastPreviewItem
        specId="toast-top-brand-action"
        color="brand"
        placement="top"
        message="토스트 알림이에요"
        actionLabel="버튼"
      />
      <ServiceNoticePreviewItem
        specId="toast-service-notice toast-service-notice-pictogram"
        color="brand"
        message={SERVICE_NOTICE_MESSAGE}
      />
      <ServiceNoticePreviewItem
        specId="toast-service-notice-neutral toast-service-notice-neutral-pictogram"
        color="neutral"
        message={SERVICE_NOTICE_MESSAGE}
      />
      <ServiceNoticePreviewItem
        specId="toast-top-service-notice"
        color="brand"
        placement="top"
        message={SERVICE_NOTICE_MESSAGE}
      />
    </div>
  )
}

const LONG_TOAST_MESSAGE =
  "토스트 알림이에요토스트 알림이에요토스트 알림이에요토스트 알림이에요토스트 알림이에요"

export function ToastWidthPreview() {
  return (
    <div className="umc-example umc-example-stack docs-toast-preview">
      <ToastPreviewItem
        color="neutral"
        message="토스트 알림이에요"
        withIcon
        actionLabel="버튼"
      />
      <ToastPreviewItem
        specId="toast-width-wrap"
        color="neutral"
        message={LONG_TOAST_MESSAGE}
        withIcon
        actionLabel="취소"
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
        <ToastTrigger label="brand" color="brand" message="저장되었습니다." />
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

function ServiceNoticeTrigger({
  label,
  color,
  message,
}: {
  label: string
  color: ServiceNoticeColor
  message: string
}) {
  const toast = useToast()
  return (
    <Button
      size="sm"
      variant="weak"
      color="neutral"
      onClick={() => {
        toast.showServiceNotice({ message, color })
      }}
    >
      {label}
    </Button>
  )
}

export function ToastServiceNotice() {
  return (
    <ToastProvider>
      <div className="umc-example" style={{ gap: "8px" }}>
        <ServiceNoticeTrigger
          label="brand"
          color="brand"
          message={SERVICE_NOTICE_MESSAGE}
        />
        <ServiceNoticeTrigger
          label="neutral"
          color="neutral"
          message="이 서비스는 준비 중이에요"
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
          color="brand"
          message="상단에 표시됩니다."
        />
      </div>
    </ToastProvider>
  )
}

const TOAST_COLORS = {
  Primary: "brand",
  Neutral: "neutral",
  Warning: "warning",
  Error: "error",
} as const

const SERVICE_NOTICE_COLORS = {
  "Service Notice": "brand",
  "Service Notice · Neutral": "neutral",
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
      <ServiceNoticePreviewItem
        color={lookup(SERVICE_NOTICE_COLORS, variant, "Type")}
        placement={placement}
        message={SERVICE_NOTICE_MESSAGE}
      />
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
