import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"

import { TextButton } from "./TextButton.tsx"

describe("TextButton", () => {
  it("기본은 type=button이고 피그마 기본 변형을 data 속성으로 단다", () => {
    render(<TextButton>더보기</TextButton>)
    const button = screen.getByRole("button", { name: "더보기" })
    expect(button).toHaveAttribute("type", "button")
    expect(button).toHaveAttribute("data-color", "brand")
    expect(button).toHaveAttribute("data-size", "xs")
    expect(button).toHaveAttribute("data-variant", "plain")
    expect(button).toHaveClass("umc-text-button")
  })

  it("앞뒤 아이콘을 장식 요소로 감싸고 이름에서 뺀다", () => {
    render(
      <TextButton
        leadingIcon={<svg data-testid="leading" />}
        trailingIcon={<svg data-testid="trailing" />}
      >
        항목 추가
      </TextButton>,
    )
    expect(screen.getByTestId("leading").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(screen.getByTestId("trailing").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(screen.getByRole("button")).toHaveAccessibleName("항목 추가")
  })

  it("className을 umc-text-button 뒤에 붙이고 네이티브 속성과 ref를 전달한다", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <TextButton ref={ref} className="ml-auto" aria-label="공지 더보기">
        더보기
      </TextButton>,
    )
    const button = screen.getByRole("button")
    expect(button.className).toBe("umc-text-button ml-auto")
    expect(button).toHaveAccessibleName("공지 더보기")
    expect(ref.current).toBe(button)
  })

  it("color, size, variant를 data 속성으로 옮긴다", () => {
    render(
      <TextButton color="neutral" size="md" variant="underline">
        전체 보기
      </TextButton>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("data-color", "neutral")
    expect(button).toHaveAttribute("data-size", "md")
    expect(button).toHaveAttribute("data-variant", "underline")
  })

  it("비활성이면 onClick을 부르지 않는다", async () => {
    const onClick = vi.fn()
    render(
      <TextButton disabled onClick={onClick}>
        더보기
      </TextButton>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })
})
