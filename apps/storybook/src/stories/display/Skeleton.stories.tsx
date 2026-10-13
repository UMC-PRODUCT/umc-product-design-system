import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/Skeleton",
  id: "skeleton",
  component: Skeleton,
  parameters: componentParameters("Skeleton"),
  args: {
    width: "240px",
    height: "16px",
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
