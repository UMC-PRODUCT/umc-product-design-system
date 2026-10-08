import { describe, expectTypeOf, it } from "vitest"

import { type CheckboxProps } from "./Checkbox.tsx"

describe("CheckboxProps", () => {
  it("color, size, labelPlacement는 피그마 값만 받는다", () => {
    expectTypeOf<CheckboxProps["color"]>().toEqualTypeOf<
      "neutral" | "brand" | undefined
    >()
    expectTypeOf<CheckboxProps["size"]>().toEqualTypeOf<
      "md" | "lg" | undefined
    >()
    expectTypeOf<CheckboxProps["labelPlacement"]>().toEqualTypeOf<
      "start" | "end" | undefined
    >()
  })

  it("onCheckedChange는 새 체크 상태만 넘긴다", () => {
    expectTypeOf<CheckboxProps["onCheckedChange"]>().toEqualTypeOf<
      ((checked: boolean) => void) | undefined
    >()
  })
})
