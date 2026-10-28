import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { TopNavigation, TopNavigationButton } from "./TopNavigation.tsx"

describe("TopNavigation", () => {
  it("renders title", () => {
    render(<TopNavigation title="홈" />)
    expect(screen.getByText("홈")).toBeInTheDocument()
  })

  it("renders as header element", () => {
    const { container } = render(<TopNavigation title="홈" />)
    expect(container.querySelector("header")).toBeInTheDocument()
  })

  it("applies center title alignment via data attribute", () => {
    const { container } = render(
      <TopNavigation title="설정" titleAlign="center" />,
    )
    const header = container.querySelector("header")
    expect(header).toHaveAttribute("data-title-align", "center")
  })

  it("defaults to start title alignment", () => {
    const { container } = render(<TopNavigation title="홈" />)
    const header = container.querySelector("header")
    expect(header).toHaveAttribute("data-title-align", "start")
  })

  it("renders back button with default label when back prop is provided", () => {
    render(<TopNavigation title="상세" back={{}} />)
    expect(screen.getByLabelText("뒤로 가기")).toBeInTheDocument()
  })

  it("renders back button with custom label", () => {
    render(<TopNavigation title="상세" back={{ label: "이전" }} />)
    expect(screen.getByLabelText("이전")).toBeInTheDocument()
  })

  it("calls back onClick when back button is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TopNavigation title="상세" back={{ onClick: handleClick }} />)
    await user.click(screen.getByLabelText("뒤로 가기"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders back button as link when href is provided", () => {
    render(<TopNavigation title="상세" back={{ href: "/prev" }} />)
    const backLink = screen.getByLabelText("뒤로 가기")
    expect(backLink.tagName.toLowerCase()).toBe("a")
    expect(backLink).toHaveAttribute("href", "/prev")
  })

  it("sets data-has-back when back prop is provided", () => {
    const { container } = render(<TopNavigation title="상세" back={{}} />)
    const header = container.querySelector("header")
    expect(header).toHaveAttribute("data-has-back", "")
  })

  it("does not set data-has-back when back prop is absent", () => {
    const { container } = render(<TopNavigation title="홈" />)
    const header = container.querySelector("header")
    expect(header).not.toHaveAttribute("data-has-back")
  })

  it("renders actions slot", () => {
    render(
      <TopNavigation
        title="홈"
        actions={<button type="button">공유</button>}
      />,
    )
    expect(screen.getByRole("button", { name: "공유" })).toBeInTheDocument()
  })

  it("renders dropdown title button when onTitleClick is provided", () => {
    render(<TopNavigation title="지부 선택" onTitleClick={vi.fn()} />)
    expect(
      screen.getByRole("button", { name: /지부 선택/ }),
    ).toBeInTheDocument()
  })

  it("sets aria-expanded on title button", () => {
    render(
      <TopNavigation
        title="지부 선택"
        onTitleClick={vi.fn()}
        titleExpanded={true}
      />,
    )
    const btn = screen.getByRole("button", { name: /지부 선택/ })
    expect(btn).toHaveAttribute("aria-expanded", "true")
  })

  it("calls onTitleClick when title button is clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TopNavigation title="지부 선택" onTitleClick={handleClick} />)
    await user.click(screen.getByRole("button", { name: /지부 선택/ }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders subtitle under the centered title", () => {
    const { container } = render(
      <TopNavigation title="학습 일정" titleAlign="center" subtitle="11기" />,
    )
    const titleArea = container.querySelector(".umc-top-navigation__title")
    expect(titleArea?.lastElementChild).toHaveClass(
      "umc-top-navigation__subtitle",
    )
    expect(titleArea?.lastElementChild).toHaveTextContent("11기")
  })

  it("does not render subtitle when it is absent", () => {
    const { container } = render(
      <TopNavigation title="학습 일정" titleAlign="center" />,
    )
    expect(
      container.querySelector(".umc-top-navigation__subtitle"),
    ).not.toBeInTheDocument()
  })

  it("leaves the title area empty when title is absent", () => {
    const { container } = render(<TopNavigation back={{}} />)
    expect(
      container.querySelector(".umc-top-navigation__title"),
    ).toBeEmptyDOMElement()
    expect(screen.getByLabelText("뒤로 가기")).toBeInTheDocument()
  })

  it("accepts custom className", () => {
    const { container } = render(
      <TopNavigation title="홈" className="custom-class" />,
    )
    expect(container.querySelector("header")).toHaveClass("custom-class")
  })
})

describe("TopNavigationButton", () => {
  it("renders as button element", () => {
    render(
      <TopNavigationButton variant="icon" aria-label="검색">
        <svg />
      </TopNavigationButton>,
    )
    expect(screen.getByRole("button", { name: "검색" })).toBeInTheDocument()
  })

  it("sets data-variant=icon for icon variant", () => {
    render(
      <TopNavigationButton variant="icon" aria-label="검색">
        <svg />
      </TopNavigationButton>,
    )
    const btn = screen.getByRole("button", { name: "검색" })
    expect(btn).toHaveAttribute("data-variant", "icon")
  })

  it("sets data-variant=text for text variant", () => {
    render(<TopNavigationButton variant="text">완료</TopNavigationButton>)
    const btn = screen.getByRole("button", { name: "완료" })
    expect(btn).toHaveAttribute("data-variant", "text")
  })

  it("sets data-color for text variant", () => {
    render(
      <TopNavigationButton variant="text" color="neutral">
        취소
      </TopNavigationButton>,
    )
    const btn = screen.getByRole("button", { name: "취소" })
    expect(btn).toHaveAttribute("data-color", "neutral")
  })

  it("defaults to primary color for text variant", () => {
    render(<TopNavigationButton variant="text">완료</TopNavigationButton>)
    const btn = screen.getByRole("button", { name: "완료" })
    expect(btn).toHaveAttribute("data-color", "primary")
  })

  it("does not set data-color for icon variant", () => {
    render(
      <TopNavigationButton variant="icon" aria-label="닫기">
        <svg />
      </TopNavigationButton>,
    )
    const btn = screen.getByRole("button", { name: "닫기" })
    expect(btn).not.toHaveAttribute("data-color")
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <TopNavigationButton variant="text" onClick={handleClick}>
        완료
      </TopNavigationButton>,
    )
    await user.click(screen.getByRole("button", { name: "완료" }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("defaults to type=button", () => {
    render(<TopNavigationButton variant="text">완료</TopNavigationButton>)
    expect(screen.getByRole("button", { name: "완료" })).toHaveAttribute(
      "type",
      "button",
    )
  })
})
