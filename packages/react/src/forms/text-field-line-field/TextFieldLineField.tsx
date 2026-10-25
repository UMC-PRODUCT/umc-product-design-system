import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type TextFieldLineFieldProps = ComponentPropsWithRef<"div"> & {
  invalid?: boolean
  disabled?: boolean
}

export function TextFieldLineField({
  invalid,
  disabled,
  className,
  children,
  ...props
}: TextFieldLineFieldProps) {
  return (
    <div
      {...props}
      className={cx("umc-text-field-line-field", className)}
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      {children}
    </div>
  )
}
