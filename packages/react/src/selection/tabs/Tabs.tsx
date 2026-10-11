"use client"

import { Tabs as BaseTabs } from "@base-ui/react"
import type { ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type TabsProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export type TabListProps = {
  children: ReactNode
  className?: string
  "aria-label"?: string
}

export type TabProps = {
  value: string
  children?: ReactNode
  icon?: ReactNode
  className?: string
  "aria-label"?: string
}

export type TabPanelProps = {
  value: string
  children: ReactNode
  keepMounted?: boolean
  className?: string
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange ? (v) => onValueChange(String(v)) : undefined
      }
      className={cx("umc-tabs", className)}
    >
      {children}
    </BaseTabs.Root>
  )
}

export function TabList({
  children,
  className,
  "aria-label": ariaLabel,
}: TabListProps) {
  return (
    <BaseTabs.List
      aria-label={ariaLabel}
      className={cx("umc-tab-list", className)}
    >
      {children}
    </BaseTabs.List>
  )
}

export function Tab({
  value,
  children,
  icon,
  className,
  "aria-label": ariaLabel,
}: TabProps) {
  return (
    <BaseTabs.Tab
      value={value}
      aria-label={ariaLabel}
      className={cx("umc-tab", className)}
      data-icon={icon ? "" : undefined}
    >
      {icon ? (
        <span className="umc-tab__icon" aria-hidden="true">
          {icon}
        </span>
      ) : (
        <span className="umc-tab__label">{children}</span>
      )}
    </BaseTabs.Tab>
  )
}

export function TabPanel({
  value,
  children,
  keepMounted,
  className,
}: TabPanelProps) {
  return (
    <BaseTabs.Panel
      value={value}
      keepMounted={keepMounted}
      className={cx("umc-tab-panel", className)}
    >
      {children}
    </BaseTabs.Panel>
  )
}
