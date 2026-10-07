"use client"

import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@base-ui/react"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type OptionItem<V extends string = string> = {
  value: V
  label: ReactNode
  disabled?: boolean
}

type OptionButtonGroupCommon<V extends string> = {
  options: OptionItem<V>[]
  variant?: "weak" | "strong"
  size?: "xl" | "sm" | "xs"
  disabled?: boolean
  name?: string
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

type SingleProps<V extends string> = OptionButtonGroupCommon<V> & {
  type?: "single"
  value?: V | null
  defaultValue?: V | null
  onValueChange?: (value: V) => void
}

type MultipleProps<V extends string> = OptionButtonGroupCommon<V> & {
  type: "multiple"
  value?: V[]
  defaultValue?: V[]
  onValueChange?: (value: V[]) => void
}

export type OptionButtonGroupProps<V extends string = string> =
  SingleProps<V> | MultipleProps<V>

const resolvePosition = (
  index: number,
  total: number,
): "start" | "middle" | "end" => {
  if (total === 1) return "start"
  if (index === 0) return "start"
  if (index === total - 1) return "end"
  return "middle"
}

function OptionButtonGroupSingle<V extends string>({
  options,
  variant = "weak",
  size = "sm",
  disabled,
  name,
  className,
  value,
  defaultValue,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: SingleProps<V>) {
  return (
    <RadioGroup
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onValueChange={(v) => onValueChange?.(v as V)}
      disabled={disabled}
      name={name}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cx("umc-option-button-group", className)}
      data-variant={variant}
      data-size={size}
    >
      {options.map((option, index) => (
        <Radio.Root
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="umc-option-button"
          data-position={resolvePosition(index, options.length)}
        >
          <span className="umc-option-button__label">{option.label}</span>
        </Radio.Root>
      ))}
    </RadioGroup>
  )
}

function OptionButtonGroupMultiple<V extends string>({
  options,
  variant = "weak",
  size = "sm",
  disabled,
  name,
  className,
  value,
  defaultValue,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: MultipleProps<V>) {
  return (
    <CheckboxGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => onValueChange?.(v as V[])}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cx("umc-option-button-group", className)}
      data-variant={variant}
      data-size={size}
    >
      {options.map((option, index) => (
        <Checkbox.Root
          key={option.value}
          name={name}
          value={option.value}
          disabled={option.disabled}
          className="umc-option-button"
          data-position={resolvePosition(index, options.length)}
        >
          <span className="umc-option-button__label">{option.label}</span>
        </Checkbox.Root>
      ))}
    </CheckboxGroup>
  )
}

export function OptionButtonGroup<V extends string = string>(
  props: OptionButtonGroupProps<V>,
) {
  if (props.type === "multiple") {
    return <OptionButtonGroupMultiple {...props} />
  }
  return <OptionButtonGroupSingle {...props} />
}
