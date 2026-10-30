"use client"

import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import {
  TopNavigation,
  type TopNavigationBackProps,
} from "../top-navigation/TopNavigation.tsx"

export type AppPageHeaderMargin = 16 | 20

export type AppPageHeaderProps = {
  title?: ReactNode
  subtitle?: ReactNode
  back?: TopNavigationBackProps
  actions?: ReactNode
  margin?: AppPageHeaderMargin
  className?: string
}

export function AppPageHeader({
  title,
  subtitle,
  back,
  actions,
  margin = 16,
  className,
}: AppPageHeaderProps) {
  const showNavigation = back !== undefined || Boolean(actions)
  const showText = title !== undefined || subtitle !== undefined

  return (
    <div className={cx("umc-app-page-header", className)} data-margin={margin}>
      {showNavigation && <TopNavigation back={back} actions={actions} />}
      {showText && (
        <div className="umc-app-page-header__text">
          {title !== undefined && (
            <h1 className="umc-app-page-header__title">{title}</h1>
          )}
          {subtitle !== undefined && (
            <p className="umc-app-page-header__subtitle">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  )
}
