import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../internal/cx.ts"

export type TextButtonColor = "brand" | "neutral"

export type TextButtonSize = "xs" | "sm" | "md"

export type TextButtonVariant = "plain" | "underline"

export type TextButtonProps = Omit<ComponentPropsWithRef<"button">, "color"> & {
  color?: TextButtonColor
  size?: TextButtonSize
  variant?: TextButtonVariant
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function TextButton({
  color = "brand",
  size = "xs",
  variant = "plain",
  leadingIcon,
  trailingIcon,
  className,
  type = "button",
  children,
  ...props
}: TextButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-text-button", className)}
      data-color={color}
      data-size={size}
      data-variant={variant}
    >
      {leadingIcon && (
        <span className="umc-text-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="umc-text-button__label">{children}</span>
      {trailingIcon && (
        <span className="umc-text-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  )
}
