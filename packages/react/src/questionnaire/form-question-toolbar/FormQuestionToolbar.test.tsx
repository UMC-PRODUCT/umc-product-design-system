import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RadioIcon, TextLineIcon } from "@umc-product/icons"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import type { FormQuestionTypeOption } from "../form-question-type-list/FormQuestionTypeList.tsx"
import { FormQuestionToolbar } from "./FormQuestionToolbar.tsx"

const TYPES: readonly FormQuestionTypeOption[] = [
  { value: "short", label: "주관식", icon: <TextLineIcon /> },
  { value: "single", label: "단일 선택", icon: <RadioIcon /> },
]

describe("FormQuestionToolbar", () => {
  it("처음에는 질문 추가 버튼만 그린다", () => {
    render(<FormQuestionToolbar items={TYPES} />)
    const button = screen.getByRole("button", { name: "질문 추가" })
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(button).not.toHaveAttribute("aria-controls")
    expect(screen.queryByRole("toolbar")).toBeNull()
  })

  it("누르면 유형 버튼 묶음을 열고 첫 유형으로 포커스를 옮긴다", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<FormQuestionToolbar items={TYPES} onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole("button", { name: "질문 추가" }))

    expect(onOpenChange).toHaveBeenCalledWith(true)
    const menu = screen.getByRole("toolbar", { name: "질문 유형" })
    const close = screen.getByRole("button", { name: "질문 유형 닫기" })
    expect(close).toHaveAttribute("aria-expanded", "true")
    expect(close).toHaveAttribute("aria-controls", menu.id)
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "주관식" })).toHaveFocus(),
    )

    await user.click(close)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(screen.queryByRole("toolbar")).toBeNull()
  })

  it("유형 버튼은 누를 때마다 값을 넘기고 눌림 상태를 두지 않는다", async () => {
    const user = userEvent.setup()
    const onTypeSelect = vi.fn()
    render(
      <FormQuestionToolbar
        items={TYPES}
        defaultOpen
        onTypeSelect={onTypeSelect}
      />,
    )
    const single = screen.getByRole("button", { name: "단일 선택" })
    await user.click(single)
    await user.click(single)
    expect(onTypeSelect).toHaveBeenNthCalledWith(1, "single")
    expect(onTypeSelect).toHaveBeenNthCalledWith(2, "single")
    expect(single).not.toHaveAttribute("aria-pressed")
    expect(screen.getByRole("toolbar", { name: "질문 유형" })).toBeVisible()
  })

  it("화살표 키로 유형 사이를 옮긴다", async () => {
    const user = userEvent.setup()
    render(<FormQuestionToolbar items={TYPES} />)
    await user.click(screen.getByRole("button", { name: "질문 추가" }))
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "주관식" })).toHaveFocus(),
    )
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("button", { name: "단일 선택" })).toHaveFocus()
  })

  it("open을 넘기면 그 값을 따른다", async () => {
    function Controlled() {
      const [open, setOpen] = useState(true)
      return (
        <>
          <FormQuestionToolbar
            items={TYPES}
            open={open}
            onOpenChange={setOpen}
          />
          <output>{open ? "열림" : "닫힘"}</output>
        </>
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    expect(screen.getByRole("toolbar", { name: "질문 유형" })).toBeVisible()
    await user.click(screen.getByRole("button", { name: "질문 유형 닫기" }))
    expect(screen.getByRole("status")).toHaveTextContent("닫힘")
    expect(screen.queryByRole("toolbar")).toBeNull()
  })

  it("disabled이면 버튼을 누를 수 없다", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <FormQuestionToolbar
        items={TYPES}
        onOpenChange={onOpenChange}
        disabled
      />,
    )
    await user.click(screen.getByRole("button", { name: "질문 추가" }))
    expect(onOpenChange).not.toHaveBeenCalled()
  })
})
