"use client"

import { FilterIcon, ListIcon } from "@umc-product/icons"

import { Tab, TabList, TabPanel, Tabs } from "@umc-product/react"

export function TabsBasic() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <div
        data-spec-id="tab-unselected-default"
        style={{ display: "contents" }}
      >
        <div
          data-spec-id="tab-selected-default"
          style={{ display: "contents" }}
        >
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
    </div>
  )
}

export function TabsWithIcon() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <div data-spec-id="tab-icon-unselected" style={{ display: "contents" }}>
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
