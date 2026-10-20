"use client"

import { Toolbar as BaseToolbar } from "@base-ui/react"
import { AddIcon, CloseIcon } from "@umc-product/icons"
import { useEffect, useId, useRef, useState } from "react"

import { FloatingActionButton } from "../../floating-action-button/FloatingActionButton.tsx"
import { cx } from "../../internal/cx.ts"
import {
  QUESTION_TYPE_LIST_LABEL,
  QuestionTypeTile,
  type FormQuestionTypeOption,
} from "../form-question-type-list/FormQuestionTypeList.tsx"

export type FormQuestionToolbarProps = {
  items: readonly FormQuestionTypeOption[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onTypeSelect?: (value: string) => void
  openLabel?: string
  closeLabel?: string
  disabled?: boolean
  className?: string
}

const DEFAULT_OPEN_LABEL = "질문 추가"
const DEFAULT_CLOSE_LABEL = "질문 유형 닫기"

export function FormQuestionToolbar({
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  onTypeSelect,
  openLabel = DEFAULT_OPEN_LABEL,
  closeLabel = DEFAULT_CLOSE_LABEL,
  disabled,
  className,
}: FormQuestionToolbarProps) {
  const menuId = useId()
  const menuRef = useRef<HTMLDivElement>(null)
  const focusMenuOnOpen = useRef(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen

  useEffect(() => {
    if (!isOpen || !focusMenuOnOpen.current) return
    focusMenuOnOpen.current = false
    const frame = requestAnimationFrame(() =>
      menuRef.current?.querySelector("button")?.focus(),
    )
    return () => cancelAnimationFrame(frame)
  }, [isOpen])

  const toggleOpen = () => {
    focusMenuOnOpen.current = !isOpen
    setUncontrolledOpen(!isOpen)
    onOpenChange?.(!isOpen)
  }

  return (
    <div
      className={cx("umc-form-question-toolbar", className)}
      data-open={isOpen ? "" : undefined}
    >
      {isOpen && (
        <BaseToolbar.Root
          ref={menuRef}
          id={menuId}
          aria-label={QUESTION_TYPE_LIST_LABEL}
          disabled={disabled}
          className="umc-form-question-type-list"
        >
          {items.map((item) => (
            <BaseToolbar.Button
              key={item.value}
              className="umc-form-question-type-list__item"
              onClick={() => onTypeSelect?.(item.value)}
            >
              <QuestionTypeTile item={item} />
            </BaseToolbar.Button>
          ))}
        </BaseToolbar.Root>
      )}
      <FloatingActionButton
        icon={isOpen ? <CloseIcon weight="fill" /> : <AddIcon weight="fill" />}
        aria-label={isOpen ? closeLabel : openLabel}
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        disabled={disabled}
        onClick={toggleOpen}
      />
    </div>
  )
}
