"use client"

import { FilterIcon, ListIcon } from "@umc-product/icons"

import { Tab, TabList, TabPanel, Tabs } from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function TabsBasic() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <div data-spec-id="tab-selected-default tab-unselected-default tab-hover-default">
        <Tabs defaultValue="notice">
          <TabList aria-label="게시판">
            <Tab value="notice">공지사항</Tab>
            <Tab value="faq">자주 묻는 질문</Tab>
            <Tab value="event">이벤트</Tab>
          </TabList>
          <TabPanel value="notice">공지사항 내용이 들어갑니다.</TabPanel>
          <TabPanel value="faq">자주 묻는 질문 내용이 들어갑니다.</TabPanel>
          <TabPanel value="event">이벤트 내용이 들어갑니다.</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export function TabsWithIcon() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <div data-spec-id="tab-icon-unselected tab-icon-glyph">
        <Tabs defaultValue="filter">
          <TabList aria-label="보기 도구">
            <Tab value="filter" icon={<FilterIcon />} aria-label="필터" />
            <Tab value="list" icon={<ListIcon />} aria-label="목록" />
          </TabList>
          <TabPanel value="filter">필터 패널</TabPanel>
          <TabPanel value="list">목록 패널</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

function TabVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  const isIcon = variant.props["Type"] === "Icon"
  return (
    <ForceState states={state === "Hover & Pressed" ? ["hover", "active"] : []}>
      <Tabs value={state === "Selected" ? "tab" : "none"}>
        <TabList aria-label="탭">
          {isIcon ? (
            <Tab value="tab" icon={<FilterIcon />} aria-label="필터" />
          ) : (
            <Tab value="tab">공지사항</Tab>
          )}
        </TabList>
      </Tabs>
    </ForceState>
  )
}

export function TabsAllVariants() {
  return (
    <VariantGrid
      set="tab-button"
      rows={["Type"]}
      columns={["State"]}
      order={{ State: ["Unselected", "Hover & Pressed", "Selected"] }}
      render={(variant) => <TabVariantCell variant={variant} />}
    />
  )
}
