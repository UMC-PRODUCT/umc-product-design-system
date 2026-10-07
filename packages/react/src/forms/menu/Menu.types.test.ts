import { describe, expectTypeOf, it } from "vitest"

import type { MenuItemDef, MenuProps } from "./Menu.tsx"

describe("MenuProps 타입", () => {
  it("items는 MenuItemDef 배열이다", () => {
    expectTypeOf<MenuProps["items"]>().toEqualTypeOf<MenuItemDef[]>()
  })

  it("tone은 default 또는 danger만 허용한다", () => {
    expectTypeOf<MenuItemDef["tone"]>().toEqualTypeOf<
      "default" | "danger" | undefined
    >()
  })

  it("onClick은 선택적이다", () => {
    expectTypeOf<MenuItemDef["onClick"]>().toEqualTypeOf<
      (() => void) | undefined
    >()
  })
})
