import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SearchField } from "./SearchField.tsx"

describe("SearchField", () => {
  it("input[type=search]를 렌더한다", () => {
    render(<SearchField />)
    expect(screen.getByRole("searchbox")).toBeInTheDocument()
  })

  it("placeholder가 표시된다", () => {
    render(<SearchField placeholder="검색어를 입력하세요" />)
    expect(
      screen.getByPlaceholderText("검색어를 입력하세요"),
    ).toBeInTheDocument()
  })

  it("값이 있을 때 clearable이면 지우기 버튼이 나타난다", () => {
    render(<SearchField value="테스트" onChange={() => {}} clearable />)
    expect(screen.getByLabelText("검색어 지우기")).toBeInTheDocument()
  })

  it("clearable=false이면 지우기 버튼이 없다", () => {
    render(<SearchField value="테스트" onChange={() => {}} clearable={false} />)
    expect(screen.queryByLabelText("검색어 지우기")).not.toBeInTheDocument()
  })

  it("onChange 콜백이 호출된다", async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<SearchField onChange={onChange} />)
    await user.type(screen.getByRole("searchbox"), "검색")
    expect(onChange).toHaveBeenCalled()
  })

  it("disabled 상태에서는 지우기 버튼이 나타나지 않는다", () => {
    render(<SearchField value="테스트" disabled clearable />)
    expect(screen.queryByLabelText("검색어 지우기")).not.toBeInTheDocument()
  })
})
