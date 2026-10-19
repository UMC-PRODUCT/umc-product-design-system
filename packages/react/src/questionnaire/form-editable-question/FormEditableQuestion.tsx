"use client"

import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { useFormQuestionEditor } from "../form-question-editor/form-question-editor-context.ts"

type NativeTextInputProps = Omit<ComponentPropsWithRef<"input">, "type">

export type FormEditableQuestionProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  number?: ReactNode
  titleProps?: NativeTextInputProps
  descriptionProps?: NativeTextInputProps
  required?: boolean
  disabled?: boolean
  children: ReactNode
}

const DEFAULT_TITLE_LABEL = "질문 제목"
const DEFAULT_TITLE_PLACEHOLDER = "질문을 작성하세요"
const DEFAULT_DESCRIPTION_LABEL = "질문 설명"
const DEFAULT_DESCRIPTION_PLACEHOLDER = "설명을 적어주세요 (선택 사항)"
const REQUIRED_SUFFIX = " (필수)"

export function FormEditableQuestion({
  number,
  titleProps,
  descriptionProps,
  required,
  disabled,
  className,
  children,
  ...props
}: FormEditableQuestionProps) {
  const editor = useFormQuestionEditor()
  const isRequired = required ?? editor?.required ?? false
  const isDisabled = disabled ?? editor?.disabled ?? false

  return (
    <div
      {...props}
      className={cx("umc-form-editable-question", className)}
      data-disabled={isDisabled ? "" : undefined}
    >
      <div className="umc-form-editable-question__header">
        {number !== undefined && (
          <span className="umc-form-editable-question__number">{number}</span>
        )}
        <div className="umc-form-editable-question__fields">
          <div className="umc-form-editable-question__title-row">
            <input
              aria-label={DEFAULT_TITLE_LABEL}
              placeholder={DEFAULT_TITLE_PLACEHOLDER}
              {...titleProps}
              type="text"
              disabled={isDisabled || titleProps?.disabled}
              className={cx(
                "umc-form-editable-question__title",
                titleProps?.className,
              )}
            />
            {isRequired && (
              <>
                <span
                  className="umc-form-editable-question__required"
                  aria-hidden="true"
                >
                  *
                </span>
                <span className="umc-visually-hidden">{REQUIRED_SUFFIX}</span>
              </>
            )}
          </div>
          <input
            aria-label={DEFAULT_DESCRIPTION_LABEL}
            placeholder={DEFAULT_DESCRIPTION_PLACEHOLDER}
            {...descriptionProps}
            type="text"
            disabled={isDisabled || descriptionProps?.disabled}
            className={cx(
              "umc-form-editable-question__description",
              descriptionProps?.className,
            )}
          />
        </div>
      </div>
      <div className="umc-form-editable-question__answer">{children}</div>
    </div>
  )
}
