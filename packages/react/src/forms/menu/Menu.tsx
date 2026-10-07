"use client"

import { Menu as BaseUIMenu } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

export type MenuItemDef = {
  label: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export type MenuProps = {
  trigger: ReactElement
  items: MenuItemDef[]
  size?: "xs" | "sm" | "md"
  className?: string
}

export function Menu({ trigger, items, size = "sm", className }: MenuProps) {
  return (
    <BaseUIMenu.Root>
      <BaseUIMenu.Trigger className={className} render={trigger} />
      <BaseUIMenu.Portal>
        <BaseUIMenu.Positioner
          className="umc-dropdown-list__positioner"
          sideOffset={4}
          align="start"
        >
          <BaseUIMenu.Popup className="umc-dropdown-list">
            {items.map((item, index) => (
              <BaseUIMenu.Item
                key={index}
                disabled={item.disabled}
                onClick={item.onClick}
                className="umc-dropdown-item"
                data-size={size}
              >
                {item.label}
              </BaseUIMenu.Item>
            ))}
          </BaseUIMenu.Popup>
        </BaseUIMenu.Positioner>
      </BaseUIMenu.Portal>
    </BaseUIMenu.Root>
  )
}
