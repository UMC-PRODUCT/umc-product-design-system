"use client"

import { AddIcon, CloseIcon } from "@umc-product/icons"
import { useEffect, useRef, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { useFormQuestionEditor } from "../form-question-editor/form-question-editor-context.ts"

export type FormChoiceDraftOption = {
  id: string
  label: string
}

export type FormChoiceListEditorProps = {
  type: "single" | "multiple"
  options: readonly FormChoiceDraftOption[]
  onOptionChange?: (id: string, label: string) => void
  onOptionAdd?: () => void
  onOptionRemove?: (id: string) => void
  placeholder?: string
  addLabel?: ReactNode
  optionLabel?: string
  removeLabel?: string
  disabled?: boolean
  className?: string
}

const DEFAULT_PLACEHOLDERS: Readonly<
  Record<FormChoiceListEditorProps["type"], string>
> = {
  single: "단일 선택 옵션을 작성하세요",
  multiple: "복수 선택 옵션을 작성하세요",
}
const DEFAULT_ADD_LABEL = "옵션 추가"
const DEFAULT_OPTION_LABEL = "보기"
const DEFAULT_REMOVE_LABEL = "삭제"
const INPUT_SELECTOR = ".umc-form-choice-list-editor__input"
const ADD_SELECTOR = ".umc-form-choice-list-editor__add"

export function FormChoiceListEditor({
  type,
  options,
  onOptionChange,
  onOptionAdd,
  onOptionRemove,
  placeholder = DEFAULT_PLACEHOLDERS[type],
  addLabel = DEFAULT_ADD_LABEL,
  optionLabel = DEFAULT_OPTION_LABEL,
  removeLabel = DEFAULT_REMOVE_LABEL,
  disabled,
  className,
}: FormChoiceListEditorProps) {
  const editor = useFormQuestionEditor()
  const lockedByEditor = editor?.disabled ?? false
  const isDisabled = lockedByEditor || (disabled ?? false)
  const editable = !isDisabled
  const listRef = useRef<HTMLUListElement>(null)
  const focusNewOption = useRef(false)
  const previousCount = useRef(options.length)

  useEffect(() => {
    if (focusNewOption.current && options.length > previousCount.current) {
      const inputs =
        listRef.current?.querySelectorAll<HTMLInputElement>(INPUT_SELECTOR)
      inputs?.[inputs.length - 1]?.focus()
    }
    focusNewOption.current = false
    previousCount.current = options.length
  })

  const focusNeighborOf = (index: number) => {
    const list = listRef.current
    const inputs = list?.querySelectorAll<HTMLInputElement>(INPUT_SELECTOR)
    const neighbor =
      inputs?.[index + 1] ??
      inputs?.[index - 1] ??
      list?.querySelector<HTMLButtonElement>(ADD_SELECTOR)
    neighbor?.focus()
  }

  return (
    <ul
      ref={listRef}
      className={cx("umc-form-choice-list-editor", className)}
      data-type={type}
      data-disabled={isDisabled ? "" : undefined}
    >
      {options.map((option, index) => {
        const name = `${optionLabel} ${index + 1}`
        return (
          <li key={option.id} className="umc-form-choice-list-editor__option">
            <span
              className="umc-form-choice-list-editor__indicator"
              aria-hidden="true"
            />
            <input
              type="text"
              className="umc-form-choice-list-editor__input"
              value={option.label}
              placeholder={placeholder}
              aria-label={name}
              disabled={isDisabled}
              readOnly={onOptionChange === undefined}
              onChange={(event) =>
                onOptionChange?.(option.id, event.target.value)
              }
            />
            {editable && onOptionRemove !== undefined && (
              <button
                type="button"
                className="umc-form-choice-list-editor__remove"
                aria-label={`${name} ${removeLabel}`}
                onClick={() => {
                  focusNeighborOf(index)
                  onOptionRemove(option.id)
                }}
              >
                <CloseIcon weight="fill" size={14} />
              </button>
            )}
          </li>
        )
      })}
      {editable && onOptionAdd !== undefined && (
        <li className="umc-form-choice-list-editor__option">
          <button
            type="button"
            className="umc-form-choice-list-editor__add"
            onClick={() => {
              focusNewOption.current = true
              onOptionAdd()
            }}
          >
            <span
              className="umc-form-choice-list-editor__indicator"
              data-muted=""
              aria-hidden="true"
            />
            <span className="umc-form-choice-list-editor__add-label">
              <AddIcon weight="fill" size={14} />
              {addLabel}
            </span>
          </button>
        </li>
      )}
    </ul>
  )
}
