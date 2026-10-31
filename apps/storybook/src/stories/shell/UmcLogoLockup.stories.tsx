import type { Meta, StoryObj } from "@storybook/react-vite"
import { UmcLogoLockup } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "앱 셸/UmcLogoLockup",
  id: "umc-logo-lockup",
  component: UmcLogoLockup,
  parameters: { ...componentParameters("UmcLogoLockup"), layout: "centered" },
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
  },
  render: function Render(args) {
    if (args.context === "operation" || args.context === "activity") {
      return <UmcLogoLockup {...args} />
    }
    return <UmcLogoLockup context={args.context} />
  },
} satisfies Meta<typeof UmcLogoLockup>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
