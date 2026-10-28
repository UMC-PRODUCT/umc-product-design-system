import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  HeaderMobile,
  type HeaderMobileProps,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const NAV_ITEMS = [
  { label: "공지사항", href: "/notices" },
  { label: "일정", href: "/schedules" },
  { label: "출석", href: "/attendance" },
  { label: "스터디", href: "/studies" },
]

const OPENED_HEIGHT = 376

type StoryArgs = HeaderMobileProps & {
  showCta: boolean
  onCtaClick: () => void
}

const meta = {
  title: "앱 셸/HeaderMobile",
  id: "header-mobile",
  component: HeaderMobile,
  parameters: {
    ...componentParameters("HeaderMobile"),
    layout: "fullscreen",
  },
  argTypes: {
    currentPath: {
      control: { type: "select" },
      options: ["/", "/notices", "/notices/12", "/schedules", "/studies"],
    },
    mode: { control: "inline-radio" },
    logo: hiddenControl,
    navItems: hiddenControl,
    actions: hiddenControl,
    open: hiddenControl,
  },
  args: {
    mode: "light",
    navItems: NAV_ITEMS,
    currentPath: "/notices",
    defaultOpen: true,
    showCta: true,
    onOpenChange: fn(),
    onCtaClick: fn(),
  },
  render: function Render({ showCta, onCtaClick, ...headerProps }) {
    return (
      <div style={{ width: 390, height: OPENED_HEIGHT }}>
        <HeaderMobile
          {...headerProps}
          actions={
            showCta ? (
              <Button size="md" variant="weak" onClick={onCtaClick}>
                지원하기
              </Button>
            ) : undefined
          }
        />
      </div>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
