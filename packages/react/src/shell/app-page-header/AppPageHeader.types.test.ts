import { describe, expectTypeOf, it } from "vitest"

import type { TopNavigationBackProps } from "../top-navigation/TopNavigation.tsx"
import type { AppPageHeaderProps } from "./AppPageHeader.tsx"

describe("AppPageHeaderProps", () => {
  it("margin은 피그마 Margin 값 16 | 20만 받는다", () => {
    expectTypeOf<AppPageHeaderProps["margin"]>().toEqualTypeOf<
      16 | 20 | undefined
    >()
  })

  it("back은 TopNavigation과 같은 모양이다", () => {
    expectTypeOf<AppPageHeaderProps["back"]>().toEqualTypeOf<
      TopNavigationBackProps | undefined
    >()
  })

  it("제목과 부제는 모두 선택이다", () => {
    expectTypeOf<object>().toMatchTypeOf<AppPageHeaderProps>()
  })
})
