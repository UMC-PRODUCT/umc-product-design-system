import { cx } from "../cx.ts"

export type PulseRingProps = {
  className?: string
}

export function PulseRing({ className }: PulseRingProps) {
  return <span className={cx("umc-pulse-ring", className)} aria-hidden="true" />
}
