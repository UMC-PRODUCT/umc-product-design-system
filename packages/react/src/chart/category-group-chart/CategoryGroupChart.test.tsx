import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { renderToString } from "react-dom/server"
import { beforeAll, describe, expect, it } from "vitest"

import {
  CategoryGroupChart,
  type CategoryGroupChartGroup,
  type CategoryGroupChartSeries,
} from "./CategoryGroupChart.tsx"

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

const PARTS: readonly CategoryGroupChartSeries[] = [
  { key: "pm", label: "PM", color: "pm" },
  { key: "design", label: "Design", color: "design" },
]

const SCHOOLS: readonly CategoryGroupChartGroup[] = [
  { key: "erica", label: "한국대 ERICA", values: { pm: 10, design: 40 } },
  { key: "cau", label: "중앙대", values: { pm: 20, design: 0 } },
  { key: "konkuk", label: "건국대", values: { pm: 5, design: 15 } },
]

const formatPeople = (value: number) => `${value}명`

const groupButton = (name: string) => screen.getByRole("button", { name })

const ratiosOf = (button: HTMLElement, selector: string) =>
  [...button.querySelectorAll<HTMLElement>(selector)].map((bar) =>
    bar.style.getPropertyValue("--umc-category-group-chart-ratio"),
  )

const popup = () => document.querySelector(".umc-chart-tooltip__popup")

describe("CategoryGroupChart", () => {
  it("묶음마다 이름을 가진 버튼을 목록 항목으로 그린다", () => {
    render(
      <CategoryGroupChart
        series={PARTS}
        groups={SCHOOLS}
        aria-label="학교별 지원 현황"
      />,
    )
    const list = screen.getByRole("list", { name: "학교별 지원 현황" })
    expect([...list.children].map((child) => child.tagName)).toEqual([
      "LI",
      "LI",
      "LI",
    ])
    expect(groupButton("한국대 ERICA")).toBeInTheDocument()
    expect(groupButton("중앙대")).toBeInTheDocument()
  })

  it("묶음의 계열 값을 버튼 설명으로 읽게 한다", () => {
    render(
      <CategoryGroupChart
        series={PARTS}
        groups={SCHOOLS}
        formatValue={formatPeople}
      />,
    )
    expect(groupButton("한국대 ERICA")).toHaveAccessibleDescription(
      "PM: 10명, Design: 40명",
    )
  })

  it("가장 큰 값을 최대 높이로 두고 막대를 비율로 그린다", () => {
    render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
    expect(
      ratiosOf(groupButton("한국대 ERICA"), ".umc-category-group-chart__bar"),
    ).toEqual(["0.25", "1"])
    expect(
      ratiosOf(groupButton("중앙대"), ".umc-category-group-chart__bar"),
    ).toEqual(["0.5", "0"])
  })

  it("값이 0인 막대에 data-empty를 단다", () => {
    render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
    const [pm, design] = groupButton("중앙대").querySelectorAll(
      ".umc-category-group-chart__bar",
    )
    expect(pm).not.toHaveAttribute("data-empty")
    expect(design).toHaveAttribute("data-empty", "")
  })

  it("계열 색을 막대의 data-color로 넘긴다", () => {
    render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
    const colors = [
      ...groupButton("건국대").querySelectorAll<HTMLElement>(
        ".umc-category-group-chart__bar",
      ),
    ].map((bar) => bar.dataset["color"])
    expect(colors).toEqual(["pm", "design"])
  })

  it("max를 넘기면 그 값을 최대 높이로 쓴다", () => {
    render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} max={80} />)
    expect(
      ratiosOf(groupButton("한국대 ERICA"), ".umc-category-group-chart__bar"),
    ).toEqual(["0.125", "0.5"])
  })

  it("계열에 없는 값은 최대 높이 계산에서 뺀다", () => {
    render(
      <CategoryGroupChart
        series={PARTS}
        groups={[
          {
            key: "erica",
            label: "한국대 ERICA",
            values: { pm: 10, design: 20, total: 300 },
          },
        ]}
      />,
    )
    expect(
      ratiosOf(groupButton("한국대 ERICA"), ".umc-category-group-chart__bar"),
    ).toEqual(["0.5", "1"])
  })

  describe("비교값", () => {
    const EVALUATED: readonly CategoryGroupChartGroup[] = [
      {
        key: "erica",
        label: "한국대 ERICA",
        values: { pm: 10, design: 30 },
        references: { pm: 16, design: 40 },
        tooltip: { summary: "40명 평가 완료", referenceSummary: "56명 지원" },
      },
    ]

    it("비교값이 있으면 막대마다 뒤에 비교 막대를 그리고 최댓값에 넣는다", () => {
      render(<CategoryGroupChart series={PARTS} groups={EVALUATED} />)
      const button = groupButton("한국대 ERICA")
      expect(ratiosOf(button, ".umc-category-group-chart__reference")).toEqual([
        "0.4",
        "1",
      ])
      expect(ratiosOf(button, ".umc-category-group-chart__bar")).toEqual([
        "0.25",
        "0.75",
      ])
    })

    it("비교값이 없으면 비교 막대를 그리지 않는다", () => {
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      expect(
        document.querySelector(".umc-category-group-chart__reference"),
      ).not.toBeInTheDocument()
    })

    it("설명에 합계와 값 / 비교값을 함께 읽게 한다", () => {
      render(
        <CategoryGroupChart
          series={PARTS}
          groups={EVALUATED}
          formatValue={formatPeople}
        />,
      )
      expect(groupButton("한국대 ERICA")).toHaveAccessibleDescription(
        "40명 평가 완료 / 56명 지원, PM: 10명 / 16명, Design: 30명 / 40명",
      )
    })
  })

  describe("툴팁", () => {
    it("마우스를 올리면 묶음 이름과 계열 값을 툴팁으로 띄운다", async () => {
      const user = userEvent.setup()
      render(
        <CategoryGroupChart
          series={PARTS}
          groups={SCHOOLS}
          formatValue={formatPeople}
        />,
      )
      await user.hover(groupButton("한국대 ERICA"))
      await waitFor(() => {
        expect(popup()).toHaveTextContent("한국대 ERICA")
      })
      expect(popup()).toHaveTextContent("PM10명")
      expect(popup()).toHaveTextContent("Design40명")
    })

    it("툴팁은 버튼 설명과 내용이 같아 화면 낭독기에서 숨긴다", async () => {
      const user = userEvent.setup()
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      await user.hover(groupButton("중앙대"))
      await waitFor(() => {
        expect(popup()).toHaveAttribute("aria-hidden", "true")
      })
    })

    it("마우스가 벗어나면 툴팁을 닫는다", async () => {
      const user = userEvent.setup()
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      await user.hover(groupButton("중앙대"))
      await waitFor(() => {
        expect(popup()).toBeInTheDocument()
      })
      await user.unhover(groupButton("중앙대"))
      await waitFor(() => {
        expect(popup()).not.toBeInTheDocument()
      })
    })

    it("키보드로 묶음에 가면 툴팁을 띄우고 Esc로 닫는다", async () => {
      const user = userEvent.setup()
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      await user.tab()
      expect(groupButton("한국대 ERICA")).toHaveFocus()
      await waitFor(() => {
        expect(popup()).toHaveTextContent("한국대 ERICA")
      })
      await user.keyboard("{Escape}")
      await waitFor(() => {
        expect(popup()).not.toBeInTheDocument()
      })
    })

    it("터치로 누르면 툴팁을 띄우고 다시 누르면 닫는다", async () => {
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      const button = groupButton("건국대")
      fireEvent.pointerDown(button, { pointerType: "touch" })
      fireEvent.click(button)
      await waitFor(() => {
        expect(popup()).toHaveTextContent("건국대")
      })
      fireEvent.pointerDown(button, { pointerType: "touch" })
      fireEvent.click(button)
      await waitFor(() => {
        expect(popup()).not.toBeInTheDocument()
      })
    })

    it("tooltip으로 합계, 보조 설명, 항목을 바꿀 수 있다", async () => {
      const user = userEvent.setup()
      render(
        <CategoryGroupChart
          series={PARTS}
          groups={[
            {
              key: "erica",
              label: "한국대 ERICA",
              values: { pm: 10, design: 40 },
              tooltip: {
                summary: "50명 지원",
                caption: "10월 20일 기준",
                items: [
                  {
                    key: "pm",
                    label: "PM 파트",
                    color: "pm",
                    value: "열 명",
                  },
                ],
              },
            },
          ]}
        />,
      )
      await user.hover(groupButton("한국대 ERICA"))
      await waitFor(() => {
        expect(popup()).toHaveTextContent("50명 지원")
      })
      expect(popup()).toHaveTextContent("PM 파트열 명")
      expect(popup()).toHaveTextContent("10월 20일 기준")
      expect(popup()).not.toHaveTextContent("Design")
    })
  })

  describe("키보드 이동", () => {
    it("Tab은 첫 묶음에만 멈춘다", () => {
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      expect(
        screen.getAllByRole("button").map((button) => button.tabIndex),
      ).toEqual([0, -1, -1])
    })

    it("화살표 키와 Home, End로 묶음 사이를 옮긴다", async () => {
      const user = userEvent.setup()
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      await user.tab()
      await user.keyboard("{ArrowRight}")
      expect(groupButton("중앙대")).toHaveFocus()
      await user.keyboard("{End}")
      expect(groupButton("건국대")).toHaveFocus()
      await user.keyboard("{ArrowRight}")
      expect(groupButton("건국대")).toHaveFocus()
      await user.keyboard("{Home}")
      expect(groupButton("한국대 ERICA")).toHaveFocus()
      await user.keyboard("{ArrowLeft}")
      expect(groupButton("한국대 ERICA")).toHaveFocus()
    })

    it("옮긴 묶음이 다음 Tab 진입점이 된다", async () => {
      const user = userEvent.setup()
      render(<CategoryGroupChart series={PARTS} groups={SCHOOLS} />)
      await user.tab()
      await user.keyboard("{ArrowRight}")
      expect(
        screen.getAllByRole("button").map((button) => button.tabIndex),
      ).toEqual([-1, 0, -1])
    })
  })

  it("서버에서 그린 HTML에도 버튼 이름과 설명이 있다", () => {
    const html = renderToString(
      <CategoryGroupChart
        series={PARTS}
        groups={SCHOOLS}
        formatValue={formatPeople}
      />,
    )
    render(<div dangerouslySetInnerHTML={{ __html: html }} />)
    expect(groupButton("중앙대")).toHaveAccessibleDescription(
      "PM: 20명, Design: 0명",
    )
  })

  it("className을 umc-category-group-chart 뒤에 붙이고 ref를 목록에 넘긴다", () => {
    const ref = createRef<HTMLUListElement>()
    render(
      <CategoryGroupChart
        ref={ref}
        series={PARTS}
        groups={SCHOOLS}
        className="mt-6"
      />,
    )
    const list = screen.getByRole("list")
    expect(list).toHaveClass("umc-category-group-chart", "mt-6")
    expect(ref.current).toBe(list)
  })
})
