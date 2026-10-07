"use client"

import { NumberField } from "@base-ui/react"
import { AddIcon, SubtractionIcon } from "@umc-product/icons"

import { Field, type FieldOwnProps } from "../field/Field.tsx"

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
  className?: string
  "aria-label"?: string
}

const DEFAULT_MIN = 0
const DEFAULT_MAX = 999
const ICON_SIZE = 16

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
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = 1,
  name,
  disabled,
  readOnly,
  className,
  "aria-label": ariaLabel,
}: NumericStepperProps) {
  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      invalid={invalid}
      errorMessage={errorMessage}
      disabled={disabled}
      nativeLabel={false}
      className={className}
    >
      <NumberField.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onValueChange?.(next)}
        min={min}
        max={max}
        step={step}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className="umc-numeric-stepper"
      >
        <NumberField.Group className="umc-numeric-stepper__group">
          <NumberField.Decrement
            className="umc-numeric-stepper__button"
            aria-label="감소"
          >
            <SubtractionIcon weight="fill" size={ICON_SIZE} />
          </NumberField.Decrement>
          <NumberField.Input
            className="umc-numeric-stepper__input"
            aria-label={ariaLabel}
          />
          <NumberField.Increment
            className="umc-numeric-stepper__button"
            aria-label="증가"
          >
            <AddIcon weight="fill" size={ICON_SIZE} />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
    </Field>
  )
}
