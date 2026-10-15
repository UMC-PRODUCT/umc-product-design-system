"use client"

import {
  CheckPictogram,
  UnderConstructionPictogram,
  WarningIcon,
  WarningTriangleIcon,
} from "@umc-product/icons"
import {
  Button,
  Dialog,
  TextButton,
  type DialogColor,
} from "@umc-product/react"
import { useState, type ReactNode } from "react"

import {
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const STATE_AXIS = "State 이거 변경 필요"
const TITLE = "핵심 및 강조 문구"
const DESCRIPTION = "설명을 작성해요"
const CONFIRM_LABEL = "확인"
const CANCEL_LABEL = "취소"

type ButtonStyle = "fill" | "weak"

type PreviewState = { color: DialogColor; content: boolean }

const CONFIRM_BUTTONS = {
  primary: { variant: "fill", color: "primary" },
  neutral: { variant: "fill", color: "neutral" },
  error: { variant: "weak", color: "red" },
} as const

const STATUS_ICONS: Readonly<Record<DialogColor, ReactNode>> = {
  primary: <CheckPictogram />,
  neutral: <CheckPictogram />,
  error: <WarningTriangleIcon weight="fill" />,
}

function PreviewContent() {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0 text-body-2-regular text-neutral-medium-600">
      <li>지원 파트: Web</li>
      <li>지원 차수: 2차 매칭</li>
      <li>제출 마감: 10월 20일</li>
    </ul>
  )
}

function DialogPreview({
  color,
  buttonStyle,
  icon,
  content,
  specId,
}: {
  color: DialogColor
  buttonStyle: ButtonStyle
  icon: boolean
  content: boolean
  specId?: string
}) {
  const confirmButton = CONFIRM_BUTTONS[color]
  const code = componentCodeOf(Dialog, {
    open: true,
    color: color === "primary" ? undefined : color,
    icon: icon ? STATUS_ICONS[color] : undefined,
    title: TITLE,
    description: DESCRIPTION,
    confirmLabel: CONFIRM_LABEL,
    cancelLabel: buttonStyle === "fill" ? CANCEL_LABEL : undefined,
  })
  return (
    <div
      className="umc-dialog__popup"
      data-spec-id={specId}
      data-color={color}
      data-button-style={buttonStyle}
      data-content={content ? "" : undefined}
      {...codeAttributeOf(code)}
    >
      <div className="umc-dialog__text">
        <div className="umc-dialog__heading">
          {icon && (
            <span className="umc-dialog__icon" aria-hidden="true">
              {STATUS_ICONS[color]}
            </span>
          )}
          <h2 className="umc-dialog__title">{TITLE}</h2>
        </div>
        <p className="umc-dialog__description">{DESCRIPTION}</p>
      </div>
      {content && (
        <div className="umc-dialog__content">
          <PreviewContent />
        </div>
      )}
      <div
        className="umc-dialog__actions"
        data-variant={buttonStyle}
        data-color={color}
      >
        {buttonStyle === "fill" ? (
          <>
            <Button variant="weak" color="neutral" size="xs">
              {CANCEL_LABEL}
            </Button>
            <Button
              variant={confirmButton.variant}
              color={confirmButton.color}
              size="xs"
            >
              {CONFIRM_LABEL}
            </Button>
          </>
        ) : (
          <TextButton
            color={color === "neutral" ? "neutral" : "brand"}
            size="sm"
          >
            {CONFIRM_LABEL}
          </TextButton>
        )}
      </div>
    </div>
  )
}

export function DialogStaticPreview() {
  return (
    <div className="umc-example umc-example-stack umc-example-muted">
      <DialogPreview
        color="primary"
        buttonStyle="fill"
        icon={false}
        content={false}
      />
      <DialogPreview color="error" buttonStyle="fill" icon content={false} />
    </div>
  )
}

function OpenButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <Button size="sm" variant="weak" color="neutral" onClick={onClick}>
      {label}
    </Button>
  )
}

export function DialogFillExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <OpenButton
        label="두 버튼 다이얼로그 열기"
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="지원서를 제출할까요?"
        description="제출한 지원서는 수정할 수 없어요."
        confirmLabel="제출"
        cancelLabel="취소"
      />
    </div>
  )
}

export function DialogWeakExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <OpenButton
        label="텍스트 버튼 다이얼로그 열기"
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="저장했어요"
        description="변경 사항을 저장했어요."
        confirmLabel="확인"
      />
    </div>
  )
}

export function DialogErrorExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <OpenButton label="경고 다이얼로그 열기" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        color="error"
        icon={<WarningTriangleIcon weight="fill" />}
        title="프로젝트를 삭제할까요?"
        description="삭제한 프로젝트와 지원서는 되살릴 수 없어요."
        confirmLabel="삭제"
        cancelLabel="취소"
      />
    </div>
  )
}

export function DialogContentExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example">
      <OpenButton
        label="콘텐츠 다이얼로그 열기"
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="이 내용으로 지원할까요?"
        description="제출 전에 한 번 더 확인해 주세요."
        confirmLabel="지원"
        cancelLabel="취소"
      >
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-body-2-regular text-neutral-medium-600">
          <li>지원 파트: Web</li>
          <li>지원 차수: 2차 매칭</li>
          <li>제출 마감: 10월 20일</li>
        </ul>
      </Dialog>
    </div>
  )
}

const STATES: Readonly<Record<string, PreviewState>> = {
  Default: { color: "primary", content: false },
  Warning: { color: "error", content: false },
  "Slot Content": { color: "primary", content: true },
}

const BUTTON_STYLES: Readonly<Record<string, ButtonStyle>> = {
  Fill: "fill",
  Weak: "weak",
}

const SHOW_ICON: Readonly<Record<string, boolean>> = {
  True: true,
  False: false,
}

const DIALOG_SPEC_IDS: Readonly<Record<string, string>> = {
  [`${STATE_AXIS}=Default, Button Style=Fill, Show Icon=False`]:
    "dialog-default dialog-default-text dialog-default-title dialog-default-description dialog-default-actions dialog-default-cancel dialog-default-confirm",
  [`${STATE_AXIS}=Default, Button Style=Fill, Show Icon=True`]:
    "dialog-icon dialog-icon-graphic",
  [`${STATE_AXIS}=Warning, Button Style=Fill, Show Icon=False`]:
    "dialog-error-title dialog-error-confirm",
  [`${STATE_AXIS}=Default, Button Style=Weak, Show Icon=False`]:
    "dialog-weak dialog-weak-actions dialog-weak-button",
  [`${STATE_AXIS}=Warning, Button Style=Weak, Show Icon=False`]:
    "dialog-error-weak-button",
  [`${STATE_AXIS}=Slot Content, Button Style=Fill, Show Icon=False`]:
    "dialog-content dialog-content-text dialog-content-title",
}

export function DialogAllVariants() {
  return (
    <VariantGrid
      set="web-dialog"
      rows={[STATE_AXIS]}
      columns={["Button Style", "Show Icon"]}
      order={{
        [STATE_AXIS]: ["Default", "Warning", "Slot Content"],
        "Button Style": ["Fill", "Weak"],
        "Show Icon": ["False", "True"],
      }}
      render={(variant: FigmaVariant) => {
        const state = lookup(STATES, variant, STATE_AXIS)
        return (
          <DialogPreview
            color={state.color}
            content={state.content}
            buttonStyle={lookup(BUTTON_STYLES, variant, "Button Style")}
            icon={lookup(SHOW_ICON, variant, "Show Icon")}
            specId={DIALOG_SPEC_IDS[variant.name]}
          />
        )
      }}
    />
  )
}

const ACTION_COLORS: Readonly<Record<string, DialogColor>> = {
  Default: "primary",
  Neutral: "neutral",
  Waring: "error",
}

const ACTION_STYLES: Readonly<Record<string, ButtonStyle>> = {
  Default: "fill",
  Weak: "weak",
}

function ActionButtonAreaPreview({ variant }: { variant: FigmaVariant }) {
  const color = lookup(ACTION_COLORS, variant, "Type")
  const buttonStyle = lookup(ACTION_STYLES, variant, "Style")
  const confirmButton = CONFIRM_BUTTONS[color]
  return (
    <div
      className="umc-dialog__actions"
      data-variant={buttonStyle}
      data-color={color}
    >
      {buttonStyle === "fill" ? (
        <>
          <Button variant="weak" color="neutral" size="xs">
            {CANCEL_LABEL}
          </Button>
          <Button
            variant={confirmButton.variant}
            color={confirmButton.color}
            size="xs"
          >
            {CONFIRM_LABEL}
          </Button>
        </>
      ) : (
        <TextButton color={color === "neutral" ? "neutral" : "brand"} size="sm">
          {CONFIRM_LABEL}
        </TextButton>
      )}
    </div>
  )
}

export function DialogActionButtonAreaVariants() {
  return (
    <VariantGrid
      set="web-dialog-action-button-area"
      rows={["Type"]}
      columns={["Style"]}
      order={{
        Type: ["Default", "Neutral", "Waring"],
        Style: ["Default", "Weak"],
      }}
      render={(variant) => <ActionButtonAreaPreview variant={variant} />}
    />
  )
}

const STATUS_GRAPHICS: Readonly<Record<string, ReactNode>> = {
  Success: <CheckPictogram size={24} />,
  Construction: <UnderConstructionPictogram size={24} />,
  "Warning Circle": <WarningIcon weight="fill" className="text-icon-warning" />,
  "Error Circle": <WarningIcon weight="fill" className="text-icon-error" />,
  "Error Triangle": (
    <WarningTriangleIcon weight="fill" className="text-icon-error" />
  ),
}

export function DialogStatusGraphicVariants() {
  return (
    <VariantGrid
      set="web-dialog-status-graphic"
      rows={[]}
      columns={["Graphic"]}
      order={{
        Graphic: [
          "Success",
          "Construction",
          "Warning Circle",
          "Error Circle",
          "Error Triangle",
        ],
      }}
      render={(variant) => lookup(STATUS_GRAPHICS, variant, "Graphic")}
    />
  )
}
