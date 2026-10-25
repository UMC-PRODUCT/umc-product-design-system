import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type TextFieldBoxFieldProps = ComponentPropsWithRef<"div"> & {
  size?: "lg" | "md"
  invalid?: boolean
  disabled?: boolean
}

export function TextFieldBoxField({
  size = "lg",
  invalid,
  disabled,
  className,
  children,
  ...props
}: TextFieldBoxFieldProps) {
  return (
    <div
      {...props}
      className={cx("umc-text-field-box-field", className)}
      data-size={size}
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      {children}
    </div>
  )
}
