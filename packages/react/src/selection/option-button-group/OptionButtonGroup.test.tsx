import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement } from "react"
import { describe, expect, it, vi } from "vitest"

import {
  SegmentedCheck16Glyph,
  SegmentedCheck20Glyph,
} from "../../internal/glyphs.tsx"
import { OptionButtonGroup } from "./OptionButtonGroup.tsx"

const SINGLE_OPTIONS = [
  { value: "fe", label: "프론트엔드" },
  { value: "be", label: "백엔드" },
  { value: "de", label: "디자인" },
] as const

const MULTI_OPTIONS = [
  { value: "react", label: "React" },
  { value: "ts", label: "TypeScript" },
  { value: "node", label: "Node.js" },
] as const

const svgOf = (element: ReactElement) =>
  render(element).container.querySelector("svg")

const drawingOf = (svg: Element | null | undefined) => ({
  viewBox: svg?.getAttribute("viewBox"),
  content: svg?.innerHTML,
})

const CHECK_BY_SIZE: [size: "xl" | "sm" | "xs", glyph: ReactElement][] = [
  ["xl", <SegmentedCheck20Glyph />],
  ["sm", <SegmentedCheck16Glyph />],
  ["xs", <SegmentedCheck16Glyph />],
]

describe("OptionButtonGroup single", () => {
  it("radiogroup 역할을 가진다", () => {
    render(
      <OptionButtonGroup
        options={[...SINGLE_OPTIONS]}
        aria-label="파트 선택"
      />,
    )
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("각 항목은 radio 역할을 가진다", () => {
    render(
      <OptionButtonGroup
        options={[...SINGLE_OPTIONS]}
        aria-label="파트 선택"
      />,
    )
    expect(screen.getAllByRole("radio")).toHaveLength(3)
  })

  it("클릭하면 onValueChange를 호출한다", async () => {
    const onValueChange = vi.fn()
    render(
      <OptionButtonGroup
        options={[...SINGLE_OPTIONS]}
        aria-label="파트"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("radio", { name: "백엔드" }))
    expect(onValueChange).toHaveBeenCalledWith("be")
  })

  it("value prop으로 선택 상태를 제어한다", () => {
    render(
      <OptionButtonGroup
        options={[...SINGLE_OPTIONS]}
        aria-label="파트"
        value="fe"
      />,
    )
    expect(screen.getByRole("radio", { name: "프론트엔드" })).toHaveAttribute(
      "data-checked",
      "",
    )
    expect(screen.getByRole("radio", { name: "백엔드" })).toHaveAttribute(
      "data-unchecked",
      "",
    )
  })

  it("첫 번째 항목은 data-position=start", () => {
    render(
      <OptionButtonGroup options={[...SINGLE_OPTIONS]} aria-label="파트" />,
    )
    const radios = screen.getAllByRole("radio")
    expect(radios[0]).toHaveAttribute("data-position", "start")
    expect(radios[1]).toHaveAttribute("data-position", "middle")
    expect(radios[2]).toHaveAttribute("data-position", "end")
  })

  it("항목이 하나면 data-position=start", () => {
    render(
      <OptionButtonGroup
        options={[{ value: "a", label: "A" }]}
        aria-label="파트"
      />,
    )
    expect(screen.getByRole("radio")).toHaveAttribute("data-position", "start")
  })

  it("disabled 항목은 선택되지 않는다", async () => {
    const onValueChange = vi.fn()
    render(
      <OptionButtonGroup
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B", disabled: true },
        ]}
        aria-label="파트"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("radio", { name: "B" }))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("name prop이 있으면 form 제출 값에 선택한 값이 들어간다", () => {
    render(
      <form aria-label="지원서">
        <OptionButtonGroup
          options={[...SINGLE_OPTIONS]}
          aria-label="파트"
          name="part"
          defaultValue="be"
        />
      </form>,
    )
    const form = screen.getByRole("form", { name: "지원서" })
    if (!(form instanceof HTMLFormElement)) {
      throw new Error("form 요소가 아닙니다")
    }
    expect(new FormData(form).get("part")).toBe("be")
  })

  it("선택한 항목에만 체크 아이콘을 그리고, 선택이 바뀌면 아이콘도 옮긴다", async () => {
    render(
      <OptionButtonGroup
        options={[...SINGLE_OPTIONS]}
        aria-label="파트"
        defaultValue="fe"
      />,
    )
    const iconOf = (name: string) =>
      screen
        .getByRole("radio", { name })
        .querySelector(".umc-option-button__indicator svg")
    expect(iconOf("프론트엔드")).not.toBeNull()
    expect(iconOf("백엔드")).toBeNull()

    await userEvent.click(screen.getByRole("radio", { name: "백엔드" }))
    expect(iconOf("프론트엔드")).toBeNull()
    expect(iconOf("백엔드")).not.toBeNull()
  })

  it.each(CHECK_BY_SIZE)(
    "%s 크기는 피그마 체크 primitive에서 같은 크기 변형을 그린다",
    (size, glyph) => {
      render(
        <OptionButtonGroup
          options={[...SINGLE_OPTIONS]}
          aria-label="파트"
          size={size}
          defaultValue="fe"
        />,
      )
      const icon = screen
        .getByRole("radio", { name: "프론트엔드" })
        .querySelector(".umc-option-button__indicator svg")
      expect(drawingOf(icon)).toEqual(drawingOf(svgOf(glyph)))
    },
  )
})

describe("OptionButtonGroup multiple", () => {
  it("각 항목은 checkbox 역할을 가진다", () => {
    render(
      <OptionButtonGroup
        type="multiple"
        options={[...MULTI_OPTIONS]}
        aria-label="기술 스택"
      />,
    )
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  it("클릭 시 onValueChange에 배열을 전달한다", async () => {
    const onValueChange = vi.fn()
    render(
      <OptionButtonGroup
        type="multiple"
        options={[...MULTI_OPTIONS]}
        aria-label="기술 스택"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("checkbox", { name: "React" }))
    expect(onValueChange).toHaveBeenCalledWith(
      expect.arrayContaining(["react"]),
    )
  })

  it("두 항목을 선택하면 배열에 두 값이 있다", async () => {
    const onValueChange = vi.fn()
    render(
      <OptionButtonGroup
        type="multiple"
        options={[...MULTI_OPTIONS]}
        aria-label="기술 스택"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("checkbox", { name: "React" }))
    await userEvent.click(screen.getByRole("checkbox", { name: "TypeScript" }))
    const lastArgs = onValueChange.mock.lastCall
    expect(lastArgs).toBeDefined()
    expect(lastArgs![0]).toHaveLength(2)
  })

  it("data-position을 올바르게 단다", () => {
    render(
      <OptionButtonGroup
        type="multiple"
        options={[...MULTI_OPTIONS]}
        aria-label="기술 스택"
      />,
    )
    const checkboxes = screen.getAllByRole("checkbox")
    expect(checkboxes[0]).toHaveAttribute("data-position", "start")
    expect(checkboxes[1]).toHaveAttribute("data-position", "middle")
    expect(checkboxes[2]).toHaveAttribute("data-position", "end")
  })

  it("선택한 항목마다 체크 아이콘을 그린다", () => {
    render(
      <OptionButtonGroup<"react" | "ts" | "node">
        type="multiple"
        options={[...MULTI_OPTIONS]}
        aria-label="기술 스택"
        defaultValue={["react", "node"]}
      />,
    )
    const icons = screen
      .getAllByRole("checkbox")
      .map((checkbox) =>
        checkbox.querySelector(".umc-option-button__indicator svg"),
      )
    expect(icons.map((icon) => icon !== null)).toEqual([true, false, true])
  })

  it("disabled 항목은 체크되지 않는다", async () => {
    const onValueChange = vi.fn()
    render(
      <OptionButtonGroup
        type="multiple"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B", disabled: true },
        ]}
        aria-label="스택"
        onValueChange={onValueChange}
      />,
    )
    await userEvent.click(screen.getByRole("checkbox", { name: "B" }))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
