import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ImageThumbnail } from "./ImageThumbnail.tsx"

const thumbnailOf = () => document.querySelector(".umc-image-thumbnail")
const imageOf = () => document.querySelector(".umc-image-thumbnail__image")

describe("ImageThumbnail", () => {
  it("src가 있으면 alt를 단 이미지를 그린다", () => {
    render(<ImageThumbnail src="/garam.png" alt="가람대학교 로고" />)
    expect(
      screen.getByRole("img", { name: "가람대학교 로고" }),
    ).toHaveAttribute("src", "/garam.png")
    expect(thumbnailOf()).not.toHaveAttribute("data-fallback")
  })

  it.each([undefined, null, ""])(
    "src가 %j이면 UMC 로고를 대신 그리고 alt를 칸의 이름으로 단다",
    (src) => {
      render(<ImageThumbnail src={src} alt="가람대학교 로고" />)
      const fallback = screen.getByRole("img", { name: "가람대학교 로고" })
      expect(fallback).toHaveClass("umc-image-thumbnail")
      expect(fallback).toHaveAttribute("data-fallback", "")
      expect(imageOf()).toBeNull()
      expect(
        fallback.querySelector(".umc-image-thumbnail__logo"),
      ).toHaveAttribute("aria-hidden", "true")
    },
  )

  it("이미지를 불러오지 못하면 UMC 로고로 바꾸고, src가 바뀌면 다시 이미지를 그린다", () => {
    const { rerender } = render(
      <ImageThumbnail src="/broken.png" alt="가람대학교 로고" />,
    )
    fireEvent.error(screen.getByRole("img", { name: "가람대학교 로고" }))
    expect(thumbnailOf()).toHaveAttribute("data-fallback", "")
    expect(imageOf()).toBeNull()

    rerender(<ImageThumbnail src="/garam.png" alt="가람대학교 로고" />)
    expect(imageOf()).toHaveAttribute("src", "/garam.png")
    expect(thumbnailOf()).not.toHaveAttribute("data-fallback")
  })

  it("alt가 빈 문자열이면 대체 로고 칸에 이름을 달지 않는다", () => {
    render(<ImageThumbnail alt="" />)
    expect(screen.queryByRole("img")).toBeNull()
    expect(thumbnailOf()).not.toHaveAttribute("aria-label")
  })

  it("size를 넘기면 크기 변수를 px로 달고 style과 합친다", () => {
    render(<ImageThumbnail alt="" size={80} style={{ marginTop: 4 }} />)
    const thumbnail = thumbnailOf()
    expect(
      thumbnail instanceof HTMLElement &&
        thumbnail.style.getPropertyValue("--umc-image-thumbnail-size"),
    ).toBe("80px")
    expect(thumbnail).toHaveStyle({ marginTop: "4px" })
  })

  it("size가 없으면 크기 변수를 인라인으로 달지 않아 className으로 바꿀 수 있다", () => {
    render(
      <ImageThumbnail alt="" className="[--umc-image-thumbnail-size:64px]" />,
    )
    expect(thumbnailOf()).not.toHaveAttribute("style")
    expect(thumbnailOf()).toHaveClass(
      "umc-image-thumbnail",
      "[--umc-image-thumbnail-size:64px]",
    )
  })

  it("네이티브 span 속성을 넘긴다", () => {
    render(<ImageThumbnail alt="" id="school-logo" title="가람대학교" />)
    expect(thumbnailOf()).toHaveAttribute("id", "school-logo")
    expect(thumbnailOf()).toHaveAttribute("title", "가람대학교")
  })
})
