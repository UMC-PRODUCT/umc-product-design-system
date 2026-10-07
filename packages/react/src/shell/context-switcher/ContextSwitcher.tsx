"use client"

import { Menu } from "@base-ui/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type ContextSwitcherOption<V extends string = string> = {
  value: V
  label: ReactNode
  caption?: ReactNode
}

export type ContextSwitcherProps<V extends string = string> = {
  options: ContextSwitcherOption<V>[]
  value: V
  onValueChange: (value: V) => void
  className?: string
}

export function ContextSwitcher<V extends string = string>({
  options,
  value,
  onValueChange,
  className,
}: ContextSwitcherProps<V>) {
  const currentOption = options.find((opt) => opt.value === value)

  return (
    <Menu.Root>
      <Menu.Trigger className={cx("umc-context-switcher", className)}>
        <span className="umc-context-switcher__current">
          {currentOption?.label}
        </span>
        {currentOption?.caption && (
          <span className="umc-context-switcher__caption">
            {currentOption.caption}
          </span>
        )}
        <ExpandMoreIcon
          className="umc-context-switcher__chevron"
          size={16}
          aria-hidden={true}
        />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className="umc-context-switcher__positioner"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          <Menu.Popup className="umc-context-switcher__popup">
            <Menu.RadioGroup
              value={value}
              onValueChange={(next) => {
                const matched = options.find((opt) => opt.value === next)
                if (matched) onValueChange(matched.value)
              }}
            >
              {options.map((opt) => (
                <Menu.RadioItem
                  key={opt.value}
                  value={opt.value}
                  className="umc-context-switcher__option"
                >
                  <Menu.RadioItemIndicator className="umc-context-switcher__option-indicator" />
                  <span className="umc-context-switcher__option-label">
                    {opt.label}
                  </span>
                  {opt.caption && (
                    <span className="umc-context-switcher__option-caption">
                      {opt.caption}
                    </span>
                  )}
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
