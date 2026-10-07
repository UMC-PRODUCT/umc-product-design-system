"use client"

import { ChevronRightIcon } from "@umc-product/icons"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type BreadcrumbItem = {
  label: ReactNode
  href?: string
}

export type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  const Link = useLinkComponent()

  return (
    <div className={cx("umc-page-header", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="umc-page-header__breadcrumbs" aria-label="브레드크럼">
          <ol className="umc-page-header__breadcrumb-list">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <li key={index} className="umc-page-header__breadcrumb-item">
                  {isLast ? (
                    <span
                      className="umc-page-header__breadcrumb-link"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="umc-page-header__breadcrumb-link"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="umc-page-header__breadcrumb-link">
                      {item.label}
                    </span>
                  )}
                  {!isLast && (
                    <span
                      className="umc-page-header__breadcrumb-separator"
                      aria-hidden="true"
                    >
                      <ChevronRightIcon size={16} />
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      )}
      <div className="umc-page-header__title-block">
        <h1 className="umc-page-header__title">{title}</h1>
        {description && (
          <p className="umc-page-header__description">{description}</p>
        )}
      </div>
    </div>
  )
}
