import type { ComponentProps, ReactNode } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormSection,
  type FormSectionProps,
  type FormSectionVariant,
} from "./FormSection.tsx"

describe("FormSectionProps 타입", () => {
  it("variant는 static과 toggle만 받는다", () => {
    expectTypeOf<FormSectionVariant>().toEqualTypeOf<"static" | "toggle">()
  })

  it("제목은 ReactNode이고 네이티브 title 속성과 겹치지 않는다", () => {
    expectTypeOf<FormSectionProps["title"]>().toEqualTypeOf<ReactNode>()
  })

  it("제목 단계는 2부터 6까지다", () => {
    expectTypeOf<FormSectionProps["level"]>().toEqualTypeOf<
      2 | 3 | 4 | 5 | 6 | undefined
    >()
  })

  it("FormSection의 props 타입이 FormSectionProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormSection>
    >().toEqualTypeOf<FormSectionProps>()
  })
})
