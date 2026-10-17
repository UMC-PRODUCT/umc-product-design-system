import type { Meta, StoryObj } from "@storybook/react-vite"
import { FilterIcon, ListIcon } from "@umc-product/icons"
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabsProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "선택/Tabs",
  id: "tabs",
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel },
  parameters: componentParameters("Tabs"),
  argTypes: {
    children: hiddenControl,
  },
  args: {
    children: undefined,
    value: "design",
    onValueChange: fn(),
  },
} satisfies Meta<TabsProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<TabsProps>()
    return (
      <Tabs
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      >
        <TabList aria-label="활동 영역">
          <Tab value="design">디자인</Tab>
          <Tab value="fe">프론트엔드</Tab>
          <Tab value="be">백엔드</Tab>
        </TabList>
        <TabPanel value="design">디자인 패널 내용이 들어갑니다.</TabPanel>
        <TabPanel value="fe">프론트엔드 패널 내용이 들어갑니다.</TabPanel>
        <TabPanel value="be">백엔드 패널 내용이 들어갑니다.</TabPanel>
      </Tabs>
    )
  },
}

export const WithIcon: Story = {
  args: {
    value: "filter",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<TabsProps>()
    return (
      <Tabs
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value)
          updateArgs({ value })
        }}
      >
        <TabList aria-label="보기 도구">
          <Tab value="filter" icon={<FilterIcon />} aria-label="필터" />
          <Tab value="list" icon={<ListIcon />} aria-label="목록" />
        </TabList>
        <TabPanel value="filter">필터 패널</TabPanel>
        <TabPanel value="list">목록 패널</TabPanel>
      </Tabs>
    )
  },
}
