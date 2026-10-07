import { describe, expectTypeOf, it } from "vitest"

import type { ToastOptions, ToastApi, ToastProviderProps } from "./Toast.tsx"

describe("ToastOptions", () => {
  it("color는 피그마 값만 받는다", () => {
    expectTypeOf<ToastOptions["color"]>().toEqualTypeOf<
      "primary" | "neutral" | "error" | undefined
    >()
  })

  it("action은 label과 onClick을 가진다", () => {
    type ActionType = NonNullable<ToastOptions["action"]>
    expectTypeOf<ActionType["onClick"]>().toEqualTypeOf<() => void>()
  })
})

describe("ToastProviderProps", () => {
  it("placement는 top 또는 bottom만 받는다", () => {
    expectTypeOf<ToastProviderProps["placement"]>().toEqualTypeOf<
      "top" | "bottom" | undefined
    >()
  })
})

describe("ToastApi", () => {
  it("show는 string을 반환한다", () => {
    expectTypeOf<ToastApi["show"]>().returns.toEqualTypeOf<string>()
  })

  it("close는 id 문자열을 받는다", () => {
    expectTypeOf<ToastApi["close"]>().parameter(0).toEqualTypeOf<string>()
  })
})
