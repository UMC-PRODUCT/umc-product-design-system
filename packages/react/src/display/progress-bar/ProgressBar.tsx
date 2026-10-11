"use client"

import type { ComponentPropsWithRef } from "react"
import { Progress } from "@base-ui/react"

import { cx } from "../../internal/cx.ts"

export type ProgressBarSize = "md" | "lg"

export type ProgressBarColor = "brand" | "neutral" | "success" | "error"

export type ProgressBarProps = Omit<ComponentPropsWithRef<"div">, "color"> & {
  value: number
  max?: number
  size?: ProgressBarSize
  color?: ProgressBarColor
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "brand",
  className,
  ...props
}: ProgressBarProps) {
  return (
    <Progress.Root
      {...props}
      value={value}
      max={max}
      className={cx("umc-progress-bar", className)}
      data-size={size}
      data-color={color}
    >
      <Progress.Track className="umc-progress-bar__track">
        <Progress.Indicator className="umc-progress-bar__indicator" />
      </Progress.Track>
    </Progress.Root>
  )
}
