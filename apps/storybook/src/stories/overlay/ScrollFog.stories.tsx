import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollFog, type ScrollFogProps } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const ITEMS = Array.from({ length: 10 }, (_, i) => `항목 ${i + 1}`)

const meta = {
  title: "오버레이와 피드백/ScrollFog",
  id: "scroll-fog",
  component: ScrollFog,
  parameters: componentParameters("ScrollFog"),
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"] satisfies NonNullable<
        ScrollFogProps["side"]
      >[],
    },
  },
  args: {
    side: "right",
  },
} satisfies Meta<typeof ScrollFog>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const isHorizontal = args.side === "left" || args.side === "right"
    return (
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ width: "320px", height: "200px" }}
      >
        <div
          className={
            isHorizontal
              ? "flex h-full gap-2 overflow-x-auto p-4"
              : "flex h-full flex-col gap-2 overflow-y-auto p-4"
          }
        >
          {ITEMS.map((item) => (
            <span
              key={item}
              className={
                isHorizontal
                  ? "shrink-0 rounded-lg bg-neutral-100 px-4 py-2 text-sm"
                  : "rounded-lg bg-neutral-100 px-4 py-2 text-sm"
              }
            >
              {item}
            </span>
          ))}
        </div>
        <ScrollFog {...args} />
      </div>
    )
  },
}
