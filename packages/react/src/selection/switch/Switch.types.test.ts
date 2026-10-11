import { describe, expectTypeOf, it } from "vitest"

import { type SwitchProps } from "./Switch.tsx"

describe("SwitchProps", () => {
  it("size와 labelPlacement는 피그마 값만 받는다", () => {
    expectTypeOf<SwitchProps["size"]>().toEqualTypeOf<"sm" | "md" | undefined>()
    expectTypeOf<SwitchProps["labelPlacement"]>().toEqualTypeOf<
      "start" | "end" | undefined
    >()
  })
})
