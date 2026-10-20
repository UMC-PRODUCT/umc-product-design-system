const isCountable = (value: number) => Number.isFinite(value) && value > 0

export const largestOf = (values: readonly number[]): number =>
  values.reduce(
    (largest, value) =>
      isCountable(value) && value > largest ? value : largest,
    0,
  )

export const ratioOf = (value: number, max: number): number => {
  if (!isCountable(value) || !isCountable(max)) return 0
  return Math.min(value / max, 1)
}

export const formatCount = (value: number): string =>
  value.toLocaleString("ko-KR")
