import type { Meta, StoryObj } from "@storybook/react-vite"
import { UmcSymbolLogo } from "@umc-product/icons"
import { FormHeader, StatusTag } from "@umc-product/react"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "질문지/FormHeader",
  id: "form-header",
  component: FormHeader,
  parameters: componentParameters(
    "FormHeader",
    "지원서 한 장의 머리입니다. 썸네일, 제목, 부제목을 탭 모양으로 보여 주고 오른쪽에 제출 상태 같은 캡션을 둘 수 있습니다.",
  ),
  decorators: [withWidth(1000)],
  argTypes: {
    title: textControl,
    subtitle: textControl,
    thumbnail: hiddenControl,
    caption: hiddenControl,
  },
  args: {
    title: "UMC 10기 지원서",
    subtitle: "Web Product Engineering",
    thumbnail: <UmcSymbolLogo height={28} />,
    level: 2,
  },
} satisfies Meta<typeof FormHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithCaption: Story = {
  args: {
    caption: (
      <>
        <span>2026-10-25 14:00 제출됨</span>
        <StatusTag color="success">합격</StatusTag>
      </>
    ),
  },
}
