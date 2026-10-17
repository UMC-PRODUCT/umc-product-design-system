import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { GuidanceMessage } from "./GuidanceMessage.tsx"

const messageOf = () => document.querySelector(".umc-guidance-message")

describe("GuidanceMessage", () => {
  it("문구 앞에 화면 낭독기가 읽지 않는 체크 아이콘을 그린다", () => {
    render(
      <GuidanceMessage>지금은 프로젝트 지원 기간이 아니에요</GuidanceMessage>,
    )
    expect(messageOf()).toHaveTextContent(
      "지금은 프로젝트 지원 기간이 아니에요",
    )
    const icon = messageOf()?.firstElementChild
    expect(icon).toHaveClass("umc-guidance-message__icon")
    expect(icon).toHaveAttribute("aria-hidden", "true")
    expect(icon?.querySelector("svg")).not.toBeNull()
  })

  it("기본 색은 neutral이다", () => {
    render(<GuidanceMessage>안내</GuidanceMessage>)
    expect(messageOf()).toHaveAttribute("data-color", "neutral")
  })

  it.each(["success", "warning", "error"] as const)(
    "color %s를 단다",
    (color) => {
      render(<GuidanceMessage color={color}>안내</GuidanceMessage>)
      expect(messageOf()).toHaveAttribute("data-color", color)
    },
  )

  it("showIcon이 false면 아이콘을 그리지 않는다", () => {
    render(<GuidanceMessage showIcon={false}>안내</GuidanceMessage>)
    expect(document.querySelector(".umc-guidance-message__icon")).toBeNull()
  })

  it("role 같은 네이티브 속성과 className을 넘긴다", () => {
    render(
      <GuidanceMessage role="status" className="mt-4">
        저장했어요
      </GuidanceMessage>,
    )
    expect(screen.getByRole("status")).toHaveClass(
      "umc-guidance-message",
      "mt-4",
    )
  })
})
