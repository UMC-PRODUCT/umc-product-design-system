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
  title?: ReactNode
  size?: "xs" | "sm" | "md"
  className?: string
}

export function Menu({
  trigger,
  items,
  title,
  size = "sm",
  className,
}: MenuProps) {
  const menuItems = items.map((item, index) => (
    <BaseUIMenu.Item
      key={index}
      disabled={item.disabled}
      onClick={item.onClick}
      className="umc-dropdown-item"
      data-size={size}
    >
      {item.label}
    </BaseUIMenu.Item>
  ))

  return (
    <BaseUIMenu.Root>
      <BaseUIMenu.Trigger className={className} render={trigger} />
      <BaseUIMenu.Portal>
        <BaseUIMenu.Positioner
          className="umc-dropdown-list__positioner"
          sideOffset={4}
          align="start"
        >
          <BaseUIMenu.Popup
            className="umc-dropdown-list umc-menu"
            data-size={size}
          >
            {title === undefined ? (
              menuItems
            ) : (
              <BaseUIMenu.Group>
                <BaseUIMenu.GroupLabel className="umc-menu__title">
                  {title}
                </BaseUIMenu.GroupLabel>
                {menuItems}
              </BaseUIMenu.Group>
            )}
          </BaseUIMenu.Popup>
        </BaseUIMenu.Positioner>
      </BaseUIMenu.Portal>
    </BaseUIMenu.Root>
  )
}
