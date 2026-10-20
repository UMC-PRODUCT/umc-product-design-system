import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SearchField,
  SideNavigation,
  type SideNavigationItem,
  type SideNavigationProps,
} from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const menuIcon = <PeoplePictogram color="currentColor" />

const ITEMS: SideNavigationItem[] = [
  { label: "대시보드", href: "/dashboard", icon: menuIcon },
  { label: "매칭 목록", href: "/matching", icon: menuIcon },
  {
    label: "리크루팅",
    icon: menuIcon,
    children: [
      { label: "지원자 목록", href: "/recruiting/applications" },
      { label: "지원자 평가", href: "/recruiting/reviews" },
    ],
  },
  { label: "설정", href: "/settings", icon: menuIcon },
]

const PATH_OPTIONS = [
  "/dashboard",
  "/matching",
  "/recruiting/applications",
  "/recruiting/reviews",
  "/settings",
]

type StoryArgs = SideNavigationProps & {
  withSlot: boolean
}

const meta = {
  title: "앱 셸/SideNavigation",
  id: "side-navigation",
  component: SideNavigation,
  parameters: {
    ...componentParameters("SideNavigation"),
    layout: "fullscreen",
  },
  argTypes: {
    currentPath: {
      control: { type: "select" },
      options: PATH_OPTIONS,
    },
    items: hiddenControl,
    slot: hiddenControl,
  },
  args: {
    title: "운영",
    items: ITEMS,
    currentPath: "/matching",
    withSlot: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{ height: "100vh", width: "var(--umc-layout-sidebar-width)" }}
      >
        <Story />
      </div>
    ),
  ],
  render: function Render({ withSlot, ...navigationProps }) {
    return (
      <SideNavigation
        {...navigationProps}
        slot={withSlot ? <SearchField placeholder="메뉴 검색" /> : undefined}
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
