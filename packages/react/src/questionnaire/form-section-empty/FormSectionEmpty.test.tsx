import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"

import { FormSectionEmpty } from "./FormSectionEmpty.tsx"

const emptyOf = () => {
  const empty = document.querySelector(".umc-form-section-empty")
  if (empty === null) throw new Error("빈 섹션 안내가 없습니다")
  return empty
}

describe("FormSectionEmpty", () => {
  it("문구를 넘기지 않으면 질문을 더하거나 옮겨 오라는 기본 문구를 그린다", () => {
    render(<FormSectionEmpty />)
    expect(
      screen.getByText("질문을 추가하거나 다른 섹션에서 옮겨 오세요"),
    ).toBeVisible()
  })

  it("children을 넘기면 기본 문구 대신 그린다", () => {
    render(<FormSectionEmpty>아직 파트 문항이 없어요</FormSectionEmpty>)
    expect(screen.getByText("아직 파트 문항이 없어요")).toBeVisible()
    expect(
      screen.queryByText("질문을 추가하거나 다른 섹션에서 옮겨 오세요"),
    ).toBeNull()
  })

  it("끄는 동안 놓을 수 있는 자리이면 data-drop-target을 단다", () => {
    const { rerender } = render(<FormSectionEmpty />)
    expect(emptyOf()).not.toHaveAttribute("data-drop-target")
    rerender(<FormSectionEmpty dropTarget />)
    expect(emptyOf()).toHaveAttribute("data-drop-target", "")
  })

  it("ref와 나머지 div 속성을 루트에 붙인다", () => {
    const ref = createRef<HTMLDivElement>()
    render(<FormSectionEmpty ref={ref} id="pm-empty" className="mt-4" />)
    expect(ref.current).toBe(emptyOf())
    expect(emptyOf()).toHaveAttribute("id", "pm-empty")
    expect(emptyOf()).toHaveClass("umc-form-section-empty", "mt-4")
  })
})
