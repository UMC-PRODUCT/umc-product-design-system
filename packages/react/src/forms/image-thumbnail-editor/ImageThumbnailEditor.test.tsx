import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ImageThumbnailEditor } from "./ImageThumbnailEditor.tsx"

const MEGABYTE = 1024 * 1024
const DEFAULT_LABEL = "클릭 후 업로드"

const createObjectURL = vi.fn((file: File) => `blob:${file.name}`)
const revokeObjectURL = vi.fn()

beforeEach(() => {
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    writable: true,
    value: createObjectURL,
  })
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    writable: true,
    value: revokeObjectURL,
  })
})

afterEach(() => {
  createObjectURL.mockClear()
  revokeObjectURL.mockClear()
})

const imageFile = (name: string, type: string, size?: number) => {
  const file = new File(["image"], name, { type })
  if (size !== undefined) {
    Object.defineProperty(file, "size", { value: size })
  }
  return file
}

const editorOf = () => document.querySelector(".umc-image-thumbnail-editor")
const previewOf = () =>
  document.querySelector(".umc-image-thumbnail-editor__image")
const inputOf = () => screen.getByLabelText(DEFAULT_LABEL)
const setupUser = () => userEvent.setup({ applyAccept: false })

describe("ImageThumbnailEditor", () => {
  it("파일 입력에 기본 문구를 이름과 설명으로 달고 PNG, SVG만 고르게 한다", () => {
    render(<ImageThumbnailEditor />)
    const input = inputOf()
    expect(input).toHaveAttribute("type", "file")
    expect(input).toHaveAttribute("accept", "image/png,image/svg+xml")
    expect(input).toHaveAccessibleDescription("PNG, SVG 형식의 5MB 이하 파일")
    expect(editorOf()).not.toHaveAttribute("data-filled")
    expect(previewOf()).toBeNull()
  })

  it("칸 안 문구는 입력의 이름과 설명으로만 읽히게 화면 낭독기에서 숨긴다", () => {
    render(<ImageThumbnailEditor />)
    expect(
      document.querySelector(".umc-image-thumbnail-editor__guide"),
    ).toHaveAttribute("aria-hidden", "true")
    expect(inputOf()).toHaveAccessibleName(DEFAULT_LABEL)
    expect(inputOf()).toHaveAccessibleDescription(
      "PNG, SVG 형식의 5MB 이하 파일",
    )
  })

  it("형식과 용량이 맞는 이미지를 고르면 미리보기를 그리고 onValueChange로 넘긴다", async () => {
    const onValueChange = vi.fn()
    const onReject = vi.fn()
    render(
      <ImageThumbnailEditor
        onValueChange={onValueChange}
        onReject={onReject}
      />,
    )
    const file = imageFile("logo.png", "image/png")

    await setupUser().upload(inputOf(), file)

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(file)
    expect(onReject).not.toHaveBeenCalled()
    expect(editorOf()).toHaveAttribute("data-filled", "")
    expect(previewOf()).toHaveAttribute("src", "blob:logo.png")
    expect(previewOf()).toHaveAttribute("alt", "")
  })

  it("미리보기가 있어도 입력의 이름과 설명을 그대로 둔다", async () => {
    render(<ImageThumbnailEditor />)
    await setupUser().upload(inputOf(), imageFile("logo.svg", "image/svg+xml"))
    expect(editorOf()).toHaveAttribute("data-filled", "")
    expect(inputOf()).toHaveAccessibleDescription(
      "PNG, SVG 형식의 5MB 이하 파일",
    )
  })

  it("형식이 맞지 않으면 받지 않고 onReject에 type을 넘긴다", async () => {
    const onValueChange = vi.fn()
    const onReject = vi.fn()
    render(
      <ImageThumbnailEditor
        onValueChange={onValueChange}
        onReject={onReject}
      />,
    )
    const file = imageFile("photo.jpg", "image/jpeg")

    await setupUser().upload(inputOf(), file)

    expect(onReject).toHaveBeenCalledExactlyOnceWith({ file, reason: "type" })
    expect(onValueChange).not.toHaveBeenCalled()
    expect(editorOf()).not.toHaveAttribute("data-filled")
  })

  it("5MB까지 받고, 넘으면 onReject에 size를 넘긴다", async () => {
    const onValueChange = vi.fn()
    const onReject = vi.fn()
    render(
      <ImageThumbnailEditor
        onValueChange={onValueChange}
        onReject={onReject}
      />,
    )
    const limit = imageFile("limit.png", "image/png", 5 * MEGABYTE)
    const over = imageFile("over.png", "image/png", 5 * MEGABYTE + 1)
    const user = setupUser()

    await user.upload(inputOf(), limit)
    await user.upload(inputOf(), over)

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(limit)
    expect(onReject).toHaveBeenCalledExactlyOnceWith({
      file: over,
      reason: "size",
    })
    expect(previewOf()).toHaveAttribute("src", "blob:limit.png")
  })

  it("accept와 maxSize로 받는 형식과 용량을 바꾼다", async () => {
    const onValueChange = vi.fn()
    const onReject = vi.fn()
    render(
      <ImageThumbnailEditor
        accept={["image/jpeg"]}
        maxSize={MEGABYTE}
        onValueChange={onValueChange}
        onReject={onReject}
      />,
    )
    const user = setupUser()
    expect(inputOf()).toHaveAttribute("accept", "image/jpeg")

    await user.upload(inputOf(), imageFile("logo.png", "image/png"))
    await user.upload(
      inputOf(),
      imageFile("large.jpg", "image/jpeg", MEGABYTE + 1),
    )
    const photo = imageFile("photo.jpg", "image/jpeg", MEGABYTE)
    await user.upload(inputOf(), photo)

    expect(onReject.mock.calls.map(([rejection]) => rejection.reason)).toEqual([
      "type",
      "size",
    ])
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(photo)
  })

  it("고른 뒤 입력 값을 비워 같은 파일을 다시 고를 수 있게 한다", async () => {
    const onReject = vi.fn()
    render(<ImageThumbnailEditor onReject={onReject} />)
    const file = imageFile("photo.jpg", "image/jpeg")
    const user = setupUser()

    await user.upload(inputOf(), file)
    expect(inputOf()).toHaveValue("")
    await user.upload(inputOf(), file)

    expect(onReject).toHaveBeenCalledTimes(2)
  })

  it("value로 제어하면 부모가 값을 바꿀 때만 미리보기를 바꾼다", async () => {
    const onValueChange = vi.fn()
    const { rerender } = render(
      <ImageThumbnailEditor value={null} onValueChange={onValueChange} />,
    )
    const file = imageFile("logo.png", "image/png")

    await setupUser().upload(inputOf(), file)
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(file)
    expect(editorOf()).not.toHaveAttribute("data-filled")

    rerender(
      <ImageThumbnailEditor value={file} onValueChange={onValueChange} />,
    )
    expect(previewOf()).toHaveAttribute("src", "blob:logo.png")
  })

  it("defaultValue로 처음 파일을 보여 준다", () => {
    render(
      <ImageThumbnailEditor
        defaultValue={imageFile("logo.png", "image/png")}
      />,
    )
    expect(previewOf()).toHaveAttribute("src", "blob:logo.png")
  })

  it("src로 서버 이미지를 보여 주고, 고른 파일이 있으면 파일을 먼저 보여 준다", async () => {
    render(<ImageThumbnailEditor src="https://example.com/logo.png" />)
    expect(editorOf()).toHaveAttribute("data-filled", "")
    expect(previewOf()).toHaveAttribute("src", "https://example.com/logo.png")

    await setupUser().upload(inputOf(), imageFile("new.png", "image/png"))
    expect(previewOf()).toHaveAttribute("src", "blob:new.png")
  })

  it("파일이 바뀌거나 컴포넌트가 사라지면 이전 미리보기 주소를 해제한다", () => {
    const first = imageFile("first.png", "image/png")
    const second = imageFile("second.png", "image/png")
    const { rerender, unmount } = render(<ImageThumbnailEditor value={first} />)

    rerender(<ImageThumbnailEditor value={second} />)
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:first.png")

    act(() => unmount())
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:second.png")
  })

  it("label과 description으로 문구를 바꾸고 aria-describedby를 이어 붙인다", () => {
    render(
      <>
        <ImageThumbnailEditor
          label="로고 올리기"
          description="정사각형 PNG"
          aria-describedby="logo-error"
        />
        <p id="logo-error">파일 형식을 확인해 주세요</p>
      </>,
    )
    expect(screen.getByLabelText("로고 올리기")).toHaveAccessibleDescription(
      "정사각형 PNG 파일 형식을 확인해 주세요",
    )
  })

  it("disabled면 입력을 막고 칸에 data-disabled를 단다", () => {
    render(<ImageThumbnailEditor disabled />)
    expect(inputOf()).toBeDisabled()
    expect(editorOf()).toHaveAttribute("data-disabled", "")
  })

  it("className과 style은 칸에, 네이티브 속성과 ref는 입력에 넘긴다", () => {
    const ref = vi.fn()
    render(
      <ImageThumbnailEditor
        className="size-[160px]"
        style={{ marginTop: 4 }}
        id="school-logo"
        name="schoolLogo"
        ref={ref}
      />,
    )
    expect(editorOf()).toHaveClass("umc-image-thumbnail-editor", "size-[160px]")
    expect(editorOf()).toHaveStyle({ marginTop: "4px" })
    expect(inputOf()).toHaveAttribute("id", "school-logo")
    expect(inputOf()).toHaveAttribute("name", "schoolLogo")
    expect(ref).toHaveBeenCalledWith(inputOf())
  })
})
