"use client"

import { Tab, TabList, TabPanel, Tabs } from "@umc-product/react"

export function TabsBasic() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
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
  )
}

function FilterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4h12M5 8h6M7 12h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TabsWithIcon() {
  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", width: "100%" }}
    >
      <Tabs defaultValue="filter">
        <TabList aria-label="보기 도구">
          <Tab value="filter" icon={<FilterIcon />} aria-label="필터" />
          <Tab value="list" icon={<ListIcon />} aria-label="목록" />
        </TabList>
        <TabPanel value="filter">필터 패널</TabPanel>
        <TabPanel value="list">목록 패널</TabPanel>
      </Tabs>
    </div>
  )
}
