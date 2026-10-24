import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

export type FormSectionEmptyProps = ComponentPropsWithRef<"div"> & {
  dropTarget?: boolean
}

const DEFAULT_MESSAGE = "질문을 추가하거나 다른 섹션에서 옮겨 오세요"

export function FormSectionEmpty({
  dropTarget = false,
  className,
  children = DEFAULT_MESSAGE,
  ...props
}: FormSectionEmptyProps) {
  return (
    <div
      {...props}
      className={cx("umc-form-section-empty", className)}
      data-drop-target={dropTarget ? "" : undefined}
    >
      {children}
    </div>
  )
}
