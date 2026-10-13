import type { ComponentPropsWithRef, CSSProperties } from "react"

import { cx } from "../../internal/cx.ts"

export type SkeletonProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
}

export function Skeleton({
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <span
      {...props}
      aria-hidden
      className={cx("umc-skeleton", className)}
      style={{ width, height, ...style }}
    />
  )
}
