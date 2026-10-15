"use client"

import { AlertDialog } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

import { Button } from "../../button/Button.tsx"
import { cx } from "../../internal/cx.ts"
import { TextButton } from "../../text-button/TextButton.tsx"

export type AppDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactElement
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  confirmLabel: ReactNode
  onConfirm?: () => void
  cancelLabel?: ReactNode
  onCancel?: () => void
  className?: string
}

export function AppDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  className,
}: AppDialogProps) {
  const hasTwoButtons = cancelLabel !== undefined

  return (
    <AlertDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger !== undefined && <AlertDialog.Trigger render={trigger} />}
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="umc-app-dialog__backdrop" />
        <AlertDialog.Popup className={cx("umc-app-dialog__popup", className)}>
          <div
            className="umc-app-dialog__text"
            data-layout={hasTwoButtons ? "alert" : "confirm"}
          >
            <AlertDialog.Title className="umc-app-dialog__title">
              {title}
            </AlertDialog.Title>
            {description !== undefined && (
              <AlertDialog.Description className="umc-app-dialog__description">
                {description}
              </AlertDialog.Description>
            )}
            {children}
          </div>

          {hasTwoButtons ? (
            <div className="umc-app-dialog__button-area" data-variant="default">
              <AlertDialog.Close
                render={
                  <Button
                    variant="weak"
                    color="neutral"
                    size="md"
                    onClick={onCancel}
                  >
                    {cancelLabel}
                  </Button>
                }
              />
              <AlertDialog.Close
                render={
                  <Button
                    variant="fill"
                    color="primary"
                    size="md"
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="umc-app-dialog__button-area" data-variant="weak">
              <AlertDialog.Close
                render={
                  <TextButton color="brand" size="xs" onClick={onConfirm}>
                    {confirmLabel}
                  </TextButton>
                }
              />
            </div>
          )}
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
