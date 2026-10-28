"use client"

import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { HeaderHomeLink } from "../header-home-link/HeaderHomeLink.tsx"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"
import type { NavItem } from "../nav-item/nav-item.ts"

export type HeaderDesktopProps = {
  logo?: ReactNode
  navItems?: NavItem[]
  currentPath?: string
  actions?: ReactNode
  mode?: "light" | "dark"
  className?: string
}

export function HeaderDesktop({
  logo = <HeaderHomeLink />,
  navItems,
  currentPath,
  actions,
  mode = "light",
  className,
}: HeaderDesktopProps) {
  const Link = useLinkComponent()

  return (
    <header className={cx("umc-header-desktop", className)} data-mode={mode}>
      <div className="umc-header-desktop__logo">{logo}</div>
      {navItems && navItems.length > 0 && (
        <nav className="umc-header-desktop__nav" aria-label="메인 내비게이션">
          <ul className="umc-header-desktop__nav-list">
            {navItems.map((item) => {
              const active = isActivePath(currentPath, item.href)
              return (
                <li key={item.href} className="umc-header-desktop__nav-item">
                  <Link
                    href={item.href}
                    className="umc-header-desktop__nav-link"
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
      {actions && <div className="umc-header-desktop__actions">{actions}</div>}
    </header>
  )
}
