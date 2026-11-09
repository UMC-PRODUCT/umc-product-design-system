"use client"

import { useState, type ComponentPropsWithRef } from "react"

import { cx } from "../internal/cx.ts"
import { clampPage, lastPageOf } from "../pagination/page-range.ts"
import { PaginationBarArrow } from "./PaginationBarArrow.tsx"
import { PaginationBarDots } from "./PaginationBarDots.tsx"

export type PaginationBarProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "onChange"
> & {
  totalPages: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  highlightNext?: boolean
  controls?: string
  previousLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
}

const FIRST_PAGE = 1
const DEFAULT_GROUP_LABEL = "슬라이드 이동"
const DEFAULT_PREVIOUS_LABEL = "이전"
const DEFAULT_NEXT_LABEL = "다음"

const defaultPageLabel = (page: number) => `${page}번째 슬라이드`

export function PaginationBar({
  totalPages,
  page,
  defaultPage = FIRST_PAGE,
  onPageChange,
  highlightNext = false,
  controls,
  previousLabel = DEFAULT_PREVIOUS_LABEL,
  nextLabel = DEFAULT_NEXT_LABEL,
  pageLabel = defaultPageLabel,
  className,
  ...props
}: PaginationBarProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage)
  const lastPage = lastPageOf(totalPages)
  if (lastPage < FIRST_PAGE) return null

  const currentPage = clampPage(page ?? uncontrolledPage, lastPage)
  const hasPrevious = currentPage > FIRST_PAGE
  const hasNext = currentPage < lastPage

  const moveTo = (nextPage: number) => {
    if (nextPage === currentPage) return
    setUncontrolledPage(nextPage)
    onPageChange?.(nextPage)
  }

  return (
    <div
      role="group"
      aria-label={DEFAULT_GROUP_LABEL}
      {...props}
      className={cx("umc-pagination-bar", className)}
    >
      <PaginationBarArrow
        direction="previous"
        label={previousLabel}
        controls={controls}
        disabled={!hasPrevious}
        onClick={() => moveTo(currentPage - 1)}
      />
      <PaginationBarDots
        lastPage={lastPage}
        currentPage={currentPage}
        pageLabel={pageLabel}
        controls={controls}
        onSelect={moveTo}
      />
      <PaginationBarArrow
        direction="next"
        label={nextLabel}
        controls={controls}
        disabled={!hasNext}
        highlighted={highlightNext && hasNext}
        onClick={() => moveTo(currentPage + 1)}
      />
    </div>
  )
}
