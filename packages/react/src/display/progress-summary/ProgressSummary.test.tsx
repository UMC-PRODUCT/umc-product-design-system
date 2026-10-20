import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import { ProgressSummary } from "./ProgressSummary.tsx"

const percentOf = () => document.querySelector(".umc-progress-summary__percent")
const indicatorOf = () =>
  document.querySelector(".umc-progress-summary__indicator")

describe("ProgressSummary", () => {
  it("label을 이름으로 가진 progressbar를 그린다", () => {
    render(<ProgressSummary label="면접 배정률" value={21} max={42} />)
    expect(
      screen.getByRole("progressbar", { name: "면접 배정률" }),
    ).toBeInTheDocument()
  })

  it("서버에서 그린 HTML도 label을 이름으로 연결한다", () => {
    const html = renderToString(
      <ProgressSummary label="면접 배정률" value={21} max={42} />,
    )
    render(<div dangerouslySetInnerHTML={{ __html: html }} />)
    expect(
      screen.getByRole("progressbar", { name: "면접 배정률" }),
    ).toBeInTheDocument()
  })

  it("aria-labelledby를 넘기면 label 대신 그 요소를 이름으로 쓴다", () => {
    render(
      <>
        <h2 id="recruiting-progress-title">10기 서류 모집</h2>
        <ProgressSummary
          label="면접 배정률"
          value={21}
          max={42}
          aria-labelledby="recruiting-progress-title"
        />
      </>,
    )
    expect(
      screen.getByRole("progressbar", { name: "10기 서류 모집" }),
    ).toBeInTheDocument()
  })

  it("개수를 (value/max)로, 퍼센트를 반올림해 보여 준다", () => {
    render(<ProgressSummary label="면접 배정률" value={16} max={42} />)
    expect(screen.getByText("(16/42)")).toBeInTheDocument()
    expect(percentOf()).toHaveTextContent("38%")
  })

  it("aria 값은 0~100 퍼센트이고 값 텍스트가 화면의 퍼센트와 같다", () => {
    render(<ProgressSummary label="면접 배정률" value={21} max={42} />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "50")
    expect(bar).toHaveAttribute("aria-valuemin", "0")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
    expect(bar).toHaveAttribute("aria-valuetext", "50%")
  })

  it("개수를 progressbar의 설명으로 연결한다", () => {
    render(<ProgressSummary label="면접 배정률" value={21} max={42} />)
    expect(screen.getByRole("progressbar")).toHaveAccessibleDescription(
      "(21/42)",
    )
  })

  it("aria-describedby를 넘기면 개수 설명 뒤에 이어 붙인다", () => {
    render(
      <>
        <ProgressSummary
          label="면접 배정률"
          value={21}
          max={42}
          aria-describedby="interview-rate-help"
        />
        <p id="interview-rate-help">서류 합격자 중 면접 배정을 확정한 사람</p>
      </>,
    )
    expect(screen.getByRole("progressbar")).toHaveAccessibleDescription(
      "(21/42) 서류 합격자 중 면접 배정을 확정한 사람",
    )
  })

  it("화면의 퍼센트 글자는 화면 낭독기가 두 번 읽지 않게 숨긴다", () => {
    render(<ProgressSummary label="면접 배정률" value={21} max={42} />)
    expect(percentOf()).toHaveAttribute("aria-hidden", "true")
  })

  it.each([
    { value: 2, max: 3, percent: "67%" },
    { value: 42, max: 42, percent: "100%" },
    { value: 0, max: 42, percent: "0%" },
  ])("$value/$max은 $percent로 보여 준다", ({ value, max, percent }) => {
    render(<ProgressSummary label="면접 배정률" value={value} max={max} />)
    expect(percentOf()).toHaveTextContent(percent)
  })

  it("끝나지 않았으면 반올림이 100%여도 99%에서 멈춘다", () => {
    render(<ProgressSummary label="면접 배정률" value={199} max={200} />)
    expect(percentOf()).toHaveTextContent("99%")
  })

  it("시작했으면 반올림이 0%여도 1%부터 보여 준다", () => {
    render(<ProgressSummary label="면접 배정률" value={1} max={1000} />)
    expect(percentOf()).toHaveTextContent("1%")
  })

  it.each([
    { case: "max가 0", value: 0, max: 0, percent: "0%" },
    { case: "max가 0인데 value가 있음", value: 5, max: 0, percent: "0%" },
    { case: "value가 max보다 큼", value: 50, max: 42, percent: "100%" },
    { case: "value가 음수", value: -3, max: 42, percent: "0%" },
    { case: "value가 NaN", value: Number.NaN, max: 42, percent: "0%" },
  ])("$case이면 $percent로 보여 준다", ({ value, max, percent }) => {
    render(<ProgressSummary label="면접 배정률" value={value} max={max} />)
    expect(percentOf()).toHaveTextContent(percent)
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuetext",
      percent,
    )
  })

  it("화면의 퍼센트만큼 막대를 채운다", () => {
    render(<ProgressSummary label="면접 배정률" value={199} max={200} />)
    expect(indicatorOf()).toHaveStyle({ width: "99%" })
  })

  it("className을 umc-progress-summary 뒤에 붙이고 ref를 루트에 넘긴다", () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <ProgressSummary
        ref={ref}
        label="면접 배정률"
        value={21}
        max={42}
        className="mt-4"
      />,
    )
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveClass("umc-progress-summary", "mt-4")
    expect(ref.current).toBe(bar)
  })
})
