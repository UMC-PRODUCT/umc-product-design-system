import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { Pagination } from "./Pagination.tsx"

const pageButton = (page: number) =>
  screen.getByRole("button", { name: `${page}페이지` })

const previousButton = () =>
  screen.queryByRole("button", { name: "이전 페이지" })

const nextButton = () => screen.queryByRole("button", { name: "다음 페이지" })

const visiblePages = () =>
  within(screen.getByRole("list"))
    .getAllByRole("button")
    .map((button) => button.textContent)

describe("Pagination", () => {
  it("페이지 이동 내비게이션 안에 번호 목록을 그리고 현재 번호에 aria-current를 단다", () => {
    render(<Pagination totalPages={4} defaultPage={2} />)
    expect(screen.getByRole("navigation", { name: "페이지 이동" })).toHaveClass(
      "umc-pagination",
    )
    expect(visiblePages()).toEqual(["1", "2", "3", "4"])
    expect(pageButton(2)).toHaveAttribute("aria-current", "page")
    expect(pageButton(1)).not.toHaveAttribute("aria-current")
  })

  it("넘어갈 페이지가 없는 쪽의 화살표는 그리지 않는다", () => {
    const { rerender } = render(<Pagination totalPages={4} page={1} />)
    expect(previousButton()).toBeNull()
    expect(nextButton()).toBeInTheDocument()
    rerender(<Pagination totalPages={4} page={2} />)
    expect(previousButton()).toBeInTheDocument()
    expect(nextButton()).toBeInTheDocument()
    rerender(<Pagination totalPages={4} page={4} />)
    expect(previousButton()).toBeInTheDocument()
    expect(nextButton()).toBeNull()
  })

  it("번호를 누르면 그 페이지로 옮기고 onPageChange를 부른다", async () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={4} onPageChange={onPageChange} />)
    await userEvent.click(pageButton(3))
    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(pageButton(3)).toHaveAttribute("aria-current", "page")
  })

  it("현재 번호를 다시 누르면 onPageChange를 부르지 않는다", async () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={4} onPageChange={onPageChange} />)
    await userEvent.click(pageButton(1))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it("화살표는 한 페이지씩 옮기고 번호 창을 한 칸씩 민다", async () => {
    render(<Pagination totalPages={10} defaultPage={4} />)
    expect(visiblePages()).toEqual(["3", "4", "5", "6"])
    const next = nextButton()
    if (next === null) throw new Error("다음 화살표가 없다")
    await userEvent.click(next)
    expect(visiblePages()).toEqual(["4", "5", "6", "7"])
    expect(pageButton(5)).toHaveAttribute("aria-current", "page")
    const previous = previousButton()
    if (previous === null) throw new Error("이전 화살표가 없다")
    await userEvent.click(previous)
    expect(visiblePages()).toEqual(["3", "4", "5", "6"])
    expect(pageButton(4)).toHaveAttribute("aria-current", "page")
  })

  it("제어형이면 부모가 page를 바꿀 때까지 현재 번호를 그대로 둔다", async () => {
    const onPageChange = vi.fn()
    render(<Pagination totalPages={4} page={1} onPageChange={onPageChange} />)
    await userEvent.click(pageButton(2))
    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(pageButton(1)).toHaveAttribute("aria-current", "page")
  })

  it("화살표를 눌러 끝 페이지에 닿으면 사라진 화살표 대신 현재 번호에 포커스를 둔다", async () => {
    render(<Pagination totalPages={4} defaultPage={2} />)
    const previous = previousButton()
    if (previous === null) throw new Error("이전 화살표가 없다")
    await userEvent.click(previous)
    expect(previousButton()).toBeNull()
    expect(pageButton(1)).toHaveFocus()
  })

  it("화살표가 남아 있으면 포커스를 화살표에 그대로 둔다", async () => {
    render(<Pagination totalPages={10} defaultPage={4} />)
    const next = nextButton()
    if (next === null) throw new Error("다음 화살표가 없다")
    await userEvent.click(next)
    expect(nextButton()).toHaveFocus()
  })

  it("페이지가 하나면 화살표 없이 번호 하나만, 없으면 아무것도 그리지 않는다", () => {
    const { rerender, container } = render(<Pagination totalPages={1} />)
    expect(visiblePages()).toEqual(["1"])
    expect(previousButton()).toBeNull()
    expect(nextButton()).toBeNull()
    rerender(<Pagination totalPages={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("범위를 벗어난 page는 가까운 끝 페이지로 맞춘다", () => {
    render(<Pagination totalPages={4} page={9} />)
    expect(pageButton(4)).toHaveAttribute("aria-current", "page")
  })

  it("visibleCount로 한 번에 보이는 번호 수를 바꾼다", () => {
    render(<Pagination totalPages={10} defaultPage={6} visibleCount={5} />)
    expect(visiblePages()).toEqual(["5", "6", "7", "8", "9"])
  })

  it("접근성 이름을 바꿀 수 있다", () => {
    render(
      <Pagination
        totalPages={4}
        defaultPage={2}
        aria-label="프로젝트 목록 페이지"
        previousLabel="Previous"
        nextLabel="Next"
        pageLabel={(page) => `Page ${page}`}
      />,
    )
    expect(
      screen.getByRole("navigation", { name: "프로젝트 목록 페이지" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("className을 umc-pagination 뒤에 붙이고 ref를 nav에 넘긴다", () => {
    const ref = createRef<HTMLElement>()
    render(<Pagination ref={ref} totalPages={4} className="mx-auto" />)
    const nav = screen.getByRole("navigation")
    expect(nav.className).toBe("umc-pagination mx-auto")
    expect(ref.current).toBe(nav)
  })
})
