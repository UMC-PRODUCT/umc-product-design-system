import type { Meta, StoryObj } from "@storybook/react-vite"
import { CloseIcon } from "@umc-product/icons"
import { IconButton } from "@umc-product/react"
import { fn } from "storybook/test"

import { iconArgType } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "액션/IconButton",
  id: "icon-button",
  component: IconButton,
  parameters: componentParameters("IconButton"),
  argTypes: {
    icon: iconArgType,
  },
  args: {
    icon: <CloseIcon />,
    "aria-label": "닫기",
    color: "brand",
    variant: "weak",
    size: "md",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
