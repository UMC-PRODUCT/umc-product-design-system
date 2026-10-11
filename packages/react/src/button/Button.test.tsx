import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef, type FormEvent } from "react"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./Button.tsx"

describe("Button", () => {
  it("기본은 type=button이고 피그마 기본 변형을 data 속성으로 단다", () => {
    render(<Button>저장</Button>)
    const button = screen.getByRole("button", { name: "저장" })
    expect(button).toHaveAttribute("type", "button")
    expect(button).toHaveAttribute("data-variant", "fill")
    expect(button).toHaveAttribute("data-color", "primary")
    expect(button).toHaveAttribute("data-size", "md")
    expect(button).toHaveClass("umc-button")
  })

  it("className을 umc-button 뒤에 붙이고 네이티브 속성과 ref를 전달한다", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <form id="apply">
        <Button
          ref={ref}
          className="w-full"
          aria-label="지원서 저장"
          data-testid="save"
          form="apply"
          name="intent"
          value="save"
        >
          저장
        </Button>
      </form>,
    )
    const button = screen.getByTestId("save")
    expect(button.className).toBe("umc-button w-full")
    expect(button).toHaveAccessibleName("지원서 저장")
    expect(button).toHaveAttribute("form", "apply")
    expect(button).toHaveAttribute("name", "intent")
    expect(ref.current).toBe(button)
  })

  it("type을 submit으로 바꾸면 form을 제출한다", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">제출</Button>
      </form>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it("사용자가 준 data 속성이 스타일용 속성을 덮어쓰지 못한다", () => {
    render(
      <Button size="sm" data-size="xl" data-variant="outlined">
        저장
      </Button>,
    )
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("data-size", "sm")
    expect(button).toHaveAttribute("data-variant", "fill")
  })

  it("로딩 중에는 포커스를 유지한 채 aria-busy, aria-disabled, 숨김 문구를 단다", () => {
    render(<Button isLoading>저장</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("aria-disabled", "true")
    expect(button).toHaveAttribute("data-loading")
    expect(button).toHaveAccessibleName("저장 로딩 중")
    expect(button).toBeEnabled()
  })

  it("로딩 중에는 클릭 핸들러를 부르지 않는다", async () => {
    const onClick = vi.fn()
    render(
      <Button isLoading onClick={onClick}>
        저장
      </Button>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("loading submit button does not submit its form", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" isLoading>
          제출
        </Button>
      </form>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("비활성이면 클릭 핸들러를 부르지 않는다", async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        저장
      </Button>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("로딩이 아니면 사용자가 준 aria-disabled를 그대로 둔다", () => {
    render(<Button aria-disabled="true">저장</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true")
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy")
  })

  it("아이콘은 화면 낭독기에서 숨기고 위치를 data 속성으로 알린다", () => {
    render(
      <Button
        leadingIcon={<svg data-testid="leading" />}
        trailingIcon={<svg data-testid="trailing" />}
      >
        추가
      </Button>,
    )
    const button = screen.getByRole("button", { name: "추가" })
    expect(button).toHaveAttribute("data-leading-icon")
    expect(button).toHaveAttribute("data-trailing-icon")
    expect(screen.getByTestId("leading").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(screen.getByTestId("trailing").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })
})
