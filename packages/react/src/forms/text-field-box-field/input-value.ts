"use client"

import { type ChangeEvent, useState } from "react"

type InputValue = string | number | readonly string[] | undefined

const hasText = (value: InputValue): boolean =>
  value !== undefined && String(value) !== ""

export function useInputFilled(
  value: InputValue,
  defaultValue: InputValue,
): [boolean, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [uncontrolledFilled, setUncontrolledFilled] = useState(() =>
    hasText(defaultValue),
  )
  const trackFilled = (event: ChangeEvent<HTMLInputElement>) => {
    setUncontrolledFilled(event.target.value !== "")
  }
  return [
    value === undefined ? uncontrolledFilled : hasText(value),
    trackFilled,
  ]
}

export function clearInputValue(input: HTMLInputElement | null) {
  if (!input) return
  const setNativeValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set
  setNativeValue?.call(input, "")
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.focus()
}
