import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FormHeader } from "../form-header/FormHeader.tsx"
import { FormSheet } from "./FormSheet.tsx"

describe("FormSheet", () => {
  it("머리, 설명, 본문, 조작 칸을 순서대로 그린다", () => {
    render(
      <FormSheet
        header={<FormHeader title="지원서" />}
        description={<p>프로젝트 소개</p>}
        control={<button type="button">다음</button>}
      >
        <p>질문</p>
      </FormSheet>,
    )
    const root = document.querySelector(".umc-form-sheet")
    expect(root?.tagName).toBe("SECTION")
    expect(root?.firstElementChild).toHaveClass("umc-form-header")
    const content = document.querySelector(".umc-form-sheet__content")
    expect(
      [...(content?.children ?? [])].map((child) => child.className),
    ).toEqual([
      "umc-form-sheet__description",
      "umc-form-sheet__form",
      "umc-form-sheet__control",
    ])
    expect(screen.getByRole("button", { name: "다음" })).toBeInTheDocument()
  })

  it("action을 넘길 때만 오른쪽 위 칸을 그린다", () => {
    const { rerender } = render(
      <FormSheet header={<FormHeader title="지원서" />}>
        <p>질문</p>
      </FormSheet>,
    )
    expect(document.querySelector(".umc-form-sheet__actions")).toBeNull()
    rerender(
      <FormSheet
        header={<FormHeader title="지원서" />}
        action={<button type="button">새 창</button>}
      >
        <p>질문</p>
      </FormSheet>,
    )
    expect(
      screen.getByRole("button", { name: "새 창" }).parentElement,
    ).toHaveClass("umc-form-sheet__actions")
  })

  it("설명과 조작 칸이 없으면 그리지 않는다", () => {
    render(
      <FormSheet header={<FormHeader title="지원서" />}>
        <p>질문</p>
      </FormSheet>,
    )
    expect(document.querySelector(".umc-form-sheet__description")).toBeNull()
    expect(document.querySelector(".umc-form-sheet__control")).toBeNull()
  })

  it("나머지 section 속성과 className을 루트에 붙인다", () => {
    render(
      <FormSheet
        header={<FormHeader title="지원서" />}
        className="mt-4"
        aria-label="지원서"
      >
        <p>질문</p>
      </FormSheet>,
    )
    expect(screen.getByRole("region", { name: "지원서" })).toHaveClass(
      "umc-form-sheet",
      "mt-4",
    )
  })
})
