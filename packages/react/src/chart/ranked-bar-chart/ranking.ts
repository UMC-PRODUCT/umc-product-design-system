export type RankTone = "1st" | "2nd" | "3rd" | "4th" | "5th" | "none"

export type RankedEntry<T> = {
  item: T
  rank: number | undefined
  tied: boolean
}

const countOf = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0

export const rankEntriesOf = <T extends { value: number }>(
  items: readonly T[],
): RankedEntry<T>[] => {
  const sorted = [...items].sort(
    (left, right) => countOf(right.value) - countOf(left.value),
  )
  const ranks = sorted.map((item) => {
    const value = countOf(item.value)
    if (value === 0) return undefined
    return 1 + sorted.filter((other) => countOf(other.value) > value).length
  })
  return sorted.map((item, index) => {
    const rank = ranks[index]
    const tied =
      rank !== undefined &&
      ranks.filter((otherRank) => otherRank === rank).length > 1
    return { item, rank, tied }
  })
}

const VALUE_TONES: readonly RankTone[] = ["1st", "2nd", "3rd", "4th"]
const RANK_TONES: readonly RankTone[] = ["1st", "2nd", "3rd", "4th", "5th"]

const toneFrom = (tones: readonly RankTone[], rank: number | undefined) => {
  if (rank === undefined) return "none"
  return tones[Math.min(rank, tones.length) - 1] ?? "none"
}

export const valueToneOf = (rank: number | undefined): RankTone =>
  toneFrom(VALUE_TONES, rank)

export const rankToneOf = (rank: number | undefined): RankTone =>
  toneFrom(RANK_TONES, rank)
