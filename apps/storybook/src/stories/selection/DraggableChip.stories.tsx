import type { Meta, StoryObj } from "@storybook/react-vite"
import { DraggableChip } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/DraggableChip",
  id: "draggable-chip",
  component: DraggableChip,
  parameters: componentParameters("DraggableChip"),
  argTypes: {
    children: textControl,
  },
  args: {
    children: "지원서 문항",
    variant: "weak",
    color: "brand",
  },
} satisfies Meta<typeof DraggableChip>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
