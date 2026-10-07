import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CodeField } from "./CodeField.tsx"

describe("CodeField", () => {
  it("length개의 input을 렌더한다", () => {
    render(<CodeField length={6} />)
    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(6)
  })

  it("length=4이면 4개의 input을 렌더한다", () => {
    render(<CodeField length={4} />)
    const inputs = screen.getAllByRole("textbox")
    expect(inputs).toHaveLength(4)
  })

  it("label이 표시된다", () => {
    render(<CodeField label="인증코드" />)
    expect(screen.getByText("인증코드")).toBeInTheDocument()
  })

  it("invalid이면 errorMessage를 표시한다", () => {
    render(<CodeField invalid errorMessage="코드가 올바르지 않습니다" />)
    expect(screen.getByText("코드가 올바르지 않습니다")).toBeInTheDocument()
  })

  it("onValueComplete가 완성 시 호출된다", async () => {
    const onValueComplete = vi.fn()
    const user = userEvent.setup()
    render(<CodeField length={4} onValueComplete={onValueComplete} />)
    const inputs = screen.getAllByRole("textbox")
    await user.type(inputs[0]!, "1234")
    expect(onValueComplete).toHaveBeenCalledWith("1234")
  })

  it("onValueChange가 입력마다 호출된다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<CodeField length={4} onValueChange={onValueChange} />)
    const inputs = screen.getAllByRole("textbox")
    await user.type(inputs[0]!, "1")
    expect(onValueChange).toHaveBeenCalled()
  })

  it("오류 상태에서 셀을 다시 누르면 입력한 숫자를 모두 지운다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <CodeField
        length={4}
        defaultValue="1234"
        invalid
        onValueChange={onValueChange}
      />,
    )
    const inputs = screen.getAllByRole("textbox")
    await user.click(inputs[2]!)
    expect(onValueChange).toHaveBeenCalledWith("")
    for (const input of inputs) {
      expect(input).toHaveValue("")
    }
  })

  it("오류가 아니면 셀을 눌러도 입력을 유지한다", async () => {
    const user = userEvent.setup()
    render(<CodeField length={4} defaultValue="1234" />)
    const inputs = screen.getAllByRole("textbox")
    await user.click(inputs[1]!)
    expect(inputs[0]).toHaveValue("1")
  })
})
