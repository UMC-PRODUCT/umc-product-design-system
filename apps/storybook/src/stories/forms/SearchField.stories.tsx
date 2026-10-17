import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchField } from "@umc-product/react"
import { fn } from "storybook/test"

import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "폼 입력/SearchField",
  id: "search-field",
  component: SearchField,
  decorators: [withWidth(360)],
  parameters: componentParameters("SearchField"),
  args: {
    placeholder: "검색어를 입력하세요",
    defaultValue: "",
    variant: "default",
    clearable: true,
    disabled: false,
    readOnly: false,
    onChange: fn(),
  },
} satisfies Meta<typeof SearchField>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    return <SearchField {...args} key={String(args.defaultValue)} />
  },
}
