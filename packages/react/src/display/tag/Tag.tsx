import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type TagVariant = "weak" | "fill"

export type TagColor = "brand" | "neutral" | "warning" | "success" | "error"

export type TagSize = "sm" | "md" | "lg"

export type TagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  variant?: TagVariant
  color?: TagColor
  size?: TagSize
}

export function Tag({
  variant = "weak",
  color = "brand",
  size = "sm",
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      {...props}
      className={cx("umc-tag", className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
    >
      {children}
    </span>
  )
}
