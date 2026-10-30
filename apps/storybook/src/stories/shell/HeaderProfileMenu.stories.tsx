import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HeaderActionButton,
  HeaderDesktop,
  HeaderProfileMenu,
  type HeaderProfileMenuProps,
} from "@umc-product/react"
import { fn, userEvent, within } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const NAV_ITEMS = [
  { label: "프로젝트", href: "/projects" },
  { label: "데모데이 매칭", href: "/matching" },
  { label: "사용 가이드", href: "/guide" },
]

const GENERATIONS = [
  { value: "11", label: "11기", caption: "2026" },
  { value: "10", label: "10기", caption: "2026" },
  { value: "9", label: "9기", caption: "2025" },
  { value: "8", label: "8기", caption: "2025" },
  { value: "5", label: "5기", caption: "2023" },
]

const MENU_HEIGHT = 480

const meta = {
  title: "앱 셸/HeaderProfileMenu",
  id: "header-profile-menu",
  component: HeaderProfileMenu,
  parameters: {
    ...componentParameters("HeaderProfileMenu"),
    layout: "fullscreen",
  },
  argTypes: {
    generationLabel: textControl,
    triggerLabel: textControl,
  },
  args: {
    profile: {
      nickname: "닉네임",
      name: "김유엠",
      school: "한국대 ERICA",
      role: { label: "챌린저", color: "challenger-super-admin" },
    },
    generations: GENERATIONS,
    defaultGeneration: "11",
    generationLabel: "기수 변경",
    triggerLabel: "프로필 메뉴",
    onGenerationChange: fn(),
    onAccountSettings: fn(),
    onLogout: fn(),
    onOpenChange: fn(),
  },
  render: function Render(args: HeaderProfileMenuProps) {
    return (
      <div style={{ minHeight: MENU_HEIGHT }}>
        <HeaderDesktop
          navItems={NAV_ITEMS}
          currentPath="/matching"
          actions={
            <>
              <HeaderActionButton>문의사항</HeaderActionButton>
              <HeaderProfileMenu {...args} />
            </>
          }
        />
      </div>
    )
  },
} satisfies Meta<typeof HeaderProfileMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Opened: Story = {
  tags: ["!autodocs"],
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "프로필 메뉴" }),
    )
  },
}
