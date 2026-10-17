import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextFieldArea } from "@umc-product/react"
import { fn } from "storybook/test"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/TextFieldArea",
  id: "text-field-area",
  component: TextFieldArea,
  decorators: [withWidth(360)],
  parameters: componentParameters(
    "TextFieldArea",
    "단문형 입력 칸입니다. 피그마 `Text Field/ Input Box`의 `Type=Text Area`로, 주소처럼 짧은 글을 여러 줄로 받을 때 씁니다. 공지처럼 긴 글은 TextArea를 씁니다.",
  ),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "주소",
    placeholder: "도로명 주소를 입력하세요",
    caption: "건물 이름과 호수까지 적어 주세요",
    defaultValue: "",
    rows: 2,
    size: "lg",
    required: false,
    invalid: false,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof TextFieldArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return <TextFieldArea {...args} key={String(args.defaultValue)} />
  },
}
