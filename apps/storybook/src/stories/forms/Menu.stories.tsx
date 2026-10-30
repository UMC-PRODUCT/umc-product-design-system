import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button, Menu } from "@umc-product/react"
import { fn, userEvent, within } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const TRIGGER = (
  <Button variant="weak" color="neutral" size="sm">
    더 보기
  </Button>
)

const meta = {
  title: "폼 입력/Menu",
  id: "menu",
  component: Menu,
  parameters: componentParameters("Menu"),
  argTypes: {
    trigger: hiddenControl,
  },
  args: {
    trigger: TRIGGER,
    title: "작업",
    size: "sm",
    items: [
      { label: "수정", onClick: fn() },
      { label: "복제", onClick: fn() },
      { label: "삭제", onClick: fn(), disabled: true },
    ],
  },
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Opened: Story = {
  tags: ["!autodocs"],
  parameters: {
    pseudo: { rootSelector: "body" },
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button"))
    await userEvent.keyboard("{ArrowDown}")
  },
}

export const InlineCaption: Story = {
  tags: ["!autodocs"],
  args: {
    title: undefined,
    size: "xs",
    layout: "inline",
    items: [
      { label: "CSV", caption: ".csv", onClick: fn() },
      { label: "엑셀", caption: ".xlsx", onClick: fn() },
      { label: "PDF", caption: ".pdf", onClick: fn(), disabled: true },
    ],
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button"))
    await userEvent.keyboard("{ArrowDown}")
  },
}
