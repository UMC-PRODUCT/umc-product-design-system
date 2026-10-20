import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { DateNavigator, type DateNavigatorProps } from "./DateNavigator.tsx"

describe("DateNavigatorProps 타입", () => {
  it("children은 꼭 받는 ReactNode다", () => {
    expectTypeOf<DateNavigatorProps["children"]>().toEqualTypeOf<ReactNode>()
  })

  it("이동 콜백은 인자 없이 부르고 고를 수 있다", () => {
    expectTypeOf<DateNavigatorProps["onPrevious"]>().toEqualTypeOf<
      (() => void) | undefined
    >()
    expectTypeOf<DateNavigatorProps["onNext"]>().toEqualTypeOf<
      (() => void) | undefined
    >()
  })

  it("버튼 이름은 문자열이다", () => {
    expectTypeOf<DateNavigatorProps["previousLabel"]>().toEqualTypeOf<
      string | undefined
    >()
    expectTypeOf<DateNavigatorProps["nextLabel"]>().toEqualTypeOf<
      string | undefined
    >()
  })

  it("네이티브 div 속성과 ref를 받는다", () => {
    expectTypeOf<DateNavigatorProps>().toHaveProperty("aria-label")
    expectTypeOf<DateNavigatorProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("DateNavigator의 props 타입이 DateNavigatorProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof DateNavigator>
    >().toEqualTypeOf<DateNavigatorProps>()
  })
})
