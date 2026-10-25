"use client"

import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react"

import type { AccessibleName } from "../internal/accessible-name.ts"
import { cx } from "../internal/cx.ts"

export type ButtonVariant = "fill" | "weak"

export type ButtonColor = "brand" | "neutral" | "red" | "white"

export type ButtonSize = "lg" | "md" | "sm" | "xs"

export type ButtonIconOnlySize = Exclude<ButtonSize, "lg">

type ButtonBaseProps = Omit<
  ComponentPropsWithRef<"button">,
  "color" | "children"
> & {
  variant?: ButtonVariant
  color?: ButtonColor
  isLoading?: boolean
}

export type ButtonLabelProps = ButtonBaseProps & {
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  icon?: undefined
  children?: ReactNode
}

export type ButtonIconOnlyProps = ButtonBaseProps &
  AccessibleName & {
    size?: ButtonIconOnlySize
    icon: NonNullable<ReactNode>
    leadingIcon?: undefined
    trailingIcon?: undefined
    children?: undefined
  }

export type ButtonProps = ButtonLabelProps | ButtonIconOnlyProps

const LOADING_LABEL = "로딩 중"
const LOADER_DOTS = ["first", "second", "third"] as const

const presence = (condition: unknown): "" | undefined =>
  condition ? "" : undefined

export function Button({
  variant = "fill",
  color = "brand",
  size = "md",
  isLoading = false,
  icon,
  leadingIcon,
  trailingIcon,
  className,
  type = "button",
  onClick,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = icon != null

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      {...props}
      type={type}
      className={cx("umc-button", className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-loading={presence(isLoading)}
      data-icon-only={presence(isIconOnly)}
      data-leading-icon={presence(leadingIcon)}
      data-trailing-icon={presence(trailingIcon)}
      aria-busy={isLoading ? true : props["aria-busy"]}
      aria-disabled={isLoading ? true : props["aria-disabled"]}
      onClick={handleClick}
    >
      {isIconOnly ? (
        <span className="umc-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <>
          {leadingIcon && (
            <span className="umc-button__icon" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span className="umc-button__label">{children}</span>
          {trailingIcon && (
            <span className="umc-button__icon" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </>
      )}
      {isLoading && (
        <>
          <span className="umc-button__loader" aria-hidden="true">
            {LOADER_DOTS.map((dot) => (
              <span key={dot} className="umc-button__dot" />
            ))}
          </span>{" "}
          <span className="umc-visually-hidden">{LOADING_LABEL}</span>
        </>
      )}
    </button>
  )
}
