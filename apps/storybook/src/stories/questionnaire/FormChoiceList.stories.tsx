import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FormChoiceList,
  FormQuestion,
  type FormChoiceOption,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const PARTS: readonly FormChoiceOption[] = [
  { value: "pm", label: "PM" },
  { value: "design", label: "Design" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile", disabled: true },
]

const meta = {
  title: "질문지/FormChoiceList",
  id: "form-choice-list",
  component: FormChoiceList,
  parameters: componentParameters(
    "FormChoiceList",
    "보기 가운데 하나(`single`) 또는 여러 개(`multiple`)를 고르는 목록입니다. 고른 줄은 연한 청록 배경으로 바뀝니다.",
  ),
  decorators: [withWidth(840)],
  argTypes: {
    type: {
      control: { type: "inline-radio" },
      options: ["single", "multiple"],
    },
    options: hiddenControl,
    value: hiddenControl,
    defaultValue: hiddenControl,
  },
  args: {
    type: "single",
    options: PARTS,
    disabled: false,
    readOnly: false,
    onValueChange: fn(),
  },
  render: function Render(args) {
    return (
      <FormQuestion number="03" title="지원 파트를 골라 주세요" required>
        <FormChoiceList key={args.type} {...args} />
      </FormQuestion>
    )
  },
} satisfies Meta<typeof FormChoiceList>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
