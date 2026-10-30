"use client"

import { Menu as BaseUIMenu } from "@base-ui/react"
import type { ReactElement, ReactNode } from "react"

export type MenuItemDef = {
  label: ReactNode
  caption?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

type MenuLayoutProps =
  | { size?: "xs" | "sm" | "md"; layout?: "default" }
  | { size: "xs"; layout: "inline" }

export type MenuProps = MenuLayoutProps & {
  trigger: ReactElement
  items: MenuItemDef[]
  title?: ReactNode
  className?: string
}

type MenuItemContentProps = {
  item: Pick<MenuItemDef, "label" | "caption">
}

function DefaultMenuItemContent({ item }: MenuItemContentProps) {
  return (
    <span className="umc-dropdown-item__content">
      {item.label}
      {item.caption && (
        <span className="umc-dropdown-item__caption">{item.caption}</span>
      )}
    </span>
  )
}

function InlineMenuItemContent({ item }: MenuItemContentProps) {
  return (
    <>
      <span className="umc-dropdown-item__content">{item.label}</span>
      {item.caption && (
        <span className="umc-dropdown-item__caption">{item.caption}</span>
      )}
    </>
  )
}

export function Menu({
  trigger,
  items,
  title,
  size = "sm",
  layout = "default",
  className,
}: MenuProps) {
  const ItemContent =
    layout === "inline" ? InlineMenuItemContent : DefaultMenuItemContent
  const menuItems = items.map((item, index) => (
    <BaseUIMenu.Item
      key={index}
      disabled={item.disabled}
      onClick={item.onClick}
      className="umc-dropdown-item"
      data-size={size}
      data-layout={layout}
    >
      <ItemContent item={item} />
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
