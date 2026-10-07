"use client"

import { NumericStepper } from "@umc-product/react"
import { useState } from "react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const PARTS = ["Design", "Frontend", "Backend"]

export function NumericStepperDefault() {
  const [quota, setQuota] = useState<Record<string, number | null>>({
    Design: 0,
    Frontend: 2,
    Backend: 999,
  })
  return (
    <div className="umc-example umc-example-stack">
      {PARTS.map((part, index) => (
        <div
          key={part}
          className="flex items-center gap-12"
          data-spec-id={
            index === 0
              ? "numeric-stepper numeric-stepper-button numeric-stepper-button-disabled numeric-stepper-value"
              : undefined
          }
        >
          <span className="w-16 text-[15px]">{part}</span>
          <NumericStepper
            aria-label={`${part} 모집 인원`}
            value={quota[part]}
            onValueChange={(value) =>
              setQuota((current) => ({ ...current, [part]: value }))
            }
          />
        </div>
      ))}
    </div>
  )
}

export function NumericStepperDisabled() {
  return (
    <div className="umc-example">
      <div data-spec-id="numeric-stepper-disabled">
        <NumericStepper defaultValue={3} disabled />
      </div>
    </div>
  )
}

const STEPPER_MIN = 0
const STEPPER_MAX = 999
const STEPPER_MIDDLE = 3

const stepperValueOf = (variant: FigmaVariant) => {
  if (variant.props["Disabled"] !== "True") return STEPPER_MIDDLE
  return variant.props["Action"] === "Decrease" ? STEPPER_MIN : STEPPER_MAX
}

export function NumericStepperAllVariants() {
  return (
    <>
      <VariantGrid
        set="numeric-stepper"
        rows={[]}
        columns={["State"]}
        render={(variant) => (
          <NumericStepper
            aria-label="모집 인원"
            defaultValue={STEPPER_MIDDLE}
            disabled={variant.props["State"] === "Disabled"}
          />
        )}
      />
      <VariantGrid
        set="numeric-stepper-button"
        rows={["Action"]}
        columns={["Disabled"]}
        order={{ Disabled: ["False", "True"] }}
        render={(variant) => (
          <NumericStepper
            aria-label="모집 인원"
            min={STEPPER_MIN}
            max={STEPPER_MAX}
            defaultValue={stepperValueOf(variant)}
          />
        )}
      />
    </>
  )
}
