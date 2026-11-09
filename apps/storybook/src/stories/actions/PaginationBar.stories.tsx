import type { Meta, StoryObj } from "@storybook/react-vite"
import { PaginationBar } from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const DARK_SCENE = "linear-gradient(180deg, #0f1010 0%, #132927 100%)"

const meta = {
  title: "액션/PaginationBar",
  id: "pagination-bar",
  component: PaginationBar,
  parameters: componentParameters("PaginationBar"),
  argTypes: {
    page: hiddenControl,
    pageLabel: hiddenControl,
    totalPages: { control: { type: "number", min: 0 } },
    defaultPage: { control: { type: "number", min: 1 } },
  },
  args: {
    totalPages: 9,
    defaultPage: 1,
    highlightNext: true,
    onPageChange: fn(),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "inline-flex",
          padding: 40,
          borderRadius: 12,
          background: DARK_SCENE,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaginationBar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <PaginationBar key={`${args.totalPages}-${args.defaultPage}`} {...args} />
  ),
}
