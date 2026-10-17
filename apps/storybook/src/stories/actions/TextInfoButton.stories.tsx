import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextInfoButton } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "액션/TextInfoButton",
  id: "text-info-button",
  component: TextInfoButton,
  decorators: [withWidth(360)],
  parameters: componentParameters("TextInfoButton"),
  argTypes: {
    children: textControl,
  },
  args: {
    children: "개별 지원 코드란?",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof TextInfoButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
