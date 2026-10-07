import { element, section } from "./dom.ts"

const GRID_COLUMN_COUNT = 12
const DESIGN_FRAME_WIDTH_PX = 1440
const MIN_FRAME_WIDTH_PX = 1024
const MAX_FRAME_WIDTH_PX = 1920
const FRAME_WIDTH_STEP_PX = 8
const MOBILE_FRAME_WIDTH_PX = 390

const columnCell = (index: number): HTMLElement =>
  element(
    "div",
    "text-caption-2-medium flex h-40 items-start justify-center rounded-sm bg-red-500/15 pt-2 text-red-700",
    [String(index + 1)],
  )

const renderDesktopDemo = (): HTMLElement => {
  const columns = Array.from({ length: GRID_COLUMN_COUNT }, (_, index) =>
    columnCell(index),
  )
  const frame = element(
    "div",
    "overflow-hidden rounded-lg bg-white ring-1 ring-black/10",
    [
      element(
        "div",
        "text-label-4-semibold flex h-header items-center bg-black/5 px-grid-margin-desktop",
        ["Header 80px"],
      ),
      element("div", "flex", [
        element(
          "aside",
          "text-label-5-medium w-sidebar shrink-0 bg-black/[0.03] p-4",
          ["Sidebar 216px"],
        ),
        element(
          "main",
          "grid flex-1 grid-cols-12 gap-x-grid-gutter px-grid-margin-desktop py-6",
          columns,
        ),
      ]),
    ],
  )
  frame.style.width = `${DESIGN_FRAME_WIDTH_PX}px`

  const readout = element("p", "text-body-3-medium")
  const updateReadout = () => {
    const columnWidth = columns[0]?.getBoundingClientRect().width ?? 0
    readout.textContent = `프레임 ${frame.style.width}, 컬럼 폭 ${columnWidth.toFixed(1)}px (마진 32px, 거터 16px 고정)`
  }

  const slider = element("input", "w-80")
  slider.type = "range"
  slider.min = String(MIN_FRAME_WIDTH_PX)
  slider.max = String(MAX_FRAME_WIDTH_PX)
  slider.step = String(FRAME_WIDTH_STEP_PX)
  slider.value = String(DESIGN_FRAME_WIDTH_PX)
  slider.setAttribute("aria-label", "데스크톱 프레임 폭")
  slider.addEventListener("input", () => {
    frame.style.width = `${slider.value}px`
  })

  new ResizeObserver(updateReadout).observe(frame)

  return element("div", "", [
    element("h3", "text-title-4-semibold", [
      "데스크톱 Layout No.1 (사이드바형)",
    ]),
    element("div", "mt-3 flex flex-wrap items-center gap-4", [slider, readout]),
    element("div", "mt-4 overflow-x-auto pb-2", [frame]),
  ])
}

const renderMobileDemo = (): HTMLElement => {
  const frame = element("div", "rounded-lg border border-black/10 bg-white", [
    element("div", "px-grid-margin-mobile py-6", [
      element(
        "div",
        "text-caption-2-medium flex h-24 items-center justify-center rounded-sm bg-red-500/15 text-red-700",
        ["콘텐츠 (좌우 마진 16px)"],
      ),
    ]),
  ])
  frame.style.width = `${MOBILE_FRAME_WIDTH_PX}px`

  return element("div", "mt-10", [
    element("h3", "text-title-4-semibold", ["모바일 390px"]),
    element("p", "text-body-3-regular mt-1 text-black/60", [
      "모바일 컬럼 수와 거터, 브레이크포인트는 디자인 팀 확인 전이라 그리지 않았습니다.",
    ]),
    element("div", "mt-4", [frame]),
  ])
}

export const renderGridSection = (): HTMLElement =>
  section(
    "그리드",
    "값은 토큰, 배치는 CSS Grid입니다. 컬럼은 Stretch로 늘어나고 마진과 거터는 고정입니다.",
    [renderDesktopDemo(), renderMobileDemo()],
  )
