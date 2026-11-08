"use client"

import { Accordion as BaseAccordion } from "@base-ui/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import type { ComponentPropsWithRef, ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type AccordionValue = string[]

export type AccordionProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "children"
> & {
  value?: AccordionValue
  defaultValue?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
  multiple?: boolean
  children: ReactNode
}

export type AccordionItemProps = {
  value: string
  title: ReactNode
  body: ReactNode
  prefix?: ReactNode
  disabled?: boolean
  className?: string
}

const DEFAULT_PREFIX = "Q"

const rendersSomething = (node: ReactNode) =>
  node !== undefined &&
  node !== null &&
  node !== "" &&
  typeof node !== "boolean"

export function Accordion({
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  className,
  children,
  ...props
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      {...props}
      className={cx("umc-accordion", className)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: AccordionValue) => onValueChange?.(next)}
      multiple={multiple}
    >
      {children}
    </BaseAccordion.Root>
  )
}

export function AccordionItem({
  value,
  title,
  body,
  prefix = DEFAULT_PREFIX,
  disabled = false,
  className,
}: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cx("umc-accordion-item", className)}
      value={value}
      disabled={disabled}
    >
      <BaseAccordion.Header className="umc-accordion-item__header">
        <BaseAccordion.Trigger className="umc-accordion-item__trigger">
          <span className="umc-accordion-item__title-container">
            {rendersSomething(prefix) && (
              <span className="umc-accordion-item__prefix" aria-hidden="true">
                {prefix}
              </span>
            )}
            <span className="umc-accordion-item__title">{title}</span>
          </span>
          <span className="umc-accordion-item__icon" aria-hidden="true">
            <ExpandMoreIcon weight="fill" />
          </span>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="umc-accordion-item__panel">
        <div className="umc-accordion-item__body">{body}</div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  )
}
