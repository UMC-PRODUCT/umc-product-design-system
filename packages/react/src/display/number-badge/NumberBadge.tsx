import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type NumberBadgeColor =
  "brand" | "neutral" | "error" | "warning" | "success"

export type NumberBadgeVariant = "fill" | "weak"

export type NumberBadgeSize = "sm" | "md"

export type NumberBadgeProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  color?: NumberBadgeColor
  variant?: NumberBadgeVariant
  size?: NumberBadgeSize
  children?: ReactNode
}

export function NumberBadge({
  color = "brand",
  variant = "fill",
  size = "sm",
  className,
  children,
  ...props
}: NumberBadgeProps) {
  return (
    <span
      {...props}
      className={cx("umc-number-badge", className)}
      data-color={color}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </span>
  )
}
