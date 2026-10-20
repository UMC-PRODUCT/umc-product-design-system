const MIN_VISIBLE_COUNT = 1
const PAGES_BEFORE_CURRENT = 1

export const lastPageOf = (totalPages: number): number =>
  Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0

export const clampPage = (page: number, lastPage: number): number => {
  if (!Number.isFinite(page)) return 1
  return Math.min(Math.max(1, Math.floor(page)), Math.max(1, lastPage))
}

const windowSizeOf = (visibleCount: number): number =>
  Number.isFinite(visibleCount) && visibleCount >= MIN_VISIBLE_COUNT
    ? Math.floor(visibleCount)
    : MIN_VISIBLE_COUNT

export const pageRangeOf = (
  page: number,
  lastPage: number,
  visibleCount: number,
): number[] => {
  const size = windowSizeOf(visibleCount)
  const lastStart = Math.max(1, lastPage - size + 1)
  const pagesBefore = Math.min(PAGES_BEFORE_CURRENT, size - 1)
  const start = Math.min(Math.max(1, page - pagesBefore), lastStart)
  const end = Math.min(start + size - 1, lastPage)
  return Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, index) => start + index,
  )
}
