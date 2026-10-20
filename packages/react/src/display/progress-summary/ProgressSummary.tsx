"use client"

import { Progress } from "@base-ui/react"
import { useId, type ComponentPropsWithRef, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type ProgressSummaryProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  label: ReactNode
  value: number
  max: number
}

const COMPLETE_PERCENT = 100
const LAST_UNFINISHED_PERCENT = 99
const FIRST_STARTED_PERCENT = 1

const percentOf = (value: number, max: number): number => {
  const hasTotal = max > 0
  const hasStarted = value > 0
  if (!hasTotal || !hasStarted) return 0
  if (value >= max) return COMPLETE_PERCENT
  const rounded = Math.round((value / max) * COMPLETE_PERCENT)
  return Math.min(
    Math.max(rounded, FIRST_STARTED_PERCENT),
    LAST_UNFINISHED_PERCENT,
  )
}

export function ProgressSummary({
  label,
  value,
  max,
  className,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  ...props
}: ProgressSummaryProps) {
  const labelId = useId()
  const countId = useId()
  const percent = percentOf(value, max)
  const percentText = `${percent}%`

  return (
    <Progress.Root
      {...props}
      value={percent}
      className={cx("umc-progress-summary", className)}
      getAriaValueText={() => percentText}
      aria-labelledby={labelledBy ?? labelId}
      aria-describedby={cx(countId, describedBy)}
    >
      <div className="umc-progress-summary__header">
        <span className="umc-progress-summary__title">
          <Progress.Label id={labelId} className="umc-progress-summary__label">
            {label}
          </Progress.Label>
          <span id={countId} className="umc-progress-summary__count">
            {`(${value}/${max})`}
          </span>
        </span>
        <Progress.Value className="umc-progress-summary__percent">
          {() => percentText}
        </Progress.Value>
      </div>
      <Progress.Track className="umc-progress-summary__track">
        <Progress.Indicator className="umc-progress-summary__indicator" />
      </Progress.Track>
    </Progress.Root>
  )
}
