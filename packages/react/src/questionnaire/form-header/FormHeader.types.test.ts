import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { FormHeader, type FormHeaderProps } from "./FormHeader.tsx"

describe("FormHeaderProps 타입", () => {
  it("제목은 ReactNode이고 네이티브 title 속성과 겹치지 않는다", () => {
    expectTypeOf<FormHeaderProps["title"]>().toEqualTypeOf<ReactNode>()
  })

  it("부제목, 썸네일, 캡션은 선택이다", () => {
    expectTypeOf<FormHeaderProps["subtitle"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormHeaderProps["thumbnail"]>().toEqualTypeOf<ReactNode>()
    expectTypeOf<FormHeaderProps["caption"]>().toEqualTypeOf<ReactNode>()
  })

  it("제목 단계는 2부터 6까지다", () => {
    expectTypeOf<FormHeaderProps["level"]>().toEqualTypeOf<
      2 | 3 | 4 | 5 | 6 | undefined
    >()
  })

  it("FormHeader의 props 타입이 FormHeaderProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormHeader>
    >().toEqualTypeOf<FormHeaderProps>()
  })
})
