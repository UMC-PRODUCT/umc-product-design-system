import type { ReactElement, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import type { MenuItemDef, MenuProps } from "./Menu.tsx"

describe("MenuProps 타입", () => {
  it("items는 MenuItemDef 배열이다", () => {
    expectTypeOf<MenuProps["items"]>().toEqualTypeOf<MenuItemDef[]>()
  })

  it("size는 Dropdown/Item 크기 xs, sm, md만 받는다", () => {
    expectTypeOf<MenuProps["size"]>().toEqualTypeOf<
      "xs" | "sm" | "md" | undefined
    >()
  })

  it("title은 선택적인 ReactNode다", () => {
    expectTypeOf<MenuProps["title"]>().toEqualTypeOf<ReactNode | undefined>()
  })

  it("onClick은 선택적이다", () => {
    expectTypeOf<MenuItemDef["onClick"]>().toEqualTypeOf<
      (() => void) | undefined
    >()
  })

  it("layout은 default와 inline만 받는다", () => {
    expectTypeOf<MenuProps["layout"]>().toEqualTypeOf<
      "default" | "inline" | undefined
    >()
  })

  it("inline 배치는 피그마처럼 Xs 항목에서만 받는다", () => {
    expectTypeOf<{
      trigger: ReactElement
      items: MenuItemDef[]
      size: "md"
      layout: "inline"
    }>().not.toMatchTypeOf<MenuProps>()
    expectTypeOf<{
      trigger: ReactElement
      items: MenuItemDef[]
      size: "xs"
      layout: "inline"
    }>().toMatchTypeOf<MenuProps>()
  })

  it("caption은 선택적인 ReactNode다", () => {
    expectTypeOf<MenuItemDef["caption"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })
})
