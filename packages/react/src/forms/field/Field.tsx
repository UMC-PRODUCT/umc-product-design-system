"use client"

import { Field as BaseUIField } from "@base-ui/react"
import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type FieldCaptionSize = "md" | "lg"

export type FieldOwnProps = {
  label?: ReactNode
  required?: boolean
  caption?: ReactNode
  captionColor?: "neutral" | "primary"
  captionSize?: FieldCaptionSize
  invalid?: boolean
  errorMessage?: ReactNode
}

export type FieldProps = FieldOwnProps & {
  info?: ReactNode
  disabled?: boolean
  nativeLabel?: boolean
  className?: string
  children: ReactNode
}

export type FieldControlProps = ComponentPropsWithRef<
  typeof BaseUIField.Control
>

export function Field({
  label,
  required,
  caption,
  captionColor = "neutral",
  captionSize = "md",
  invalid,
  errorMessage,
  info,
  disabled,
  nativeLabel = true,
  className,
  children,
}: FieldProps) {
  const showError = Boolean(invalid && errorMessage)

  return (
    <BaseUIField.Root
      invalid={invalid}
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      {label && (
        <BaseUIField.Label
          className="umc-field__label"
          nativeLabel={nativeLabel}
          render={nativeLabel ? undefined : <div />}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="umc-field__required">
              *
            </span>
          )}
        </BaseUIField.Label>
      )}
      {children}
      {showError ? (
        <BaseUIField.Error
          match={true}
          className="umc-field__caption"
          data-tone="error"
          data-size={captionSize}
        >
          {errorMessage}
        </BaseUIField.Error>
      ) : caption ? (
        <BaseUIField.Description
          className="umc-field__caption"
          data-tone={invalid ? "error" : captionColor}
          data-size={captionSize}
        >
          {caption}
        </BaseUIField.Description>
      ) : null}
      {info && <div className="umc-field__info">{info}</div>}
    </BaseUIField.Root>
  )
}

export function FieldControl(props: FieldControlProps) {
  return <BaseUIField.Control {...props} />
}
