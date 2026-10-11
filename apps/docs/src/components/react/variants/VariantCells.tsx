import type { ReactNode } from "react"

export type ForcedState =
  | "hover"
  | "active"
  | "focus"
  | "focus-visible"
  | "focus-within"
  | "popup-open"
  | "highlighted"

type ForceStateProps = {
  states: readonly ForcedState[]
  children: ReactNode
}

export function ForceState({ states, children }: ForceStateProps) {
  if (states.length === 0) {
    return children
  }
  return (
    <div className="umc-force-state" data-force-state={states.join(" ")}>
      {children}
    </div>
  )
}

export function NotImplemented({ reason }: { reason: string }) {
  return (
    <span className="umc-variant-grid__missing">
      <strong>미구현</strong>
      <span>{reason}</span>
    </span>
  )
}
