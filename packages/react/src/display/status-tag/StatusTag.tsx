import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type StatusTagColor =
  "brand" | "neutral" | "warning" | "success" | "error"

export type StatusTagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  color?: StatusTagColor
}

export function StatusTag({
  color = "brand",
  className,
  children,
  ...props
}: StatusTagProps) {
  return (
    <span
      {...props}
      className={cx("umc-status-tag", className)}
      data-color={color}
    >
      <span className="umc-status-tag__dot" aria-hidden="true" />
      {children}
    </span>
  )
}
