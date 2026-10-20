"use client"

import { useId, type ComponentPropsWithRef, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import {
  SectionHeader,
  type SectionHeaderLevel,
} from "../../shell/section-header/SectionHeader.tsx"
import { FormQuestionContext } from "./form-question-context.ts"

export type FormQuestionProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  title: ReactNode
  number?: ReactNode
  required?: boolean
  description?: ReactNode
  readOnly?: boolean
  disabled?: boolean
  level?: SectionHeaderLevel
  children: ReactNode
}

export function FormQuestion({
  title,
  number,
  required = false,
  description,
  readOnly = false,
  disabled = false,
  level = 3,
  className,
  children,
  ...props
}: FormQuestionProps) {
  const titleId = useId()
  const descriptionId = useId()
  const hasDescription = description !== undefined

  return (
    <div
      {...props}
      className={cx("umc-form-question", className)}
      data-readonly={readOnly ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      <SectionHeader
        size="md"
        level={level}
        number={number}
        required={required}
        title={<span id={titleId}>{title}</span>}
        description={
          hasDescription ? (
            <span id={descriptionId}>{description}</span>
          ) : undefined
        }
      />
      <div className="umc-form-question__answer">
        <FormQuestionContext.Provider
          value={{
            titleId,
            descriptionId: hasDescription ? descriptionId : undefined,
            required,
            readOnly,
            disabled,
          }}
        >
          {children}
        </FormQuestionContext.Provider>
      </div>
    </div>
  )
}
