import type { Preview } from "@storybook/react-vite"
import { LinkProvider, type LinkComponentProps } from "@umc-product/react"
import { action } from "storybook/actions"

import "./preview.css"

const logNavigation = action("링크 이동")

function StoryLink({ href, children, ...rest }: LinkComponentProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        event.preventDefault()
        logNavigation(href)
      }}
    >
      {children}
    </a>
  )
}

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LinkProvider component={StoryLink}>
        <Story />
      </LinkProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
      disableSaveFromUI: true,
      exclude: /^(className|ref|inputRef|id|name)$/,
    },
    docs: { codePanel: true },
    backgrounds: {
      options: {
        white: { name: "흰 배경", value: "#ffffff" },
        neutral: { name: "옅은 회색 배경", value: "#fbfcfc" },
        dark: { name: "어두운 배경", value: "#0f1010" },
      },
    },
    viewport: {
      options: {
        mobile: {
          name: "모바일 375",
          styles: { width: "375px", height: "812px" },
          type: "mobile",
        },
        tablet: {
          name: "태블릿 768",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "데스크톱 1440",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    options: {
      storySort: {
        order: [
          "소개",
          "액션",
          "폼 입력",
          "선택",
          "표시",
          "오버레이와 피드백",
          "앱 셸",
          "질문지",
          "차트",
          "캘린더",
        ],
      },
    },
  },
  initialGlobals: { backgrounds: { value: "white" } },
}

export default preview
