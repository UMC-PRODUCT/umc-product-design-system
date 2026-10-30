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

type SelectItemLayoutProps =
  | { itemSize?: "xs" | "sm" | "md"; itemLayout?: "default" }
  | { itemSize: "xs"; itemLayout: "inline" }

export type SelectProps<V extends string = string> = FieldOwnProps &
  SelectItemLayoutProps & {
    options: SelectOption<V>[]
    value?: V | null
    defaultValue?: V | null
    onValueChange?: (value: V | null) => void
    placeholder?: ReactNode
    size?: "lg" | "md"
    variant?: "default" | "filter"
    shape?: "box" | "line"
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

type SelectItemContentProps = {
  option: Pick<SelectOption, "label" | "caption">
}

function DefaultSelectItemContent({ option }: SelectItemContentProps) {
  return (
    <>
      <span className="umc-dropdown-item__content">
        <BaseUISelect.ItemText>{option.label}</BaseUISelect.ItemText>
        {option.caption && (
          <span className="umc-dropdown-item__caption">{option.caption}</span>
        )}
      </span>
      <BaseUISelect.ItemIndicator className="umc-dropdown-item__indicator">
        <LegacyCheckGlyph />
      </BaseUISelect.ItemIndicator>
    </>
  )
}

function InlineSelectItemContent({ option }: SelectItemContentProps) {
  return (
    <>
      <span className="umc-dropdown-item__content">
        <BaseUISelect.ItemIndicator className="umc-dropdown-item__indicator">
          <LegacyCheckGlyph />
        </BaseUISelect.ItemIndicator>
        <BaseUISelect.ItemText>{option.label}</BaseUISelect.ItemText>
      </span>
      {option.caption && (
        <span className="umc-dropdown-item__caption">{option.caption}</span>
      )}
    </>
  )
}

export function Select<V extends string = string>({
  label,
  required,
  caption,
  captionColor,
  captionSize,
  invalid,
  errorMessage,
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "선택",
  size = "lg",
  itemSize = "sm",
  itemLayout = "default",
  variant = "default",
  shape = "box",
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
  const ItemContent =
    itemLayout === "inline" ? InlineSelectItemContent : DefaultSelectItemContent

  return (
    <Field
      label={label}
      required={required}
      caption={caption}
      captionColor={captionColor}
      captionSize={captionSize}
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
          data-shape={shape}
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
                    data-layout={itemLayout}
                  >
                    <ItemContent option={option} />
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
