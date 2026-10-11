import { describe, expectTypeOf, it } from "vitest"

import { type HeaderHomeLinkProps } from "./HeaderHomeLink.tsx"

describe("HeaderHomeLinkProps", () => {
  it("operation과 study는 generation이 있어야 한다", () => {
    expectTypeOf<{
      context: "operation"
    }>().not.toMatchTypeOf<HeaderHomeLinkProps>()
    expectTypeOf<{
      context: "study"
    }>().not.toMatchTypeOf<HeaderHomeLinkProps>()
    expectTypeOf<{
      context: "study"
      generation: number
    }>().toMatchTypeOf<HeaderHomeLinkProps>()
  })

  it("main과 product-tech는 generation을 받지 않는다", () => {
    expectTypeOf<{
      context: "product-tech"
      generation: number
    }>().not.toMatchTypeOf<HeaderHomeLinkProps>()
    expectTypeOf<{
      generation: number
    }>().not.toMatchTypeOf<HeaderHomeLinkProps>()
    expectTypeOf<{ context: "main" }>().toMatchTypeOf<HeaderHomeLinkProps>()
  })
})
