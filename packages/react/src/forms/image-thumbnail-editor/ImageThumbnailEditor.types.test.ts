import type { ComponentProps, ReactNode, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import {
  ImageThumbnailEditor,
  type ImageThumbnailEditorProps,
  type ImageThumbnailEditorRejection,
} from "./ImageThumbnailEditor.tsx"

describe("ImageThumbnailEditorProps 타입", () => {
  it("값은 File이고 비울 수 있다", () => {
    expectTypeOf<ImageThumbnailEditorProps["value"]>().toEqualTypeOf<
      File | null | undefined
    >()
    expectTypeOf<ImageThumbnailEditorProps["defaultValue"]>().toEqualTypeOf<
      File | null | undefined
    >()
  })

  it("onValueChange는 받아들인 File을 넘긴다", () => {
    expectTypeOf<ImageThumbnailEditorProps["onValueChange"]>().toEqualTypeOf<
      ((value: File) => void) | undefined
    >()
  })

  it("onReject는 거절한 파일과 이유를 넘긴다", () => {
    expectTypeOf<ImageThumbnailEditorRejection>().toEqualTypeOf<{
      file: File
      reason: "type" | "size"
    }>()
    expectTypeOf<ImageThumbnailEditorProps["onReject"]>().toEqualTypeOf<
      ((rejection: ImageThumbnailEditorRejection) => void) | undefined
    >()
  })

  it("accept는 MIME 타입 목록, maxSize는 바이트 수다", () => {
    expectTypeOf<ImageThumbnailEditorProps["accept"]>().toEqualTypeOf<
      readonly string[] | undefined
    >()
    expectTypeOf<ImageThumbnailEditorProps["maxSize"]>().toEqualTypeOf<
      number | undefined
    >()
  })

  it("label과 description은 ReactNode다", () => {
    expectTypeOf<ImageThumbnailEditorProps["label"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
    expectTypeOf<ImageThumbnailEditorProps["description"]>().toEqualTypeOf<
      ReactNode | undefined
    >()
  })

  it("파일 입력의 종류와 여러 파일 선택은 바꿀 수 없다", () => {
    expectTypeOf<ImageThumbnailEditorProps>().not.toHaveProperty("type")
    expectTypeOf<ImageThumbnailEditorProps>().not.toHaveProperty("multiple")
    expectTypeOf<ImageThumbnailEditorProps>().not.toHaveProperty("onChange")
  })

  it("네이티브 input 속성과 input ref를 받는다", () => {
    expectTypeOf<ImageThumbnailEditorProps>().toHaveProperty("name")
    expectTypeOf<ImageThumbnailEditorProps>().toHaveProperty("disabled")
    expectTypeOf<ImageThumbnailEditorProps["ref"]>().toEqualTypeOf<
      Ref<HTMLInputElement> | undefined
    >()
  })

  it("ImageThumbnailEditor의 props 타입이 ImageThumbnailEditorProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ImageThumbnailEditor>
    >().toEqualTypeOf<ImageThumbnailEditorProps>()
  })
})
