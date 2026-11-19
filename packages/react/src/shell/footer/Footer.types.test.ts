import type { ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { type FooterProps, type FooterSocialLink } from "./Footer.tsx"

describe("FooterProps", () => {
  it("variant는 'default' | 'hero' | undefined만 받는다", () => {
    expectTypeOf<FooterProps["variant"]>().toEqualTypeOf<
      "default" | "hero" | undefined
    >()
  })

  it("mode는 'light' | 'gray' | 'dark' | undefined만 받는다", () => {
    expectTypeOf<FooterProps["mode"]>().toEqualTypeOf<
      "light" | "gray" | "dark" | undefined
    >()
  })

  it("열 항목의 href는 없어도 된다", () => {
    expectTypeOf<
      NonNullable<FooterProps["columns"]>[number]["items"][number]
    >().toEqualTypeOf<{ label: ReactNode; href?: string }>()
  })

  it("소셜 플랫폼은 피그마에 있는 세 가지만 받는다", () => {
    expectTypeOf<FooterSocialLink["platform"]>().toEqualTypeOf<
      "facebook" | "instagram" | "youtube"
    >()
  })

  it("title은 HTML title 속성이 아니라 ReactNode다", () => {
    expectTypeOf<FooterProps["title"]>().toEqualTypeOf<ReactNode>()
  })
})
