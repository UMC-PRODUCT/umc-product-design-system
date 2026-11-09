"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@umc-product/icons"

import { PulseRing } from "../internal/pulse-ring/PulseRing.tsx"

export type PaginationBarArrowProps = {
  direction: "previous" | "next"
  label: string
  disabled: boolean
  highlighted?: boolean
  controls?: string
  onClick: () => void
}

export function PaginationBarArrow({
  direction,
  label,
  disabled,
  highlighted = false,
  controls,
  onClick,
}: PaginationBarArrowProps) {
  const Icon = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon
  return (
    <button
      type="button"
      className="umc-pagination-bar__arrow"
      data-direction={direction}
      aria-label={label}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
    >
      {highlighted && <PulseRing />}
      <span className="umc-pagination-bar__icon" aria-hidden="true">
        <Icon weight="fill" />
      </span>
    </button>
  )
}
