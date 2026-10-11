import { describe, expectTypeOf, it } from "vitest"

import { type CheckButtonProps } from "./CheckButton.tsx"

describe("CheckButtonProps", () => {
  it("onCheckedChange는 새 체크 상태만 넘긴다", () => {
    expectTypeOf<CheckButtonProps["onCheckedChange"]>().toEqualTypeOf<
      ((checked: boolean) => void) | undefined
    >()
  })

  it("색과 크기는 피그마에 변형이 없어 받지 않는다", () => {
    expectTypeOf<CheckButtonProps>().not.toHaveProperty("color")
    expectTypeOf<CheckButtonProps>().not.toHaveProperty("size")
  })
})
