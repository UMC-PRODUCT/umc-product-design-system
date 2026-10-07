"use client"

import { Field as BaseUIField, Select as BaseUISelect } from "@base-ui/react"
import { ExpandLessIcon, ExpandMoreIcon, SearchIcon } from "@umc-product/icons"
import { type ReactNode, useState } from "react"

import { cx } from "../../internal/cx.ts"
import { type FieldOwnProps } from "../field/Field.tsx"

export type SelectOption<V extends string = string> = {
  value: V
  label: ReactNode
  caption?: ReactNode
  disabled?: boolean
}

export type SelectProps<V extends string = string> = FieldOwnProps & {
  options: SelectOption<V>[]
  value?: V | null
  defaultValue?: V | null
  onValueChange?: (value: V | null) => void
  placeholder?: ReactNode
  size?: "lg" | "md"
  itemSize?: "xs" | "sm" | "md"
  searchable?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  name?: string
  className?: string
}

export function Select<V extends string = string>({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택",
  size = "lg",
  itemSize = "sm",
  searchable,
  searchPlaceholder = "검색",
  disabled,
  name,
  className,
}: SelectProps<V>) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOptions = searchable
    ? options.filter((opt) => {
        const labelStr =
          typeof opt.label === "string" ? opt.label : String(opt.label)
        return labelStr.toLowerCase().includes(searchQuery.toLowerCase())
      })
    : options

  const showError = invalid && errorMessage

  return (
    <BaseUIField.Root
      invalid={invalid}
      disabled={disabled}
      className={cx("umc-field", className)}
    >
      {label && (
        <BaseUIField.Label className="umc-field__label" nativeLabel={false}>
          {label}
          {required && (
            <span aria-hidden="true" className="umc-field__required">
              {" "}
              *
            </span>
          )}
        </BaseUIField.Label>
      )}
      <BaseUISelect.Root
        value={value}
        defaultValue={defaultValue ?? null}
        onValueChange={(v) => {
          if (v === null) {
            onValueChange?.(null)
            return
          }
          const matched = options.find((opt) => String(opt.value) === String(v))
          if (matched) onValueChange?.(matched.value)
        }}
        disabled={disabled}
        name={name}
      >
        <BaseUISelect.Trigger
          className={cx("umc-input-box", "umc-select__trigger")}
          data-size={size}
          data-invalid={invalid ? "" : undefined}
        >
          <BaseUISelect.Value
            className="umc-input-box__input umc-select__value"
            placeholder={placeholder}
          />
          <BaseUISelect.Icon
            className="umc-input-box__accessory umc-select__icon"
            render={(props, state) => (
              <span {...props}>
                {state.open ? (
                  <ExpandLessIcon size={16} aria-hidden="true" />
                ) : (
                  <ExpandMoreIcon size={16} aria-hidden="true" />
                )}
              </span>
            )}
          />
        </BaseUISelect.Trigger>
        <BaseUISelect.Portal>
          <BaseUISelect.Positioner sideOffset={4}>
            <BaseUISelect.Popup
              className="umc-select__popup"
              data-item-size={itemSize}
            >
              {searchable && (
                <div className="umc-select__search">
                  <SearchIcon size={16} aria-hidden="true" />
                  <input
                    className="umc-select__search-input"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
              <BaseUISelect.List className="umc-select__list">
                {filteredOptions.map((opt) => (
                  <BaseUISelect.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="umc-select__item"
                  >
                    <span className="umc-select__item-content">
                      <BaseUISelect.ItemText className="umc-select__item-label">
                        {opt.label}
                      </BaseUISelect.ItemText>
                      {opt.caption && (
                        <span className="umc-select__item-caption">
                          {opt.caption}
                        </span>
                      )}
                    </span>
                    <BaseUISelect.ItemIndicator className="umc-select__item-indicator" />
                  </BaseUISelect.Item>
                ))}
              </BaseUISelect.List>
            </BaseUISelect.Popup>
          </BaseUISelect.Positioner>
        </BaseUISelect.Portal>
      </BaseUISelect.Root>
      {showError ? (
        <BaseUIField.Error
          match={true}
          render={
            <span className="umc-field__caption umc-field__caption--error" />
          }
        >
          {errorMessage}
        </BaseUIField.Error>
      ) : caption ? (
        <BaseUIField.Description
          render={
            <span
              className={cx(
                "umc-field__caption",
                invalid && "umc-field__caption--error",
                captionColor === "primary" && "umc-field__caption--primary",
              )}
            />
          }
        >
          {caption}
        </BaseUIField.Description>
      ) : null}
    </BaseUIField.Root>
  )
}
