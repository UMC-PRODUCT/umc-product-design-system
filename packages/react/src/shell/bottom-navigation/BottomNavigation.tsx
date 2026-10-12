"use client"

import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type BottomNavigationItemProps = {
  href: string
  label: string
  icon: ReactNode
  currentPath?: string
  className?: string
} & Omit<ComponentPropsWithRef<"a">, "href" | "children" | "aria-current">

export type BottomNavigationProps = {
  children: ReactNode
  className?: string
}

export function BottomNavigationItem({
  href,
  label,
  icon,
  currentPath,
  className,
  ...props
}: BottomNavigationItemProps) {
  const Link = useLinkComponent()
  const isActive = isActivePath(currentPath, href)

  return (
    <Link
      {...props}
      href={href}
      className={cx("umc-bottom-navigation__item", className)}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="umc-bottom-navigation__item-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="umc-bottom-navigation__item-label">{label}</span>
    </Link>
  )
}

export function BottomNavigation({
  children,
  className,
}: BottomNavigationProps) {
  return (
    <nav
      className={cx("umc-bottom-navigation", className)}
      aria-label="하단 탐색"
    >
      <div className="umc-bottom-navigation__bar">{children}</div>
    </nav>
  )
}
