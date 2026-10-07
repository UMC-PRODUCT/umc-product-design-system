import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type StepNavigationProps = {
  steps: ReactNode[]
  currentStep: number
  className?: string
  "aria-label"?: string
}

export function StepNavigation({
  steps,
  currentStep,
  className,
  "aria-label": ariaLabel,
}: StepNavigationProps) {
  return (
    <nav
      aria-label={ariaLabel ?? "단계 탐색"}
      className={cx("umc-step-navigation", className)}
    >
      <ol className="umc-step-navigation__list">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          return (
            <li
              key={stepNumber}
              className="umc-step-navigation__step"
              aria-current={isActive ? "step" : undefined}
              data-active={isActive ? "" : undefined}
            >
              <span className="umc-step-navigation__badge" aria-hidden="true">
                {stepNumber}
              </span>
              <span className="umc-step-navigation__label">{step}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
