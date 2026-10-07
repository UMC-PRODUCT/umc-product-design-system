"use client"

import { Popover, Tooltip as BaseTooltip } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

export type TooltipProps = {
  content: ReactNode
  title?: ReactNode
  side?: "top" | "bottom" | "left" | "right"
  mode?: "dark" | "light"
  size?: "xs" | "sm" | "md"
  openOn?: "hover" | "click"
  delay?: number
  children: ReactElement
}

const SIDE_OFFSET = 8

function TooltipBody({
  content,
  title,
  mode,
}: Pick<TooltipProps, "content" | "title" | "mode">) {
  return (
    <div className="umc-tooltip__content" data-mode={mode}>
      {title && <span className="umc-tooltip__label">{title}</span>}
      <div className="umc-tooltip__text">{content}</div>
    </div>
  )
}

export function Tooltip({
  content,
  title,
  side = "top",
  mode = "dark",
  size = "md",
  openOn = "hover",
  delay,
  children,
}: TooltipProps) {
  if (openOn === "click") {
    return (
      <Popover.Root>
        <Popover.Trigger render={children} />
        <Popover.Portal>
          <Popover.Positioner
            side={side}
            sideOffset={SIDE_OFFSET}
            className="umc-tooltip__positioner"
            data-size={size}
            data-mode={mode}
          >
            <Popover.Popup
              className="umc-tooltip__popup"
              data-mode={mode}
              aria-label={typeof content === "string" ? content : undefined}
            >
              <Popover.Arrow className="umc-tooltip__arrow" />
              <TooltipBody content={content} title={title} mode={mode} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    )
  }

  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={side}
            sideOffset={SIDE_OFFSET}
            className="umc-tooltip__positioner"
            data-size={size}
            data-mode={mode}
          >
            <BaseTooltip.Popup
              className="umc-tooltip__popup"
              data-mode={mode}
              role="tooltip"
            >
              <BaseTooltip.Arrow className="umc-tooltip__arrow" />
              <TooltipBody content={content} title={title} mode={mode} />
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  )
}
