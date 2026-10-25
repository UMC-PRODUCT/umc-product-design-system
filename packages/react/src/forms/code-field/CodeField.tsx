"use client"

import { OTPField } from "@base-ui/react"
import { type ReactNode, useRef, useState } from "react"

import { cx } from "../../internal/cx.ts"
import { Field, type FieldOwnProps } from "../field/Field.tsx"

export type CodeFieldSize = "lg" | "md"

export type CodeFieldProps = FieldOwnProps & {
  length?: number
  size?: CodeFieldSize
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onValueComplete?: (value: string) => void
  validationType?: "numeric" | "alpha" | "alphanumeric"
  normalizeValue?: (value: string) => string
  mask?: boolean
  info?: ReactNode
  name?: string
  disabled?: boolean
  className?: string
}

const DEFAULT_LENGTH = 6

export function CodeField({
  label,
  required,
  caption,
  captionColor,
  captionSize,
  invalid,
  errorMessage,
  length = DEFAULT_LENGTH,
  size = "lg",
  value,
  defaultValue = "",
  onValueChange,
  onValueComplete,
  validationType,
  normalizeValue,
  mask,
  info,
  name,
  disabled,
  className,
}: CodeFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const currentValue = value ?? uncontrolledValue

  const changeValue = (next: string) => {
    setUncontrolledValue(next)
    onValueChange?.(next)
  }

  const restartAfterError = () => {
    if (!invalid || currentValue === "") return
    changeValue("")
    rootRef.current?.querySelector("input")?.focus()
  }

  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      captionSize={captionSize}
      invalid={invalid}
      errorMessage={errorMessage}
      info={info}
      disabled={disabled}
      className={cx("umc-code-field", className)}
    >
      <OTPField.Root
        ref={rootRef}
        length={length}
        value={currentValue}
        onValueChange={(next) => changeValue(next)}
        onValueComplete={(next) => onValueComplete?.(next)}
        onFocus={restartAfterError}
        validationType={validationType}
        normalizeValue={normalizeValue}
        mask={mask}
        name={name}
        disabled={disabled}
        required={required}
        className="umc-code-field__cells"
        data-size={size}
      >
        {Array.from({ length }, (_, index) => (
          <OTPField.Input key={index} className="umc-code-field__cell" />
        ))}
      </OTPField.Root>
    </Field>
  )
}
