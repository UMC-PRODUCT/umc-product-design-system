import type { ComponentProps, Ref } from "react"
import { describe, expectTypeOf, it } from "vitest"

import { ImageThumbnail, type ImageThumbnailProps } from "./ImageThumbnail.tsx"

describe("ImageThumbnailProps 타입", () => {
  it("alt는 꼭 받는 문자열이다", () => {
    expectTypeOf<ImageThumbnailProps["alt"]>().toEqualTypeOf<string>()
  })

  it("src는 비어 있을 수 있다", () => {
    expectTypeOf<ImageThumbnailProps["src"]>().toEqualTypeOf<
      string | null | undefined
    >()
  })

  it("size는 px 단위 숫자다", () => {
    expectTypeOf<ImageThumbnailProps["size"]>().toEqualTypeOf<
      number | undefined
    >()
  })

  it("children은 받지 않는다", () => {
    expectTypeOf<ImageThumbnailProps>().not.toHaveProperty("children")
  })

  it("ref는 span 요소를 가리킨다", () => {
    expectTypeOf<ImageThumbnailProps["ref"]>().toEqualTypeOf<
      Ref<HTMLSpanElement> | undefined
    >()
  })

  it("ImageThumbnail의 props 타입이 ImageThumbnailProps와 같다", () => {
    expectTypeOf<
      ComponentProps<typeof ImageThumbnail>
    >().toEqualTypeOf<ImageThumbnailProps>()
  })
})
