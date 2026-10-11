import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type ScrollFogProps = ComponentPropsWithRef<"div"> & {
  side?: "top" | "bottom" | "left" | "right"
}

export function ScrollFog({
  side = "right",
  className,
  ...props
}: ScrollFogProps) {
  return (
    <div
      {...props}
      className={cx("umc-scroll-fog", className)}
      data-side={side}
      aria-hidden="true"
    />
  )
}
