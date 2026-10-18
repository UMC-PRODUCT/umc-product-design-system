import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressSummary } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "표시/ProgressSummary",
  id: "progress-summary",
  component: ProgressSummary,
  parameters: componentParameters(
    "ProgressSummary",
    "전체 중 몇 개를 마쳤는지 라벨, 개수, 퍼센트, 막대로 요약합니다. 부모 폭을 채우며, 막대만 필요하면 ProgressBar를 씁니다.",
  ),
  decorators: [withWidth(296)],
  argTypes: {
    label: textControl,
    value: { control: { type: "number", min: 0, step: 1 } },
    max: { control: { type: "number", min: 0, step: 1 } },
  },
  args: {
    label: "면접 배정률",
    value: 21,
    max: 42,
  },
} satisfies Meta<typeof ProgressSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
