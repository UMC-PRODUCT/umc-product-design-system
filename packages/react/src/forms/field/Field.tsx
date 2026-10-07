"use client"

import { Field as BaseUIField } from "@base-ui/react"
import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type FieldOwnProps = {
  label?: ReactNode
  required?: boolean
  caption?: ReactNode
  captionColor?: "neutral" | "primary"
  invalid?: boolean
  errorMessage?: ReactNode
}

export type FieldProps = FieldOwnProps & {
  disabled?: boolean
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
  captionColor,
  invalid,
  errorMessage,
  disabled,
  className,
  children,
}: FieldProps) {
  const showError = invalid && errorMessage

  return (
    <BaseUIField.Root
      invalid={invalid}
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      {label && (
        <BaseUIField.Label className="umc-field__label">
          {label}
          {required && (
            <span aria-hidden="true" className="umc-field__required">
              {" "}
              *
            </span>
          )}
        </BaseUIField.Label>
      )}
      {children}
      {showError ? (
        <BaseUIField.Error
          match={true}
          render={
            <span className="umc-field__caption umc-field__caption--error" />
          }
        >
          {errorMessage}
        </BaseUIField.Error>
      ) : caption ? (
        <BaseUIField.Description
          render={
            <span
              className={cx(
                "umc-field__caption",
                invalid && "umc-field__caption--error",
                captionColor === "primary" && "umc-field__caption--primary",
              )}
            />
          }
        >
          {caption}
        </BaseUIField.Description>
      ) : null}
    </BaseUIField.Root>
  )
}

export function FieldControl(props: FieldControlProps) {
  return <BaseUIField.Control {...props} />
}
