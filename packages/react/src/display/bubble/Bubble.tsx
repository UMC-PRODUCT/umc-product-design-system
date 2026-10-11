import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type BubbleDirection = "incoming" | "outgoing"

export type BubbleProps = ComponentPropsWithRef<"div"> & {
  direction?: BubbleDirection
  children: ReactNode
}

const INCOMING_PATH =
  "M14 17.7055C7.06907 19.1321 1.79211 15.0306 0.0200005 12.8016L0.216902 6.11452C2.12028 6.56032 6.24912 7.96156 7.50929 6.00001C7.31238 14.0245 12.6217 17.0368 14 17.7055Z"

const OUTGOING_PATH =
  "M0.0200005 17.7055C6.95093 19.1321 12.2279 15.0306 14 12.8016L13.8031 6.11452C11.8997 6.56032 7.77088 7.96156 6.51071 6.00001C6.70762 14.0245 1.39831 17.0368 0.0200005 17.7055Z"

export function Bubble({
  direction = "incoming",
  className,
  children,
  ...props
}: BubbleProps) {
  return (
    <div
      {...props}
      className={cx("umc-bubble", className)}
      data-direction={direction}
    >
      {direction === "incoming" && (
        <svg
          className="umc-bubble__tail"
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="currentColor"
          aria-hidden
        >
          <path d={INCOMING_PATH} />
        </svg>
      )}
      <div className="umc-bubble__body">{children}</div>
      {direction === "outgoing" && (
        <svg
          className="umc-bubble__tail"
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="currentColor"
          aria-hidden
        >
          <path d={OUTGOING_PATH} />
        </svg>
      )}
    </div>
  )
}
