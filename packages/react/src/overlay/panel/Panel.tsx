"use client"

import { Dialog } from "@base-ui/react"
import { CloseIcon } from "@umc-product/icons"
import type { ReactElement, ReactNode } from "react"

import { IconButton } from "../../icon-button/IconButton.tsx"
import { cx } from "../../internal/cx.ts"

export type PanelProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactElement
  title: ReactNode
  description?: ReactNode
  headSlot?: ReactNode
  children: ReactNode
  control?: ReactNode
  actions?: ReactNode
  className?: string
}

export type PanelCloseButtonProps = {
  label?: string
  className?: string
}

const DEFAULT_CLOSE_LABEL = "닫기"

export function Panel({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  headSlot,
  children,
  control,
  actions,
  className,
}: PanelProps) {
  const hasFooter = control !== undefined || actions !== undefined
  const header = (
    <div className="umc-panel__header">
      <Dialog.Title className="umc-panel__title">{title}</Dialog.Title>
      {description !== undefined && (
        <Dialog.Description className="umc-panel__description">
          {description}
        </Dialog.Description>
      )}
    </div>
  )

  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger !== undefined && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="umc-panel__backdrop" />
        <Dialog.Viewport className="umc-panel__viewport">
          <Dialog.Popup className={cx("umc-panel__popup", className)}>
            <div className="umc-panel__main">
              {headSlot === undefined ? (
                header
              ) : (
                <div className="umc-panel__head">
                  {header}
                  <div className="umc-panel__head-slot">{headSlot}</div>
                </div>
              )}
              <div className="umc-panel__content">{children}</div>
            </div>
            {hasFooter && (
              <div className="umc-panel__footer">
                {control !== undefined && (
                  <div className="umc-panel__control">{control}</div>
                )}
                {actions}
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function PanelCloseButton({
  label = DEFAULT_CLOSE_LABEL,
  className,
}: PanelCloseButtonProps) {
  return (
    <Dialog.Close
      render={
        <IconButton
          size="sm"
          color="white"
          icon={<CloseIcon />}
          aria-label={label}
          className={className}
        />
      }
    />
  )
}
