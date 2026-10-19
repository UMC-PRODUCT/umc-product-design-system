import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { FormQuestion } from "../form-question/FormQuestion.tsx"
import { FormAttachmentField } from "./FormAttachmentField.tsx"

const MEGABYTE = 1024 * 1024

const fileOf = (name: string, type: string, size = 1024) => {
  const file = new File(["%PDF"], name, { type })
  Object.defineProperty(file, "size", { value: size })
  return file
}

const fileInputOf = () => {
  const input = document.querySelector<HTMLInputElement>(
    ".umc-form-attachment-field__file",
  )
  if (input === null) throw new Error("파일 입력이 없습니다")
  return input
}

describe("FormAttachmentField", () => {
  it("질문 제목을 이름으로 가진 링크 입력과 파일 업로드 버튼을 그린다", () => {
    render(
      <FormQuestion title="포트폴리오를 첨부해 주세요" required>
        <FormAttachmentField />
      </FormQuestion>,
    )
    const input = screen.getByRole("textbox", {
      name: "포트폴리오를 첨부해 주세요",
    })
    expect(input).toBeRequired()
    expect(input).toHaveAttribute(
      "placeholder",
      "링크를 입력하거나 파일을 첨부하세요. 파일은 200MB 이하의 PDF 파일만 업로드 할 수 있어요",
    )
    expect(screen.getByRole("button", { name: "파일 업로드" })).toBeVisible()
    expect(fileInputOf()).toHaveAttribute("accept", "application/pdf")
  })

  it("파일 업로드 버튼을 누르면 파일 창을 연다", async () => {
    const user = userEvent.setup()
    render(<FormAttachmentField aria-label="포트폴리오" />)
    const click = vi.spyOn(fileInputOf(), "click")
    await user.click(screen.getByRole("button", { name: "파일 업로드" }))
    expect(click).toHaveBeenCalled()
  })

  it("PDF는 onFileSelect로, 형식과 용량이 맞지 않는 파일은 onReject로 넘긴다", () => {
    const onFileSelect = vi.fn()
    const onReject = vi.fn()
    render(
      <FormAttachmentField
        aria-label="포트폴리오"
        onFileSelect={onFileSelect}
        onReject={onReject}
      />,
    )
    const pdf = fileOf("portfolio.pdf", "application/pdf")
    const image = fileOf("photo.png", "image/png")
    const large = fileOf("big.pdf", "application/pdf", 201 * MEGABYTE)

    fireEvent.change(fileInputOf(), { target: { files: [pdf] } })
    fireEvent.change(fileInputOf(), { target: { files: [image] } })
    fireEvent.change(fileInputOf(), { target: { files: [large] } })

    expect(onFileSelect).toHaveBeenCalledWith(pdf)
    expect(onReject).toHaveBeenNthCalledWith(1, { file: image, reason: "type" })
    expect(onReject).toHaveBeenNthCalledWith(2, { file: large, reason: "size" })
  })

  it("글자를 입력하면 버튼이 삭제로 바뀌고, 누르면 입력을 비우고 onChange를 부른다", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FormAttachmentField aria-label="포트폴리오" onChange={onChange} />)
    const input = screen.getByRole("textbox", { name: "포트폴리오" })

    await user.type(input, "https://umc.dev")
    expect(screen.queryByRole("button", { name: "파일 업로드" })).toBeNull()
    await user.click(screen.getByRole("button", { name: "삭제" }))

    expect(input).toHaveValue("")
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ target: input }),
    )
    expect(screen.getByRole("button", { name: "파일 업로드" })).toBeVisible()
  })

  it("첨부가 있으면 클립 아이콘과 링크, 삭제 버튼을 그린다", async () => {
    const user = userEvent.setup()
    const onAttachmentRemove = vi.fn()
    render(
      <FormAttachmentField
        aria-label="포트폴리오"
        attachment={{
          label: "portfolio.pdf",
          href: "https://files.umc.dev/portfolio.pdf",
        }}
        onAttachmentRemove={onAttachmentRemove}
      />,
    )
    const link = screen.getByRole("link", { name: "portfolio.pdf" })
    expect(link).toHaveAttribute("href", "https://files.umc.dev/portfolio.pdf")
    expect(link).toHaveAttribute("target", "_blank")
    expect(screen.queryByRole("textbox")).toBeNull()

    await user.click(screen.getByRole("button", { name: "삭제" }))
    expect(onAttachmentRemove).toHaveBeenCalledTimes(1)
  })

  it("첨부를 지우고 다시 그리면 입력이 빈 상태로 돌아온다", async () => {
    const user = userEvent.setup()
    const { rerender } = render(<FormAttachmentField aria-label="포트폴리오" />)
    await user.type(screen.getByRole("textbox"), "https://umc.dev")

    rerender(
      <FormAttachmentField
        aria-label="포트폴리오"
        attachment={{ label: "https://umc.dev", href: "https://umc.dev" }}
      />,
    )
    rerender(<FormAttachmentField aria-label="포트폴리오" />)

    expect(screen.getByRole("textbox")).toHaveValue("")
    expect(screen.getByRole("button", { name: "파일 업로드" })).toBeVisible()
  })

  it("preview이면 입력과 업로드 버튼을 보여 주기만 하고 파일 창은 두지 않는다", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <FormQuestion title="포트폴리오를 첨부해 주세요">
        <FormAttachmentField preview onChange={onChange} />
      </FormQuestion>,
    )
    const input = screen.getByRole("textbox", {
      name: "포트폴리오를 첨부해 주세요",
    })
    expect(input).toHaveAttribute("readonly")
    await user.type(input, "https://umc.dev")
    expect(input).toHaveValue("")
    expect(screen.getByRole("button", { name: "파일 업로드" })).toBeDisabled()
    expect(
      document.querySelector(".umc-form-attachment-field__file"),
    ).toBeNull()
    expect(
      document.querySelector(".umc-form-attachment-field"),
    ).toHaveAttribute("data-preview", "")
  })

  it("preview에 disabled를 주면 입력 칸도 비활성으로 그린다", () => {
    render(<FormAttachmentField preview disabled aria-label="첨부 칸" />)
    expect(screen.getByRole("textbox", { name: "첨부 칸" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "파일 업로드" })).toBeDisabled()
  })

  it("읽기 전용 질문 안에서는 버튼과 파일 입력을 그리지 않는다", () => {
    render(
      <FormQuestion title="포트폴리오" readOnly>
        <FormAttachmentField attachment={{ label: "portfolio.pdf" }} />
      </FormQuestion>,
    )
    expect(screen.getByText("portfolio.pdf")).toBeInTheDocument()
    expect(screen.queryByRole("button")).toBeNull()
    expect(
      document.querySelector(".umc-form-attachment-field__file"),
    ).toBeNull()
  })
})
