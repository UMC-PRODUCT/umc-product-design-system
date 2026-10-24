import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { CheckboxCheckLgGlyph } from "../../internal/glyphs.tsx"

export type CalendarScheduleStatus = "upcoming" | "ongoing" | "past"

export type CalendarScheduleCardProps = Omit<
  ComponentPropsWithRef<"div">,
  "title" | "children"
> & {
  status?: CalendarScheduleStatus
  label: ReactNode
  title: ReactNode
  start: ReactNode
  end?: ReactNode
}

const STATUS_TEXT: Readonly<Record<CalendarScheduleStatus, string>> = {
  upcoming: "예정 일정",
  ongoing: "진행 중인 일정",
  past: "지난 일정",
}

export function CalendarScheduleCard({
  status = "upcoming",
  label,
  title,
  start,
  end,
  className,
  ...props
}: CalendarScheduleCardProps) {
  return (
    <div
      {...props}
      className={cx("umc-calendar-schedule-card", className)}
      data-status={status}
    >
      <div className="umc-calendar-schedule-card__body">
        <div className="umc-calendar-schedule-card__text">
          <p className="umc-calendar-schedule-card__title">
            <span className="umc-visually-hidden">{STATUS_TEXT[status]}</span>
            <span className="umc-calendar-schedule-card__label">{label}</span>
            <span className="umc-calendar-schedule-card__name">{title}</span>
          </p>
          <p className="umc-calendar-schedule-card__period">
            <span>{start}</span>
            {end !== undefined && (
              <>
                <span>~</span>
                <span>{end}</span>
              </>
            )}
          </p>
        </div>
        {status === "past" && (
          <span
            className="umc-calendar-schedule-card__check"
            aria-hidden="true"
          >
            <CheckboxCheckLgGlyph />
          </span>
        )}
      </div>
    </div>
  )
}
