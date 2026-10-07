"use client"

import { Select as BaseUISelect } from "@base-ui/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { type ReactNode, useState } from "react"

import { LegacyCheckGlyph } from "../../internal/glyphs.tsx"
import { Field, type FieldOwnProps } from "../field/Field.tsx"
import { SearchField } from "../search-field/SearchField.tsx"

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
  variant?: "default" | "filter"
  searchable?: boolean
  searchPlaceholder?: string
  disabled?: boolean
  name?: string
  className?: string
  "aria-label"?: string
}

const ICON_SIZE = 16

const searchTextOf = <V extends string>(option: SelectOption<V>): string =>
  typeof option.label === "string" ? option.label : option.value

export function Select<V extends string = string>({
  label,
  required,
  caption,
  captionColor,
  invalid,
  errorMessage,
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "선택",
  size = "lg",
  itemSize = "sm",
  variant = "default",
  searchable,
  searchPlaceholder = "검색",
  disabled,
  name,
  className,
  "aria-label": ariaLabel,
}: SelectProps<V>) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const visibleOptions = normalizedQuery
    ? options.filter((option) =>
        searchTextOf(option).toLowerCase().includes(normalizedQuery),
      )
    : options

  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      invalid={invalid}
      errorMessage={errorMessage}
      disabled={disabled}
      nativeLabel={false}
      className={className}
    >
      <BaseUISelect.Root
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onValueChange?.(next)}
        onOpenChange={(open) => {
          if (!open) setQuery("")
        }}
        disabled={disabled}
        required={required}
        name={name}
      >
        <BaseUISelect.Trigger
          className="umc-select__trigger"
          aria-label={ariaLabel}
          data-size={size}
          data-variant={variant}
        >
          <BaseUISelect.Value
            className="umc-select__value"
            placeholder={placeholder}
          />
          <BaseUISelect.Icon className="umc-select__icon">
            <ExpandMoreIcon weight="fill" size={ICON_SIZE} />
          </BaseUISelect.Icon>
        </BaseUISelect.Trigger>
        <BaseUISelect.Portal>
          <BaseUISelect.Positioner
            className="umc-dropdown-list__positioner"
            sideOffset={4}
            alignItemWithTrigger={false}
          >
            <BaseUISelect.Popup className="umc-dropdown-list umc-select__popup">
              {searchable && (
                <SearchField
                  variant="dropdown"
                  value={query}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  onChange={(event) => setQuery(event.target.value)}
                />
              )}
              <BaseUISelect.List className="umc-select__list">
                {visibleOptions.map((option) => (
                  <BaseUISelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="umc-dropdown-item"
                    data-size={itemSize}
                  >
                    <span className="umc-dropdown-item__content">
                      <BaseUISelect.ItemText>
                        {option.label}
                      </BaseUISelect.ItemText>
                      {option.caption && (
                        <span className="umc-dropdown-item__caption">
                          {option.caption}
                        </span>
                      )}
                    </span>
                    <BaseUISelect.ItemIndicator className="umc-dropdown-item__indicator">
                      <LegacyCheckGlyph />
                    </BaseUISelect.ItemIndicator>
                  </BaseUISelect.Item>
                ))}
              </BaseUISelect.List>
            </BaseUISelect.Popup>
          </BaseUISelect.Positioner>
        </BaseUISelect.Portal>
      </BaseUISelect.Root>
    </Field>
  )
}
