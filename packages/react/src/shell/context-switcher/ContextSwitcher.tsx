"use client"

import { Menu } from "@base-ui/react"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import {
  LegacyCheckGlyph,
  LegacyExpandMoreGlyph,
} from "../../internal/glyphs.tsx"

export type ContextSwitcherOption<V extends string = string> = {
  value: V
  label: ReactNode
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
  const currentOption = options.find((option) => option.value === value)

  return (
    <Menu.Root>
      <Menu.Trigger className={cx("umc-context-switcher", className)}>
        <span className="umc-context-switcher__label">
          {currentOption?.label}
        </span>
        <LegacyExpandMoreGlyph className="umc-context-switcher__icon" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className="umc-context-switcher__positioner"
          side="bottom"
          align="start"
        >
          <Menu.Popup className="umc-context-switcher__popup">
            <Menu.RadioGroup
              value={value}
              onValueChange={(next) => {
                const matched = options.find((option) => option.value === next)
                if (matched) onValueChange(matched.value)
              }}
            >
              {options.map((option) => (
                <Menu.RadioItem
                  key={option.value}
                  value={option.value}
                  className="umc-context-switcher__option"
                >
                  <span className="umc-context-switcher__option-label">
                    {option.label}
                  </span>
                  <Menu.RadioItemIndicator className="umc-context-switcher__option-indicator">
                    <LegacyCheckGlyph />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
