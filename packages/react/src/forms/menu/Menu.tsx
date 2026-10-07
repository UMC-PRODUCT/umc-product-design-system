"use client"

import { Menu as BaseUIMenu } from "@base-ui/react"
import { type ReactElement, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type MenuItemDef = {
  label: ReactNode
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  tone?: "default" | "danger"
}

export type MenuProps = {
  trigger: ReactElement
  items: MenuItemDef[]
  className?: string
}

export function Menu({ trigger, items, className }: MenuProps) {
  return (
    <BaseUIMenu.Root>
      <BaseUIMenu.Trigger
        className={cx("umc-menu__trigger", className)}
        render={trigger}
      />
      <BaseUIMenu.Portal>
        <BaseUIMenu.Positioner sideOffset={4}>
          <BaseUIMenu.Popup className="umc-menu__popup">
            {items.map((item, index) => (
              <BaseUIMenu.Item
                key={index}
                disabled={item.disabled}
                onClick={item.onClick}
                className="umc-menu__item"
                data-tone={item.tone === "danger" ? "danger" : undefined}
              >
                {item.icon && (
                  <span className="umc-menu__item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="umc-menu__item-label">{item.label}</span>
              </BaseUIMenu.Item>
            ))}
          </BaseUIMenu.Popup>
        </BaseUIMenu.Positioner>
      </BaseUIMenu.Portal>
    </BaseUIMenu.Root>
  )
}
