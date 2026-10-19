"use client"

import {
  CheckboxGroup as BaseCheckboxGroup,
  RadioGroup as BaseRadioGroup,
} from "@base-ui/react"
import { useState, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { Checkbox } from "../../selection/checkbox/Checkbox.tsx"
import { Radio } from "../../selection/radio-group/RadioGroup.tsx"
import { useFormQuestion } from "../form-question/form-question-context.ts"

export type FormChoiceOption = {
  value: string
  label: ReactNode
  disabled?: boolean
}

type FormChoiceListCommonProps = {
  options: readonly FormChoiceOption[]
  name?: string
  disabled?: boolean
  readOnly?: boolean
  className?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
}

export type FormSingleChoiceListProps = FormChoiceListCommonProps & {
  type: "single"
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
}

export type FormMultipleChoiceListProps = FormChoiceListCommonProps & {
  type: "multiple"
  value?: readonly string[]
  defaultValue?: readonly string[]
  onValueChange?: (value: string[]) => void
}

export type FormChoiceListProps =
  FormSingleChoiceListProps | FormMultipleChoiceListProps

const NO_VALUES: readonly string[] = []

const flagOf = (on: boolean | undefined) => (on ? "" : undefined)

function useListState({
  disabled,
  readOnly,
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
}: FormChoiceListCommonProps) {
  const question = useFormQuestion()
  return {
    isDisabled: disabled ?? question?.disabled ?? false,
    isReadOnly: readOnly ?? question?.readOnly ?? false,
    isRequired: question?.required ?? false,
    labelledBy: labelledBy ?? question?.titleId,
    describedBy: cx(question?.descriptionId, describedBy) || undefined,
  }
}

function SingleChoiceList(props: FormSingleChoiceListProps) {
  const { options, value, defaultValue = null, onValueChange, name } = props
  const { isDisabled, isReadOnly, isRequired, labelledBy, describedBy } =
    useListState(props)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = value === undefined ? uncontrolledValue : value

  return (
    <BaseRadioGroup
      value={selectedValue}
      onValueChange={(next) => {
        const nextValue = String(next)
        setUncontrolledValue(nextValue)
        onValueChange?.(nextValue)
      }}
      name={name}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cx("umc-form-choice-list", props.className)}
      data-type="single"
      data-readonly={flagOf(isReadOnly)}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className="umc-form-choice-list__option"
          data-selected={flagOf(option.value === selectedValue)}
          data-disabled={flagOf(isDisabled || option.disabled)}
        >
          <Radio value={option.value} disabled={option.disabled} />
          <span className="umc-form-choice-list__label">{option.label}</span>
        </label>
      ))}
    </BaseRadioGroup>
  )
}

function MultipleChoiceList(props: FormMultipleChoiceListProps) {
  const {
    options,
    value,
    defaultValue = NO_VALUES,
    onValueChange,
    name,
  } = props
  const { isDisabled, isReadOnly, labelledBy, describedBy } =
    useListState(props)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValues = value === undefined ? uncontrolledValue : value

  return (
    <BaseCheckboxGroup
      value={[...selectedValues]}
      onValueChange={(next) => {
        setUncontrolledValue(next)
        onValueChange?.(next)
      }}
      disabled={isDisabled}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cx("umc-form-choice-list", props.className)}
      data-type="multiple"
      data-readonly={flagOf(isReadOnly)}
    >
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value)
        return (
          <label
            key={option.value}
            className="umc-form-choice-list__option"
            data-selected={flagOf(isSelected)}
            data-disabled={flagOf(isDisabled || option.disabled)}
          >
            <Checkbox
              value={option.value}
              name={name}
              color={isSelected ? "brand" : "neutral"}
              disabled={isDisabled || option.disabled}
              readOnly={isReadOnly}
            />
            <span className="umc-form-choice-list__label">{option.label}</span>
          </label>
        )
      })}
    </BaseCheckboxGroup>
  )
}

export function FormChoiceList(props: FormChoiceListProps) {
  return props.type === "single" ? (
    <SingleChoiceList {...props} />
  ) : (
    <MultipleChoiceList {...props} />
  )
}
