import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { BottomSheetActions } from "../bottom-sheet/BottomSheet.tsx"
import { Panel, PanelCloseButton } from "./Panel.tsx"

beforeAll(() => {
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
})

const popupOf = () => document.querySelector(".umc-panel__popup")

describe("Panel", () => {
  it("제목을 이름으로, 설명을 설명으로 읽는 dialog를 연다", () => {
    render(
      <Panel
        open
        title="모집 공고 복제하기"
        description="선택한 학교에 추가돼요"
      >
        <p>본문</p>
      </Panel>,
    )
    const dialog = screen.getByRole("dialog", { name: "모집 공고 복제하기" })
    expect(dialog).toHaveAccessibleDescription("선택한 학교에 추가돼요")
  })

  it("닫혀 있으면 아무것도 그리지 않는다", () => {
    render(
      <Panel title="제목">
        <p>본문</p>
      </Panel>,
    )
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("children은 머리 아래 스크롤 영역에 그린다", () => {
    render(
      <Panel open title="제목">
        <p>본문</p>
      </Panel>,
    )
    const content = document.querySelector(".umc-panel__content")
    expect(content).toHaveTextContent("본문")
    expect(content?.previousElementSibling).toHaveClass("umc-panel__header")
  })

  it("control과 actions가 없으면 아래쪽 영역을 그리지 않는다", () => {
    render(
      <Panel open title="제목">
        <p>본문</p>
      </Panel>,
    )
    expect(document.querySelector(".umc-panel__footer")).toBeNull()
  })

  it("control은 스크롤 영역 밖, 버튼 영역 위에 그린다", () => {
    render(
      <Panel
        open
        title="제목"
        control={<span>선택 3</span>}
        actions={
          <BottomSheetActions
            layout="emphasis"
            primary={{ label: "복제하기" }}
            secondary={{ label: "돌아가기" }}
          />
        }
      >
        <p>본문</p>
      </Panel>,
    )
    const footer = document.querySelector(".umc-panel__footer")
    const control = footer?.firstElementChild
    expect(control).toHaveClass("umc-panel__control")
    expect(control).toHaveTextContent("선택 3")
    expect(control?.nextElementSibling).toHaveClass("umc-bottom-sheet-actions")
    expect(
      document.querySelector(".umc-panel__content")?.contains(control ?? null),
    ).toBe(false)
  })

  it("actions만 넘기면 control 자리는 그리지 않는다", () => {
    render(
      <Panel
        open
        title="제목"
        actions={
          <BottomSheetActions layout="full" primary={{ label: "확인" }} />
        }
      >
        <p>본문</p>
      </Panel>,
    )
    expect(document.querySelector(".umc-panel__control")).toBeNull()
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument()
  })

  it("description이 없으면 설명을 그리지 않는다", () => {
    render(
      <Panel open title="제목">
        <p>본문</p>
      </Panel>,
    )
    expect(document.querySelector(".umc-panel__description")).toBeNull()
  })

  it("Esc를 누르면 닫힘을 알린다", async () => {
    const onOpenChange = vi.fn()
    render(
      <Panel open onOpenChange={onOpenChange} title="제목">
        <p>본문</p>
      </Panel>,
    )
    await userEvent.keyboard("{Escape}")
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("바깥을 누르면 닫힘을 알린다", async () => {
    const onOpenChange = vi.fn()
    render(
      <Panel open onOpenChange={onOpenChange} title="제목">
        <p>본문</p>
      </Panel>,
    )
    const backdrop = document.querySelector(".umc-panel__backdrop")
    expect(backdrop).not.toBeNull()
    await userEvent.click(backdrop as HTMLElement)
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("headSlot이 없으면 머리 칸 없이 제목 묶음만 그린다", () => {
    render(
      <Panel open title="제목">
        <p>본문</p>
      </Panel>,
    )
    expect(document.querySelector(".umc-panel__head")).toBeNull()
    expect(document.querySelector(".umc-panel__head-slot")).toBeNull()
  })

  it("headSlot은 제목 묶음 오른쪽 머리 칸에 그린다", () => {
    render(
      <Panel open title="제목" headSlot={<span>슬롯</span>}>
        <p>본문</p>
      </Panel>,
    )
    const head = document.querySelector(".umc-panel__head")
    expect(head?.firstElementChild).toHaveClass("umc-panel__header")
    const slot = head?.lastElementChild
    expect(slot).toHaveClass("umc-panel__head-slot")
    expect(slot).toHaveTextContent("슬롯")
    expect(head?.nextElementSibling).toHaveClass("umc-panel__content")
  })

  it("PanelCloseButton을 누르면 닫힘을 알린다", async () => {
    const onOpenChange = vi.fn()
    render(
      <Panel
        open
        onOpenChange={onOpenChange}
        title="제목"
        headSlot={<PanelCloseButton />}
      >
        <p>본문</p>
      </Panel>,
    )
    await userEvent.click(screen.getByRole("button", { name: "닫기" }))
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it("비제어 패널도 PanelCloseButton으로 닫힌다", async () => {
    render(
      <Panel defaultOpen title="제목" headSlot={<PanelCloseButton />}>
        <p>본문</p>
      </Panel>,
    )
    await userEvent.click(screen.getByRole("button", { name: "닫기" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  })

  it("PanelCloseButton의 이름은 label로 바꾼다", () => {
    render(
      <Panel
        open
        title="제목"
        headSlot={<PanelCloseButton label="복제 패널 닫기" />}
      >
        <p>본문</p>
      </Panel>,
    )
    expect(
      screen.getByRole("button", { name: "복제 패널 닫기" }),
    ).toBeInTheDocument()
  })

  it("className을 팝업에 붙인다", () => {
    render(
      <Panel open title="제목" className="w-[733px]">
        <p>본문</p>
      </Panel>,
    )
    expect(popupOf()).toHaveClass("umc-panel__popup", "w-[733px]")
  })
})
