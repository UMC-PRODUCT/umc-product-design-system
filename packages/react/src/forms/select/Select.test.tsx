import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ExpandMoreIcon } from "@umc-product/icons"
import type { ReactElement } from "react"
import { describe, expect, it, vi } from "vitest"

import { LegacyCheckGlyph } from "../../internal/glyphs.tsx"
import { Select } from "./Select.tsx"

const baseOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "cherry", label: "체리", disabled: true },
]

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

const drawingOf = (svg: Element | null | undefined) => ({
  viewBox: svg?.getAttribute("viewBox"),
  content: svg?.innerHTML,
})

describe("Select", () => {
  it("placeholder가 트리거에 표시된다", () => {
    render(<Select options={baseOptions} placeholder="항목 선택" />)
    expect(screen.getByText("항목 선택")).toBeInTheDocument()
  })

  it("label이 트리거와 연결된다", () => {
    render(<Select options={baseOptions} label="과일" />)
    expect(screen.getByText("과일")).toBeInTheDocument()
  })

  it("required이면 * 표시를 렌더한다", () => {
    render(<Select options={baseOptions} label="과일" required />)
    expect(screen.getByText("*", { exact: false })).toBeInTheDocument()
  })

  it("옵션 선택 시 onValueChange(value)가 호출된다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={baseOptions} onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox"))
    await waitFor(() => screen.getByText("사과"))
    await user.click(screen.getByText("사과"))
    expect(onValueChange).toHaveBeenCalledWith("apple")
  })

  it("disabled 옵션은 선택되지 않는다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Select options={baseOptions} onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox"))
    await waitFor(() => screen.getByText("체리"))
    fireEvent.click(screen.getByText("체리"))
    expect(onValueChange).not.toHaveBeenCalledWith("cherry")
  })

  it("searchable이면 검색 입력으로 목록을 필터한다", async () => {
    const user = userEvent.setup()
    render(<Select options={baseOptions} searchable />)
    await user.click(screen.getByRole("combobox"))
    await waitFor(() => screen.getByPlaceholderText("검색"))
    fireEvent.change(screen.getByPlaceholderText("검색"), {
      target: { value: "사" },
    })
    await waitFor(() => {
      expect(screen.getByText("사과")).toBeInTheDocument()
      expect(screen.queryByText("바나나")).not.toBeInTheDocument()
    })
  })

  it("invalid이면 errorMessage를 표시한다", () => {
    render(
      <Select options={baseOptions} invalid errorMessage="필수 항목입니다" />,
    )
    expect(screen.getByText("필수 항목입니다")).toBeInTheDocument()
  })

  it("name이 있으면 form 제출 시 값을 포함한다", () => {
    render(<Select options={baseOptions} name="fruit" value="apple" />)
    const hiddenInput = document.querySelector('input[name="fruit"]')
    expect(hiddenInput).not.toBeNull()
  })

  it("값이 있으면 트리거에 값이 아니라 레이블을 보여 준다", () => {
    render(
      <Select
        label="과일"
        options={[{ value: "apple", label: "사과" }]}
        defaultValue="apple"
      />,
    )
    expect(screen.getByRole("combobox", { name: "과일" })).toHaveTextContent(
      "사과",
    )
  })

  it("filter 변형과 크기를 트리거 data 속성으로 단다", () => {
    render(
      <Select
        aria-label="정렬"
        options={[{ value: "recent", label: "최신 순" }]}
        variant="filter"
        size="md"
      />,
    )
    const trigger = screen.getByRole("combobox", { name: "정렬" })
    expect(trigger).toHaveAttribute("data-variant", "filter")
    expect(trigger).toHaveAttribute("data-size", "md")
  })

  it("트리거 화살표는 피그마처럼 Expand_more Fill을 16px로 그린다", () => {
    render(<Select options={baseOptions} aria-label="과일" />)
    const icon = screen
      .getByRole("combobox", { name: "과일" })
      .querySelector(".umc-select__icon svg")
    expect(icon).toHaveAttribute("width", "16")
    expect(drawingOf(icon)).toEqual(
      drawingOf(svgOf(<ExpandMoreIcon weight="fill" />)),
    )
  })

  it("선택한 항목의 체크는 피그마 드롭다운의 16px 체크 그림이다", async () => {
    const user = userEvent.setup()
    render(
      <Select options={baseOptions} aria-label="과일" defaultValue="apple" />,
    )
    await user.click(screen.getByRole("combobox", { name: "과일" }))
    const selected = await screen.findByRole("option", { name: "사과" })
    const check = selected.querySelector(".umc-dropdown-item__indicator svg")
    expect(drawingOf(check)).toEqual(drawingOf(svgOf(<LegacyCheckGlyph />)))
  })

  it("itemLayout이 inline이면 체크를 레이블 앞에, 캡션을 같은 줄 끝에 둔다", async () => {
    const user = userEvent.setup()
    render(
      <Select
        aria-label="기수"
        itemSize="xs"
        itemLayout="inline"
        defaultValue="11"
        options={[
          { value: "11", label: "11기", caption: "2026" },
          { value: "10", label: "10기", caption: "2026" },
        ]}
      />,
    )
    await user.click(screen.getByRole("combobox", { name: "기수" }))
    const selected = await screen.findByRole("option", { name: /11기/ })
    expect(selected).toHaveAttribute("data-layout", "inline")
    expect(selected).toHaveAttribute("data-size", "xs")
    const [content, caption] = Array.from(selected.children)
    expect(content?.firstElementChild).toHaveClass(
      "umc-dropdown-item__indicator",
    )
    expect(caption).toHaveClass("umc-dropdown-item__caption")
    expect(caption).toHaveTextContent("2026")
  })

  it("기본 배치는 캡션을 레이블 아래에, 체크를 끝에 둔다", async () => {
    const user = userEvent.setup()
    render(
      <Select
        aria-label="기수"
        defaultValue="11"
        options={[{ value: "11", label: "11기", caption: "2026" }]}
      />,
    )
    await user.click(screen.getByRole("combobox", { name: "기수" }))
    const selected = await screen.findByRole("option", { name: /11기/ })
    expect(selected).toHaveAttribute("data-layout", "default")
    const [content, indicator] = Array.from(selected.children)
    expect(content?.lastElementChild).toHaveClass("umc-dropdown-item__caption")
    expect(indicator).toHaveClass("umc-dropdown-item__indicator")
  })
})
