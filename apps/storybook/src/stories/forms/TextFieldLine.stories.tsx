import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextFieldLine } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextFieldLine",
  id: "text-field-line",
  component: TextFieldLine,
  decorators: [withWidth(360)],
  parameters: componentParameters(
    "TextFieldLine",
    "테두리 상자 대신 2px 밑줄과 22px 글자를 쓰는 텍스트 필드입니다. 위아래 16px 여백이 컴포넌트에 들어 있습니다.",
  ),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "프로젝트 이름",
    placeholder: "프로젝트 이름을 입력하세요",
    caption: "나중에 바꿀 수 있어요",
    defaultValue: "",
    type: "text",
    clearable: true,
    required: false,
    invalid: false,
    disabled: false,
    readOnly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof TextFieldLine>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return <TextFieldLine {...args} key={String(args.defaultValue)} />
  },
}
