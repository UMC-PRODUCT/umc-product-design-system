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
  decorators: [withWidth(600)],
  parameters: componentParameters(
    "TextArea",
    "장문형 입력 칸입니다. 피그마 `Text Area`로, 공지 작성처럼 긴 글을 쓸 때 씁니다. 주소처럼 짧은 글은 TextFieldArea를 씁니다.",
  ),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
  },
  args: {
    label: "공지 내용",
    placeholder: "챌린저에게 전할 공지를 작성하세요",
    maxLength: 1000,
    defaultValue: "",
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

export const CustomHeight: Story = {
  args: {
    label: "모집 공고 본문",
    maxLength: 2000,
    className:
      "[--umc-text-area-min-height:240px] [--umc-text-area-max-height:320px]",
  },
  render: function Render(args) {
    return <TextArea {...args} key={String(args.defaultValue)} />
  },
}
