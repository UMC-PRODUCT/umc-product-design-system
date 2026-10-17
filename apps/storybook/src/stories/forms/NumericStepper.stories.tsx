import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumericStepper } from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/NumericStepper",
  id: "numeric-stepper",
  component: NumericStepper,
  decorators: [withWidth(360)],
  parameters: componentParameters("NumericStepper"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "인원",
    "aria-label": "모집 인원",
    value: 0,
    min: 0,
    max: 999,
    step: 1,
    required: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    onValueChange: fn(),
  },
} satisfies Meta<typeof NumericStepper>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <NumericStepper
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      />
    )
  },
}
