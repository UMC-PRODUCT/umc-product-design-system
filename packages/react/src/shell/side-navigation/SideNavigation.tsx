"use client"

import { Collapsible } from "@base-ui/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { useId, useState, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type SideNavigationLeaf = {
  label: ReactNode
  href: string
}

export type SideNavigationItem = {
  label: ReactNode
  href?: string
  icon?: ReactNode
  children?: SideNavigationLeaf[]
}

export type SideNavigationProps = {
  title?: ReactNode
  items: SideNavigationItem[]
  currentPath?: string
  slot?: ReactNode
  className?: string
  "aria-label"?: string
}

function groupContainsCurrentPath(
  item: SideNavigationItem,
  currentPath: string | undefined,
): boolean {
  if (!currentPath || !item.children) return false
  return item.children.some((child) => isActivePath(currentPath, child.href))
}

export function SideNavigation({
  title,
  items,
  currentPath,
  slot,
  className,
  "aria-label": ariaLabel = "사이드 내비게이션",
}: SideNavigationProps) {
  const Link = useLinkComponent()
  const titleId = useId()

  const initialOpen = items.reduce<Record<string, boolean>>((acc, item, i) => {
    const key = String(i)
    acc[key] = item.children
      ? groupContainsCurrentPath(item, currentPath)
      : false
    return acc
  }, {})

  const [openStates, setOpenStates] = useState(initialOpen)

  const toggleGroup = (key: string, open: boolean) => {
    setOpenStates((prev) => ({ ...prev, [key]: open }))
  }

  return (
    <nav
      className={cx("umc-side-navigation", className)}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : undefined}
    >
      {slot && <div className="umc-side-navigation__slot">{slot}</div>}
      <div className="umc-side-navigation__container">
        {title && (
          <div className="umc-side-navigation__title-container">
            <span id={titleId} className="umc-side-navigation__title">
              {title}
            </span>
          </div>
        )}
        <ul className="umc-side-navigation__menu">
          {items.map((item, i) => {
            const key = String(i)

            if (item.children && item.children.length > 0) {
              const isGroupOpen = openStates[key] ?? false
              return (
                <li key={key} className="umc-side-navigation__item">
                  <Collapsible.Root
                    open={isGroupOpen}
                    onOpenChange={(open) => toggleGroup(key, open)}
                  >
                    <Collapsible.Trigger className="umc-side-navigation__group-trigger">
                      <span
                        className="umc-side-navigation__item-inner"
                        data-selected={
                          groupContainsCurrentPath(item, currentPath)
                            ? ""
                            : undefined
                        }
                      >
                        {item.icon && (
                          <span
                            className="umc-side-navigation__item-icon"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                        )}
                        <span className="umc-side-navigation__item-label">
                          {item.label}
                        </span>
                        <ExpandMoreIcon
                          className="umc-side-navigation__chevron"
                          size={16}
                          aria-hidden={true}
                        />
                      </span>
                    </Collapsible.Trigger>
                    <Collapsible.Panel>
                      <ul className="umc-side-navigation__submenu">
                        {item.children.map((child) => {
                          const active = isActivePath(currentPath, child.href)
                          return (
                            <li
                              key={child.href}
                              className="umc-side-navigation__subitem"
                            >
                              <Link
                                href={child.href}
                                className="umc-side-navigation__subitem-link"
                                aria-current={active ? "page" : undefined}
                              >
                                <span
                                  className="umc-side-navigation__subitem-bullet"
                                  aria-hidden="true"
                                />
                                <span className="umc-side-navigation__subitem-label">
                                  {child.label}
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </Collapsible.Panel>
                  </Collapsible.Root>
                </li>
              )
            }

            const active = item.href
              ? isActivePath(currentPath, item.href)
              : false
            return (
              <li key={key} className="umc-side-navigation__item">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="umc-side-navigation__item-link"
                    aria-current={active ? "page" : undefined}
                  >
                    <span
                      className="umc-side-navigation__item-inner"
                      data-selected={active ? "" : undefined}
                    >
                      {item.icon && (
                        <span
                          className="umc-side-navigation__item-icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="umc-side-navigation__item-label">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div className="umc-side-navigation__item-link">
                    <span className="umc-side-navigation__item-inner">
                      {item.icon && (
                        <span
                          className="umc-side-navigation__item-icon"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="umc-side-navigation__item-label">
                        {item.label}
                      </span>
                    </span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
