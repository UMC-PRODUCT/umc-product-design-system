"use client"

import {
  ContextSwitcher,
  Header,
  HeaderHomeLink,
  PageHeader,
  SideNavigation,
  type BreadcrumbItem,
  type ContextSwitcherOption,
  type NavItem,
  type SideNavigationItem,
} from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"
import { useState, type ReactNode } from "react"

import { PreviewLinks } from "./PreviewLinks.tsx"

type MenuPage = { label: string; href: string }
type MenuGroup = { label: string; children: MenuPage[] }
type MenuEntry = MenuPage | MenuGroup
type LabelPlace = "header" | "side" | "breadcrumb" | "title"
type LabelOf = (entry: MenuEntry, place: LabelPlace) => ReactNode

const RECRUITING_AREA: MenuPage = { label: "리크루팅", href: "/recruiting" }

const NAV_ITEMS: MenuPage[] = [
  { label: "소개", href: "/about" },
  { label: "모집 안내", href: "/guide" },
  { label: "프로젝트", href: "/projects" },
  RECRUITING_AREA,
  { label: "설정", href: "/settings" },
]

const RECRUITMENT_LIST: MenuPage = {
  label: "모집 목록",
  href: "/recruiting/list",
}

const RECRUITMENT_GROUP: MenuGroup = {
  label: "모집 관리",
  children: [
    { label: "모집 생성", href: "/recruiting/new" },
    RECRUITMENT_LIST,
    { label: "모집 인원 설정", href: "/recruiting/capacity" },
  ],
}

const RECRUITING_MENU: MenuEntry[] = [
  { label: "대시보드", href: "/recruiting" },
  RECRUITMENT_GROUP,
  { label: "평가 관리", href: "/recruiting/reviews" },
  { label: "히스토리", href: "/recruiting/history" },
]

const GENERATIONS: ContextSwitcherOption[] = [
  { value: "10", label: "10기" },
  { value: "11", label: "11기" },
]

const PAGE_DESCRIPTION = "페이지를 간결하고 명확하게 설명합니다."

const menuIcon = <PeoplePictogram color="currentColor" />

const isMenuGroup = (entry: MenuEntry): entry is MenuGroup =>
  "children" in entry

const plainLabel: LabelOf = (entry) => entry.label

function locate(path: string) {
  for (const entry of RECRUITING_MENU) {
    if (!isMenuGroup(entry)) {
      if (entry.href === path) return { page: entry }
      continue
    }
    const page = entry.children.find((child) => child.href === path)
    if (page) return { page, group: entry }
  }
  return undefined
}

function navItemsOf(labelOf: LabelOf): NavItem[] {
  return NAV_ITEMS.map((item) => ({
    label: labelOf(item, "header"),
    href: item.href,
  }))
}

function sideItemsOf(labelOf: LabelOf): SideNavigationItem[] {
  return RECRUITING_MENU.map((entry) =>
    isMenuGroup(entry)
      ? {
          label: labelOf(entry, "side"),
          icon: menuIcon,
          children: entry.children.map((child) => ({
            label: labelOf(child, "side"),
            href: child.href,
          })),
        }
      : { label: labelOf(entry, "side"), href: entry.href, icon: menuIcon },
  )
}

function breadcrumbsOf(
  path: string,
  labelOf: LabelOf,
): BreadcrumbItem[] | undefined {
  const location = locate(path)
  if (!location) return undefined
  return [
    {
      label: labelOf(RECRUITING_AREA, "breadcrumb"),
      href: RECRUITING_AREA.href,
    },
    ...(location.group
      ? [{ label: labelOf(location.group, "breadcrumb") }]
      : []),
    { label: labelOf(location.page, "breadcrumb") },
  ]
}

function titleOf(path: string, labelOf: LabelOf): ReactNode {
  const location = locate(path)
  if (location) return labelOf(location.page, "title")
  const area = NAV_ITEMS.find((item) => item.href === path)
  return area ? labelOf(area, "title") : "페이지"
}

type RecruitingFrameProps = {
  path: string
  labelOf: LabelOf
  generation: string
  onGenerationChange: (generation: string) => void
  className: string
  children?: ReactNode
}

function RecruitingFrame({
  path,
  labelOf,
  generation,
  onGenerationChange,
  className,
  children,
}: RecruitingFrameProps) {
  return (
    <div className={`flex min-w-[960px] flex-col ${className}`}>
      <Header
        logo={
          <HeaderHomeLink context="operation" generation={Number(generation)} />
        }
        navItems={navItemsOf(labelOf)}
        currentPath={path}
      />
      <div className="flex min-h-0 flex-1">
        <SideNavigation
          items={sideItemsOf(labelOf)}
          currentPath={path}
          slot={
            <ContextSwitcher
              options={GENERATIONS}
              value={generation}
              onValueChange={onGenerationChange}
            />
          }
        />
        <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-auto px-8 pt-12 pb-20">
          <PageHeader
            title={titleOf(path, labelOf)}
            description={PAGE_DESCRIPTION}
            breadcrumbs={breadcrumbsOf(path, labelOf)}
          />
          {children}
        </main>
      </div>
    </div>
  )
}

export function WorkFrameDemo() {
  const [path, setPath] = useState(RECRUITMENT_LIST.href)
  const [generation, setGeneration] = useState("10")

  return (
    <PreviewLinks onNavigate={setPath}>
      <div className="umc-example umc-example-flush overflow-x-auto">
        <RecruitingFrame
          path={path}
          labelOf={plainLabel}
          generation={generation}
          onGenerationChange={setGeneration}
          className="h-[640px]"
        >
          <div
            className="min-h-40 flex-1 rounded-xl"
            style={{
              boxShadow:
                "inset 0 0 0 1px var(--umc-color-border-neutral-weaker-100)",
            }}
          />
        </RecruitingFrame>
      </div>
    </PreviewLinks>
  )
}
