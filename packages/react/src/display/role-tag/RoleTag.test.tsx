import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { RoleTag } from "./RoleTag.tsx"

describe("RoleTag", () => {
  it("기본 size가 sm이고 피그마 기본 변형을 data 속성으로 단다", () => {
    render(<RoleTag color="challenger-super-admin">Admin</RoleTag>)
    const tag = screen.getByText("Admin")
    expect(tag).toHaveAttribute("data-color", "challenger-super-admin")
    expect(tag).toHaveAttribute("data-size", "sm")
    expect(tag).toHaveClass("umc-role-tag")
  })

  it("children을 그대로 렌더한다", () => {
    render(<RoleTag color="central">중앙 운영진</RoleTag>)
    expect(screen.getByText("중앙 운영진")).toBeInTheDocument()
  })

  it("color와 size를 data 속성으로 옮긴다", () => {
    render(
      <RoleTag color="campus" size="lg">
        교내 회장
      </RoleTag>,
    )
    const tag = screen.getByText("교내 회장")
    expect(tag).toHaveAttribute("data-color", "campus")
    expect(tag).toHaveAttribute("data-size", "lg")
  })

  it("className을 umc-role-tag 뒤에 붙이고 ref와 네이티브 속성을 전달한다", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <RoleTag
        ref={ref}
        color="chapter"
        className="ml-2"
        aria-label="역할 태그"
      >
        지부장
      </RoleTag>,
    )
    const tag = screen.getByText("지부장")
    expect(tag.className).toBe("umc-role-tag ml-2")
    expect(tag).toHaveAttribute("aria-label", "역할 태그")
    expect(ref.current).toBe(tag)
  })

  it("5가지 색상 모두 data-color로 렌더한다", () => {
    const colors = [
      "challenger-super-admin",
      "product",
      "central",
      "chapter",
      "campus",
    ] as const

    for (const color of colors) {
      const { unmount } = render(<RoleTag color={color}>{color}</RoleTag>)
      expect(screen.getByText(color)).toHaveAttribute("data-color", color)
      unmount()
    }
  })
})
