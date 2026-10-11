import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { BottomNavigation, BottomNavigationItem } from "./BottomNavigation.tsx"

const HomeIcon = () => <svg data-testid="home-icon" />
const SearchIcon = () => <svg data-testid="search-icon" />

describe("BottomNavigation", () => {
  it("renders as nav element", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/"
          label="홈"
          icon={<HomeIcon />}
          currentPath="/"
        />
      </BottomNavigation>,
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/"
          label="홈"
          icon={<HomeIcon />}
          currentPath="/"
        />
        <BottomNavigationItem
          href="/search"
          label="검색"
          icon={<SearchIcon />}
          currentPath="/"
        />
      </BottomNavigation>,
    )
    expect(screen.getByText("홈")).toBeInTheDocument()
    expect(screen.getByText("검색")).toBeInTheDocument()
  })

  it("accepts custom className", () => {
    const { container } = render(
      <BottomNavigation className="custom">
        <BottomNavigationItem href="/" label="홈" icon={<HomeIcon />} />
      </BottomNavigation>,
    )
    expect(container.querySelector("nav")).toHaveClass("custom")
  })
})

describe("BottomNavigationItem", () => {
  it("renders as link element", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/" label="홈" icon={<HomeIcon />} />
      </BottomNavigation>,
    )
    expect(screen.getByRole("link", { name: "홈" })).toBeInTheDocument()
  })

  it("sets aria-current=page when current path matches href", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/"
          label="홈"
          icon={<HomeIcon />}
          currentPath="/"
        />
      </BottomNavigation>,
    )
    expect(screen.getByRole("link", { name: "홈" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("does not set aria-current when path does not match", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/search"
          label="검색"
          icon={<SearchIcon />}
          currentPath="/"
        />
      </BottomNavigation>,
    )
    expect(screen.getByRole("link", { name: "검색" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("does not set aria-current when currentPath is not provided", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/" label="홈" icon={<HomeIcon />} />
      </BottomNavigation>,
    )
    expect(screen.getByRole("link", { name: "홈" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("renders icon with aria-hidden", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem href="/" label="홈" icon={<HomeIcon />} />
      </BottomNavigation>,
    )
    const iconWrapper = screen
      .getByRole("link", { name: "홈" })
      .querySelector(".umc-bottom-navigation__item-icon")
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true")
  })

  it("renders label text", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/profile"
          label="프로필"
          icon={<HomeIcon />}
        />
      </BottomNavigation>,
    )
    expect(screen.getByText("프로필")).toBeInTheDocument()
  })

  it("accepts href attribute", () => {
    render(
      <BottomNavigation>
        <BottomNavigationItem
          href="/search"
          label="검색"
          icon={<SearchIcon />}
        />
      </BottomNavigation>,
    )
    expect(screen.getByRole("link", { name: "검색" })).toHaveAttribute(
      "href",
      "/search",
    )
  })
})
