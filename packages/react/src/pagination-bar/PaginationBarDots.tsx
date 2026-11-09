"use client"

export type PaginationBarDotsProps = {
  lastPage: number
  currentPage: number
  pageLabel: (page: number) => string
  controls?: string
  onSelect: (page: number) => void
}

const pagesUpTo = (lastPage: number) =>
  Array.from({ length: lastPage }, (_, index) => index + 1)

export function PaginationBarDots({
  lastPage,
  currentPage,
  pageLabel,
  controls,
  onSelect,
}: PaginationBarDotsProps) {
  return (
    <ul className="umc-pagination-bar__dots">
      {pagesUpTo(lastPage).map((page) => (
        <li key={page}>
          <button
            type="button"
            className="umc-pagination-bar__dot"
            aria-label={pageLabel(page)}
            aria-current={page === currentPage ? "true" : undefined}
            aria-controls={controls}
            onClick={() => onSelect(page)}
          />
        </li>
      ))}
    </ul>
  )
}
