import type { ComponentPropsWithRef, ReactNode } from "react"

import type { AccessibleName } from "../internal/accessible-name.ts"
import { cx } from "../internal/cx.ts"

export type IconButtonColor = "primary" | "white" | "neutral" | "error"

export type IconButtonVariant = "fill" | "weak"

export type IconButtonSize = "md" | "lg"

export type IconButtonProps = Omit<
  ComponentPropsWithRef<"button">,
  "color" | "children"
> &
  AccessibleName & {
    icon: NonNullable<ReactNode>
    color?: IconButtonColor
    variant?: IconButtonVariant
    size?: IconButtonSize
  }

export function IconButton({
  icon,
  color = "primary",
  variant = "weak",
  size = "md",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-icon-button", className)}
      data-color={color}
      data-variant={variant}
      data-size={size}
    >
      <span className="umc-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  )
}
