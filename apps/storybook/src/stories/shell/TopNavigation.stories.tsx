import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  TopNavigation,
  TopNavigationButton,
  type TopNavigationProps,
} from "@umc-product/react"
import { NotificationIcon, SearchIcon } from "@umc-product/icons"
import { useState } from "react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = TopNavigationProps & {
  withBack: boolean
  titleMenu: boolean
  actionsType: "none" | "icon" | "text"
}

const meta = {
  title: "앱 셸/TopNavigation",
  id: "top-navigation",
  component: TopNavigation,
  subcomponents: { TopNavigationButton },
  parameters: { ...componentParameters("TopNavigation"), layout: "fullscreen" },
  argTypes: {
    title: textControl,
    titleAlign: { control: "inline-radio" },
    back: hiddenControl,
    onTitleClick: hiddenControl,
    titleExpanded: hiddenControl,
    actions: hiddenControl,
    actionsType: {
      control: { type: "select" },
      options: ["none", "icon", "text"],
    },
  },
  args: {
    title: "홈",
    titleAlign: "start",
    withBack: false,
    titleMenu: false,
    actionsType: "icon",
  },
  decorators: [withWidth(375)],
  render: function Render({
    withBack,
    titleMenu,
    actionsType,
    ...navigationProps
  }) {
    const [titleExpanded, setTitleExpanded] = useState(false)
    return (
      <TopNavigation
        {...navigationProps}
        back={withBack ? { href: "/" } : undefined}
        onTitleClick={
          titleMenu ? () => setTitleExpanded((prev) => !prev) : undefined
        }
        titleExpanded={titleMenu ? titleExpanded : undefined}
        actions={
          actionsType === "icon" ? (
            <>
              <TopNavigationButton variant="icon" aria-label="검색">
                <SearchIcon />
              </TopNavigationButton>
              <TopNavigationButton variant="icon" aria-label="알림">
                <NotificationIcon />
              </TopNavigationButton>
            </>
          ) : actionsType === "text" ? (
            <TopNavigationButton variant="text" color="primary">
              완료
            </TopNavigationButton>
          ) : undefined
        }
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
