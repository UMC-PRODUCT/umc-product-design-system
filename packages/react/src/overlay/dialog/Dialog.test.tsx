import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { Dialog, type DialogColor } from "./Dialog.tsx"

beforeAll(() => {
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
})

const popupOf = () => document.querySelector(".umc-dialog__popup")

describe("Dialog", () => {
  it("제목을 이름으로, 설명을 설명으로 읽는 alertdialog를 연다", () => {
    render(
      <Dialog
        open
        title="지원서를 제출할까요?"
        description="제출하면 수정할 수 없어요."
        confirmLabel="제출"
      />,
    )
    const dialog = screen.getByRole("alertdialog", {
      name: "지원서를 제출할까요?",
    })
    expect(dialog).toHaveAccessibleDescription("제출하면 수정할 수 없어요.")
  })

  it("닫혀 있으면 아무것도 그리지 않는다", () => {
    render(<Dialog title="제목" confirmLabel="확인" />)
    expect(screen.queryByRole("alertdialog")).toBeNull()
  })

  it("cancelLabel이 있으면 취소, 확인 순서의 xs 버튼 두 개를 그린다", () => {
    render(<Dialog open title="제목" confirmLabel="확인" cancelLabel="취소" />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.map((button) => button.textContent)).toEqual([
      "취소",
      "확인",
    ])
    for (const button of buttons) {
      expect(button).toHaveAttribute("data-size", "xs")
    }
    expect(popupOf()).toHaveAttribute("data-button-style", "fill")
  })

  it("cancelLabel이 없으면 sm 텍스트 버튼 하나를 그린다", () => {
    render(<Dialog open title="제목" confirmLabel="확인" />)
    const [button] = screen.getAllByRole("button")
    expect(screen.getAllByRole("button")).toHaveLength(1)
    expect(button).toHaveClass("umc-text-button")
    expect(button).toHaveAttribute("data-size", "sm")
    expect(popupOf()).toHaveAttribute("data-button-style", "weak")
  })

  it.each([
    ["brand", "fill", "brand"],
    ["neutral", "fill", "neutral"],
    ["error", "weak", "red"],
  ] as const)(
    "color %s의 확인 버튼은 %s %s다",
    (color: DialogColor, variant, buttonColor) => {
      render(
        <Dialog
          open
          color={color}
          title="제목"
          confirmLabel="확인"
          cancelLabel="취소"
        />,
      )
      const confirm = screen.getByRole("button", { name: "확인" })
      expect(confirm).toHaveAttribute("data-variant", variant)
      expect(confirm).toHaveAttribute("data-color", buttonColor)
      expect(popupOf()).toHaveAttribute("data-color", color)
    },
  )

  it("error 텍스트 버튼은 버튼 영역에 error 색을 단다", () => {
    render(<Dialog open color="error" title="제목" confirmLabel="삭제" />)
    expect(document.querySelector(".umc-dialog__actions")).toHaveAttribute(
      "data-color",
      "error",
    )
  })

  it("icon은 제목 앞에 화면 낭독기가 읽지 않는 자리로 그린다", () => {
    render(
      <Dialog
        open
        icon={<svg data-testid="icon" />}
        title="저장했어요"
        confirmLabel="확인"
      />,
    )
    const heading = document.querySelector(".umc-dialog__heading")
    const icon = heading?.firstElementChild
    expect(icon).toHaveClass("umc-dialog__icon")
    expect(icon).toHaveAttribute("aria-hidden", "true")
    expect(icon).toContainElement(screen.getByTestId("icon"))
  })

  it("children은 글과 버튼 사이 콘텐츠 영역에 그린다", () => {
    render(
      <Dialog open title="제목" confirmLabel="확인">
        <p>콘텐츠</p>
      </Dialog>,
    )
    const content = document.querySelector(".umc-dialog__content")
    expect(content).toHaveTextContent("콘텐츠")
    expect(content?.previousElementSibling).toHaveClass("umc-dialog__text")
    expect(content?.nextElementSibling).toHaveClass("umc-dialog__actions")
    expect(popupOf()).toHaveAttribute("data-content")
  })

  it("children이 없으면 콘텐츠 영역을 그리지 않는다", () => {
    render(<Dialog open title="제목" confirmLabel="확인" />)
    expect(document.querySelector(".umc-dialog__content")).toBeNull()
    expect(popupOf()).not.toHaveAttribute("data-content")
  })

  it("버튼을 누르면 콜백을 부르고 닫힘을 알린다", () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const onOpenChange = vi.fn()
    render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="제목"
        confirmLabel="확인"
        onConfirm={onConfirm}
        cancelLabel="취소"
        onCancel={onCancel}
      />,
    )
    fireEvent.click(screen.getByRole("button", { name: "취소" }))
    fireEvent.click(screen.getByRole("button", { name: "확인" }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("Esc를 누르면 닫힘을 알린다", async () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="제목"
        confirmLabel="확인"
      />,
    )
    await userEvent.keyboard("{Escape}")
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("바깥을 눌러도 닫히지 않는다", async () => {
    const onOpenChange = vi.fn()
    render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="제목"
        confirmLabel="확인"
      />,
    )
    const viewport = document.querySelector(".umc-dialog__viewport")
    expect(viewport).not.toBeNull()
    await userEvent.click(viewport as HTMLElement)
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("className을 팝업에 붙인다", () => {
    render(
      <Dialog open title="제목" confirmLabel="확인" className="w-[560px]" />,
    )
    expect(popupOf()).toHaveClass("umc-dialog__popup", "w-[560px]")
  })
})
