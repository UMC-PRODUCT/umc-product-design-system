import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type PartTagPart = "pm" | "design" | "web-pe" | "mobile-pe"

export type PartTagVariant = "filled" | "outlined"

export type PartTagSize = "sm" | "md" | "lg"

export type PartTagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  part?: PartTagPart
  variant?: PartTagVariant
  size?: PartTagSize
  children?: ReactNode
}

const DEFAULT_LABELS: Record<PartTagPart, string> = {
  pm: "PM",
  design: "Design",
  "web-pe": "Web PE",
  "mobile-pe": "Mobile PE",
}

export function PartTag({
  part = "pm",
  variant = "filled",
  size = "sm",
  className,
  children,
  ...props
}: PartTagProps) {
  return (
    <span
      {...props}
      className={cx("umc-part-tag", className)}
      data-part={part}
      data-variant={variant}
      data-size={size}
    >
      {children ?? DEFAULT_LABELS[part]}
    </span>
  )
}
