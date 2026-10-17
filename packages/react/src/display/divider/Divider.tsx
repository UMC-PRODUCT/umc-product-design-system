"use client"

import { Separator } from "@base-ui/react"
import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type DividerVariant = "line" | "solid"

type HorizontalDividerProps = {
  orientation?: "horizontal"
  variant?: DividerVariant
}

type VerticalDividerProps = {
  orientation: "vertical"
  variant?: "line"
}

export type DividerProps = Omit<ComponentPropsWithRef<"div">, "children"> &
  (HorizontalDividerProps | VerticalDividerProps)

export function Divider({
  orientation = "horizontal",
  variant = "line",
  className,
  ...props
}: DividerProps) {
  return (
    <Separator
      {...props}
      orientation={orientation}
      className={cx("umc-divider", className)}
      data-variant={variant}
    />
  )
}
