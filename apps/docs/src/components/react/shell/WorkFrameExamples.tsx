"use client"

import { useState } from "react"
import {
  ContextSwitcher,
  Header,
  PageHeader,
  SideNavigation,
  type ContextSwitcherOption,
  type SideNavigationItem,
} from "@umc-product/react"

const navItems = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

const generationOptions: ContextSwitcherOption<string>[] = [
  { label: "10기", value: "10" },
  { label: "11기", value: "11" },
]

const sideItems: SideNavigationItem[] = [
  { label: "대시보드", href: "/dashboard" },
  {
    label: "리크루팅",
    children: [
      { label: "지원자 목록", href: "/recruiting/applications" },
      { label: "지원자 평가", href: "/recruiting/reviews" },
    ],
  },
  { label: "설정", href: "/settings" },
]

export function WorkFrameDemo() {
  const [generation, setGeneration] = useState("10")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "480px",
        border: "1px solid #e2e3e3",
        borderRadius: 8,
        overflow: "hidden",
        fontSize: 14,
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <Header
          logo={<span style={{ fontWeight: 700, color: "#02746c" }}>UMC</span>}
          navItems={navItems}
          currentPath="/recruiting/applications"
          className="sticky top-0"
        />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ flexShrink: 0 }}>
          <SideNavigation
            items={sideItems}
            currentPath="/recruiting/applications"
            slot={
              <ContextSwitcher
                options={generationOptions}
                value={generation}
                onValueChange={setGeneration}
              />
            }
          />
        </div>
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: "48px 16px 16px 32px",
            background: "#f8f9fa",
          }}
        >
          <PageHeader
            title="지원자 목록"
            description="현재 차수에 지원한 모든 지원자를 확인합니다."
            breadcrumbs={[
              { label: "리크루팅", href: "/recruiting" },
              { label: "지원자 목록" },
            ]}
          />
        </main>
      </div>
    </div>
  )
}
