"use client"

import { AlertDialog } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

import {
  Button,
  type ButtonColor,
  type ButtonVariant,
} from "../../button/Button.tsx"
import { cx } from "../../internal/cx.ts"
import {
  TextButton,
  type TextButtonColor,
} from "../../text-button/TextButton.tsx"

export type DialogColor = "primary" | "neutral" | "error"

export type DialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactElement
  color?: DialogColor
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  confirmLabel: ReactNode
  onConfirm?: () => void
  cancelLabel?: ReactNode
  onCancel?: () => void
  className?: string
}

const CONFIRM_BUTTONS: Readonly<
  Record<DialogColor, { variant: ButtonVariant; color: ButtonColor }>
> = {
  primary: { variant: "fill", color: "primary" },
  neutral: { variant: "fill", color: "neutral" },
  error: { variant: "weak", color: "red" },
}

const CONFIRM_TEXT_BUTTONS: Readonly<Record<DialogColor, TextButtonColor>> = {
  primary: "brand",
  neutral: "neutral",
  error: "brand",
}

const presence = (condition: boolean): "" | undefined =>
  condition ? "" : undefined

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  color = "primary",
  icon,
  title,
  description,
  children,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  className,
}: DialogProps) {
  const buttonStyle = cancelLabel === undefined ? "weak" : "fill"
  const confirmButton = CONFIRM_BUTTONS[color]

  return (
    <AlertDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger !== undefined && <AlertDialog.Trigger render={trigger} />}
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="umc-dialog__backdrop" />
        <AlertDialog.Viewport className="umc-dialog__viewport">
          <AlertDialog.Popup
            className={cx("umc-dialog__popup", className)}
            data-color={color}
            data-button-style={buttonStyle}
            data-content={presence(children !== undefined)}
          >
            <div className="umc-dialog__text">
              <div className="umc-dialog__heading">
                {icon !== undefined && (
                  <span className="umc-dialog__icon" aria-hidden="true">
                    {icon}
                  </span>
                )}
                <AlertDialog.Title className="umc-dialog__title">
                  {title}
                </AlertDialog.Title>
              </div>
              {description !== undefined && (
                <AlertDialog.Description className="umc-dialog__description">
                  {description}
                </AlertDialog.Description>
              )}
            </div>
            {children !== undefined && (
              <div className="umc-dialog__content">{children}</div>
            )}
            <div
              className="umc-dialog__actions"
              data-variant={buttonStyle}
              data-color={color}
            >
              {cancelLabel === undefined ? (
                <AlertDialog.Close
                  render={
                    <TextButton
                      color={CONFIRM_TEXT_BUTTONS[color]}
                      size="sm"
                      onClick={onConfirm}
                    >
                      {confirmLabel}
                    </TextButton>
                  }
                />
              ) : (
                <>
                  <AlertDialog.Close
                    render={
                      <Button
                        variant="weak"
                        color="neutral"
                        size="xs"
                        onClick={onCancel}
                      >
                        {cancelLabel}
                      </Button>
                    }
                  />
                  <AlertDialog.Close
                    render={
                      <Button
                        variant={confirmButton.variant}
                        color={confirmButton.color}
                        size="xs"
                        onClick={onConfirm}
                      >
                        {confirmLabel}
                      </Button>
                    }
                  />
                </>
              )}
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
