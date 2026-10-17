import type { Meta, StoryObj } from "@storybook/react-vite"
import { ExpandMoreIcon } from "@umc-product/icons"
import { HeaderActionButton } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "앱 셸/HeaderActionButton",
  id: "header-action-button",
  component: HeaderActionButton,
  parameters: {
    ...componentParameters("HeaderActionButton"),
    layout: "centered",
  },
  argTypes: {
    children: textControl,
    suffix: {
      options: ["없음", "아래 화살표"],
      mapping: {
        없음: undefined,
        "아래 화살표": <ExpandMoreIcon weight="fill" />,
      },
      control: { type: "select" },
    },
  },
  args: {
    children: "로그인",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof HeaderActionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
