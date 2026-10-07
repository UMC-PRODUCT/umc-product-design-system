import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type InputBoxProps = ComponentPropsWithRef<"div"> & {
  size?: "lg" | "md"
  invalid?: boolean
  disabled?: boolean
}

export function InputBox({
  size = "lg",
  invalid,
  disabled,
  className,
  children,
  ...props
}: InputBoxProps) {
  return (
    <div
      {...props}
      className={cx("umc-input-box", className)}
      data-size={size}
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      {children}
    </div>
  )
}
