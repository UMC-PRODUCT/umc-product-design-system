import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  Calendar,
  type CalendarProps,
  type CalendarRange,
} from "./Calendar.tsx"

describe("CalendarProps", () => {
  it("고른 날짜는 Date이고 비울 수 있다", () => {
    expectTypeOf<CalendarProps["value"]>().toEqualTypeOf<
      Date | null | undefined
    >()
    expectTypeOf<CalendarProps["onValueChange"]>().toEqualTypeOf<
      ((date: Date) => void) | undefined
    >()
  })

  it("기간은 시작과 끝 날짜다", () => {
    expectTypeOf<CalendarRange>().toEqualTypeOf<{ start: Date; end: Date }>()
    expectTypeOf<CalendarProps["ranges"]>().toEqualTypeOf<
      readonly CalendarRange[] | undefined
    >()
    expectTypeOf<CalendarProps["markedDates"]>().toEqualTypeOf<
      readonly Date[] | undefined
    >()
  })

  it("머리 배치는 피그마 Header Layout 두 가지다", () => {
    expectTypeOf<CalendarProps["headerLayout"]>().toEqualTypeOf<
      "centered" | "start" | undefined
    >()
  })

  it("children 대신 날짜 props로 그리고 ref는 루트를 가리킨다", () => {
    expectTypeOf<CalendarProps>().not.toHaveProperty("children")
    expectTypeOf<CalendarProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("Calendar의 props 타입이 CalendarProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof Calendar>
    >().toEqualTypeOf<CalendarProps>()
  })
})
