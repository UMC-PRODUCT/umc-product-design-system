"use client"

import {
  Toggle as BaseToggle,
  ToggleGroup as BaseToggleGroup,
} from "@base-ui/react"
import { useState, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type FormQuestionTypeOption = {
  value: string
  label: ReactNode
  icon: ReactNode
}

export type FormQuestionTypeListProps = {
  items: readonly FormQuestionTypeOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  disabled?: boolean
  id?: string
  className?: string
  "aria-label"?: string
}

export const QUESTION_TYPE_LIST_LABEL = "질문 유형"

export function QuestionTypeTile({ item }: { item: FormQuestionTypeOption }) {
  return (
    <>
      <span className="umc-form-question-type-list__icon" aria-hidden="true">
        {item.icon}
      </span>
      <span className="umc-form-question-type-list__label">{item.label}</span>
    </>
  )
}

export function FormQuestionTypeList({
  items,
  value,
  defaultValue = null,
  onValueChange,
  disabled,
  id,
  className,
  "aria-label": ariaLabel = QUESTION_TYPE_LIST_LABEL,
}: FormQuestionTypeListProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = value === undefined ? uncontrolledValue : value

  return (
    <BaseToggleGroup
      id={id}
      value={selectedValue === null ? [] : [selectedValue]}
      onValueChange={(groupValue) => {
        const [picked] = groupValue
        if (picked === undefined) return
        setUncontrolledValue(picked)
        onValueChange?.(picked)
      }}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cx("umc-form-question-type-list", className)}
    >
      {items.map((item) => (
        <BaseToggle
          key={item.value}
          value={item.value}
          className="umc-form-question-type-list__item"
        >
          <QuestionTypeTile item={item} />
        </BaseToggle>
      ))}
    </BaseToggleGroup>
  )
}
