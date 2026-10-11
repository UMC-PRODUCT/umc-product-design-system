"use client"

import { Switch as BaseSwitch } from "@base-ui/react"
import type { ReactNode, Ref } from "react"

import { cx } from "../../internal/cx.ts"

export type SwitchSize = "sm" | "md"

export type SwitchLabelPlacement = "start" | "end"

export type SwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: SwitchSize
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
  labelPlacement?: SwitchLabelPlacement
  children?: ReactNode
  className?: string
  inputRef?: Ref<HTMLInputElement>
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "sm",
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
}: SwitchProps) {
  const label = children ? (
    <span className="umc-switch__label">{children}</span>
  ) : null
  const Wrapper = label ? "label" : "span"

  return (
    <Wrapper className={cx("umc-switch", className)} data-size={size}>
      {labelPlacement === "start" && label}
      <BaseSwitch.Root
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
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        className="umc-switch__track"
      >
        <BaseSwitch.Thumb className="umc-switch__thumb" />
      </BaseSwitch.Root>
      {labelPlacement === "end" && label}
    </Wrapper>
  )
}
