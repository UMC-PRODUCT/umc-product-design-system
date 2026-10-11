import { InfoIcon } from "@umc-product/icons"
import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type TextInfoButtonProps = ComponentPropsWithRef<"button">

export function TextInfoButton({
  type = "button",
  className,
  children,
  ...props
}: TextInfoButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-text-info-button", className)}
    >
      <InfoIcon className="umc-text-info-button__icon" size={16} />
      {children}
    </button>
  )
}
