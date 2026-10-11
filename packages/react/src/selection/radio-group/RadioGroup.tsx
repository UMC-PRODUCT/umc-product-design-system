"use client"

import {
  Radio as BaseRadio,
  RadioGroup as BaseRadioGroup,
} from "@base-ui/react"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type RadioColor = "neutral" | "primary"

export type RadioGroupProps = {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  name?: string
  children: ReactNode
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

export type RadioProps = {
  value: string
  color?: RadioColor
  disabled?: boolean
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  name,
  children,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: RadioGroupProps) {
  return (
    <BaseRadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange ? (next) => onValueChange(String(next)) : undefined
      }
      disabled={disabled}
      required={required}
      name={name}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      className={cx("umc-radio-group", className)}
    >
      {children}
    </BaseRadioGroup>
  )
}

export function Radio({
  value,
  color = "neutral",
  disabled,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: RadioProps) {
  return (
    <BaseRadio.Root
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cx("umc-radio", className)}
      data-color={color}
    >
      <BaseRadio.Indicator className="umc-radio__dot" />
    </BaseRadio.Root>
  )
}
