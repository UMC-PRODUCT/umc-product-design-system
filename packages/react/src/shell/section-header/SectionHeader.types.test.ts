import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  SectionHeader,
  type SectionHeaderLevel,
  type SectionHeaderProps,
  type SectionHeaderSize,
} from "./SectionHeader.tsx"

describe("SectionHeaderProps 타입", () => {
  it("title은 꼭 받는 ReactNode다", () => {
    expectTypeOf<SectionHeaderProps["title"]>().toEqualTypeOf<ReactNode>()
  })

  it("size는 lg, md, sm만 받는다", () => {
    expectTypeOf<SectionHeaderSize>().toEqualTypeOf<"lg" | "md" | "sm">()
    expectTypeOf<SectionHeaderProps["size"]>().toEqualTypeOf<
      SectionHeaderSize | undefined
    >()
  })

  it("level은 2부터 6까지만 받는다", () => {
    expectTypeOf<SectionHeaderLevel>().toEqualTypeOf<2 | 3 | 4 | 5 | 6>()
  })

  it("slot은 네이티브 slot 속성 대신 ReactNode를 받는다", () => {
    expectTypeOf<SectionHeaderProps["slot"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("children은 받지 않는다", () => {
    expectTypeOf<SectionHeaderProps>().not.toHaveProperty("children")
  })

  it("ref는 루트 div를 가리킨다", () => {
    expectTypeOf<SectionHeaderProps["ref"]>().toEqualTypeOf<
      Ref<HTMLDivElement> | undefined
    >()
  })

  it("SectionHeader의 props 타입이 SectionHeaderProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof SectionHeader>
    >().toEqualTypeOf<SectionHeaderProps>()
  })
})
