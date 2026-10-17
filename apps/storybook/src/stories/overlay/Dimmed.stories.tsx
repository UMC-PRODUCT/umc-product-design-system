import type { Meta, StoryObj } from "@storybook/react-vite"
import { Dimmed } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "오버레이와 피드백/Dimmed",
  id: "dimmed",
  component: Dimmed,
  parameters: componentParameters("Dimmed"),
  args: {
    intensity: "medium",
  },
} satisfies Meta<typeof Dimmed>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, height: "360px" } },
  },
  render: function Render(args) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="h-10 w-full rounded-lg bg-white" />
          <div className="flex flex-1 gap-4">
            <div className="h-full w-64 rounded-xl bg-white" />
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-40 rounded-xl bg-white" />
              <div className="h-40 rounded-xl bg-white" />
            </div>
          </div>
        </div>
        <Dimmed {...args} className="absolute inset-0" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg"
          style={{ width: "280px" }}
        >
          <p className="text-center text-base font-semibold">모달 예시</p>
          <p className="mt-2 text-center text-sm text-neutral-500">
            딤 뒤에 표시되는 내용입니다.
          </p>
        </div>
      </div>
    )
  },
}
