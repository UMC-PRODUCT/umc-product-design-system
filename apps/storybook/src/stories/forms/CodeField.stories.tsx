import type { Meta, StoryObj } from "@storybook/react-vite"
import { CodeField } from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/CodeField",
  id: "code-field",
  component: CodeField,
  decorators: [withWidth(360)],
  parameters: componentParameters("CodeField"),
  argTypes: {
    label: textControl,
    caption: textControl,
    errorMessage: textControl,
    info: hiddenControl,
    normalizeValue: hiddenControl,
  },
  args: {
    label: "초대 코드",
    caption: "초대 코드 6자리를 입력하세요",
    defaultValue: "",
    length: 6,
    validationType: "alphanumeric",
    mask: false,
    required: false,
    invalid: false,
    disabled: false,
    onValueChange: fn(),
    onValueComplete: fn(),
  },
} satisfies Meta<typeof CodeField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
