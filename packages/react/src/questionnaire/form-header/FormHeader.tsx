import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import type { SectionHeaderLevel } from "../../shell/section-header/SectionHeader.tsx"

export type FormHeaderProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  title: ReactNode
  subtitle?: ReactNode
  thumbnail?: ReactNode
  caption?: ReactNode
  level?: SectionHeaderLevel
}

function TabCurve() {
  return (
    <svg
      className="umc-form-header__curve"
      width="77"
      height="85"
      viewBox="0 0 77 85"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0H4.93364C11.3285 0 17.3379 3.05804 21.102 8.22779L77 85H0V0Z" />
    </svg>
  )
}

export function FormHeader({
  title,
  subtitle,
  thumbnail,
  caption,
  level = 2,
  className,
  ...props
}: FormHeaderProps) {
  const Heading = `h${level}` as const

  return (
    <div {...props} className={cx("umc-form-header", className)}>
      <div className="umc-form-header__tab">
        <div className="umc-form-header__contents">
          <div className="umc-form-header__thumbnail">{thumbnail}</div>
          <div className="umc-form-header__titles">
            <Heading className="umc-form-header__title">{title}</Heading>
            {subtitle !== undefined && (
              <p className="umc-form-header__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <TabCurve />
      <div className="umc-form-header__rest">
        {caption !== undefined && (
          <div className="umc-form-header__caption">{caption}</div>
        )}
        <div className="umc-form-header__bar" />
      </div>
    </div>
  )
}
