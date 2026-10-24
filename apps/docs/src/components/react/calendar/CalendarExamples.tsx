"use client"

import {
  Calendar,
  CalendarScheduleCard,
  type CalendarHeaderLayout,
  type CalendarScheduleStatus,
} from "@umc-product/react"
import { useState } from "react"

import {
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"
import { ForceState } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const dateOf = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day)

const OCTOBER = dateOf(2026, 10, 1)

export function CalendarDefault() {
  const [value, setValue] = useState<Date | null>(dateOf(2026, 10, 12))
  return (
    <div className="umc-example">
      <div data-spec-id="calendar-root">
        <Calendar
          defaultMonth={OCTOBER}
          value={value}
          onValueChange={setValue}
          markedDates={[
            dateOf(2026, 10, 14),
            dateOf(2026, 10, 15),
            dateOf(2026, 10, 16),
          ]}
        />
      </div>
    </div>
  )
}

export function CalendarRanges() {
  return (
    <div className="umc-example">
      <Calendar
        defaultMonth={OCTOBER}
        ranges={[
          { start: dateOf(2026, 10, 6), end: dateOf(2026, 10, 10) },
          { start: dateOf(2026, 10, 24), end: dateOf(2026, 10, 28) },
        ]}
        markedDates={[dateOf(2026, 10, 9), dateOf(2026, 10, 26)]}
      />
    </div>
  )
}

export function CalendarStartLayout() {
  return (
    <div className="umc-example">
      <div data-spec-id="calendar-start-layout">
        <Calendar defaultMonth={OCTOBER} headerLayout="start" />
      </div>
    </div>
  )
}

type MatchingRound = {
  key: string
  label: string
  title: string
  start: Date
  end: Date
  status: CalendarScheduleStatus
}

const MATCHING_ROUNDS: readonly MatchingRound[] = [
  {
    key: "first",
    label: "1차",
    title: "Plan-Design 매칭",
    start: dateOf(2026, 10, 22),
    end: dateOf(2026, 10, 25),
    status: "past",
  },
  {
    key: "second",
    label: "2차",
    title: "Plan-Design 매칭",
    start: dateOf(2026, 10, 26),
    end: dateOf(2026, 10, 28),
    status: "ongoing",
  },
  {
    key: "third",
    label: "3차",
    title: "Plan-Design 매칭",
    start: dateOf(2026, 10, 29),
    end: dateOf(2026, 10, 31),
    status: "upcoming",
  },
  {
    key: "random",
    label: "4차",
    title: "랜덤 매칭",
    start: dateOf(2026, 11, 1),
    end: dateOf(2026, 11, 1),
    status: "upcoming",
  },
]

const dayTimeOf = (date: Date, time: string) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일 ${time}`

export function CalendarWithScheduleCards() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[380px] flex-col gap-4">
        <Calendar
          defaultMonth={OCTOBER}
          ranges={[{ start: dateOf(2026, 10, 22), end: dateOf(2026, 11, 1) }]}
          markedDates={MATCHING_ROUNDS.map((round) => round.start)}
        />
        <ul className="not-content m-0 flex list-none flex-col gap-[7px] p-0">
          {MATCHING_ROUNDS.map((round) => (
            <li key={round.key}>
              <CalendarScheduleCard
                status={round.status}
                label={round.label}
                title={round.title}
                start={dayTimeOf(round.start, "00:00")}
                end={dayTimeOf(round.end, "23:59")}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const FIGMA_HEADER_LAYOUTS: Readonly<Record<string, CalendarHeaderLayout>> = {
  Centered: "centered",
  "Left Aligned": "start",
}

export function CalendarAllVariants() {
  return (
    <VariantGrid
      set="calendar"
      rows={["Header Layout"]}
      columns={["*피그마용"]}
      order={{
        "Header Layout": ["Centered", "Left Aligned"],
        "*피그마용": ["False", "True"],
      }}
      render={(variant) => (
        <Calendar
          defaultMonth={OCTOBER}
          headerLayout={lookup(FIGMA_HEADER_LAYOUTS, variant, "Header Layout")}
        />
      )}
    />
  )
}

type DayRange = "none" | "start" | "middle" | "end"

const FIGMA_DAY_RANGES: Readonly<Record<string, DayRange>> = {
  Default: "none",
  Hover: "none",
  "Range Start": "start",
  "Range Middle": "middle",
  "Range End": "end",
}

const DAY_SPEC_IDS: Readonly<Record<string, string>> = {
  "State=Default, Selected=False, Disabled=False, Hightlight=False, Show Task Dot=False":
    "calendar-day-default",
  "State=Hover, Selected=False, Disabled=False, Hightlight=False, Show Task Dot=False":
    "calendar-day-hover",
  "State=Default, Selected=False, Disabled=True, Hightlight=False, Show Task Dot=False":
    "calendar-day-disabled",
  "State=Hover, Selected=False, Disabled=True, Hightlight=False, Show Task Dot=False":
    "calendar-day-disabled-hover",
  "State=Default, Selected=True, Disabled=False, Hightlight=False, Show Task Dot=False":
    "calendar-day-selected",
  "State=Range Start, Selected=True, Disabled=False, Hightlight=True, Show Task Dot=False":
    "calendar-day-range-start",
  "State=Range Middle, Selected=True, Disabled=False, Hightlight=True, Show Task Dot=False":
    "calendar-day-range-middle",
  "State=Default, Selected=False, Disabled=False, Hightlight=False, Show Task Dot=True":
    "calendar-day-dot",
  "State=Default, Selected=True, Disabled=False, Hightlight=False, Show Task Dot=True":
    "calendar-day-selected-dot",
  "State=Default, Selected=False, Disabled=True, Hightlight=False, Show Task Dot=True":
    "calendar-day-disabled-dot",
  "State=Hover, Selected=False, Disabled=True, Hightlight=False, Show Task Dot=True":
    "calendar-day-disabled-hover-dot",
}

const PREVIEW_DATE = dateOf(2026, 10, 22)
const isPreviewDateDisabled = (date: Date) => date < PREVIEW_DATE

function CalendarDayPreview({ variant }: { variant: FigmaVariant }) {
  const range = lookup(FIGMA_DAY_RANGES, variant, "State")
  const selected = range === "none" && variant.props["Selected"] === "True"
  const disabled = variant.props["Disabled"] === "True"
  const marked = variant.props["Show Task Dot"] === "True"
  const code = componentCodeOf(Calendar, {
    defaultMonth: OCTOBER,
    value: selected ? PREVIEW_DATE : undefined,
    ranges:
      range === "none"
        ? undefined
        : [{ start: PREVIEW_DATE, end: PREVIEW_DATE }],
    markedDates: marked ? [PREVIEW_DATE] : undefined,
    isDateDisabled: disabled ? isPreviewDateDisabled : undefined,
  })
  return (
    <ForceState states={variant.props["State"] === "Hover" ? ["hover"] : []}>
      <div
        className="umc-calendar__cell w-12"
        data-range={range === "none" ? undefined : range}
        data-spec-id={DAY_SPEC_IDS[variant.name]}
        {...codeAttributeOf(code)}
      >
        <span
          className="umc-calendar__day"
          data-selected={selected ? "" : undefined}
          data-outside={disabled ? "" : undefined}
        >
          <span className="umc-calendar__day-number">
            {PREVIEW_DATE.getDate()}
          </span>
          {marked && <span className="umc-calendar__dot" />}
        </span>
      </div>
    </ForceState>
  )
}

export function CalendarDayAllVariants() {
  return (
    <VariantGrid
      set="calendar-day"
      sections={["Show Task Dot"]}
      rows={["State"]}
      columns={["Selected", "Disabled"]}
      order={{
        "Show Task Dot": ["False", "True"],
        State: ["Default", "Hover", "Range Start", "Range Middle", "Range End"],
        Selected: ["False", "True"],
        Disabled: ["False", "True"],
      }}
      render={(variant) => <CalendarDayPreview variant={variant} />}
    />
  )
}
