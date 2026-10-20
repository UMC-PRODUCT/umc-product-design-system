import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type SectionHeaderSize = "lg" | "md" | "sm"

export type SectionHeaderLevel = 2 | 3 | 4 | 5 | 6

export type SectionHeaderProps = Omit<
  ComponentPropsWithRef<"div">,
  "title" | "slot" | "children"
> & {
  title: ReactNode
  number?: ReactNode
  required?: boolean
  description?: ReactNode
  slot?: ReactNode
  size?: SectionHeaderSize
  level?: SectionHeaderLevel
}

const REQUIRED_SUFFIX = " (필수)"

export function SectionHeader({
  title,
  number,
  required = false,
  description,
  slot,
  size = "lg",
  level = 2,
  className,
  ...props
}: SectionHeaderProps) {
  const Heading = `h${level}` as const

  return (
    <div
      {...props}
      className={cx("umc-section-header", className)}
      data-size={size}
    >
      {number !== undefined && (
        <span className="umc-section-header__number">{number}</span>
      )}
      <div className="umc-section-header__body">
        <div className="umc-section-header__title-row">
          <Heading className="umc-section-header__title">
            {title}
            {required && (
              <>
                <span
                  className="umc-section-header__required"
                  aria-hidden="true"
                >
                  *
                </span>
                <span className="umc-visually-hidden">{REQUIRED_SUFFIX}</span>
              </>
            )}
          </Heading>
          {slot !== undefined && (
            <div className="umc-section-header__slot">{slot}</div>
          )}
        </div>
        {description !== undefined && (
          <p className="umc-section-header__description">{description}</p>
        )}
      </div>
    </div>
  )
}
