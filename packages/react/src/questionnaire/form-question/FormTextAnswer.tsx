"use client"

import {
  TextArea,
  type TextAreaProps,
} from "../../forms/text-area/TextArea.tsx"
import { cx } from "../../internal/cx.ts"
import { useFormQuestion } from "./form-question-context.ts"

export type FormTextAnswerProps = TextAreaProps

export function FormTextAnswer({
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  required,
  readOnly,
  disabled,
  ...props
}: FormTextAnswerProps) {
  const question = useFormQuestion()

  return (
    <TextArea
      {...props}
      aria-labelledby={labelledBy ?? question?.titleId}
      aria-describedby={cx(question?.descriptionId, describedBy) || undefined}
      required={required ?? question?.required}
      readOnly={readOnly ?? question?.readOnly}
      disabled={disabled ?? question?.disabled}
    />
  )
}
