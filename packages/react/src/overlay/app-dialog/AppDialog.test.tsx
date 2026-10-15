import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { AppDialog } from "./AppDialog.tsx"

beforeAll(() => {
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
})

describe("AppDialog", () => {
  it("열린 상태에서 title을 그린다", () => {
    render(<AppDialog open title="삭제할까요?" confirmLabel="확인" />)
    expect(screen.getByText("삭제할까요?")).toBeInTheDocument()
  })

  it("description을 넘기면 렌더링한다", () => {
    render(
      <AppDialog
        open
        title="삭제할까요?"
        description="삭제된 데이터는 복구할 수 없습니다."
        confirmLabel="확인"
      />,
    )
    expect(
      screen.getByText("삭제된 데이터는 복구할 수 없습니다."),
    ).toBeInTheDocument()
  })

  it("description 없으면 렌더링하지 않는다", () => {
    render(<AppDialog open title="확인" confirmLabel="확인" />)
    expect(screen.queryByRole("paragraph")).toBeNull()
  })

  it("cancelLabel 없으면 버튼이 하나다", () => {
    render(<AppDialog open title="완료되었습니다." confirmLabel="확인" />)
    expect(screen.getAllByRole("button")).toHaveLength(1)
  })

  it("cancelLabel 있으면 버튼이 둘이다", () => {
    render(
      <AppDialog
        open
        title="삭제할까요?"
        confirmLabel="삭제"
        cancelLabel="취소"
      />,
    )
    expect(screen.getAllByRole("button")).toHaveLength(2)
  })

  it("onConfirm을 호출한다", () => {
    const onConfirm = vi.fn()
    render(
      <AppDialog open title="확인" confirmLabel="확인" onConfirm={onConfirm} />,
    )
    fireEvent.click(screen.getByRole("button", { name: "확인" }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it("onCancel을 호출한다", () => {
    const onCancel = vi.fn()
    render(
      <AppDialog
        open
        title="삭제할까요?"
        confirmLabel="삭제"
        cancelLabel="취소"
        onCancel={onCancel}
      />,
    )
    fireEvent.click(screen.getByRole("button", { name: "취소" }))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it("cancelLabel이 있으면 data-layout=alert, 없으면 confirm이다", () => {
    const { rerender } = render(
      <AppDialog open title="확인" confirmLabel="확인" />,
    )
    expect(document.querySelector(".umc-app-dialog__text")).toHaveAttribute(
      "data-layout",
      "confirm",
    )

    rerender(
      <AppDialog open title="확인" confirmLabel="확인" cancelLabel="취소" />,
    )
    expect(document.querySelector(".umc-app-dialog__text")).toHaveAttribute(
      "data-layout",
      "alert",
    )
  })

  it("닫힌 상태에서는 팝업이 없다", () => {
    render(<AppDialog title="확인" confirmLabel="확인" />)
    expect(document.querySelector(".umc-app-dialog__popup")).toBeNull()
  })

  it("DOM 구조: .umc-app-dialog__popup > .umc-app-dialog__text > .umc-app-dialog__title", () => {
    render(<AppDialog open title="제목" confirmLabel="확인" />)
    const popup = document.querySelector(".umc-app-dialog__popup")
    expect(popup).not.toBeNull()
    const text = popup?.querySelector(".umc-app-dialog__text")
    expect(text).not.toBeNull()
    expect(text?.querySelector(".umc-app-dialog__title")).not.toBeNull()
  })
})
