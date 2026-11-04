import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeaderHomeLink } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "앱 셸/HeaderHomeLink",
  id: "header-home-link",
  component: HeaderHomeLink,
  parameters: { ...componentParameters("HeaderHomeLink"), layout: "padded" },
  argTypes: {
    context: {
      control: { type: "select" },
      options: ["main", "product-tech", "operation", "activity"],
    },
    generation: { control: { type: "number", min: 1 } },
  },
  args: {
    context: "operation",
    generation: 11,
    href: "/",
  },
  render: function Render(args) {
    if (args.context === "operation" || args.context === "activity") {
      return <HeaderHomeLink {...args} />
    }
    return <HeaderHomeLink context={args.context} href={args.href} />
  },
} satisfies Meta<typeof HeaderHomeLink>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
