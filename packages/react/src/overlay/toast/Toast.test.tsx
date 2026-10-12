import { act, fireEvent, render, screen } from "@testing-library/react"
import { useEffect, useRef, type ReactElement } from "react"
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { CloseIcon } from "@umc-product/icons"

import { ToastProvider, type ToastApi } from "./Toast.tsx"
import { useToast } from "./useToast.ts"

beforeAll(() => {
  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
})

function ShowApp({
  message,
  action,
  color,
}: {
  message: string
  action?: { label: string; onClick: () => void }
  color?: "primary" | "neutral" | "warning" | "error"
}) {
  const toast = useToast()
  return (
    <button onClick={() => toast.show({ message, action, color })}>
      보여줘
    </button>
  )
}

function ShowCloseApp({ message }: { message: string }) {
  const toast = useToast()
  const idRef = useRef("")
  return (
    <div>
      <button
        onClick={() => {
          idRef.current = toast.show({ message })
        }}
      >
        보여줘
      </button>
      <button
        onClick={() => {
          if (idRef.current) toast.close(idRef.current)
        }}
      >
        닫아줘
      </button>
    </div>
  )
}

function RenderProbe({ onRender }: { onRender: (api: ToastApi) => void }) {
  const toast = useToast()
  onRender(toast)
  return (
    <button onClick={() => toast.show({ message: "렌더 확인" })}>보여줘</button>
  )
}

function ShowOnMount({ message }: { message: string }) {
  const toast = useToast()
  const shownRef = useRef(false)
  useEffect(() => {
    if (shownRef.current) return
    shownRef.current = true
    toast.show({ message })
  }, [toast, message])
  return null
}

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

const drawingOf = (svg: Element | null | undefined) => ({
  viewBox: svg?.getAttribute("viewBox"),
  content: svg?.innerHTML,
})

describe("ToastProvider & useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("show()가 id를 반환하고 메시지를 표시한다", () => {
    render(
      <ToastProvider>
        <ShowApp message="저장되었습니다." />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByText("저장되었습니다.")).toBeInTheDocument()
  })

  it("3초 뒤에 자동으로 닫힌다", async () => {
    render(
      <ToastProvider>
        <ShowApp message="자동 닫힘" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByText("자동 닫힘")).toBeInTheDocument()
    await act(async () => {
      vi.advanceTimersByTime(3100)
      await vi.runAllTimersAsync()
    })
    expect(screen.queryByText("자동 닫힘")).not.toBeInTheDocument()
  })

  it("action이 있으면 6초 뒤에 닫힌다", async () => {
    render(
      <ToastProvider>
        <ShowApp
          message="실행 취소 가능"
          action={{ label: "실행 취소", onClick: vi.fn() }}
        />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByText("실행 취소 가능")).toBeInTheDocument()
    await act(async () => {
      vi.advanceTimersByTime(3100)
    })
    expect(screen.getByText("실행 취소 가능")).toBeInTheDocument()
    await act(async () => {
      vi.advanceTimersByTime(3100)
      await vi.runAllTimersAsync()
    })
    expect(screen.queryByText("실행 취소 가능")).not.toBeInTheDocument()
  })

  it("action 버튼 클릭 시 onClick을 호출한다", () => {
    const onClick = vi.fn()
    render(
      <ToastProvider>
        <ShowApp
          message="삭제되었습니다."
          action={{ label: "실행 취소", onClick }}
        />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "실행 취소" }))
    })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("action 버튼 클릭 시 토스트가 닫힌다", async () => {
    render(
      <ToastProvider>
        <ShowApp
          message="닫힘 확인"
          action={{ label: "닫기 액션", onClick: vi.fn() }}
        />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByText("닫힘 확인")).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "닫기 액션" }))
      vi.advanceTimersByTime(500)
      await vi.runAllTimersAsync()
    })
    expect(screen.queryByText("닫힘 확인")).not.toBeInTheDocument()
  })

  it("DOM 구조: .umc-toast[data-color] > .umc-toast__main > .umc-toast__message", () => {
    render(
      <ToastProvider>
        <ShowApp message="구조 테스트" color="primary" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const toast = document.querySelector(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "primary")
    const main = toast?.querySelector(".umc-toast__main")
    expect(main).not.toBeNull()
    const message = main?.querySelector(".umc-toast__message")
    expect(message).not.toBeNull()
  })

  it("닫기 버튼은 20px CloseIcon을 그린다", () => {
    render(
      <ToastProvider>
        <ShowApp message="닫기 그림" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const glyph = document.querySelector(".umc-toast__close svg")
    expect(glyph).toHaveAttribute("width", "20")
    expect(drawingOf(glyph)).toEqual(drawingOf(svgOf(<CloseIcon size={20} />)))
  })

  it("하단 토스트는 동작 버튼이 없으면 닫기 버튼을 단다", () => {
    render(
      <ToastProvider placement="bottom">
        <ShowApp message="하단 토스트" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const toast = document.querySelector(".umc-toast")
    expect(toast).toHaveAttribute("data-placement", "bottom")
    expect(toast?.querySelector(".umc-toast__close")).not.toBeNull()
  })

  it("상단 토스트는 피그마처럼 닫기 버튼 없이 그린다", () => {
    render(
      <ToastProvider placement="top">
        <ShowApp message="상단 토스트" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const toast = document.querySelector(".umc-toast")
    expect(toast).toHaveAttribute("data-placement", "top")
    expect(toast?.querySelector(".umc-toast__close")).toBeNull()
  })

  it("상단 토스트도 동작 버튼은 그린다", () => {
    render(
      <ToastProvider placement="top">
        <ShowApp
          message="상단 동작"
          action={{ label: "되돌리기", onClick: () => {} }}
        />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByRole("button", { name: "되돌리기" })).toBeInTheDocument()
  })

  it("close(id)를 호출하면 해당 토스트가 닫힌다", async () => {
    render(
      <ToastProvider>
        <ShowCloseApp message="수동 닫힘" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    expect(screen.getByText("수동 닫힘")).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "닫아줘" }))
      await vi.advanceTimersByTimeAsync(500)
    })
    expect(screen.queryByText("수동 닫힘")).not.toBeInTheDocument()
  })

  it("토스트가 떠도 useToast를 쓰는 컴포넌트는 다시 렌더되지 않고 같은 객체를 받는다", async () => {
    const apis: ToastApi[] = []
    render(
      <ToastProvider>
        <RenderProbe onRender={(api) => apis.push(api)} />
      </ToastProvider>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
      await vi.advanceTimersByTimeAsync(500)
    })
    expect(screen.getByText("렌더 확인")).toBeInTheDocument()
    expect(apis).toHaveLength(1)
  })

  it("자식이 첫 effect에서 부른 show()도 토스트를 띄운다", () => {
    render(
      <ToastProvider>
        <ShowOnMount message="마운트하며 띄움" />
      </ToastProvider>,
    )
    expect(screen.getByText("마운트하며 띄움")).toBeInTheDocument()
  })

  it("warning 색상은 data-color=warning을 단다", () => {
    render(
      <ToastProvider>
        <ShowApp message="주의가 필요합니다" color="warning" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const toast = document.querySelector(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "warning")
  })

  it("error 색상은 data-color=error를 단다", () => {
    render(
      <ToastProvider>
        <ShowApp message="오류 발생" color="error" />
      </ToastProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "보여줘" }))
    })
    const toast = document.querySelector(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "error")
  })

  it("Provider 밖에서 useToast를 호출하면 user-friendly 오류가 발생한다", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(() => {
      render(<ShowApp message="에러" />)
    }).toThrow("useToast는 ToastProvider 안에서만 쓸 수 있습니다")
    consoleSpy.mockRestore()
  })
})
