"use client"

import { Field as BaseUIField } from "@base-ui/react"
import { RemoveCircleIcon, SearchIcon } from "@umc-product/icons"
import {
  type ComponentPropsWithRef,
  type MutableRefObject,
  useRef,
} from "react"

import { cx } from "../../internal/cx.ts"

export type SearchFieldProps = Omit<
  ComponentPropsWithRef<"input">,
  "size" | "type"
> & {
  size?: "lg" | "md"
  clearable?: boolean
  placeholder?: string
  className?: string
}

const CLEAR_LABEL = "검색어 지우기"

export function SearchField({
  size = "lg",
  clearable = true,
  disabled,
  className,
  onChange,
  ref: externalRef,
  ...inputProps
}: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = Boolean(inputProps.value || inputProps.defaultValue)
  const showClear = clearable && hasValue && !disabled

  const handleClear = () => {
    const input = inputRef.current
    if (!input) return
    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set
    nativeSetter?.call(input, "")
    input.dispatchEvent(new Event("input", { bubbles: true }))
  }

  const mergedRef = (el: HTMLInputElement | null) => {
    ;(inputRef as MutableRefObject<HTMLInputElement | null>).current = el
    if (typeof externalRef === "function") externalRef(el)
    else if (externalRef)
      (externalRef as MutableRefObject<HTMLInputElement | null>).current = el
  }

  return (
    <BaseUIField.Root
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      <div
        className="umc-input-box umc-search-field"
        data-size={size}
        data-disabled={disabled ? "" : undefined}
      >
        <BaseUIField.Control
          {...inputProps}
          ref={mergedRef}
          type="search"
          disabled={disabled}
          onChange={onChange}
          render={<input className="umc-input-box__input" />}
        />
        {showClear ? (
          <button
            type="button"
            aria-label={CLEAR_LABEL}
            className="umc-input-box__icon-btn"
            tabIndex={-1}
            onClick={handleClear}
          >
            <RemoveCircleIcon size={24} aria-hidden="true" />
          </button>
        ) : (
          <span className="umc-input-box__accessory umc-search-field__icon">
            <SearchIcon size={24} aria-hidden="true" />
          </span>
        )}
      </div>
    </BaseUIField.Root>
  )
}
