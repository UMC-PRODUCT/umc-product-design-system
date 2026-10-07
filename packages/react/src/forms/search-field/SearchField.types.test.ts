import { describe, expectTypeOf, it } from "vitest"

import type { SearchFieldProps } from "./SearchField.tsx"

describe("SearchFieldProps 타입", () => {
  it("variant는 default 또는 dropdown만 받는다", () => {
    expectTypeOf<SearchFieldProps["variant"]>().toEqualTypeOf<
      "default" | "dropdown" | undefined
    >()
  })

  it("clearable은 선택적 boolean이다", () => {
    expectTypeOf<SearchFieldProps["clearable"]>().toEqualTypeOf<
      boolean | undefined
    >()
  })

  it("네이티브 input 속성을 받는다", () => {
    expectTypeOf<SearchFieldProps>().toHaveProperty("placeholder")
    expectTypeOf<SearchFieldProps>().toHaveProperty("onChange")
  })
})
