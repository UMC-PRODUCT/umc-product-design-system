"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react"
import type { Ref } from "react"

import { cx } from "../../internal/cx.ts"
import { CheckButtonGlyph } from "../../internal/glyphs.tsx"

export type CheckButtonProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  name?: string
  value?: string
  id?: string
  className?: string
  inputRef?: Ref<HTMLInputElement>
  "aria-label"?: string
  "aria-labelledby"?: string
}

export function CheckButton({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  name,
  value,
  id,
  className,
  inputRef,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: CheckButtonProps) {
  return (
    <BaseCheckbox.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={
        onCheckedChange ? (next) => onCheckedChange(next) : undefined
      }
      disabled={disabled}
      name={name}
      value={value}
      id={id}
      inputRef={inputRef}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cx("umc-check-button", className)}
    >
      <CheckButtonGlyph />
    </BaseCheckbox.Root>
  )
}
