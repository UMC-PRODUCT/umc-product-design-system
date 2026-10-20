import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FloatingActionButton,
  type FloatingActionButtonProps,
} from "./FloatingActionButton.tsx"

describe("FloatingActionButtonProps 타입", () => {
  it("아이콘과 접근 가능한 이름을 꼭 받는다", () => {
    expectTypeOf<FloatingActionButtonProps["icon"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<
      FloatingActionButtonProps["aria-label"]
    >().toEqualTypeOf<string>()
  })

  it("children은 받지 않는다", () => {
    expectTypeOf<FloatingActionButtonProps>().not.toHaveProperty("children")
  })

  it("FloatingActionButton의 props 타입이 FloatingActionButtonProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FloatingActionButton>
    >().toEqualTypeOf<FloatingActionButtonProps>()
  })
})
