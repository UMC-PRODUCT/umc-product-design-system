"use client"

import { NumericStepper } from "@umc-product/react"
import { useState } from "react"

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
