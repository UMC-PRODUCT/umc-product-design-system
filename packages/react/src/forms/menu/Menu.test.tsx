import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Menu } from "./Menu.tsx"

const baseItems = [
  { label: "수정", onClick: vi.fn() },
  { label: "복사", onClick: vi.fn() },
  { label: "삭제", onClick: vi.fn() },
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

  it("항목에 Dropdown/Item 크기를 data-size로 단다", async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>메뉴</button>} items={baseItems} size="xs" />)
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("삭제"))
    expect(screen.getByRole("menuitem", { name: "삭제" })).toHaveAttribute(
      "data-size",
      "xs",
    )
  })

  it("목록에도 크기를 data-size로 달아 최소 폭을 고른다", async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>메뉴</button>} items={baseItems} size="md" />)
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("삭제"))
    expect(screen.getByRole("menu")).toHaveAttribute("data-size", "md")
  })

  it("title을 넘기면 항목 묶음의 이름으로 읽힌다", async () => {
    const user = userEvent.setup()
    render(
      <Menu trigger={<button>메뉴</button>} items={baseItems} title="정렬" />,
    )
    await user.click(screen.getByText("메뉴"))
    const group = await screen.findByRole("group", { name: "정렬" })
    expect(group).toContainElement(
      screen.getByRole("menuitem", { name: "수정" }),
    )
  })

  it("title이 없으면 항목 묶음을 만들지 않는다", async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>메뉴</button>} items={baseItems} />)
    await user.click(screen.getByText("메뉴"))
    await waitFor(() => screen.getByText("수정"))
    expect(screen.queryByRole("group")).not.toBeInTheDocument()
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
