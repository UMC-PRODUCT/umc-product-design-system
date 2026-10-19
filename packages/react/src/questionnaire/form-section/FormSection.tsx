"use client"

import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react"

import { cx } from "../../internal/cx.ts"
import { Switch } from "../../selection/switch/Switch.tsx"
import type { SectionHeaderLevel } from "../../shell/section-header/SectionHeader.tsx"

export type FormSectionVariant = "static" | "toggle"

export type FormSectionProps = Omit<
  ComponentPropsWithRef<"section">,
  "title" | "children"
> & {
  variant?: FormSectionVariant
  title: ReactNode
  optionalLabel?: ReactNode
  enabled?: boolean
  defaultEnabled?: boolean
  onEnabledChange?: (enabled: boolean) => void
  enabledLabel?: ReactNode
  level?: SectionHeaderLevel
  children: ReactNode
}

const DEFAULT_ENABLED_LABEL = "섹션 사용"

function StaticTabCurve() {
  return (
    <svg
      className="umc-form-section__tab-curve"
      width="50"
      height="35"
      viewBox="0 0 50 35"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0C4.4614 0 8.78696 1.53502 12.2504 4.3473L50 35H0V0Z" />
    </svg>
  )
}

export function FormSection({
  variant = "static",
  title,
  optionalLabel,
  enabled,
  defaultEnabled = true,
  onEnabledChange,
  enabledLabel = DEFAULT_ENABLED_LABEL,
  level = 3,
  className,
  children,
  ...props
}: FormSectionProps) {
  const titleId = useId()
  const [uncontrolledEnabled, setUncontrolledEnabled] = useState(defaultEnabled)
  const isToggle = variant === "toggle"
  const isEnabled = !isToggle || (enabled ?? uncontrolledEnabled)
  const Heading = `h${level}` as const

  return (
    <section
      {...props}
      className={cx("umc-form-section", className)}
      data-variant={variant}
      data-enabled={isEnabled ? "" : undefined}
    >
      {isToggle ? (
        <div className="umc-form-section__header">
          <Heading id={titleId} className="umc-form-section__title">
            {title}
            {optionalLabel !== undefined && (
              <span className="umc-form-section__optional">
                {optionalLabel}
              </span>
            )}
          </Heading>
          <Switch
            className="umc-form-section__switch"
            checked={isEnabled}
            aria-describedby={titleId}
            onCheckedChange={(next) => {
              setUncontrolledEnabled(next)
              onEnabledChange?.(next)
            }}
          >
            {enabledLabel}
          </Switch>
        </div>
      ) : (
        <div className="umc-form-section__header">
          <div className="umc-form-section__tab-row">
            <Heading className="umc-form-section__tab">{title}</Heading>
            <StaticTabCurve />
          </div>
          <div className="umc-form-section__tab-bar" />
        </div>
      )}
      <div className="umc-form-section__body" hidden={!isEnabled}>
        {children}
      </div>
    </section>
  )
}
