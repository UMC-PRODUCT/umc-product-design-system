"use client"

import { Dialog } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type PanelProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactElement
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  control?: ReactNode
  actions?: ReactNode
  className?: string
}

export function Panel({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  control,
  actions,
  className,
}: PanelProps) {
  const hasFooter = control !== undefined || actions !== undefined

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
              <div className="umc-panel__header">
                <Dialog.Title className="umc-panel__title">
                  {title}
                </Dialog.Title>
                {description !== undefined && (
                  <Dialog.Description className="umc-panel__description">
                    {description}
                  </Dialog.Description>
                )}
              </div>
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
