export type CalendarRange = {
  start: Date
  end: Date
}

export type CalendarRangePosition = "start" | "middle" | "end" | "single"

const DAYS_PER_WEEK = 7

const dayLabelFormat = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
})

export const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1)

export const addDays = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)

const lastDayOfMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate()

export const addMonths = (date: Date, amount: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1)
  const day = Math.min(
    date.getDate(),
    lastDayOfMonth(target.getFullYear(), target.getMonth()),
  )
  return new Date(target.getFullYear(), target.getMonth(), day)
}

export const isSameDay = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

export const isSameMonth = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth()

const daysSinceMonday = (date: Date): number =>
  (date.getDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK

export const startOfWeek = (date: Date): Date =>
  addDays(date, -daysSinceMonday(date))

export const endOfWeek = (date: Date): Date =>
  addDays(startOfWeek(date), DAYS_PER_WEEK - 1)

export const weeksOfMonth = (month: Date): Date[][] => {
  const first = startOfMonth(month)
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0)
  const weeks: Date[][] = []
  for (
    let weekStart = startOfWeek(first);
    weekStart <= last;
    weekStart = addDays(weekStart, DAYS_PER_WEEK)
  ) {
    const start = weekStart
    weeks.push(
      Array.from({ length: DAYS_PER_WEEK }, (_, index) =>
        addDays(start, index),
      ),
    )
  }
  return weeks
}

const dayValueOf = (date: Date): number => startOfDay(date).getTime()

export const rangePositionOf = (
  date: Date,
  ranges: readonly CalendarRange[],
): CalendarRangePosition | undefined => {
  const day = dayValueOf(date)
  for (const range of ranges) {
    const start = Math.min(dayValueOf(range.start), dayValueOf(range.end))
    const end = Math.max(dayValueOf(range.start), dayValueOf(range.end))
    if (day < start || day > end) continue
    if (start === end) return "single"
    if (day === start) return "start"
    if (day === end) return "end"
    return "middle"
  }
  return undefined
}

export const dayLabelOf = (date: Date): string => dayLabelFormat.format(date)

export const monthTitleOf = (month: Date) => ({
  year: `${month.getFullYear()}년`,
  month: `${String(month.getMonth() + 1).padStart(2, "0")}월`,
})
