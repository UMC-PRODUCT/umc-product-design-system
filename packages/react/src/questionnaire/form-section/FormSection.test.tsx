import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import { FormSection } from "./FormSection.tsx"

const OPTIONAL_TITLE = /^PM\s*\(선택 사항\)$/

const sectionOf = () => {
  const section = document.querySelector(".umc-form-section")
  if (section === null) throw new Error("섹션이 없습니다")
  return section
}

describe("FormSection 고정", () => {
  it("제목을 탭 모양 제목 요소로 그리고 본문을 항상 보여 준다", () => {
    render(
      <FormSection title="공통 문항">
        <p>질문 목록</p>
      </FormSection>,
    )
    expect(
      screen.getByRole("heading", { level: 3, name: "공통 문항" }),
    ).toHaveClass("umc-form-section__tab")
    expect(screen.getByText("질문 목록")).toBeVisible()
    expect(screen.queryByRole("switch")).toBeNull()
    expect(sectionOf()).toHaveAttribute("data-variant", "static")
  })

  it("level로 제목 단계를 바꾼다", () => {
    render(
      <FormSection title="공통 문항" level={2}>
        <p />
      </FormSection>,
    )
    expect(
      screen.getByRole("heading", { level: 2, name: "공통 문항" }),
    ).toBeVisible()
  })
})

describe("FormSection 토글", () => {
  it("제목과 선택 사항 표시, 켜진 섹션 사용 스위치를 그린다", () => {
    render(
      <FormSection variant="toggle" title="PM" optionalLabel="(선택 사항)">
        <p>질문 목록</p>
      </FormSection>,
    )
    expect(
      screen.getByRole("heading", { level: 3, name: OPTIONAL_TITLE }),
    ).toBeVisible()
    const toggle = screen.getByRole("switch", { name: "섹션 사용" })
    expect(toggle).toBeChecked()
    expect(toggle).toHaveAccessibleDescription(OPTIONAL_TITLE)
    expect(screen.getByText("질문 목록")).toBeVisible()
  })

  it("스위치를 끄면 본문을 지우지 않고 숨기며 onEnabledChange를 부른다", async () => {
    const user = userEvent.setup()
    const onEnabledChange = vi.fn()
    render(
      <FormSection
        variant="toggle"
        title="Design"
        onEnabledChange={onEnabledChange}
      >
        <p>질문 목록</p>
      </FormSection>,
    )
    await user.click(screen.getByRole("switch", { name: "섹션 사용" }))
    expect(onEnabledChange).toHaveBeenCalledWith(false)
    expect(screen.getByText("질문 목록")).not.toBeVisible()
    expect(sectionOf()).not.toHaveAttribute("data-enabled")
  })

  it("enabled를 넘기면 그 값을 따른다", async () => {
    function Controlled() {
      const [enabled, setEnabled] = useState(false)
      return (
        <FormSection
          variant="toggle"
          title="Web"
          enabled={enabled}
          onEnabledChange={setEnabled}
        >
          <p>질문 목록</p>
        </FormSection>
      )
    }
    const user = userEvent.setup()
    render(<Controlled />)
    expect(screen.getByText("질문 목록")).not.toBeVisible()
    await user.click(screen.getByRole("switch", { name: "섹션 사용" }))
    expect(screen.getByText("질문 목록")).toBeVisible()
  })

  it("섹션을 껐다 켜도 본문 안의 입력값이 남아 있다", async () => {
    const user = userEvent.setup()
    render(
      <FormSection variant="toggle" title="PM">
        <input aria-label="질문 제목" />
      </FormSection>,
    )
    await user.type(screen.getByRole("textbox"), "기획 경험")
    const toggle = screen.getByRole("switch", { name: "섹션 사용" })
    await user.click(toggle)
    await user.click(toggle)
    expect(screen.getByRole("textbox", { name: "질문 제목" })).toHaveValue(
      "기획 경험",
    )
  })

  it("enabledLabel로 스위치 문구를 바꾼다", () => {
    render(
      <FormSection variant="toggle" title="Mobile" enabledLabel="사용">
        <p />
      </FormSection>,
    )
    expect(screen.getByRole("switch", { name: "사용" })).toBeVisible()
  })
})
