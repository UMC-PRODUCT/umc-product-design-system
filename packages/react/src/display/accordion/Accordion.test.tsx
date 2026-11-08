import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement } from "react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { ExpandMoreIcon } from "@umc-product/icons"

import { Accordion, AccordionItem, type AccordionProps } from "./Accordion.tsx"

beforeAll(() => {
  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
  if (!HTMLElement.prototype.getAnimations) {
    HTMLElement.prototype.getAnimations = () => []
  }
})

const FAQ = [
  {
    value: "about",
    title: "UMC는 어떤 동아리이고, 어떤 활동을 하나요?",
    body: "UMC는 기획, 디자인, 개발 분야의 대학생들이 함께 공부하고 실제 서비스를 만들어보는 전국 단위 IT 연합 동아리예요.",
  },
  {
    value: "edit",
    title: "프로젝트 등록 후 수정이 가능한가요?",
    body: "등록한 프로젝트는 매칭이 시작되기 전까지 수정할 수 있어요.",
  },
] as const

const [ABOUT, EDIT] = FAQ

const renderFaq = (props: Partial<AccordionProps> = {}) =>
  render(
    <Accordion {...props}>
      {FAQ.map((item) => (
        <AccordionItem key={item.value} {...item} />
      ))}
    </Accordion>,
  )

const triggerOf = (title: string) => screen.getByRole("button", { name: title })

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

const drawingOf = (svg: Element | null | undefined) => ({
  viewBox: svg?.getAttribute("viewBox"),
  content: svg?.innerHTML,
})

describe("Accordion", () => {
  it("제목은 heading 안의 버튼이고 처음에는 본문을 숨긴다", () => {
    renderFaq()
    const heading = screen.getAllByRole("heading")[0]
    expect(heading).not.toBeUndefined()
    const trigger = within(heading as HTMLElement).getByRole("button", {
      name: ABOUT.title,
    })
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText(ABOUT.body)).not.toBeInTheDocument()
  })

  it("접두는 기본값 Q이고 낭독기에는 읽히지 않는다", () => {
    const { container } = renderFaq()
    const prefixes = container.querySelectorAll(".umc-accordion-item__prefix")
    expect(prefixes).toHaveLength(2)
    expect(prefixes[0]).toHaveTextContent("Q")
    expect(prefixes[0]).toHaveAttribute("aria-hidden", "true")
  })

  it("prefix에 null을 넘기면 접두를 그리지 않는다", () => {
    const { container } = render(
      <Accordion>
        <AccordionItem value="a" title="제목" body="본문" prefix={null} />
      </Accordion>,
    )
    expect(
      container.querySelector(".umc-accordion-item__prefix"),
    ).not.toBeInTheDocument()
  })

  it("버튼을 누르면 본문을 펼치고 항목에 data-open을 단다", async () => {
    const user = userEvent.setup()
    const { container } = renderFaq()
    await user.click(triggerOf(ABOUT.title))
    expect(triggerOf(ABOUT.title)).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(ABOUT.body)).toBeVisible()
    expect(container.querySelector(".umc-accordion-item")).toHaveAttribute(
      "data-open",
    )
  })

  it("기본값으로 한 번에 하나만 펼친다", async () => {
    const user = userEvent.setup()
    renderFaq()
    await user.click(triggerOf(ABOUT.title))
    await user.click(triggerOf(EDIT.title))
    expect(triggerOf(ABOUT.title)).toHaveAttribute("aria-expanded", "false")
    expect(triggerOf(EDIT.title)).toHaveAttribute("aria-expanded", "true")
  })

  it("multiple이면 여러 항목을 함께 펼친다", async () => {
    const user = userEvent.setup()
    renderFaq({ multiple: true })
    await user.click(triggerOf(ABOUT.title))
    await user.click(triggerOf(EDIT.title))
    expect(triggerOf(ABOUT.title)).toHaveAttribute("aria-expanded", "true")
    expect(triggerOf(EDIT.title)).toHaveAttribute("aria-expanded", "true")
  })

  it("defaultValue로 처음 펼칠 항목을 정한다", () => {
    renderFaq({ defaultValue: [EDIT.value] })
    expect(triggerOf(EDIT.title)).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText(EDIT.body)).toBeVisible()
  })

  it("value와 onValueChange로 제어한다", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderFaq({ value: [ABOUT.value], onValueChange })
    await user.click(triggerOf(EDIT.title))
    expect(onValueChange).toHaveBeenCalledWith([EDIT.value])
    expect(triggerOf(ABOUT.title)).toHaveAttribute("aria-expanded", "true")
    expect(triggerOf(EDIT.title)).toHaveAttribute("aria-expanded", "false")
  })

  it("disabled 항목은 눌러도 펼쳐지지 않는다", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Accordion>
        <AccordionItem value="a" title="닫힌 질문" body="본문" disabled />
      </Accordion>,
    )
    expect(container.querySelector(".umc-accordion-item")).toHaveAttribute(
      "data-disabled",
    )
    await user.click(triggerOf("닫힌 질문"))
    expect(triggerOf("닫힌 질문")).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("본문")).not.toBeInTheDocument()
  })

  it("펼침 아이콘은 24px Expand_more Fill이다", () => {
    const { container } = renderFaq()
    const icon = container.querySelector(".umc-accordion-item__icon svg")
    expect(icon).toHaveAttribute("aria-hidden", "true")
    expect(drawingOf(icon)).toEqual(
      drawingOf(svgOf(<ExpandMoreIcon weight="fill" />)),
    )
  })

  it("className을 목록과 항목 루트에 넘긴다", () => {
    const { container } = render(
      <Accordion className="list">
        <AccordionItem value="a" title="제목" body="본문" className="item" />
      </Accordion>,
    )
    expect(container.querySelector(".umc-accordion")).toHaveClass("list")
    expect(container.querySelector(".umc-accordion-item")).toHaveClass("item")
  })
})
