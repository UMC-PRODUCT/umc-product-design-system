"use client"

import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type DateNavigatorProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  children: ReactNode
  onPrevious?: () => void
  onNext?: () => void
  previousLabel?: string
  nextLabel?: string
}

type TriangleDirection = "previous" | "next"

const TRIANGLE_PATHS: Readonly<Record<TriangleDirection, string>> = {
  previous:
    "M5.16786 0.386059C5.56822 -0.128687 6.34621 -0.128686 6.74656 0.38606L11.7019 6.75724C12.2128 7.4141 11.7447 8.37118 10.9126 8.37118H1.00185C0.169704 8.37118 -0.29839 7.4141 0.212499 6.75724L5.16786 0.386059Z",
  next: "M6.74656 7.98512C6.34621 8.49987 5.56822 8.49987 5.16786 7.98512L0.212499 1.61394C-0.29839 0.957081 0.169704 -7.27487e-08 1.00185 0L10.9126 8.66423e-07C11.7447 9.39171e-07 12.2128 0.957084 11.7019 1.61394L6.74656 7.98512Z",
}

const TRIANGLE_TRANSFORMS: Readonly<Record<TriangleDirection, string>> = {
  previous: "translate(0 14) rotate(-90) translate(1.0428 0.6288)",
  next: "translate(0 14) rotate(-90) translate(1.0428 0)",
}

function TriangleGlyph({ direction }: { direction: TriangleDirection }) {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={TRIANGLE_PATHS[direction]}
        transform={TRIANGLE_TRANSFORMS[direction]}
        fill="currentColor"
      />
    </svg>
  )
}

export function DateNavigator({
  children,
  onPrevious,
  onNext,
  previousLabel = "이전",
  nextLabel = "다음",
  className,
  ...props
}: DateNavigatorProps) {
  return (
    <div
      role="group"
      {...props}
      className={cx("umc-date-navigator", className)}
    >
      <button
        type="button"
        className="umc-date-navigator__button"
        aria-label={previousLabel}
        aria-disabled={onPrevious === undefined ? true : undefined}
        onClick={() => onPrevious?.()}
      >
        <TriangleGlyph direction="previous" />
      </button>
      <span className="umc-date-navigator__label" aria-live="polite">
        {children}
      </span>
      <button
        type="button"
        className="umc-date-navigator__button"
        aria-label={nextLabel}
        aria-disabled={onNext === undefined ? true : undefined}
        onClick={() => onNext?.()}
      >
        <TriangleGlyph direction="next" />
      </button>
    </div>
  )
}
