import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { NumericStepper } from "./NumericStepper.tsx"

describe("NumericStepper", () => {
  it("label이 표시된다", () => {
    render(<NumericStepper label="수량" />)
    expect(screen.getByText("수량")).toBeInTheDocument()
  })

  it("증가 버튼과 감소 버튼을 렌더한다", () => {
    render(<NumericStepper />)
    expect(screen.getByLabelText("증가")).toBeInTheDocument()
    expect(screen.getByLabelText("감소")).toBeInTheDocument()
  })

  it("증가 버튼 클릭 시 onValueChange가 호출된다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<NumericStepper defaultValue={0} onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText("증가"))
    expect(onValueChange).toHaveBeenCalled()
  })

  it("min이 있으면 감소 버튼이 min 아래로 내려가지 않는다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <NumericStepper defaultValue={0} min={0} onValueChange={onValueChange} />,
    )
    await user.click(screen.getByLabelText("감소"))
    expect(onValueChange).not.toHaveBeenCalledWith(-1)
  })

  it("max가 있으면 증가 버튼이 max를 초과하지 않는다", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <NumericStepper defaultValue={5} max={5} onValueChange={onValueChange} />,
    )
    await user.click(screen.getByLabelText("증가"))
    expect(onValueChange).not.toHaveBeenCalledWith(6)
  })

  it("invalid이면 errorMessage를 표시한다", () => {
    render(<NumericStepper invalid errorMessage="유효하지 않은 값입니다" />)
    expect(screen.getByText("유효하지 않은 값입니다")).toBeInTheDocument()
  })

  it("name이 있으면 form 제출 시 포함된다", () => {
    render(<NumericStepper name="qty" value={3} />)
    const hiddenInput = document.querySelector('input[name="qty"]')
    expect(hiddenInput).not.toBeNull()
  })
})
