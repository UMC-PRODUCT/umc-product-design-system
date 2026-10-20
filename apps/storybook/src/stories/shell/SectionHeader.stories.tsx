import type { Meta, StoryObj } from "@storybook/react-vite"
import { SectionHeader, type SectionHeaderProps } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = SectionHeaderProps & {
  withSlot: boolean
}

const meta = {
  title: "앱 셸/SectionHeader",
  id: "section-header",
  component: SectionHeader,
  parameters: componentParameters(
    "SectionHeader",
    "페이지 안 구획마다 번호, 제목, 설명을 붙이는 머리말입니다. 페이지 맨 위 제목은 PageHeader를 씁니다.",
  ),
  decorators: [withWidth(720)],
  argTypes: {
    title: textControl,
    number: textControl,
    description: textControl,
    slot: hiddenControl,
  },
  args: {
    title: "기본 정보",
    number: "01",
    description: "프로젝트 이름과 한 줄 소개를 적어 주세요",
    required: false,
    size: "lg",
    level: 2,
    withSlot: false,
  },
  render: function Render({ withSlot, ...headerProps }) {
    return (
      <SectionHeader
        {...headerProps}
        slot={withSlot ? <span>26.10.19 14:00 기준</span> : undefined}
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
