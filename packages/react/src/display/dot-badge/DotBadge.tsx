import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type DotBadgeColor =
  "brand" | "neutral" | "error" | "warning" | "success"

export type DotBadgeSize = "sm" | "md"

export type DotBadgeProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  color?: DotBadgeColor
  size?: DotBadgeSize
}

export function DotBadge({
  color = "brand",
  size = "sm",
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: DotBadgeProps) {
  const isLabelled = ariaLabel !== undefined || ariaLabelledby !== undefined

  return (
    <span
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      role={isLabelled ? "img" : undefined}
      aria-hidden={isLabelled ? undefined : true}
      className={cx("umc-dot-badge", className)}
      data-color={color}
      data-size={size}
    />
  )
}
