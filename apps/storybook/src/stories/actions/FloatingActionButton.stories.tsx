import type { Meta, StoryObj } from "@storybook/react-vite"
import { FloatingActionButton } from "@umc-product/react"
import { fn } from "storybook/test"

import { iconArgType, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "액션/FloatingActionButton",
  id: "floating-action-button",
  component: FloatingActionButton,
  parameters: componentParameters(
    "FloatingActionButton",
    "54px 원 안에 아이콘 하나만 두는 버튼입니다. 글자가 없어 `aria-label`이 필수입니다.",
  ),
  argTypes: {
    icon: iconArgType,
    "aria-label": textControl,
  },
  args: {
    icon: "더하기",
    "aria-label": "질문 추가",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof FloatingActionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
