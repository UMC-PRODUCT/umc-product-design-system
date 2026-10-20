import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { beforeAll, describe, expect, it } from "vitest"

import { RankedBarChart, type RankedBarChartItem } from "./RankedBarChart.tsx"

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

const CHAPTERS: readonly RankedBarChartItem[] = [
  { key: "platinum", label: "Platinum", value: 71 },
  { key: "neon", label: "Neon", value: 100 },
  { key: "cassiopeia", label: "Cassiopeia", value: 4 },
  { key: "chromium", label: "Chromium", value: 89 },
  { key: "nova", label: "Nova", value: 4 },
  { key: "empty", label: "지부명", value: 0 },
]

const items = () => [
  ...document.querySelectorAll<HTMLElement>(".umc-ranked-bar-chart__item"),
]

const itemOf = (name: string) => {
  const item = screen.getByRole("button", { name }).closest("li")
  if (item === null) throw new Error(`${name} 항목이 없습니다`)
  return item
}

const barHeightOf = (name: string) =>
  itemOf(name).style.getPropertyValue("--umc-ranked-bar-chart-bar-height")

const popup = () => document.querySelector(".umc-chart-tooltip__popup")

describe("RankedBarChart", () => {
  it("값이 큰 순서로 막대를 늘어놓고 막대마다 이름을 가진 버튼을 둔다", () => {
    render(
      <RankedBarChart
        items={CHAPTERS}
        unit="명"
        aria-label="지부별 지원 현황"
      />,
    )
    const list = screen.getByRole("list", { name: "지부별 지원 현황" })
    const ranked = [
      "Neon",
      "Chromium",
      "Platinum",
      "Cassiopeia",
      "Nova",
      "지부명",
    ].map((name) => screen.getByRole("button", { name }))
    expect(within(list).getAllByRole("button")).toEqual(ranked)
  })

  it("순위에 따라 1위, 2위, 3위, 4위 이하 색을 고르고 0은 순위가 없다", () => {
    render(<RankedBarChart items={CHAPTERS} />)
    expect(items().map((item) => item.dataset["tone"])).toEqual([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4th",
      "none",
    ])
  })

  it("같은 값은 같은 순위로 읽고 공동 순위라고 알린다", () => {
    render(<RankedBarChart items={CHAPTERS} unit="명" />)
    expect(
      screen.getByRole("button", { name: "Cassiopeia" }),
    ).toHaveAccessibleDescription("공동 4위, 4명")
    expect(
      screen.getByRole("button", { name: "Neon" }),
    ).toHaveAccessibleDescription("1위, 100명")
    expect(
      screen.getByRole("button", { name: "지부명" }),
    ).toHaveAccessibleDescription("0명")
  })

  it("숫자와 단위를 막대 위에 적고 화면 낭독기에서는 설명으로 읽는다", () => {
    render(<RankedBarChart items={CHAPTERS} unit="명" />)
    const amount = itemOf("Neon").querySelector(".umc-ranked-bar-chart__amount")
    expect(amount).toHaveTextContent("100명")
    expect(amount).toHaveAttribute("aria-hidden", "true")
  })

  describe("값 높이", () => {
    it("가장 큰 값을 200px로 두고 값에 비례해 높이를 정한다", () => {
      render(<RankedBarChart items={CHAPTERS} />)
      expect(barHeightOf("Neon")).toBe("200px")
      expect(barHeightOf("Platinum")).toBe("142px")
    })

    it("0은 1px, 아주 작은 값은 2px보다 낮아지지 않는다", () => {
      render(
        <RankedBarChart
          items={[
            { key: "big", label: "큰 값", value: 1000 },
            { key: "tiny", label: "작은 값", value: 1 },
            { key: "zero", label: "없음", value: 0 },
          ]}
        />,
      )
      expect(barHeightOf("작은 값")).toBe("2px")
      expect(barHeightOf("없음")).toBe("1px")
    })

    it("막대가 28px 이상이면 이름을 막대 안에, 아니면 막대 위에 둔다", () => {
      render(
        <RankedBarChart
          items={[
            { key: "full", label: "가득", value: 100 },
            { key: "edge", label: "경계", value: 14 },
            { key: "short", label: "낮음", value: 13 },
          ]}
        />,
      )
      expect(itemOf("가득").dataset["label"]).toBe("inside")
      expect(itemOf("경계").dataset["label"]).toBe("inside")
      expect(itemOf("낮음").dataset["label"]).toBe("outside")
    })

    it("max를 넘기면 그 값을 200px로 쓴다", () => {
      render(
        <RankedBarChart
          items={[{ key: "half", label: "절반", value: 50 }]}
          max={200}
        />,
      )
      expect(barHeightOf("절반")).toBe("50px")
    })

    it("비교값이 있으면 뒤에 비교 막대를 그리고 최댓값에 넣는다", () => {
      render(
        <RankedBarChart
          unit="명"
          items={[
            { key: "neon", label: "Neon", value: 100, reference: 120 },
            { key: "nova", label: "Nova", value: 1, reference: 6 },
          ]}
        />,
      )
      const neon = itemOf("Neon")
      expect(
        neon.querySelector(".umc-ranked-bar-chart__reference"),
      ).not.toBeNull()
      expect(
        neon.style.getPropertyValue("--umc-ranked-bar-chart-reference-height"),
      ).toBe("200px")
      expect(barHeightOf("Neon")).toBe(`${(100 / 120) * 200}px`)
      expect(
        itemOf("Nova").style.getPropertyValue(
          "--umc-ranked-bar-chart-reference-height",
        ),
      ).toBe("32px")
      expect(
        screen.getByRole("button", { name: "Neon" }),
      ).toHaveAccessibleDescription("1위, 100명 / 120명")
    })
  })

  describe("순위 높이", () => {
    it("순위마다 정해진 높이를 쓰고 5위부터 이름을 막대 위에 둔다", () => {
      render(
        <RankedBarChart
          heightBy="rank"
          items={[
            { key: "a", label: "가", value: 60 },
            { key: "b", label: "나", value: 50 },
            { key: "c", label: "다", value: 40 },
            { key: "d", label: "라", value: 30 },
            { key: "e", label: "마", value: 20 },
            { key: "f", label: "바", value: 10 },
          ]}
        />,
      )
      expect(["가", "나", "다", "라", "마", "바"].map(barHeightOf)).toEqual([
        "143px",
        "107.25px",
        "71.5px",
        "35.75px",
        "8px",
        "8px",
      ])
      expect(items().map((item) => item.dataset["tone"])).toEqual([
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "5th",
      ])
      expect(itemOf("마").dataset["label"]).toBe("outside")
    })

    it("값이 없으면 숫자 없이 낮은 회색 막대만 그리고 이름은 화면 낭독기로 읽는다", () => {
      render(
        <RankedBarChart
          heightBy="rank"
          items={[
            { key: "a", label: "가", value: 60 },
            { key: "none", label: "없음", value: 0 },
          ]}
        />,
      )
      const none = itemOf("없음")
      expect(barHeightOf("없음")).toBe("5px")
      expect(none.querySelector(".umc-ranked-bar-chart__amount")).toBeNull()
      expect(within(none).getByText("없음")).toHaveClass("umc-visually-hidden")
    })

    it("비교 막대는 그리지 않는다", () => {
      render(
        <RankedBarChart
          heightBy="rank"
          items={[{ key: "a", label: "가", value: 60, reference: 80 }]}
        />,
      )
      expect(
        document.querySelector(".umc-ranked-bar-chart__reference"),
      ).toBeNull()
    })
  })

  describe("툴팁", () => {
    it("마우스를 올리면 이름과 값을 툴팁으로 띄운다", async () => {
      const user = userEvent.setup()
      render(<RankedBarChart items={CHAPTERS} unit="명" />)
      await user.hover(screen.getByRole("button", { name: "Chromium" }))
      await waitFor(() => {
        expect(popup()).toHaveTextContent("Chromium89명")
      })
    })

    it("tooltip을 넘기면 그 내용을 띄우고 설명으로도 읽는다", async () => {
      const user = userEvent.setup()
      render(
        <RankedBarChart
          unit="명"
          items={[
            {
              key: "chromium",
              label: "Chromium",
              value: 100,
              reference: 120,
              tooltip: {
                summary: "100명 평가 완료",
                referenceSummary: "120명 지원",
                items: [
                  {
                    key: "pm",
                    label: "PM",
                    color: "pm",
                    value: "10명",
                    reference: "16명",
                  },
                ],
              },
            },
          ]}
        />,
      )
      const button = screen.getByRole("button", { name: "Chromium" })
      expect(button).toHaveAccessibleDescription(
        "1위, 100명 평가 완료 / 120명 지원, PM: 10명 / 16명",
      )
      await user.hover(button)
      await waitFor(() => {
        expect(popup()).toHaveTextContent("100명 평가 완료 / 120명 지원")
      })
      expect(popup()).toHaveTextContent("PM10명/16명")
    })
  })

  it("화살표 키로 막대 사이를 옮긴다", async () => {
    const user = userEvent.setup()
    render(<RankedBarChart items={CHAPTERS} />)
    await user.tab()
    expect(screen.getByRole("button", { name: "Neon" })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("button", { name: "Chromium" })).toHaveFocus()
    await user.keyboard("{End}")
    expect(screen.getByRole("button", { name: "지부명" })).toHaveFocus()
  })

  it("높이 기준을 data-height-by로 넘기고 기본은 value다", () => {
    const { rerender } = render(<RankedBarChart items={CHAPTERS} />)
    expect(screen.getByRole("list")).toHaveAttribute("data-height-by", "value")
    rerender(<RankedBarChart items={CHAPTERS} heightBy="rank" />)
    expect(screen.getByRole("list")).toHaveAttribute("data-height-by", "rank")
  })

  it("className을 umc-ranked-bar-chart 뒤에 붙이고 ref를 목록에 넘긴다", () => {
    const ref = createRef<HTMLUListElement>()
    render(<RankedBarChart ref={ref} items={CHAPTERS} className="mt-4" />)
    const list = screen.getByRole("list")
    expect(list).toHaveClass("umc-ranked-bar-chart", "mt-4")
    expect(ref.current).toBe(list)
  })
})
