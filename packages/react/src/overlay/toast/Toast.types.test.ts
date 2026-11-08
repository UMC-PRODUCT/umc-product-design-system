import { describe, expectTypeOf, it } from "vitest"

import type {
  ServiceNoticeOptions,
  ToastOptions,
  ToastApi,
  ToastProviderProps,
} from "./Toast.tsx"

describe("ToastOptions", () => {
  it("color는 피그마 값만 받는다", () => {
    expectTypeOf<ToastOptions["color"]>().toEqualTypeOf<
      "brand" | "neutral" | "warning" | "error" | undefined
    >()
  })

  it("action은 label과 onClick을 가진다", () => {
    type ActionType = NonNullable<ToastOptions["action"]>
    expectTypeOf<ActionType["onClick"]>().toEqualTypeOf<() => void>()
  })

  it("width는 px 숫자만 받는다", () => {
    expectTypeOf<ToastOptions["width"]>().toEqualTypeOf<number | undefined>()
  })
})

describe("ServiceNoticeOptions", () => {
  it("color는 피그마 Service Notice의 두 색만 받는다", () => {
    expectTypeOf<ServiceNoticeOptions["color"]>().toEqualTypeOf<
      "brand" | "neutral" | undefined
    >()
  })

  it("아이콘과 동작 버튼, 폭은 받지 않는다", () => {
    expectTypeOf<ServiceNoticeOptions>().not.toHaveProperty("icon")
    expectTypeOf<ServiceNoticeOptions>().not.toHaveProperty("action")
    expectTypeOf<ServiceNoticeOptions>().not.toHaveProperty("width")
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

  it("showServiceNotice는 string을 반환한다", () => {
    expectTypeOf<
      ToastApi["showServiceNotice"]
    >().returns.toEqualTypeOf<string>()
  })

  it("close는 id 문자열을 받는다", () => {
    expectTypeOf<ToastApi["close"]>().parameter(0).toEqualTypeOf<string>()
  })
})
