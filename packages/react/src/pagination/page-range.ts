const MIN_VISIBLE_COUNT = 1

export const lastPageOf = (totalPages: number): number =>
  Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0

export const clampPage = (page: number, lastPage: number): number => {
  if (!Number.isFinite(page)) return 1
  return Math.min(Math.max(1, Math.floor(page)), Math.max(1, lastPage))
}

const groupSizeOf = (visibleCount: number): number =>
  Number.isFinite(visibleCount) && visibleCount >= MIN_VISIBLE_COUNT
    ? Math.floor(visibleCount)
    : MIN_VISIBLE_COUNT

export const pageRangeOf = (
  page: number,
  lastPage: number,
  visibleCount: number,
): number[] => {
  const size = groupSizeOf(visibleCount)
  const groupStart = Math.floor((page - 1) / size) * size + 1
  const groupEnd = Math.min(groupStart + size - 1, lastPage)
  return Array.from(
    { length: Math.max(0, groupEnd - groupStart + 1) },
    (_, index) => groupStart + index,
  )
}
