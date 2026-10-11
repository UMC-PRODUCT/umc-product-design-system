import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type NumberTagColor = "brand" | "neutral"

export type NumberTagVariant = "primary" | "secondary" | "tertiary"

export type NumberTagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  color?: NumberTagColor
  variant?: NumberTagVariant
}

export function NumberTag({
  color = "neutral",
  variant = "primary",
  className,
  children,
  ...props
}: NumberTagProps) {
  return (
    <span
      {...props}
      className={cx("umc-number-tag", className)}
      data-color={color}
      data-variant={variant}
    >
      {children}
    </span>
  )
}
