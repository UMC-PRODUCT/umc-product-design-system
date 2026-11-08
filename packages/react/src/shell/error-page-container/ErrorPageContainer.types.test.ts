import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { ErrorPageContainerProps } from "./ErrorPageContainer.tsx"

describe("ErrorPageContainerProps", () => {
  it("title은 필수 ReactNode다", () => {
    expectTypeOf<ErrorPageContainerProps["title"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<{ title: string }>().toMatchTypeOf<ErrorPageContainerProps>()
    expectTypeOf<object>().not.toMatchTypeOf<ErrorPageContainerProps>()
  })

  it("body와 actions는 선택 ReactNode다", () => {
    expectTypeOf<ErrorPageContainerProps["body"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
    expectTypeOf<ErrorPageContainerProps["actions"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("div 속성을 받되 title 속성은 컴포넌트 제목으로 쓴다", () => {
    expectTypeOf<ErrorPageContainerProps>().toHaveProperty("className")
    expectTypeOf<ErrorPageContainerProps["title"]>().not.toEqualTypeOf<
      string | undefined
    >()
  })
})
