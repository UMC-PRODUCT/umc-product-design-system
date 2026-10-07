import { describe, expectTypeOf, it } from "vitest"

import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
} from "./Tabs.tsx"

describe("TabsProps", () => {
  it("value와 defaultValue는 string | undefined다", () => {
    expectTypeOf<TabsProps["value"]>().toEqualTypeOf<string | undefined>()
    expectTypeOf<TabsProps["defaultValue"]>().toEqualTypeOf<
      string | undefined
    >()
  })

  it("onValueChange의 인자는 string이다", () => {
    expectTypeOf<
      NonNullable<TabsProps["onValueChange"]>
    >().parameters.toEqualTypeOf<[string]>()
  })
})

describe("TabProps", () => {
  it("value는 string 타입이다", () => {
    expectTypeOf<TabProps["value"]>().toEqualTypeOf<string>()
  })

  it("icon은 ReactNode | undefined다", () => {
    expectTypeOf<TabProps["icon"]>().toEqualTypeOf<
      import("react").ReactNode | undefined
    >()
  })

  it("aria-label을 받는다", () => {
    expectTypeOf<TabProps>().toHaveProperty("aria-label")
  })
})

describe("TabListProps", () => {
  it("aria-label을 받는다", () => {
    expectTypeOf<TabListProps>().toHaveProperty("aria-label")
  })
})

describe("TabPanelProps", () => {
  it("value는 string 타입이다", () => {
    expectTypeOf<TabPanelProps["value"]>().toEqualTypeOf<string>()
  })
})
