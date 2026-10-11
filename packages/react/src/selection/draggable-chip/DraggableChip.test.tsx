import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { DraggableChip } from "./DraggableChip.tsx"

describe("DraggableChip", () => {
  it("div 엘리먼트를 렌더한다", () => {
    const { container } = render(<DraggableChip>항목</DraggableChip>)
    expect(container.querySelector(".umc-draggable-chip")).toBeInstanceOf(
      HTMLDivElement,
    )
  })

  it("드래그 핸들 아이콘 래퍼가 aria-hidden이다", () => {
    const { container } = render(<DraggableChip>항목</DraggableChip>)
    const handle = container.querySelector(".umc-draggable-chip__handle")
    expect(handle).toHaveAttribute("aria-hidden", "true")
  })

  it("ref를 div 엘리먼트에 전달한다", () => {
    const ref = createRef<HTMLDivElement>()
    render(<DraggableChip ref={ref}>항목</DraggableChip>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("임의의 aria 속성을 루트 div에 전달한다", () => {
    const { container } = render(
      <DraggableChip
        aria-roledescription="끌어다 놓을 수 있는 항목"
        aria-label="항목 1"
      >
        항목
      </DraggableChip>,
    )
    const div = container.querySelector(".umc-draggable-chip")
    expect(div).toHaveAttribute(
      "aria-roledescription",
      "끌어다 놓을 수 있는 항목",
    )
    expect(div).toHaveAttribute("aria-label", "항목 1")
  })

  it("tabIndex를 루트 div에 전달한다", () => {
    const { container } = render(
      <DraggableChip tabIndex={0}>항목</DraggableChip>,
    )
    expect(container.querySelector(".umc-draggable-chip")).toHaveAttribute(
      "tabindex",
      "0",
    )
  })

  it("onPointerDown 핸들러를 루트 div에 전달한다", () => {
    const onPointerDown = vi.fn()
    const { container } = render(
      <DraggableChip onPointerDown={onPointerDown}>항목</DraggableChip>,
    )
    const div = container.querySelector(".umc-draggable-chip") as HTMLElement
    div.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
    expect(onPointerDown).toHaveBeenCalledTimes(1)
  })

  it("style 속성을 루트 div에 전달한다", () => {
    const { container } = render(
      <DraggableChip style={{ transform: "translateY(0px)" }}>
        항목
      </DraggableChip>,
    )
    const div = container.querySelector(".umc-draggable-chip") as HTMLElement
    expect(div.style.transform).toBe("translateY(0px)")
  })

  it("data-variant, data-color 속성을 붙인다", () => {
    const { container } = render(
      <DraggableChip variant="fill" color="neutral">
        항목
      </DraggableChip>,
    )
    const div = container.querySelector(".umc-draggable-chip")
    expect(div).toHaveAttribute("data-variant", "fill")
    expect(div).toHaveAttribute("data-color", "neutral")
  })

  it("className을 기본 클래스와 합친다", () => {
    const { container } = render(
      <DraggableChip className="my-class">항목</DraggableChip>,
    )
    const div = container.querySelector(".umc-draggable-chip")
    expect(div).toHaveClass("umc-draggable-chip", "my-class")
  })
})
