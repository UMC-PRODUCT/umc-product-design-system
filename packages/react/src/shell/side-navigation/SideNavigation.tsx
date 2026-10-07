"use client"

import { Collapsible } from "@base-ui/react"
import { useId, useState, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type SideNavigationLeaf = {
  label: ReactNode
  href: string
}

export type SideNavigationLink = SideNavigationLeaf & {
  icon?: ReactNode
}

export type SideNavigationGroup = {
  label: ReactNode
  icon?: ReactNode
  children: SideNavigationLeaf[]
}

export type SideNavigationItem = SideNavigationLink | SideNavigationGroup

export type SideNavigationProps = {
  items: SideNavigationItem[]
  currentPath?: string
  title?: ReactNode
  slot?: ReactNode
  className?: string
  "aria-label"?: string
}

const isGroup = (item: SideNavigationItem): item is SideNavigationGroup =>
  "children" in item

const findActiveHref = (
  items: SideNavigationItem[],
  currentPath: string | undefined,
): string | undefined =>
  items
    .flatMap((item) =>
      isGroup(item) ? item.children.map((child) => child.href) : [item.href],
    )
    .filter((href) => isActivePath(currentPath, href))
    .sort((a, b) => b.length - a.length)[0]

const groupHasHref = (
  group: SideNavigationGroup,
  href: string | undefined,
): boolean => group.children.some((child) => child.href === href)

const groupKeysWithHref = (
  items: SideNavigationItem[],
  href: string | undefined,
): string[] =>
  items.flatMap((item, index) =>
    isGroup(item) && groupHasHref(item, href) ? [String(index)] : [],
  )

function ItemInner({
  icon,
  label,
  selected,
}: {
  icon?: ReactNode
  label: ReactNode
  selected: boolean
}) {
  return (
    <span
      className="umc-side-navigation__item-inner"
      data-selected={selected ? "" : undefined}
    >
      {icon && (
        <span className="umc-side-navigation__item-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="umc-side-navigation__item-label">{label}</span>
    </span>
  )
}

function LinkItem({
  link,
  activeHref,
}: {
  link: SideNavigationLink
  activeHref: string | undefined
}) {
  const Link = useLinkComponent()
  const active = link.href === activeHref
  return (
    <Link
      href={link.href}
      className="umc-side-navigation__item-link"
      aria-current={active ? "page" : undefined}
    >
      <ItemInner icon={link.icon} label={link.label} selected={active} />
    </Link>
  )
}

function GroupItem({
  group,
  activeHref,
  open,
  onOpenChange,
}: {
  group: SideNavigationGroup
  activeHref: string | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const Link = useLinkComponent()
  return (
    <Collapsible.Root open={open} onOpenChange={onOpenChange}>
      <Collapsible.Trigger className="umc-side-navigation__group-trigger">
        <ItemInner
          icon={group.icon}
          label={group.label}
          selected={groupHasHref(group, activeHref)}
        />
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <ul className="umc-side-navigation__submenu">
          {group.children.map((child) => {
            const active = child.href === activeHref
            return (
              <li key={child.href} className="umc-side-navigation__subitem">
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
  )
}

export function SideNavigation({
  items,
  currentPath,
  title,
  slot,
  className,
  "aria-label": ariaLabel = "사이드 내비게이션",
}: SideNavigationProps) {
  const titleId = useId()
  const activeHref = findActiveHref(items, currentPath)
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(
    () => new Set(groupKeysWithHref(items, activeHref)),
  )
  const [syncedHref, setSyncedHref] = useState(activeHref)

  if (syncedHref !== activeHref) {
    setSyncedHref(activeHref)
    setOpenGroups(
      (prev) => new Set([...prev, ...groupKeysWithHref(items, activeHref)]),
    )
  }

  const setGroupOpen = (key: string, open: boolean) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (open) {
        next.add(key)
      } else {
        next.delete(key)
      }
      return next
    })
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
          {items.map((item, index) => {
            const key = String(index)
            return (
              <li key={key} className="umc-side-navigation__item">
                {isGroup(item) ? (
                  <GroupItem
                    group={item}
                    activeHref={activeHref}
                    open={openGroups.has(key)}
                    onOpenChange={(open) => setGroupOpen(key, open)}
                  />
                ) : (
                  <LinkItem link={item} activeHref={activeHref} />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
