import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  FormAttachmentField,
  type FormAttachment,
  type FormAttachmentFieldProps,
  type FormAttachmentRejection,
} from "./FormAttachmentField.tsx"

describe("FormAttachmentFieldProps 타입", () => {
  it("첨부는 표시할 이름과 선택적인 링크 주소다", () => {
    expectTypeOf<FormAttachment>().toEqualTypeOf<{
      label: ReactNode
      href?: string
    }>()
    expectTypeOf<FormAttachmentFieldProps["attachment"]>().toEqualTypeOf<
      FormAttachment | null | undefined
    >()
  })

  it("받지 않은 파일은 이유와 함께 넘긴다", () => {
    expectTypeOf<FormAttachmentRejection["reason"]>().toEqualTypeOf<
      "type" | "size"
    >()
  })

  it("accept는 MIME 형식 배열이고 네이티브 type은 받지 않는다", () => {
    expectTypeOf<FormAttachmentFieldProps["accept"]>().toEqualTypeOf<
      readonly string[] | undefined
    >()
    expectTypeOf<FormAttachmentFieldProps>().not.toHaveProperty("type")
  })

  it("오류 상태와 오류 문구를 받는다", () => {
    expectTypeOf<FormAttachmentFieldProps["invalid"]>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<
      FormAttachmentFieldProps["errorMessage"]
    >().toEqualTypeOf<ReactNode>()
  })

  it("ref는 링크 입력을 가리킨다", () => {
    expectTypeOf<FormAttachmentFieldProps["ref"]>().toEqualTypeOf<
      Ref<HTMLInputElement> | undefined
    >()
  })

  it("FormAttachmentField의 props 타입이 FormAttachmentFieldProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof FormAttachmentField>
    >().toEqualTypeOf<FormAttachmentFieldProps>()
  })
})
