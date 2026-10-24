import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type ChipVariant = "weak" | "fill"

export type ChipColor = "brand" | "neutral"

export type ChipSize = "sm" | "md" | "lg"

export type ChipProps = Omit<ComponentPropsWithRef<"button">, "color"> & {
  variant?: ChipVariant
  color?: ChipColor
  size?: ChipSize
  selected?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function Chip({
  variant = "weak",
  color = "brand",
  size = "sm",
  selected,
  leadingIcon,
  trailingIcon,
  className,
  type = "button",
  children,
  "aria-haspopup": ariaHasPopup,
  ...props
}: ChipProps) {
  const ariaPressed =
    selected !== undefined && ariaHasPopup === undefined ? selected : undefined

  return (
    <button
      {...props}
      type={type}
      aria-haspopup={ariaHasPopup}
      aria-pressed={ariaPressed}
      className={cx("umc-chip", className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-selected={selected === true ? "" : undefined}
      data-leading-icon={leadingIcon !== undefined ? "" : undefined}
      data-trailing-icon={trailingIcon !== undefined ? "" : undefined}
    >
      {leadingIcon !== undefined && (
        <span className="umc-chip__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon !== undefined && (
        <span className="umc-chip__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  )
}
