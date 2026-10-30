import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { RoleTagColor } from "../../display/role-tag/RoleTag.tsx"
import type {
  HeaderProfileMenuGeneration,
  HeaderProfileMenuProfile,
  HeaderProfileMenuProps,
} from "./HeaderProfileMenu.tsx"

describe("HeaderProfileMenuProps", () => {
  it("역할 태그 색은 RoleTag 색을 그대로 받는다", () => {
    expectTypeOf<
      NonNullable<HeaderProfileMenuProfile["role"]>["color"]
    >().toEqualTypeOf<RoleTagColor>()
  })

  it("기수 항목은 값, 레이블, 캡션으로 만든다", () => {
    expectTypeOf<HeaderProfileMenuGeneration["value"]>().toEqualTypeOf<string>()
    expectTypeOf<
      HeaderProfileMenuGeneration["caption"]
    >().toEqualTypeOf<ReactNode>()
  })

  it("onGenerationChange는 고른 기수 값을 받는다", () => {
    expectTypeOf<HeaderProfileMenuProps["onGenerationChange"]>().toEqualTypeOf<
      ((generation: string) => void) | undefined
    >()
  })

  it("profile과 generations는 꼭 넘긴다", () => {
    expectTypeOf<{
      generations: HeaderProfileMenuGeneration[]
    }>().not.toMatchTypeOf<HeaderProfileMenuProps>()
    expectTypeOf<{
      profile: HeaderProfileMenuProfile
    }>().not.toMatchTypeOf<HeaderProfileMenuProps>()
  })
})
