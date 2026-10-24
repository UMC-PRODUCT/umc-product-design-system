import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  CalendarScheduleCard,
  type CalendarScheduleCardProps,
} from "./CalendarScheduleCard.tsx"

describe("CalendarScheduleCardProps", () => {
  it("상태는 피그마 State 세 가지다", () => {
    expectTypeOf<CalendarScheduleCardProps["status"]>().toEqualTypeOf<
      "upcoming" | "ongoing" | "past" | undefined
    >()
  })

  it("회차, 이름, 시작은 꼭 받고 끝은 고를 수 있다", () => {
    expectTypeOf<
      CalendarScheduleCardProps["label"]
    >().toEqualTypeOf<ReactNode>()
    expectTypeOf<
      CalendarScheduleCardProps["title"]
    >().toEqualTypeOf<ReactNode>()
    expectTypeOf<
      CalendarScheduleCardProps["start"]
    >().toEqualTypeOf<ReactNode>()
    expectTypeOf<{
      label: string
      title: string
      start: string
    }>().toMatchTypeOf<CalendarScheduleCardProps>()
  })

  it("네이티브 title과 children은 받지 않고 ref는 루트를 가리킨다", () => {
    expectTypeOf<CalendarScheduleCardProps>().not.toHaveProperty("children")
    expectTypeOf<CalendarScheduleCardProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("CalendarScheduleCard의 props 타입이 CalendarScheduleCardProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof CalendarScheduleCard>
    >().toEqualTypeOf<CalendarScheduleCardProps>()
  })
})
