"use client"

import type { ComponentPropsWithRef, ReactNode } from "react"

import { ExpandMoreIcon } from "@umc-product/icons"

import { cx } from "../../internal/cx.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type TopNavigationBackProps = {
  label?: string
  onClick?: () => void
  href?: string
}

export type TopNavigationProps = {
  title: ReactNode
  titleAlign?: "start" | "center"
  back?: TopNavigationBackProps
  onTitleClick?: () => void
  titleExpanded?: boolean
  actions?: ReactNode
  className?: string
}

export type TopNavigationButtonIconProps = Omit<
  ComponentPropsWithRef<"button">,
  "color"
> & {
  variant: "icon"
  color?: never
  "aria-label": string
  children?: ReactNode
}

export type TopNavigationButtonTextProps = Omit<
  ComponentPropsWithRef<"button">,
  "color"
> & {
  variant: "text"
  color?: "primary" | "neutral"
  children?: ReactNode
}

export type TopNavigationButtonProps =
  TopNavigationButtonIconProps | TopNavigationButtonTextProps

export function TopNavigationButton({
  variant,
  color = "primary",
  className,
  type = "button",
  children,
  ...props
}: TopNavigationButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cx("umc-top-navigation-button", className)}
      data-variant={variant}
      data-color={variant === "text" ? color : undefined}
    >
      {variant === "icon" ? (
        <span className="umc-top-navigation-button__icon" aria-hidden="true">
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export function TopNavigation({
  title,
  titleAlign = "start",
  back,
  onTitleClick,
  titleExpanded,
  actions,
  className,
}: TopNavigationProps) {
  const Link = useLinkComponent()
  const backLabel = back?.label ?? "뒤로 가기"

  const backElement = back && (
    <>
      {back.href ? (
        <Link
          href={back.href}
          className="umc-top-navigation__back-btn"
          aria-label={backLabel}
        >
          <span className="umc-top-navigation__back-icon" aria-hidden="true">
            <ExpandMoreIcon weight="fill" />
          </span>
        </Link>
      ) : (
        <button
          type="button"
          className="umc-top-navigation__back-btn"
          aria-label={backLabel}
          onClick={back.onClick}
        >
          <span className="umc-top-navigation__back-icon" aria-hidden="true">
            <ExpandMoreIcon weight="fill" />
          </span>
        </button>
      )}
    </>
  )

  const titleContent = onTitleClick ? (
    <button
      type="button"
      className="umc-top-navigation__title-btn"
      aria-expanded={titleExpanded}
      onClick={onTitleClick}
    >
      <span className="umc-top-navigation__title-text">{title}</span>
      <span className="umc-top-navigation__title-chevron" aria-hidden="true">
        <ExpandMoreIcon weight="fill" />
      </span>
    </button>
  ) : (
    <span className="umc-top-navigation__title-text">{title}</span>
  )

  return (
    <header
      className={cx("umc-top-navigation", className)}
      data-title-align={titleAlign}
      data-has-back={back !== undefined ? "" : undefined}
    >
      <div className="umc-top-navigation__leading">{backElement}</div>
      <div className="umc-top-navigation__title">{titleContent}</div>
      {actions && <div className="umc-top-navigation__trailing">{actions}</div>}
    </header>
  )
}
