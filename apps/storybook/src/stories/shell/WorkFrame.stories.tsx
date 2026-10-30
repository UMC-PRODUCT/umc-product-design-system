import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HeaderDesktop,
  HeaderHomeLink,
  PageHeader,
  SideNavigation,
} from "@umc-product/react"
import type { NavItem, SideNavigationItem } from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"

import { docsParameters } from "../../docs-links.ts"

const menuIcon = <PeoplePictogram color="currentColor" />

const NAV_ITEMS: NavItem[] = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "리크루팅", href: "/recruiting" },
  { label: "설정", href: "/settings" },
]

const SIDE_ITEMS: SideNavigationItem[] = [
  { label: "대시보드", href: "/recruiting", icon: menuIcon },
  {
    label: "모집 관리",
    icon: menuIcon,
    children: [
      { label: "모집 목록", href: "/recruiting/list" },
      { label: "모집 생성", href: "/recruiting/new" },
    ],
  },
  { label: "평가 관리", href: "/recruiting/reviews", icon: menuIcon },
  { label: "히스토리", href: "/recruiting/history", icon: menuIcon },
]

type PageInfo = {
  title: string
  description: string
  breadcrumbs: { label: string; href?: string }[]
}

const PAGE_INFO: Record<string, PageInfo> = {
  "/recruiting": {
    title: "대시보드",
    description: "리크루팅 현황을 한눈에 확인합니다.",
    breadcrumbs: [{ label: "리크루팅" }],
  },
  "/recruiting/list": {
    title: "모집 목록",
    description: "등록된 모집 차수 목록을 확인합니다.",
    breadcrumbs: [
      { label: "리크루팅", href: "/recruiting" },
      { label: "모집 관리" },
      { label: "모집 목록" },
    ],
  },
  "/recruiting/new": {
    title: "모집 생성",
    description: "새로운 모집 차수를 등록합니다.",
    breadcrumbs: [
      { label: "리크루팅", href: "/recruiting" },
      { label: "모집 관리" },
      { label: "모집 생성" },
    ],
  },
  "/recruiting/reviews": {
    title: "평가 관리",
    description: "지원자 평가 현황을 관리합니다.",
    breadcrumbs: [
      { label: "리크루팅", href: "/recruiting" },
      { label: "평가 관리" },
    ],
  },
  "/recruiting/history": {
    title: "히스토리",
    description: "지난 리크루팅 이력을 확인합니다.",
    breadcrumbs: [
      { label: "리크루팅", href: "/recruiting" },
      { label: "히스토리" },
    ],
  },
}

const DEFAULT_PAGE: PageInfo = {
  title: "페이지",
  description: "페이지를 간결하고 명확하게 설명합니다.",
  breadcrumbs: [],
}

const PATH_OPTIONS = Object.keys(PAGE_INFO)

type StoryArgs = {
  currentPath: string
}

const meta = {
  title: "앱 셸/WorkFrame",
  id: "work-frame",
  parameters: {
    ...docsParameters("/components/shell/work-frame/"),
    layout: "fullscreen",
  },
  argTypes: {
    currentPath: {
      control: { type: "select" },
      options: PATH_OPTIONS,
    },
  },
  args: {
    currentPath: "/recruiting/list",
  },
  render: function Render({ currentPath }) {
    const page = PAGE_INFO[currentPath] ?? DEFAULT_PAGE
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 960,
          height: "100vh",
        }}
      >
        <HeaderDesktop
          logo={<HeaderHomeLink context="operation" generation={11} />}
          navItems={NAV_ITEMS}
          currentPath={currentPath}
        />
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <SideNavigation
            className="w-(--umc-layout-sidebar-width) shrink-0"
            title="관리 메뉴"
            items={SIDE_ITEMS}
            currentPath={currentPath}
          />
          <main
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              overflow: "auto",
              padding: "48px 32px 80px",
            }}
          >
            <PageHeader
              title={page.title}
              description={page.description}
              breadcrumbs={page.breadcrumbs}
            />
          </main>
        </div>
      </div>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
