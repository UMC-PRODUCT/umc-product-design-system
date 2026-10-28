import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  HeaderDesktop,
  HeaderActionButton,
  HeaderHomeLink,
  type HeaderDesktopProps,
} from "@umc-product/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const NAV_ITEMS = [
  { label: "공지사항", href: "/notices" },
  { label: "일정", href: "/schedules" },
  { label: "출석", href: "/attendance" },
  { label: "스터디", href: "/studies" },
]

type StoryArgs = HeaderDesktopProps & {
  loggedIn: boolean
  showCta: boolean
  onLoginClick: () => void
  onContactClick: () => void
  onCtaClick: () => void
}

const meta = {
  title: "앱 셸/HeaderDesktop",
  id: "header-desktop",
  component: HeaderDesktop,
  parameters: {
    ...componentParameters("HeaderDesktop"),
    layout: "fullscreen",
  },
  argTypes: {
    currentPath: {
      control: { type: "select" },
      options: [
        "/",
        "/notices",
        "/notices/12",
        "/schedules",
        "/attendance",
        "/studies",
      ],
    },
    mode: { control: "inline-radio" },
    logo: hiddenControl,
    navItems: hiddenControl,
    actions: hiddenControl,
  },
  args: {
    mode: "light",
    logo: <HeaderHomeLink context="operation" generation={11} />,
    navItems: NAV_ITEMS,
    currentPath: "/notices",
    loggedIn: false,
    showCta: true,
    onLoginClick: fn(),
    onContactClick: fn(),
    onCtaClick: fn(),
  },
  render: function Render({
    loggedIn,
    showCta,
    onLoginClick,
    onContactClick,
    onCtaClick,
    ...headerProps
  }) {
    return (
      <HeaderDesktop
        {...headerProps}
        actions={
          loggedIn ? (
            <HeaderActionButton suffix={<ExpandMoreIcon weight="fill" />}>
              11기 운영진
            </HeaderActionButton>
          ) : (
            <>
              {showCta && (
                <Button size="md" onClick={onCtaClick}>
                  지원하기
                </Button>
              )}
              <HeaderActionButton onClick={onContactClick}>
                문의사항
              </HeaderActionButton>
              <Button size="md" variant="weak" onClick={onLoginClick}>
                로그인
              </Button>
            </>
          )
        }
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
