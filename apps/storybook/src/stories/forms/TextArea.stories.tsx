import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextArea } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextArea",
  id: "text-area",
  component: TextArea,
  decorators: [withWidth(360)],
  parameters: componentParameters("TextArea"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "자기소개",
    placeholder: "자기소개를 입력하세요",
    caption: "200자 이내로 입력해 주세요",
    defaultValue: "",
    rows: 3,
    size: "lg",
    required: false,
    invalid: false,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return <TextArea {...args} key={String(args.defaultValue)} />
  },
}
