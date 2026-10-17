import type { Meta, StoryObj } from "@storybook/react-vite"
import { PageHeader } from "@umc-product/react"

import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "앱 셸/PageHeader",
  id: "page-header",
  component: PageHeader,
  parameters: { ...componentParameters("PageHeader"), layout: "padded" },
  argTypes: {
    title: textControl,
    description: textControl,
  },
  args: {
    title: "지원자 목록",
    description: "현재 차수에 지원한 모든 지원자를 확인합니다.",
    breadcrumbs: [
      { label: "리크루팅", href: "/recruiting" },
      { label: "지원서 관리", href: "/recruiting/applications" },
      { label: "지원자 목록" },
    ],
  },
} satisfies Meta<typeof PageHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
