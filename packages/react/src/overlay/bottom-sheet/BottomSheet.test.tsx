import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { BottomSheet, BottomSheetActions } from "./BottomSheet.tsx"

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
})

describe("BottomSheet", () => {
  it("열린 상태에서 children을 그린다", () => {
    render(
      <BottomSheet open>
        <p>내용입니다</p>
      </BottomSheet>,
    )
    expect(screen.getByText("내용입니다")).toBeInTheDocument()
  })

  it("title을 넘기면 헤더를 그린다", () => {
    render(
      <BottomSheet open title="제목">
        <p>내용</p>
      </BottomSheet>,
    )
    expect(screen.getByText("제목")).toBeInTheDocument()
  })

  it("description을 넘기면 헤더에 그린다", () => {
    render(
      <BottomSheet open title="제목" description="설명입니다">
        <p>내용</p>
      </BottomSheet>,
    )
    expect(screen.getByText("설명입니다")).toBeInTheDocument()
  })

  it("title 없으면 헤더 영역이 없다", () => {
    render(
      <BottomSheet open>
        <p>내용</p>
      </BottomSheet>,
    )
    expect(document.querySelector(".umc-bottom-sheet__header")).toBeNull()
  })

  it("닫힌 상태에서는 팝업이 없다", () => {
    render(
      <BottomSheet>
        <p>내용</p>
      </BottomSheet>,
    )
    expect(document.querySelector(".umc-bottom-sheet__popup")).toBeNull()
  })

  it("titleAlign=center면 data-align=center를 단다", () => {
    render(
      <BottomSheet open title="제목" titleAlign="center">
        <p>내용</p>
      </BottomSheet>,
    )
    expect(document.querySelector(".umc-bottom-sheet__header")).toHaveAttribute(
      "data-align",
      "center",
    )
  })

  it("actions를 넘기면 actions-area를 그린다", () => {
    render(
      <BottomSheet
        open
        actions={
          <BottomSheetActions layout="full" primary={{ label: "확인" }} />
        }
      >
        <p>내용</p>
      </BottomSheet>,
    )
    expect(
      document.querySelector(".umc-bottom-sheet__actions-area"),
    ).not.toBeNull()
  })

  it("DOM 구조: .umc-bottom-sheet__popup > .umc-bottom-sheet__handle", () => {
    render(
      <BottomSheet open>
        <p>내용</p>
      </BottomSheet>,
    )
    const popup = document.querySelector(".umc-bottom-sheet__popup")
    expect(popup).not.toBeNull()
    expect(popup?.querySelector(".umc-bottom-sheet__handle")).not.toBeNull()
  })

  it("팝업은 스와이프와 터치 스크롤을 다루는 viewport 안에 놓인다", () => {
    render(
      <BottomSheet open>
        <p>내용</p>
      </BottomSheet>,
    )
    const popup = document.querySelector(".umc-bottom-sheet__popup")
    expect(popup?.parentElement).toHaveClass("umc-bottom-sheet__viewport")
  })

  it("팝업 바깥(viewport)을 누르면 닫힌다", async () => {
    const onOpenChange = vi.fn()
    render(
      <BottomSheet open onOpenChange={onOpenChange}>
        <p>내용</p>
      </BottomSheet>,
    )
    const viewport = document.querySelector(".umc-bottom-sheet__viewport")
    expect(viewport).not.toBeNull()
    await userEvent.click(viewport as HTMLElement)
    expect(onOpenChange).toHaveBeenCalled()
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(false)
  })

  it("팝업 안을 누르면 닫히지 않는다", async () => {
    const onOpenChange = vi.fn()
    render(
      <BottomSheet open onOpenChange={onOpenChange}>
        <p>내용</p>
      </BottomSheet>,
    )
    await userEvent.click(screen.getByText("내용"))
    expect(onOpenChange).not.toHaveBeenCalled()
  })
})

describe("BottomSheetActions", () => {
  it("full 레이아웃은 버튼 하나를 그린다", () => {
    render(<BottomSheetActions layout="full" primary={{ label: "확인" }} />)
    expect(screen.getAllByRole("button")).toHaveLength(1)
    expect(document.querySelector(".umc-bottom-sheet-actions")).toHaveAttribute(
      "data-layout",
      "full",
    )
  })

  it("stacked 레이아웃은 버튼 둘을 그린다", () => {
    render(
      <BottomSheetActions
        layout="stacked"
        primary={{ label: "확인" }}
        secondary={{ label: "취소" }}
      />,
    )
    expect(screen.getAllByRole("button")).toHaveLength(2)
  })

  it("equal 레이아웃은 버튼 둘을 그린다", () => {
    render(
      <BottomSheetActions
        layout="equal"
        primary={{ label: "확인" }}
        secondary={{ label: "취소" }}
      />,
    )
    expect(screen.getAllByRole("button")).toHaveLength(2)
  })

  it("emphasis 레이아웃은 버튼 둘을 그린다", () => {
    render(
      <BottomSheetActions
        layout="emphasis"
        primary={{ label: "확인" }}
        secondary={{ label: "취소" }}
      />,
    )
    expect(screen.getAllByRole("button")).toHaveLength(2)
  })

  it("primary-top 레이아웃은 주요 버튼 아래에 흰 Weak 버튼을 그린다", () => {
    render(
      <BottomSheetActions
        layout="primary-top"
        primary={{ label: "확인" }}
        secondary={{ label: "나중에" }}
      />,
    )
    const [primary, secondary] = screen.getAllByRole("button")
    expect(primary).toHaveTextContent("확인")
    expect(secondary).toHaveTextContent("나중에")
    expect(secondary).toHaveAttribute("data-variant", "weak")
    expect(secondary).toHaveAttribute("data-color", "white")
    expect(document.querySelector(".umc-text-button")).toBeNull()
  })

  it("모든 레이아웃의 버튼이 md 크기다", () => {
    const layouts = ["stacked", "equal", "emphasis", "primary-top"] as const
    for (const layout of layouts) {
      const { unmount } = render(
        <BottomSheetActions
          layout={layout}
          primary={{ label: "확인" }}
          secondary={{ label: "취소" }}
        />,
      )
      for (const button of screen.getAllByRole("button")) {
        expect(button).toHaveAttribute("data-size", "md")
      }
      unmount()
    }
  })

  it("stacked는 주요 버튼을 먼저, equal과 emphasis는 보조 버튼을 먼저 그린다", () => {
    const orderOf = (layout: "stacked" | "equal" | "emphasis") => {
      const { unmount } = render(
        <BottomSheetActions
          layout={layout}
          primary={{ label: "확인" }}
          secondary={{ label: "취소" }}
        />,
      )
      const labels = screen
        .getAllByRole("button")
        .map((button) => button.textContent)
      unmount()
      return labels
    }
    expect(orderOf("stacked")).toEqual(["확인", "취소"])
    expect(orderOf("equal")).toEqual(["취소", "확인"])
    expect(orderOf("emphasis")).toEqual(["취소", "확인"])
  })

  it("data-layout 속성이 layout prop과 일치한다", () => {
    const { rerender } = render(
      <BottomSheetActions
        layout="equal"
        primary={{ label: "확인" }}
        secondary={{ label: "취소" }}
      />,
    )
    expect(document.querySelector(".umc-bottom-sheet-actions")).toHaveAttribute(
      "data-layout",
      "equal",
    )

    rerender(
      <BottomSheetActions
        layout="emphasis"
        primary={{ label: "확인" }}
        secondary={{ label: "취소" }}
      />,
    )
    expect(document.querySelector(".umc-bottom-sheet-actions")).toHaveAttribute(
      "data-layout",
      "emphasis",
    )
  })
})
