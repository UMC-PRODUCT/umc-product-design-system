"use client"

import { Field as BaseUIField, NumberField } from "@base-ui/react"
import { AddIcon, SubtractionIcon } from "@umc-product/icons"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

export type NumericStepperProps = FieldOwnProps & {
  value?: number | null
  defaultValue?: number
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  name?: string
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  className?: string
}

export function NumericStepper({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  name,
  disabled,
  readOnly,
  placeholder,
  className,
}: NumericStepperProps) {
  const showError = invalid && errorMessage

  return (
    <BaseUIField.Root
      invalid={invalid}
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      {label && (
        <BaseUIField.Label className="umc-field__label" nativeLabel={false}>
          {label}
          {required && (
            <span aria-hidden="true" className="umc-field__required">
              {" "}
              *
            </span>
          )}
        </BaseUIField.Label>
      )}
      <NumberField.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onValueChange?.(v)}
        min={min}
        max={max}
        step={step}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className="umc-numeric-stepper"
        data-invalid={invalid ? "" : undefined}
      >
        <NumberField.Decrement
          className="umc-numeric-stepper__btn umc-numeric-stepper__btn--decrement"
          aria-label="감소"
        >
          <SubtractionIcon size={20} aria-hidden="true" />
        </NumberField.Decrement>
        <NumberField.Input
          className="umc-numeric-stepper__input"
          placeholder={placeholder}
        />
        <NumberField.Increment
          className="umc-numeric-stepper__btn umc-numeric-stepper__btn--increment"
          aria-label="증가"
        >
          <AddIcon size={20} aria-hidden="true" />
        </NumberField.Increment>
      </NumberField.Root>
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
