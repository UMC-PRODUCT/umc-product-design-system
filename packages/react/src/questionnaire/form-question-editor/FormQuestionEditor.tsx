"use client"

import { TrashIcon } from "@umc-product/icons"
import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { Checkbox } from "../../selection/checkbox/Checkbox.tsx"
import { Switch } from "../../selection/switch/Switch.tsx"
import { FormQuestionEditorContext } from "./form-question-editor-context.ts"

type DragHandleProps = Omit<
  ComponentPropsWithRef<"button">,
  "type" | "children"
>

export type FormQuestionEditorProps = Omit<
  ComponentPropsWithRef<"div">,
  "children"
> & {
  active?: boolean
  disabled?: boolean
  required?: boolean
  onRequiredChange?: (required: boolean) => void
  questionEnabled?: boolean
  onQuestionEnabledChange?: (enabled: boolean) => void
  onDelete?: () => void
  dragHandleProps?: DragHandleProps
  toolbar?: ReactNode
  requiredLabel?: ReactNode
  questionEnabledLabel?: ReactNode
  deleteLabel?: string
  dragHandleLabel?: string
  children: ReactNode
}

const DEFAULT_REQUIRED_LABEL = "필수 항목"
const DEFAULT_QUESTION_ENABLED_LABEL = "질문 사용"
const DEFAULT_DELETE_LABEL = "질문 삭제"
const DEFAULT_DRAG_HANDLE_LABEL = "질문 순서 바꾸기"

function DragHandleGlyph() {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="2" cy="2" r="2" />
      <circle cx="8" cy="2" r="2" />
      <circle cx="14" cy="2" r="2" />
      <circle cx="2" cy="8" r="2" />
      <circle cx="8" cy="8" r="2" />
      <circle cx="14" cy="8" r="2" />
    </svg>
  )
}

export function FormQuestionEditor({
  active = false,
  disabled = false,
  required = false,
  onRequiredChange,
  questionEnabled,
  onQuestionEnabledChange,
  onDelete,
  dragHandleProps,
  toolbar,
  requiredLabel = DEFAULT_REQUIRED_LABEL,
  questionEnabledLabel = DEFAULT_QUESTION_ENABLED_LABEL,
  deleteLabel = DEFAULT_DELETE_LABEL,
  dragHandleLabel = DEFAULT_DRAG_HANDLE_LABEL,
  className,
  children,
  ...props
}: FormQuestionEditorProps) {
  const showsTools = active && !disabled
  const draggable = dragHandleProps !== undefined && !disabled

  return (
    <div
      {...props}
      className={cx("umc-form-question-editor", className)}
      data-active={showsTools ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
    >
      <div className="umc-form-question-editor__card">
        <span className="umc-form-question-editor__bar" aria-hidden="true" />
        <div className="umc-form-question-editor__frame">
          <div className="umc-form-question-editor__handle-area">
            {draggable && (
              <button
                aria-label={dragHandleLabel}
                {...dragHandleProps}
                type="button"
                className={cx(
                  "umc-form-question-editor__handle",
                  dragHandleProps.className,
                )}
              >
                <DragHandleGlyph />
              </button>
            )}
          </div>
          <div className="umc-form-question-editor__body">
            <FormQuestionEditorContext.Provider value={{ required, disabled }}>
              {children}
            </FormQuestionEditorContext.Provider>
            {showsTools && (
              <div className="umc-form-question-editor__actions">
                <Checkbox
                  className="umc-form-question-editor__required"
                  color={required ? "brand" : "neutral"}
                  checked={required}
                  onCheckedChange={onRequiredChange}
                  labelPlacement="end"
                >
                  {requiredLabel}
                </Checkbox>
                {questionEnabled !== undefined && (
                  <Switch
                    className="umc-form-question-editor__switch"
                    checked={questionEnabled}
                    onCheckedChange={onQuestionEnabledChange}
                  >
                    {questionEnabledLabel}
                  </Switch>
                )}
                <button
                  type="button"
                  className="umc-form-question-editor__delete"
                  aria-label={deleteLabel}
                  onClick={() => onDelete?.()}
                >
                  <TrashIcon weight="thin" size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showsTools && toolbar !== undefined && (
        <div className="umc-form-question-editor__toolbar">{toolbar}</div>
      )}
    </div>
  )
}
