"use client"

import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type DimmedProps = ComponentPropsWithRef<"div"> & {
  intensity?: "weak" | "medium" | "strong"
}

export function Dimmed({
  intensity = "medium",
  className,
  ...props
}: DimmedProps) {
  return (
    <div
      {...props}
      className={cx("umc-dimmed", className)}
      data-intensity={intensity}
    />
  )
}
