import type { ComponentProps } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormChoiceListEditor,
  type FormChoiceDraftOption,
  type FormChoiceListEditorProps,
} from "./FormChoiceListEditor.tsx"

describe("FormChoiceListEditorProps 타입", () => {
  it("보기 초안은 id와 글자다", () => {
    expectTypeOf<FormChoiceDraftOption>().toEqualTypeOf<{
      id: string
      label: string
    }>()
  })

  it("type은 single과 multiple만 받는다", () => {
    expectTypeOf<FormChoiceListEditorProps["type"]>().toEqualTypeOf<
      "single" | "multiple"
    >()
  })

  it("보기 변경은 id와 새 글자를 넘긴다", () => {
    expectTypeOf<FormChoiceListEditorProps["onOptionChange"]>().toEqualTypeOf<
      ((id: string, label: string) => void) | undefined
    >()
  })

  it("FormChoiceListEditor의 props 타입이 FormChoiceListEditorProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormChoiceListEditor>
    >().toEqualTypeOf<FormChoiceListEditorProps>()
  })
})
