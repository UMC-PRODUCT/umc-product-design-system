import type { ForcedState } from "./VariantCells.tsx"
import type { FigmaVariant } from "./figma-variants.ts"

export const INPUT_SIZES = { Lg: "lg", Md: "md" } as const

export const INPUT_STATE_ORDER = [
  "Default",
  "Hover",
  "Focused & Hover",
  "Typing",
  "Filled",
  "Filtered",
  "Disabled",
] as const

const FORCED_INPUT_STATES: Readonly<Record<string, readonly ForcedState[]>> = {
  Hover: ["hover"],
  "Focused & Hover": ["hover", "focus-within"],
  Typing: ["focus-within"],
}

const STATES_WITH_VALUE = new Set(["Typing", "Filled", "Filtered"])

export const stateOf = (variant: FigmaVariant) => variant.props["State"] ?? ""

export const forcedInputStates = (variant: FigmaVariant) =>
  FORCED_INPUT_STATES[stateOf(variant)] ?? []

export const hasInputValue = (variant: FigmaVariant) =>
  STATES_WITH_VALUE.has(stateOf(variant))

export const isDisabledState = (variant: FigmaVariant) =>
  stateOf(variant) === "Disabled"
