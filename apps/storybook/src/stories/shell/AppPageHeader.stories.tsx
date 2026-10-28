import type { Meta, StoryObj } from "@storybook/react-vite"
import { AppPageHeader, type AppPageHeaderProps } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = AppPageHeaderProps & {
  withBack: boolean
}

const meta = {
  title: "앱 셸/AppPageHeader",
  id: "app-page-header",
  component: AppPageHeader,
  parameters: {
    ...componentParameters("AppPageHeader"),
    layout: "fullscreen",
  },
  argTypes: {
    title: textControl,
    subtitle: textControl,
    margin: { control: "inline-radio", options: [16, 20] },
    back: hiddenControl,
    actions: hiddenControl,
  },
  args: {
    title: "학습 일정",
    subtitle: "이번 주에 들을 세션을 확인해요",
    margin: 16,
    withBack: true,
  },
  decorators: [withWidth(390)],
  render: function Render({ withBack, ...headerProps }) {
    return (
      <AppPageHeader
        {...headerProps}
        back={withBack ? { href: "/" } : undefined}
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
