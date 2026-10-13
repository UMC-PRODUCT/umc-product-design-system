import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Radio,
  RadioGroup,
  type RadioColor,
  type RadioGroupProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

type StoryArgs = RadioGroupProps & { color?: RadioColor }

const meta = {
  title: "선택/RadioGroup",
  id: "radio-group",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: componentParameters("Radio"),
  argTypes: {
    children: hiddenControl,
    color: {
      control: { type: "select" },
      options: ["neutral", "primary"],
    },
  },
  args: {
    children: undefined,
    value: "regular",
    color: "neutral",
    disabled: false,
    onValueChange: fn(),
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<Meta<StoryArgs>>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <RadioGroup
        value={args.value}
        disabled={args.disabled}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
        aria-label="모집 유형"
      >
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
          }}
        >
          <Radio value="regular" color={args.color} />
          정규 모집
        </label>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
          }}
        >
          <Radio value="extra" color={args.color} />
          추가 모집
        </label>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
          }}
        >
          <Radio value="closed" color={args.color} disabled />
          모집 마감
        </label>
      </RadioGroup>
    )
  },
}
