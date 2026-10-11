import { describe, expectTypeOf, it } from "vitest"

import { type UmcLogoLockupProps } from "./UmcLogoLockup.tsx"

describe("UmcLogoLockupProps", () => {
  it("operation과 study는 generation이 있어야 한다", () => {
    expectTypeOf<{
      context: "operation"
    }>().not.toMatchTypeOf<UmcLogoLockupProps>()
    expectTypeOf<{
      context: "study"
      generation: number
    }>().toMatchTypeOf<UmcLogoLockupProps>()
  })

  it("main과 product-tech는 generation을 받지 않는다", () => {
    expectTypeOf<{
      context: "product-tech"
      generation: number
    }>().not.toMatchTypeOf<UmcLogoLockupProps>()
    expectTypeOf<{ context: "main" }>().toMatchTypeOf<UmcLogoLockupProps>()
  })

  it("span 속성을 받고 children은 받지 않는다", () => {
    expectTypeOf<{
      id: string
      title: string
    }>().toMatchTypeOf<UmcLogoLockupProps>()
    expectTypeOf<UmcLogoLockupProps>().not.toHaveProperty("children")
  })
})
