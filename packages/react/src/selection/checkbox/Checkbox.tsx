"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react"
import type { ReactElement, ReactNode, Ref } from "react"

import { cx } from "../../internal/cx.ts"
import {
  CheckboxCheckLgGlyph,
  CheckboxCheckMdGlyph,
} from "../../internal/glyphs.tsx"

export type CheckboxColor = "neutral" | "brand"

export type CheckboxSize = "md" | "lg"

export type CheckboxLabelPlacement = "start" | "end"

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  color?: CheckboxColor
  size?: CheckboxSize
  invalid?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
  labelPlacement?: CheckboxLabelPlacement
  children?: ReactNode
  className?: string
  inputRef?: Ref<HTMLInputElement>
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

const CHECK_GLYPHS: Readonly<Record<CheckboxSize, ReactElement>> = {
  md: <CheckboxCheckMdGlyph />,
  lg: <CheckboxCheckLgGlyph />,
}

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  color = "neutral",
  size = "md",
  invalid,
  disabled,
  required,
  name,
  value,
  id,
  labelPlacement = "start",
  children,
  className,
  inputRef,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: CheckboxProps) {
  const label = children ? (
    <span className="umc-checkbox__label">{children}</span>
  ) : null
  const Wrapper = label ? "label" : "span"

  return (
    <Wrapper
      className={cx("umc-checkbox", className)}
      data-color={color}
      data-size={size}
    >
      {labelPlacement === "start" && label}
      <BaseCheckbox.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={
          onCheckedChange ? (next) => onCheckedChange(next) : undefined
        }
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        id={id}
        inputRef={inputRef}
        aria-invalid={invalid ? true : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className="umc-checkbox__control"
      >
        <BaseCheckbox.Indicator className="umc-checkbox__indicator">
          {CHECK_GLYPHS[size]}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {labelPlacement === "end" && label}
    </Wrapper>
  )
}
