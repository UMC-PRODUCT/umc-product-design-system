import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ErrorPageContainer } from "./ErrorPageContainer.tsx"

describe("ErrorPageContainer", () => {
  it("제목은 h1, 본문은 문단으로 그린다", () => {
    render(
      <ErrorPageContainer
        title="페이지를 찾을 수 없어요"
        body="입력한 주소가 잘못되었을 수 있어요"
      />,
    )
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "페이지를 찾을 수 없어요",
      }),
    ).toBeInTheDocument()
    expect(screen.getByText("입력한 주소가 잘못되었을 수 있어요").tagName).toBe(
      "P",
    )
  })

  it("본문과 동작 버튼이 없으면 그 자리를 그리지 않는다", () => {
    const { container } = render(<ErrorPageContainer title="준비 중이에요" />)
    expect(
      container.querySelector(".umc-error-page-container__body"),
    ).not.toBeInTheDocument()
    expect(
      container.querySelector(".umc-error-page-container__actions"),
    ).not.toBeInTheDocument()
  })

  it("본문과 동작 버튼이 null, false, 빈 문자열이어도 그 자리를 그리지 않는다", () => {
    const { container, rerender } = render(
      <ErrorPageContainer title="제목" body={null} actions={false} />,
    )
    const bodyOf = () =>
      container.querySelector(".umc-error-page-container__body")
    const actionsOf = () =>
      container.querySelector(".umc-error-page-container__actions")
    expect(bodyOf()).not.toBeInTheDocument()
    expect(actionsOf()).not.toBeInTheDocument()
    rerender(<ErrorPageContainer title="제목" body="" actions={null} />)
    expect(bodyOf()).not.toBeInTheDocument()
    expect(actionsOf()).not.toBeInTheDocument()
  })

  it("본문이 숫자 0이면 그린다", () => {
    render(<ErrorPageContainer title="제목" body={0} />)
    expect(screen.getByText("0")).toHaveClass("umc-error-page-container__body")
  })

  it("actions는 본문 아래 동작 칸에 그린다", () => {
    const { container } = render(
      <ErrorPageContainer
        title="일시적인 오류가 발생했어요"
        actions={
          <>
            <button type="button">이전으로 이동</button>
            <button type="button">새로고침</button>
          </>
        }
      />,
    )
    const actions = container.querySelector(
      ".umc-error-page-container__actions",
    )
    expect(actions).toContainElement(
      screen.getByRole("button", { name: "이전으로 이동" }),
    )
    expect(actions).toContainElement(
      screen.getByRole("button", { name: "새로고침" }),
    )
  })

  it("공사 중 그림은 192x180 장식 SVG로 그린다", () => {
    const { container } = render(<ErrorPageContainer title="제목" />)
    const illustration = container.querySelector(
      ".umc-error-page-container__illustration",
    )
    expect(illustration?.tagName).toBe("svg")
    expect(illustration).toHaveAttribute("aria-hidden", "true")
    expect(illustration).toHaveAttribute("viewBox", "0 0 192 180")
    expect(illustration?.querySelector("linearGradient")).not.toBeNull()
  })

  it("광택 그라데이션은 시작, 중간, 끝 stop을 순서대로 둔다", () => {
    const { container } = render(<ErrorPageContainer title="제목" />)
    const stops = Array.from(
      container.querySelectorAll("linearGradient stop"),
    ).map((stop) => [stop.getAttribute("class"), stop.getAttribute("offset")])
    expect(stops).toEqual([
      ["umc-error-page-container__cone-sheen-start", null],
      ["umc-error-page-container__cone-sheen-middle", "0.653846"],
      ["umc-error-page-container__cone-sheen-end", "1"],
    ])
  })

  it("한 화면에 둘을 그려도 그림의 그라데이션 id가 겹치지 않는다", () => {
    const { container } = render(
      <>
        <ErrorPageContainer title="하나" />
        <ErrorPageContainer title="둘" />
      </>,
    )
    const ids = Array.from(container.querySelectorAll("linearGradient")).map(
      (gradient) => gradient.id,
    )
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    for (const path of container.querySelectorAll("[fill^='url(#']")) {
      const referenced = path.getAttribute("fill")?.slice(5, -1)
      expect(ids).toContain(referenced)
    }
  })

  it("className과 나머지 속성을 루트에 넘긴다", () => {
    const { container } = render(
      <ErrorPageContainer
        title="제목"
        className="custom"
        data-testid="error-page"
      />,
    )
    const root = container.querySelector(".umc-error-page-container")
    expect(root).toHaveClass("custom")
    expect(root).toHaveAttribute("data-testid", "error-page")
  })
})
