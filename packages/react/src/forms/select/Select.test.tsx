import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Select } from "./Select.tsx"

const baseOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "cherry", label: "체리", disabled: true },
]

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
})
