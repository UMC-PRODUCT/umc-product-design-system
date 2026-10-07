"use client"

import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type NavItem = {
  label: ReactNode
  href: string
}

export type HeaderProps = {
  logo: ReactNode
  navItems?: NavItem[]
  currentPath?: string
  actions?: ReactNode
  mode?: "light" | "dark"
  className?: string
}

export function Header({
  logo,
  navItems,
  currentPath,
  actions,
  mode = "light",
  className,
}: HeaderProps) {
  const Link = useLinkComponent()

  return (
    <header className={cx("umc-header", className)} data-mode={mode}>
      <div className="umc-header__logo">{logo}</div>
      {navItems && navItems.length > 0 && (
        <nav className="umc-header__nav" aria-label="메인 내비게이션">
          <ul className="umc-header__nav-list">
            {navItems.map((item) => {
              const active = isActivePath(currentPath, item.href)
              return (
                <li key={item.href} className="umc-header__nav-item">
                  <Link
                    href={item.href}
                    className="umc-header__nav-link"
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
      {actions && <div className="umc-header__actions">{actions}</div>}
    </header>
  )
}
