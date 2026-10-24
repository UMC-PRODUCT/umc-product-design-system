"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@umc-product/icons"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
} from "react"

import { IconButton } from "../../icon-button/IconButton.tsx"
import { cx } from "../../internal/cx.ts"
import {
  addDays,
  addMonths,
  dayLabelOf,
  endOfWeek,
  isSameDay,
  isSameMonth,
  monthTitleOf,
  rangePositionOf,
  startOfMonth,
  startOfWeek,
  weeksOfMonth,
  type CalendarRange,
  type CalendarRangePosition,
} from "./calendar-dates.ts"

export type { CalendarRange } from "./calendar-dates.ts"

export type CalendarHeaderLayout = "centered" | "start"

export type CalendarProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  ranges?: readonly CalendarRange[]
  markedDates?: readonly Date[]
  isDateDisabled?: (date: Date) => boolean
  headerLayout?: CalendarHeaderLayout
  previousMonthLabel?: string
  nextMonthLabel?: string
}

type Weekday = {
  label: string
  name: string
  tone?: "saturday" | "sunday"
}

const WEEKDAYS: readonly Weekday[] = [
  { label: "Mon", name: "월요일" },
  { label: "Tue", name: "화요일" },
  { label: "Wed", name: "수요일" },
  { label: "Thu", name: "목요일" },
  { label: "Fri", name: "금요일" },
  { label: "Sat", name: "토요일", tone: "saturday" },
  { label: "Sun", name: "일요일", tone: "sunday" },
]

const RANGE_LABELS: Readonly<Record<CalendarRangePosition, string>> = {
  start: "기간 시작",
  middle: "기간 중",
  end: "기간 끝",
  single: "하루 기간",
}

const MARKED_LABEL = "일정 있음"
const DEFAULT_PREVIOUS_MONTH_LABEL = "이전 달"
const DEFAULT_NEXT_MONTH_LABEL = "다음 달"
const MONTHS_PER_YEAR = 12
const NO_RANGES: readonly CalendarRange[] = []
const NO_DATES: readonly Date[] = []

const dateKeyOf = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const dayNameOf = (
  date: Date,
  range: CalendarRangePosition | undefined,
  marked: boolean,
): string =>
  [
    dayLabelOf(date),
    range === undefined ? undefined : RANGE_LABELS[range],
    marked ? MARKED_LABEL : undefined,
  ]
    .filter((part) => part !== undefined)
    .join(", ")

const nextFocusDateOf = (
  key: string,
  date: Date,
  byYear: boolean,
): Date | undefined => {
  switch (key) {
    case "ArrowLeft":
      return addDays(date, -1)
    case "ArrowRight":
      return addDays(date, 1)
    case "ArrowUp":
      return addDays(date, -7)
    case "ArrowDown":
      return addDays(date, 7)
    case "Home":
      return startOfWeek(date)
    case "End":
      return endOfWeek(date)
    case "PageUp":
      return addMonths(date, byYear ? -MONTHS_PER_YEAR : -1)
    case "PageDown":
      return addMonths(date, byYear ? MONTHS_PER_YEAR : 1)
    default:
      return undefined
  }
}

const tabbableDateOf = (
  visibleMonth: Date,
  focusedDate: Date | null,
  selectedDate: Date | null,
): Date => {
  if (focusedDate !== null && isSameMonth(focusedDate, visibleMonth)) {
    return focusedDate
  }
  if (selectedDate !== null && isSameMonth(selectedDate, visibleMonth)) {
    return selectedDate
  }
  return visibleMonth
}

export function Calendar({
  value,
  defaultValue = null,
  onValueChange,
  month,
  defaultMonth,
  onMonthChange,
  ranges = NO_RANGES,
  markedDates = NO_DATES,
  isDateDisabled,
  headerLayout = "centered",
  previousMonthLabel = DEFAULT_PREVIOUS_MONTH_LABEL,
  nextMonthLabel = DEFAULT_NEXT_MONTH_LABEL,
  className,
  ...props
}: CalendarProps) {
  const titleId = useId()
  const gridRef = useRef<HTMLDivElement>(null)
  const focusAfterRenderRef = useRef(false)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedDate = value === undefined ? uncontrolledValue : value
  const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
    startOfMonth(defaultMonth ?? selectedDate ?? new Date()),
  )
  const visibleMonth = startOfMonth(month ?? uncontrolledMonth)
  const [focusedDate, setFocusedDate] = useState<Date | null>(null)
  const tabbableDate = tabbableDateOf(visibleMonth, focusedDate, selectedDate)
  const title = monthTitleOf(visibleMonth)

  useEffect(() => {
    if (!focusAfterRenderRef.current) return
    focusAfterRenderRef.current = false
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus()
  })

  const showMonth = (date: Date) => {
    const nextMonth = startOfMonth(date)
    if (isSameMonth(nextMonth, visibleMonth)) return
    focusAfterRenderRef.current =
      gridRef.current?.contains(document.activeElement) ?? false
    setUncontrolledMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  const selectDate = (date: Date) => {
    if (isDateDisabled?.(date)) return
    setUncontrolledValue(date)
    setFocusedDate(date)
    onValueChange?.(date)
    showMonth(date)
  }

  const moveFocus =
    (date: Date) => (event: KeyboardEvent<HTMLButtonElement>) => {
      const hasShortcutModifier = event.altKey || event.ctrlKey || event.metaKey
      if (hasShortcutModifier) return
      const next = nextFocusDateOf(event.key, date, event.shiftKey)
      if (next === undefined) return
      event.preventDefault()
      focusAfterRenderRef.current = true
      setFocusedDate(next)
      showMonth(next)
    }

  const previousButton = (
    <IconButton
      size="sm"
      color="white"
      variant="weak"
      icon={<ChevronLeftIcon />}
      aria-label={previousMonthLabel}
      onClick={() => showMonth(addMonths(visibleMonth, -1))}
    />
  )
  const nextButton = (
    <IconButton
      size="sm"
      color="white"
      variant="weak"
      icon={<ChevronRightIcon />}
      aria-label={nextMonthLabel}
      onClick={() => showMonth(addMonths(visibleMonth, 1))}
    />
  )
  const titleText = (
    <div id={titleId} className="umc-calendar__title" aria-live="polite">
      <span>{title.year}</span> <span>{title.month}</span>
    </div>
  )

  return (
    <div {...props} className={cx("umc-calendar", className)}>
      <div className="umc-calendar__header" data-layout={headerLayout}>
        {headerLayout === "start" ? (
          <>
            {titleText}
            <div className="umc-calendar__nav">
              {previousButton}
              {nextButton}
            </div>
          </>
        ) : (
          <>
            {previousButton}
            {titleText}
            {nextButton}
          </>
        )}
      </div>
      <div
        ref={gridRef}
        role="grid"
        aria-labelledby={titleId}
        className="umc-calendar__grid"
      >
        <div role="row" className="umc-calendar__weekdays">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday.label}
              role="columnheader"
              aria-label={weekday.name}
              className="umc-calendar__weekday"
              data-tone={weekday.tone}
            >
              {weekday.label}
            </div>
          ))}
        </div>
        {weeksOfMonth(visibleMonth).map((week) => (
          <div
            key={week.map(dateKeyOf).join("|")}
            role="row"
            className="umc-calendar__week"
          >
            {week.map((date) => {
              const range = rangePositionOf(date, ranges)
              const marked = markedDates.some((markedDate) =>
                isSameDay(markedDate, date),
              )
              const selected =
                selectedDate !== null && isSameDay(date, selectedDate)
              return (
                <div
                  key={dateKeyOf(date)}
                  role="gridcell"
                  aria-selected={selected}
                  className="umc-calendar__cell"
                  data-range={range}
                >
                  <button
                    type="button"
                    className="umc-calendar__day"
                    tabIndex={isSameDay(date, tabbableDate) ? 0 : -1}
                    aria-label={dayNameOf(date, range, marked)}
                    aria-disabled={isDateDisabled?.(date) || undefined}
                    data-selected={selected ? "" : undefined}
                    data-outside={
                      isSameMonth(date, visibleMonth) ? undefined : ""
                    }
                    onClick={() => selectDate(date)}
                    onKeyDown={moveFocus(date)}
                  >
                    <span className="umc-calendar__day-number">
                      {date.getDate()}
                    </span>
                    {marked && (
                      <span className="umc-calendar__dot" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
