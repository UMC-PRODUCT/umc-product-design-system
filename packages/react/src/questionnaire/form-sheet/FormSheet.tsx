import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type FormSheetProps = ComponentPropsWithRef<"section"> & {
  header: ReactNode
  action?: ReactNode
  description?: ReactNode
  control?: ReactNode
  children: ReactNode
}

export function FormSheet({
  header,
  action,
  description,
  control,
  className,
  children,
  ...props
}: FormSheetProps) {
  return (
    <section {...props} className={cx("umc-form-sheet", className)}>
      {header}
      <div className="umc-form-sheet__body">
        {action !== undefined && (
          <div className="umc-form-sheet__actions">{action}</div>
        )}
        <div className="umc-form-sheet__content">
          {description !== undefined && (
            <div className="umc-form-sheet__description">{description}</div>
          )}
          <div className="umc-form-sheet__form">{children}</div>
          {control !== undefined && (
            <div className="umc-form-sheet__control">{control}</div>
          )}
        </div>
      </div>
    </section>
  )
}
