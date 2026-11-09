import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { PaginationBar } from "./PaginationBar.tsx"

const dotButton = (page: number) =>
  screen.getByRole("button", { name: `${page}번째 슬라이드` })

const previousButton = () => screen.getByRole("button", { name: "이전" })

const nextButton = () => screen.getByRole("button", { name: "다음" })

const dots = () => within(screen.getByRole("list")).getAllByRole("button")

const pulseRing = () => document.querySelector(".umc-pulse-ring")

describe("PaginationBar", () => {
  it("슬라이드 이동 그룹 안에 페이지 수만큼 점을 그리고 현재 점에 aria-current를 단다", () => {
    render(<PaginationBar totalPages={9} defaultPage={3} />)
    expect(screen.getByRole("group", { name: "슬라이드 이동" })).toHaveClass(
      "umc-pagination-bar",
    )
    expect(dots()).toHaveLength(9)
    expect(dotButton(3)).toHaveAttribute("aria-current", "true")
    expect(dotButton(1)).not.toHaveAttribute("aria-current")
  })

  it("첫 페이지에서는 이전 화살표, 마지막 페이지에서는 다음 화살표가 비활성이다", () => {
    const { rerender } = render(<PaginationBar totalPages={4} page={1} />)
    expect(previousButton()).toBeDisabled()
    expect(nextButton()).toBeEnabled()
    rerender(<PaginationBar totalPages={4} page={2} />)
    expect(previousButton()).toBeEnabled()
    expect(nextButton()).toBeEnabled()
    rerender(<PaginationBar totalPages={4} page={4} />)
    expect(previousButton()).toBeEnabled()
    expect(nextButton()).toBeDisabled()
  })

  it("점을 누르면 그 페이지로 옮기고 onPageChange를 부른다", async () => {
    const onPageChange = vi.fn()
    render(<PaginationBar totalPages={4} onPageChange={onPageChange} />)
    await userEvent.click(dotButton(3))
    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(dotButton(3)).toHaveAttribute("aria-current", "true")
  })

  it("현재 점을 다시 누르면 onPageChange를 부르지 않는다", async () => {
    const onPageChange = vi.fn()
    render(<PaginationBar totalPages={4} onPageChange={onPageChange} />)
    await userEvent.click(dotButton(1))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it("화살표는 한 페이지씩 옮긴다", async () => {
    const onPageChange = vi.fn()
    render(
      <PaginationBar
        totalPages={4}
        defaultPage={2}
        onPageChange={onPageChange}
      />,
    )
    await userEvent.click(nextButton())
    expect(onPageChange).toHaveBeenLastCalledWith(3)
    expect(dotButton(3)).toHaveAttribute("aria-current", "true")
    await userEvent.click(previousButton())
    expect(onPageChange).toHaveBeenLastCalledWith(2)
    expect(dotButton(2)).toHaveAttribute("aria-current", "true")
  })

  it("제어형이면 부모가 page를 바꿀 때까지 현재 점을 그대로 둔다", async () => {
    const onPageChange = vi.fn()
    render(
      <PaginationBar totalPages={4} page={1} onPageChange={onPageChange} />,
    )
    await userEvent.click(dotButton(2))
    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(dotButton(1)).toHaveAttribute("aria-current", "true")
  })

  it("highlightNext면 다음 화살표 안에 장식용 펄스 링을 그린다", () => {
    render(<PaginationBar totalPages={4} highlightNext />)
    const ring = pulseRing()
    expect(ring).not.toBeNull()
    expect(ring).toHaveAttribute("aria-hidden", "true")
    expect(nextButton()).toContainElement(ring as HTMLElement)
  })

  it("highlightNext가 없거나 마지막 페이지면 펄스 링을 그리지 않는다", () => {
    const { rerender } = render(<PaginationBar totalPages={4} />)
    expect(pulseRing()).toBeNull()
    rerender(<PaginationBar totalPages={4} page={4} highlightNext />)
    expect(pulseRing()).toBeNull()
  })

  it("controls를 넘기면 화살표와 점이 그 요소를 aria-controls로 가리킨다", () => {
    render(<PaginationBar totalPages={2} controls="guide-slides" />)
    expect(previousButton()).toHaveAttribute("aria-controls", "guide-slides")
    expect(nextButton()).toHaveAttribute("aria-controls", "guide-slides")
    expect(dotButton(2)).toHaveAttribute("aria-controls", "guide-slides")
  })

  it("접근성 이름을 바꿀 수 있다", () => {
    render(
      <PaginationBar
        totalPages={3}
        defaultPage={2}
        aria-label="공지 안내"
        previousLabel="Previous"
        nextLabel="Next"
        pageLabel={(page) => `Notice ${page}`}
      />,
    )
    expect(screen.getByRole("group", { name: "공지 안내" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Notice 2" })).toHaveAttribute(
      "aria-current",
      "true",
    )
  })

  it("페이지가 하나면 점 하나에 화살표 둘 다 비활성이고, 없으면 아무것도 그리지 않는다", () => {
    const { rerender, container } = render(<PaginationBar totalPages={1} />)
    expect(dots()).toHaveLength(1)
    expect(previousButton()).toBeDisabled()
    expect(nextButton()).toBeDisabled()
    rerender(<PaginationBar totalPages={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("범위를 벗어난 page는 가까운 끝 페이지로 맞춘다", () => {
    render(<PaginationBar totalPages={4} page={9} />)
    expect(dotButton(4)).toHaveAttribute("aria-current", "true")
  })

  it("className을 umc-pagination-bar 뒤에 붙이고 ref를 루트에 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(<PaginationBar ref={ref} totalPages={4} className="mx-auto" />)
    const group = screen.getByRole("group")
    expect(group.className).toBe("umc-pagination-bar mx-auto")
    expect(ref.current).toBe(group)
  })
})
