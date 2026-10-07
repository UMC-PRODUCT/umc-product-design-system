import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"

import { Tooltip } from "./Tooltip.tsx"

beforeAll(() => {
  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      constructor() {}
      root = null
      rootMargin = ""
      thresholds = []
      takeRecords() {
        return []
      }
    }
  }
})

describe("Tooltip (hover)", () => {
  it("포인터가 진입하면 role=tooltip 요소가 나타난다", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="설명 텍스트" openOn="hover">
        <button>트리거</button>
      </Tooltip>,
    )
    const trigger = screen.getByRole("button", { name: "트리거" })
    await user.hover(trigger)
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument()
    })
  })

  it("포인터가 벗어나면 tooltip이 사라진다", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="설명 텍스트" openOn="hover">
        <button>트리거</button>
      </Tooltip>,
    )
    const trigger = screen.getByRole("button", { name: "트리거" })
    await user.hover(trigger)
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument()
    })
    await user.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    })
  })

  it("data-mode와 data-size 속성을 positioner에 단다", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="설명" mode="light" size="sm" openOn="hover">
        <button>트리거</button>
      </Tooltip>,
    )
    const trigger = screen.getByRole("button", { name: "트리거" })
    await user.hover(trigger)
    await waitFor(() => {
      const positioner = document.querySelector(".umc-tooltip__positioner")
      expect(positioner).toHaveAttribute("data-mode", "light")
      expect(positioner).toHaveAttribute("data-size", "sm")
    })
  })

  it("title prop을 넘기면 label 요소가 렌더된다", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="본문" title="제목" mode="light" openOn="hover">
        <button>트리거</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole("button"))
    await waitFor(() => {
      expect(document.querySelector(".umc-tooltip__label")).toBeInTheDocument()
      expect(document.querySelector(".umc-tooltip__label")).toHaveTextContent(
        "제목",
      )
    })
  })
})

describe("Tooltip (click)", () => {
  it("트리거를 클릭하면 열리고 바깥을 클릭하면 닫힌다", async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Tooltip content="클릭 툴팁" openOn="click">
          <button>트리거</button>
        </Tooltip>
        <button>바깥</button>
      </div>,
    )
    const trigger = screen.getByRole("button", { name: "트리거" })
    await user.click(trigger)
    await waitFor(() => {
      expect(document.querySelector(".umc-tooltip__popup")).toBeInTheDocument()
    })
    await user.click(screen.getByRole("button", { name: "바깥" }))
    await waitFor(() => {
      const popup = document.querySelector(".umc-tooltip__popup")
      expect(popup).not.toHaveAttribute("data-open")
    })
  })

  it("data-mode와 data-size 속성을 positioner에 단다", async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content="설명" mode="dark" size="xs" openOn="click">
        <button>트리거</button>
      </Tooltip>,
    )
    await user.click(screen.getByRole("button", { name: "트리거" }))
    await waitFor(() => {
      const positioner = document.querySelector(".umc-tooltip__positioner")
      expect(positioner).toHaveAttribute("data-mode", "dark")
      expect(positioner).toHaveAttribute("data-size", "xs")
    })
  })
})
