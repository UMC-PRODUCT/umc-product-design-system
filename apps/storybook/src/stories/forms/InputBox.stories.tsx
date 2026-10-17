import type { Meta, StoryObj } from "@storybook/react-vite"
import { InputBox } from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/InputBox",
  id: "input-box",
  component: InputBox,
  decorators: [withWidth(360)],
  parameters: componentParameters("InputBox"),
  argTypes: {
    children: hiddenControl,
  },
  args: {
    size: "lg",
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof InputBox>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return (
      <InputBox {...args}>
        <input
          className="umc-input-box__input"
          placeholder="텍스트를 입력하세요"
        />
      </InputBox>
    )
  },
}
