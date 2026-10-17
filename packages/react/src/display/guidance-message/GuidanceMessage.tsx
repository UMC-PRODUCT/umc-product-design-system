import { CheckIcon } from "@umc-product/icons"
import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type GuidanceMessageColor = "neutral" | "success" | "warning" | "error"

export type GuidanceMessageProps = Omit<ComponentPropsWithRef<"p">, "color"> & {
  color?: GuidanceMessageColor
  showIcon?: boolean
}

export function GuidanceMessage({
  color = "neutral",
  showIcon = true,
  className,
  children,
  ...props
}: GuidanceMessageProps) {
  return (
    <p
      {...props}
      className={cx("umc-guidance-message", className)}
      data-color={color}
    >
      {showIcon && (
        <span className="umc-guidance-message__icon" aria-hidden="true">
          <CheckIcon weight="fill" />
        </span>
      )}
      <span className="umc-guidance-message__text">{children}</span>
    </p>
  )
}
