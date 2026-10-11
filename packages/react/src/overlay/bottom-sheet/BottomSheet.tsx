"use client"

import { Drawer } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

import { Button } from "../../button/Button.tsx"
import { cx } from "../../internal/cx.ts"
import { TextButton } from "../../text-button/TextButton.tsx"

export type BottomSheetProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactElement
  title?: ReactNode
  description?: ReactNode
  titleAlign?: "start" | "center"
  headerAction?: ReactNode
  children: ReactNode
  actions?: ReactNode
  className?: string
}

type ButtonConfig = {
  label: ReactNode
  onClick?: () => void
}

type BottomSheetActionsLayoutFull = {
  layout: "full"
  primary: ButtonConfig
}

type BottomSheetActionsLayoutWithSecondary = {
  layout: "stacked" | "equal" | "emphasis" | "primary-top"
  primary: ButtonConfig
  secondary: ButtonConfig
}

export type BottomSheetActionsProps =
  BottomSheetActionsLayoutFull | BottomSheetActionsLayoutWithSecondary

export function BottomSheetActions(props: BottomSheetActionsProps) {
  const { layout, primary } = props

  if (layout === "full") {
    return (
      <div className="umc-bottom-sheet-actions" data-layout="full">
        <Button
          variant="fill"
          color="primary"
          size="md"
          onClick={primary.onClick}
        >
          {primary.label}
        </Button>
      </div>
    )
  }

  const { secondary } = props

  if (layout === "primary-top") {
    return (
      <div className="umc-bottom-sheet-actions" data-layout="primary-top">
        <Button
          variant="fill"
          color="primary"
          size="md"
          onClick={primary.onClick}
        >
          {primary.label}
        </Button>
        <TextButton color="neutral" size="xs" onClick={secondary.onClick}>
          {secondary.label}
        </TextButton>
      </div>
    )
  }

  return (
    <div className="umc-bottom-sheet-actions" data-layout={layout}>
      {layout === "stacked" ? (
        <>
          <Button
            variant="fill"
            color="primary"
            size="md"
            onClick={primary.onClick}
          >
            {primary.label}
          </Button>
          <Button
            variant="fill"
            color="neutral"
            size="md"
            onClick={secondary.onClick}
          >
            {secondary.label}
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="fill"
            color="neutral"
            size="md"
            onClick={secondary.onClick}
          >
            {secondary.label}
          </Button>
          <Button
            variant="fill"
            color="primary"
            size="md"
            onClick={primary.onClick}
          >
            {primary.label}
          </Button>
        </>
      )}
    </div>
  )
}

export function BottomSheet({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  titleAlign = "start",
  headerAction,
  children,
  actions,
  className,
}: BottomSheetProps) {
  const hasHeader = title !== undefined || headerAction !== undefined

  return (
    <Drawer.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger !== undefined && <Drawer.Trigger render={trigger} />}
      <Drawer.Portal>
        <Drawer.Backdrop className="umc-bottom-sheet__backdrop" />
        <Drawer.VirtualKeyboardProvider>
          <Drawer.Popup className={cx("umc-bottom-sheet__popup", className)}>
            <span aria-hidden="true" className="umc-bottom-sheet__handle" />
            {hasHeader && (
              <div className="umc-bottom-sheet__header" data-align={titleAlign}>
                {title !== undefined && (
                  <Drawer.Title className="umc-bottom-sheet__title">
                    {title}
                  </Drawer.Title>
                )}
                {description !== undefined && (
                  <Drawer.Description className="umc-bottom-sheet__description">
                    {description}
                  </Drawer.Description>
                )}
                {headerAction !== undefined && (
                  <div className="umc-bottom-sheet__header-action">
                    {headerAction}
                  </div>
                )}
              </div>
            )}
            <div className="umc-bottom-sheet__body">{children}</div>
            {actions !== undefined && (
              <div className="umc-bottom-sheet__actions-area">{actions}</div>
            )}
          </Drawer.Popup>
        </Drawer.VirtualKeyboardProvider>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
