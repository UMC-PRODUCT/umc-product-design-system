import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../internal/cx.ts"

export type FloatingActionButtonProps = Omit<
  ComponentPropsWithRef<"button">,
  "children" | "aria-label"
> & {
  icon: ReactNode
  "aria-label": string
}

export function FloatingActionButton({
  icon,
  type = "button",
  className,
  ...props
}: FloatingActionButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-floating-action-button", className)}
    >
      <span className="umc-floating-action-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  )
}
