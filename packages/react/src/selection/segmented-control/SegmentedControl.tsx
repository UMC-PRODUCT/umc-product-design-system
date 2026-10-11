"use client"

import { RadioGroup, Radio } from "@base-ui/react"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type SegmentedControlItem<V extends string = string> = {
  value: V
  label: ReactNode
}

export type SegmentedControlProps<V extends string = string> = {
  items: SegmentedControlItem<V>[]
  value?: V
  defaultValue?: V
  onValueChange?: (value: V) => void
  className?: string
  "aria-label"?: string
}

export function SegmentedControl<V extends string = string>({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps<V>) {
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => {
        const found = items.find((item) => item.value === next)
        if (found) onValueChange?.(found.value)
      }}
      aria-label={ariaLabel}
      className={cx("umc-segmented-control", className)}
    >
      {items.map((item) => (
        <Radio.Root
          key={item.value}
          value={item.value}
          className="umc-segmented-control__item"
        >
          <span className="umc-segmented-control__label">{item.label}</span>
        </Radio.Root>
      ))}
    </RadioGroup>
  )
}
