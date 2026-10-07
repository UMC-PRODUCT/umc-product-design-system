import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { Tab, TabList, TabPanel, Tabs } from "./Tabs.tsx"

beforeAll(() => {
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => []
  }
})

const FilterIcon = () => <svg data-testid="filter-icon" />

describe("Tabs", () => {
  function renderTabs(props?: {
    defaultValue?: string
    value?: string
    onValueChange?: (v: string) => void
  }) {
    return render(
      <Tabs defaultValue="first" {...props}>
        <TabList aria-label="탭 목록">
          <Tab value="first">첫 번째</Tab>
          <Tab value="second">두 번째</Tab>
          <Tab value="third">세 번째</Tab>
        </TabList>
        <TabPanel value="first">패널 1</TabPanel>
        <TabPanel value="second">패널 2</TabPanel>
        <TabPanel value="third">패널 3</TabPanel>
      </Tabs>,
    )
  }

  it("tablist와 tab 역할을 가진다", () => {
    renderTabs()
    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.getAllByRole("tab")).toHaveLength(3)
  })

  it("활성 탭과 연결된 패널이 표시된다", () => {
    renderTabs()
    expect(screen.getByRole("tab", { name: "첫 번째" })).toHaveAttribute(
      "data-active",
      "",
    )
    const panels = screen.getAllByRole("tabpanel")
    const activePanel = panels.find((p) => !p.hasAttribute("data-hidden"))
    expect(activePanel).toHaveTextContent("패널 1")
  })

  it("탭을 클릭하면 활성 탭이 바뀐다", async () => {
    renderTabs()
    await userEvent.click(screen.getByRole("tab", { name: "두 번째" }))
    const activeTab = screen.getByRole("tab", { name: "두 번째" })
    expect(activeTab).toHaveAttribute("data-active", "")
    const panels = screen.getAllByRole("tabpanel")
    const activePanel = panels.find(
      (p) => p.getAttribute("aria-labelledby") === activeTab.id,
    )
    expect(activePanel).toHaveTextContent("패널 2")
  })

  it("화살표 키로 탭을 이동한다", async () => {
    renderTabs()
    screen.getByRole("tab", { name: "첫 번째" }).focus()
    await userEvent.keyboard("{ArrowRight}")
    await userEvent.keyboard("{Enter}")
    expect(screen.getByRole("tab", { name: "두 번째" })).toHaveAttribute(
      "data-active",
      "",
    )
  })

  it("onValueChange가 호출된다", async () => {
    const onValueChange = vi.fn()
    renderTabs({ onValueChange })
    await userEvent.click(screen.getByRole("tab", { name: "두 번째" }))
    expect(onValueChange).toHaveBeenCalledWith("second")
  })

  it("umc-tab, umc-tab-list, umc-tab-panel 클래스를 가진다", () => {
    renderTabs()
    expect(screen.getByRole("tablist")).toHaveClass("umc-tab-list")
    screen.getAllByRole("tab").forEach((tab) => {
      expect(tab).toHaveClass("umc-tab")
    })
    expect(screen.getByRole("tabpanel")).toHaveClass("umc-tab-panel")
  })
})

describe("Tab with icon", () => {
  it("aria-label이 있는 아이콘 탭은 접근 가능한 이름을 가진다", () => {
    render(
      <Tabs defaultValue="filter">
        <TabList aria-label="도구">
          <Tab value="filter" icon={<FilterIcon />} aria-label="필터"></Tab>
        </TabList>
        <TabPanel value="filter">필터 패널</TabPanel>
      </Tabs>,
    )
    expect(screen.getByRole("tab", { name: "필터" })).toBeInTheDocument()
  })

  it("아이콘은 aria-hidden으로 숨긴다", () => {
    render(
      <Tabs defaultValue="filter">
        <TabList aria-label="도구">
          <Tab value="filter" icon={<FilterIcon />} aria-label="필터" />
        </TabList>
        <TabPanel value="filter">패널</TabPanel>
      </Tabs>,
    )
    const tab = screen.getByRole("tab", { name: "필터" })
    const iconWrapper = tab.querySelector(".umc-tab__icon")
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true")
  })
})
