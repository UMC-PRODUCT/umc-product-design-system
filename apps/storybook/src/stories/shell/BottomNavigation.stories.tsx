import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BottomNavigation,
  BottomNavigationItem,
  type BottomNavigationProps,
} from "@umc-product/react"
import {
  HomeIcon,
  PersonIcon,
  SearchIcon,
  SettingIcon,
} from "@umc-product/icons"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const NAV_ITEMS = [
  { label: "홈", href: "/", icon: <HomeIcon weight="fill" /> },
  { label: "매칭", href: "/matching", icon: <SearchIcon /> },
  { label: "지원", href: "/apply", icon: <PersonIcon weight="fill" /> },
  { label: "설정", href: "/settings", icon: <SettingIcon /> },
]

const PATH_OPTIONS = NAV_ITEMS.map((item) => item.href)

type StoryArgs = BottomNavigationProps & {
  currentPath: string
}

const meta = {
  title: "앱 셸/BottomNavigation",
  id: "bottom-navigation",
  component: BottomNavigation,
  subcomponents: { BottomNavigationItem },
  parameters: {
    ...componentParameters("BottomNavigation"),
    layout: "fullscreen",
  },
  argTypes: {
    currentPath: {
      control: { type: "select" },
      options: PATH_OPTIONS,
    },
    children: hiddenControl,
  },
  args: {
    currentPath: "/",
    children: null,
  },
  decorators: [withWidth(375)],
  render: function Render({ currentPath }) {
    return (
      <BottomNavigation>
        {NAV_ITEMS.map((item) => (
          <BottomNavigationItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            currentPath={currentPath}
          />
        ))}
      </BottomNavigation>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
