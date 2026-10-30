"use client"

import { CloseIcon, MenuIcon } from "@umc-product/icons"
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import { cx } from "../../internal/cx.ts"
import { HeaderHomeLink } from "../header-home-link/HeaderHomeLink.tsx"
import { isActivePath } from "../is-active-path/isActivePath.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"
import type { NavItem } from "../nav-item/nav-item.ts"

export type HeaderMobileProps = {
  logo?: ReactNode
  navItems?: NavItem[]
  currentPath?: string
  actions?: ReactNode
  mode?: "light" | "dark"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openLabel?: string
  closeLabel?: string
  className?: string
}

const DEFAULT_OPEN_LABEL = "메뉴 열기"
const DEFAULT_CLOSE_LABEL = "메뉴 닫기"

export function HeaderMobile({
  logo = <HeaderHomeLink />,
  navItems,
  currentPath,
  actions,
  mode = "light",
  open,
  defaultOpen = false,
  onOpenChange,
  openLabel = DEFAULT_OPEN_LABEL,
  closeLabel = DEFAULT_CLOSE_LABEL,
  className,
}: HeaderMobileProps) {
  const Link = useLinkComponent()
  const menuId = useId()
  const rootRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = open ?? uncontrolledOpen
  const hasNavItems = navItems !== undefined && navItems.length > 0
  const hasActions = Boolean(actions)
  const hasMenu = hasNavItems || hasActions

  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!isOpen) return
    const close = () => {
      setUncontrolledOpen(false)
      onOpenChange?.(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      close()
      menuButtonRef.current?.focus()
    }
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        rootRef.current?.contains(event.target)
      )
        return
      close()
    }
    document.addEventListener("keydown", closeOnEscape)
    document.addEventListener("pointerdown", closeOnOutsidePress)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("pointerdown", closeOnOutsidePress)
    }
  }, [isOpen, onOpenChange])

  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false)
    }
  }

  return (
    <header
      ref={rootRef}
      className={cx("umc-header-mobile", className)}
      data-mode={mode}
      data-open={isOpen ? "" : undefined}
    >
      <div className="umc-header-mobile__logo">{logo}</div>
      {hasMenu && (
        <div className="umc-header-mobile__actions">
          <button
            ref={menuButtonRef}
            type="button"
            className="umc-header-mobile__menu-button"
            aria-label={isOpen ? closeLabel : openLabel}
            aria-expanded={isOpen}
            aria-controls={isOpen ? menuId : undefined}
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      )}
      {hasMenu && isOpen && (
        <div id={menuId} className="umc-header-mobile__menu">
          {hasNavItems && (
            <nav
              className="umc-header-mobile__nav"
              aria-label="메인 내비게이션"
              onClick={closeOnLinkClick}
            >
              <ul className="umc-header-mobile__nav-list">
                {navItems.map((item) => (
                  <li key={item.href} className="umc-header-mobile__nav-item">
                    <Link
                      href={item.href}
                      className="umc-header-mobile__nav-link"
                      aria-current={
                        isActivePath(currentPath, item.href)
                          ? "page"
                          : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {hasActions && (
            <div className="umc-header-mobile__menu-actions">{actions}</div>
          )}
        </div>
      )}
    </header>
  )
}
