import { describe, expectTypeOf, it } from "vitest"

import type { DividerProps, DividerVariant } from "./Divider.tsx"

describe("DividerProps 타입", () => {
  it("variant는 line과 solid 두 가지다", () => {
    expectTypeOf<DividerVariant>().toEqualTypeOf<"line" | "solid">()
  })

  it("세로 구분선은 line만 받는다", () => {
    expectTypeOf<{
      orientation: "vertical"
      variant: "line"
    }>().toExtend<DividerProps>()
    expectTypeOf<{
      orientation: "vertical"
      variant: "solid"
    }>().not.toExtend<DividerProps>()
  })

  it("가로 구분선은 solid를 받는다", () => {
    expectTypeOf<{ variant: "solid" }>().toExtend<DividerProps>()
  })
})
