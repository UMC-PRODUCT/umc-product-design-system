import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Menu } from "./Menu.tsx"

const baseItems = [
  { label: "수정", onClick: vi.fn() },
  { label: "복사", onClick: vi.fn() },
  { label: "삭제", tone: "danger" as const, onClick: vi.fn() },
  { label: "비활성", disabled: true, onClick: vi.fn() },
]

describe("Menu", () => {
  it("trigger를 클릭하면 메뉴가 열린다", async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>메뉴 열기</button>} items={baseItems} />)
    await user.click(screen.getByText("메뉴 열기"))
    await waitFor(() => expect(screen.getByText("수정")).toBeInTheDocument())
  })

  it("항목 클릭 시 onClick이 호출된다", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Menu
        trigger={<button>메뉴</button>}
        items={[{ label: "수정", onClick }]}
      />,
    )
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("수정"))
    await user.click(screen.getByText("수정"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("tone='danger' 항목에 data-tone 속성이 붙는다", async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>메뉴</button>} items={baseItems} />)
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("삭제"))
    expect(screen.getByText("삭제").closest(".umc-menu__item")).toHaveAttribute(
      "data-tone",
      "danger",
    )
  })

  it("disabled 항목은 onClick이 호출되지 않는다", async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Menu
        trigger={<button>메뉴</button>}
        items={[{ label: "비활성", disabled: true, onClick }]}
      />,
    )
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("비활성"))
    await user.click(screen.getByText("비활성"))
    expect(onClick).not.toHaveBeenCalled()
  })
})
