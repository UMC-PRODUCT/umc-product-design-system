import type { Meta, StoryObj } from "@storybook/react-vite"
import { Pagination } from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "액션/Pagination",
  id: "pagination",
  component: Pagination,
  parameters: componentParameters("Pagination"),
  argTypes: {
    page: hiddenControl,
    pageLabel: hiddenControl,
    totalPages: { control: { type: "number", min: 0 } },
    defaultPage: { control: { type: "number", min: 1 } },
    visibleCount: { control: { type: "number", min: 1 } },
  },
  args: {
    totalPages: 12,
    defaultPage: 1,
    visibleCount: 4,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Pagination
      key={`${args.totalPages}-${args.defaultPage}-${args.visibleCount}`}
      {...args}
    />
  ),
}
