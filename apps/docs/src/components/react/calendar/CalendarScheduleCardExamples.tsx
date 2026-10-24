import {
  CalendarScheduleCard,
  type CalendarScheduleStatus,
} from "@umc-product/react"

import { lookup } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type ScheduleSample = {
  status: CalendarScheduleStatus
  specId: string
  label: string
  title: string
  start: string
  end: string
}

const SCHEDULE_SAMPLES: readonly ScheduleSample[] = [
  {
    status: "past",
    specId: "calendar-schedule-card-past",
    label: "1차",
    title: "Plan-Design 매칭",
    start: "10월 22일 00:00",
    end: "10월 25일 23:59",
  },
  {
    status: "ongoing",
    specId: "calendar-schedule-card-ongoing",
    label: "2차",
    title: "Plan-Design 매칭",
    start: "10월 26일 00:00",
    end: "10월 28일 23:59",
  },
  {
    status: "upcoming",
    specId: "calendar-schedule-card-upcoming",
    label: "3차",
    title: "Plan-Design 매칭",
    start: "10월 29일 00:00",
    end: "10월 31일 23:59",
  },
]

export function CalendarScheduleCardStates() {
  return (
    <div className="umc-example">
      <ul className="not-content m-0 flex w-full max-w-[380px] list-none flex-col gap-[7px] p-0">
        {SCHEDULE_SAMPLES.map((sample) => (
          <li key={sample.status} data-spec-id={sample.specId}>
            <CalendarScheduleCard
              status={sample.status}
              label={sample.label}
              title={sample.title}
              start={sample.start}
              end={sample.end}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CalendarScheduleCardLongPeriod() {
  return (
    <div className="umc-example">
      <div className="w-full max-w-[380px]">
        <CalendarScheduleCard
          label="정규"
          title="면접 결과 발표"
          start="2026년 12월 31일 00:00"
          end="2027년 01월 01일 11:00"
        />
      </div>
    </div>
  )
}

const FIGMA_STATUSES: Readonly<Record<string, CalendarScheduleStatus>> = {
  "예정 일정": "upcoming",
  "진행 중인 일정": "ongoing",
  "지난 일정": "past",
}

export function CalendarScheduleCardAllVariants() {
  return (
    <VariantGrid
      set="calendar-schedule-card"
      rows={["State"]}
      columns={[]}
      order={{ State: ["예정 일정", "진행 중인 일정", "지난 일정"] }}
      render={(variant) => (
        <div className="w-[380px]">
          <CalendarScheduleCard
            status={lookup(FIGMA_STATUSES, variant, "State")}
            label="N차"
            title="일정 이름"
            start="00월 00일 00:00"
            end="00월 00일 00:00"
          />
        </div>
      )}
    />
  )
}
