import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { AccordionItemProps, AccordionProps } from "./Accordion.tsx"

describe("AccordionProps", () => {
  it("value와 defaultValue는 펼친 항목 value의 배열이다", () => {
    expectTypeOf<AccordionProps["value"]>().toEqualTypeOf<
      string[] | undefined
    >()
    expectTypeOf<AccordionProps["defaultValue"]>().toEqualTypeOf<
      string[] | undefined
    >()
  })

  it("onValueChange는 펼친 항목 value의 배열을 받는다", () => {
    expectTypeOf<AccordionProps["onValueChange"]>().toEqualTypeOf<
      ((value: string[]) => void) | undefined
    >()
  })

  it("multiple은 선택 boolean이다", () => {
    expectTypeOf<AccordionProps["multiple"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })
})

describe("AccordionItemProps", () => {
  it("value, title, body는 필수다", () => {
    expectTypeOf<{
      value: string
      title: string
      body: string
    }>().toMatchTypeOf<AccordionItemProps>()
    expectTypeOf<{
      value: string
      title: string
    }>().not.toMatchTypeOf<AccordionItemProps>()
  })

  it("prefix는 선택 ReactNode다", () => {
    expectTypeOf<AccordionItemProps["prefix"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("disabled는 선택 boolean이다", () => {
    expectTypeOf<AccordionItemProps["disabled"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })
})
