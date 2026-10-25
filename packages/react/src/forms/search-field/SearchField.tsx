"use client"

import { RemoveCircleIcon, SearchIcon } from "@umc-product/icons"
import { type ComponentPropsWithRef, useRef } from "react"

import { cx } from "../../internal/cx.ts"
import { mergeRefs } from "../../internal/merge-refs.ts"
import {
  clearInputValue,
  useInputFilled,
} from "../text-field-box-field/input-value.ts"

export type SearchFieldProps = Omit<
  ComponentPropsWithRef<"input">,
  "size" | "type"
> & {
  variant?: "default" | "dropdown"
  clearable?: boolean
}

const SEARCH_LABEL = "검색"
const CLEAR_LABEL = "검색어 지우기"

export function SearchField({
  variant = "default",
  clearable = true,
  disabled,
  readOnly,
  className,
  onChange,
  ref,
  "aria-label": ariaLabel = SEARCH_LABEL,
  ...inputProps
}: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filled, trackFilled] = useInputFilled(
    inputProps.value,
    inputProps.defaultValue,
  )
  const showClear = clearable && filled && !disabled && !readOnly

  return (
    <div
      className={cx("umc-search-field", className)}
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
    >
      <SearchIcon className="umc-search-field__icon" size={24} />
      <input
        {...inputProps}
        ref={mergeRefs(inputRef, ref)}
        type="search"
        aria-label={ariaLabel}
        disabled={disabled}
        readOnly={readOnly}
        className="umc-search-field__input"
        onChange={(event) => {
          trackFilled(event)
          onChange?.(event)
        }}
      />
      {showClear && (
        <button
          type="button"
          className="umc-search-field__clear"
          aria-label={CLEAR_LABEL}
          tabIndex={-1}
          onClick={() => clearInputValue(inputRef.current)}
        >
          <RemoveCircleIcon weight="fill" size={24} />
        </button>
      )}
    </div>
  )
}
