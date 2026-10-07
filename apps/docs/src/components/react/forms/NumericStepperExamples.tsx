"use client"

import { NumericStepper } from "@umc-product/react"

export function NumericStepperDefault() {
  return (
    <div data-spec-id="numeric-stepper-default" style={{ width: "240px" }}>
      <NumericStepper label="수량" defaultValue={1} min={1} max={99} />
    </div>
  )
}

export function NumericStepperButton() {
  return (
    <div style={{ display: "flex" }}>
      <button
        className="umc-numeric-stepper__btn umc-numeric-stepper__btn--increment"
        data-spec-id="numeric-stepper-btn"
        type="button"
        aria-label="증가"
        style={{ width: "48px", height: "48px" }}
      >
        +
      </button>
    </div>
  )
}

export function NumericStepperRange() {
  return (
    <NumericStepper
      label="수량 (1~10)"
      defaultValue={5}
      min={1}
      max={10}
      step={1}
    />
  )
}

export function NumericStepperInvalid() {
  return (
    <NumericStepper
      label="수량"
      invalid
      errorMessage="유효하지 않은 값입니다"
    />
  )
}

export function NumericStepperDisabled() {
  return <NumericStepper label="수량" disabled defaultValue={3} />
}
