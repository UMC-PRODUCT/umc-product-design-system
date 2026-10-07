"use client"

import { Field as BaseUIField, OTPField } from "@base-ui/react"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

export type CodeFieldProps = FieldOwnProps & {
  length?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onValueComplete?: (value: string) => void
  mask?: boolean
  name?: string
  disabled?: boolean
  className?: string
}

export function CodeField({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  length = 6,
  value,
  defaultValue,
  onValueChange,
  onValueComplete,
  mask,
  name,
  disabled,
  className,
}: CodeFieldProps) {
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
      <OTPField.Root
        length={length}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onValueChange?.(v)}
        onValueComplete={(v) => onValueComplete?.(v)}
        mask={mask}
        name={name}
        disabled={disabled}
        required={required}
        className="umc-code-field"
        data-invalid={invalid ? "" : undefined}
      >
        {Array.from({ length }, (_, i) => (
          <OTPField.Input
            key={i}
            className={cx(
              "umc-code-field__slot",
              invalid && "umc-code-field__slot--invalid",
            )}
          />
        ))}
      </OTPField.Root>
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
