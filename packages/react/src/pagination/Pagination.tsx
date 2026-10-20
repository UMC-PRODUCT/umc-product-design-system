"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@umc-product/icons"
import {
  useState,
  type ComponentPropsWithRef,
  type MouseEvent,
  type ReactNode,
} from "react"
import { flushSync } from "react-dom"

import { cx } from "../internal/cx.ts"
import { clampPage, lastPageOf, pageRangeOf } from "./page-range.ts"

export type PaginationProps = Omit<
  ComponentPropsWithRef<"nav">,
  "children" | "onChange"
> & {
  totalPages: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  visibleCount?: number
  previousLabel?: string
  nextLabel?: string
  pageLabel?: (page: number) => string
}

const DEFAULT_VISIBLE_COUNT = 4
const DEFAULT_NAVIGATION_LABEL = "페이지 이동"
const DEFAULT_PREVIOUS_LABEL = "이전 페이지"
const DEFAULT_NEXT_LABEL = "다음 페이지"
const CURRENT_PAGE_SELECTOR = '[aria-current="page"]'

const defaultPageLabel = (page: number) => `${page}페이지`

type ArrowButtonProps = {
  direction: "previous" | "next"
  label: string
  icon: ReactNode
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function ArrowButton({ direction, label, icon, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className="umc-pagination__item"
      data-type={direction}
      aria-label={label}
      onClick={onClick}
    >
      <span className="umc-pagination__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  )
}

export function Pagination({
  totalPages,
  page,
  defaultPage = 1,
  onPageChange,
  visibleCount = DEFAULT_VISIBLE_COUNT,
  previousLabel = DEFAULT_PREVIOUS_LABEL,
  nextLabel = DEFAULT_NEXT_LABEL,
  pageLabel = defaultPageLabel,
  className,
  ...props
}: PaginationProps) {
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage)
  const lastPage = lastPageOf(totalPages)
  if (lastPage < 1) return null

  const currentPage = clampPage(page ?? uncontrolledPage, lastPage)
  const pages = pageRangeOf(currentPage, lastPage, visibleCount)
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < lastPage

  const moveTo = (nextPage: number) => {
    if (nextPage === currentPage) return
    setUncontrolledPage(nextPage)
    onPageChange?.(nextPage)
  }

  const moveByArrow =
    (nextPage: number) => (event: MouseEvent<HTMLButtonElement>) => {
      const navigation = event.currentTarget.closest("nav")
      flushSync(() => moveTo(nextPage))
      if (navigation === null || navigation.contains(document.activeElement)) {
        return
      }
      navigation
        .querySelector<HTMLButtonElement>(CURRENT_PAGE_SELECTOR)
        ?.focus()
    }

  return (
    <nav
      aria-label={DEFAULT_NAVIGATION_LABEL}
      {...props}
      className={cx("umc-pagination", className)}
    >
      {hasPrevious && (
        <ArrowButton
          direction="previous"
          label={previousLabel}
          icon={<ChevronLeftIcon />}
          onClick={moveByArrow(currentPage - 1)}
        />
      )}
      <ul className="umc-pagination__pages">
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              className="umc-pagination__item"
              data-type="number"
              aria-label={pageLabel(pageNumber)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              onClick={() => moveTo(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
      {hasNext && (
        <ArrowButton
          direction="next"
          label={nextLabel}
          icon={<ChevronRightIcon />}
          onClick={moveByArrow(currentPage + 1)}
        />
      )}
    </nav>
  )
}
