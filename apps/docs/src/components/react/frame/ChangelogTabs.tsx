"use client"

import { Tab, TabList, TabPanel, Tabs } from "@umc-product/react"
import type { ReactNode } from "react"

type ChangelogTabsProps = {
  react: ReactNode
  designTokens: ReactNode
  icons: ReactNode
}

export function ChangelogTabs({
  react,
  designTokens,
  icons,
}: ChangelogTabsProps) {
  return (
    <Tabs defaultValue="react" className="docs-changelog-tabs">
      <TabList aria-label="패키지">
        <Tab value="react">react</Tab>
        <Tab value="design-tokens">design-tokens</Tab>
        <Tab value="icons">icons</Tab>
      </TabList>
      <TabPanel value="react" keepMounted>
        {react}
      </TabPanel>
      <TabPanel value="design-tokens" keepMounted>
        {designTokens}
      </TabPanel>
      <TabPanel value="icons" keepMounted>
        {icons}
      </TabPanel>
    </Tabs>
  )
}
