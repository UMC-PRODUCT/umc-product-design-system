import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type HeaderActionButtonProps = ComponentPropsWithRef<"button"> & {
  suffix?: ReactNode
}

export function HeaderActionButton({
  type = "button",
  suffix,
  className,
  children,
  ...props
}: HeaderActionButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-header-action-button", className)}
    >
      {children}
      {suffix && (
        <span className="umc-header-action-button__suffix" aria-hidden="true">
          {suffix}
        </span>
      )}
    </button>
  )
}
