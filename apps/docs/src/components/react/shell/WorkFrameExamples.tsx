"use client"

import {
  ContextSwitcher,
  Header,
  HeaderHomeLink,
  PageHeader,
  SideNavigation,
  type ContextSwitcherOption,
  type SideNavigationItem,
} from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"
import { useState } from "react"

import { PreviewLinks } from "./PreviewLinks.tsx"

const NAV_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "운영", href: "/manage" },
  { label: "지원하기", href: "/apply" },
]

const GENERATIONS: ContextSwitcherOption[] = [
  { value: "10", label: "10기" },
  { value: "11", label: "11기" },
]

const menuIcon = <PeoplePictogram color="currentColor" />

const SIDE_ITEMS: SideNavigationItem[] = [
  { label: "대시보드", href: "/manage", icon: menuIcon },
  {
    label: "리크루팅",
    icon: menuIcon,
    children: [
      { label: "지원자 목록", href: "/manage/recruiting/applications" },
      { label: "지원자 평가", href: "/manage/recruiting/reviews" },
    ],
  },
  { label: "설정", href: "/manage/settings", icon: menuIcon },
]

const PAGE_TITLES: Record<string, string> = {
  "/manage": "대시보드",
  "/manage/recruiting/applications": "지원자 목록",
  "/manage/recruiting/reviews": "지원자 평가",
  "/manage/settings": "설정",
}

export function WorkFrameDemo() {
  const [path, setPath] = useState("/manage/recruiting/applications")
  const [generation, setGeneration] = useState("10")

  return (
    <PreviewLinks onNavigate={setPath}>
      <div className="umc-example umc-example-flush overflow-x-auto">
        <div className="flex h-[640px] min-w-[960px] flex-col">
          <Header
            logo={
              <HeaderHomeLink
                context="operation"
                generation={Number(generation)}
              />
            }
            navItems={NAV_ITEMS}
            currentPath={path}
          />
          <div className="flex min-h-0 flex-1">
            <SideNavigation
              items={SIDE_ITEMS}
              currentPath={path}
              slot={
                <ContextSwitcher
                  options={GENERATIONS}
                  value={generation}
                  onValueChange={setGeneration}
                />
              }
            />
            <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-auto px-8 pt-12 pb-20">
              <PageHeader
                title={PAGE_TITLES[path] ?? "페이지"}
                description="페이지를 간결하고 명확하게 설명합니다."
                breadcrumbs={[
                  { label: "운영", href: "/manage" },
                  { label: PAGE_TITLES[path] ?? "페이지" },
                ]}
              />
              <div
                className="min-h-40 flex-1 rounded-xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px var(--umc-color-border-neutral-weaker)",
                }}
              />
            </main>
          </div>
        </div>
      </div>
    </PreviewLinks>
  )
}
