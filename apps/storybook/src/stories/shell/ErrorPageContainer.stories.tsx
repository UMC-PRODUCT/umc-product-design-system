import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Button,
  ErrorPageContainer,
  type ErrorPageContainerProps,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

type StoryArgs = ErrorPageContainerProps & {
  withActions: boolean
  onBack: () => void
  onHome: () => void
}

const meta = {
  title: "앱 셸/ErrorPageContainer",
  id: "error-page-container",
  component: ErrorPageContainer,
  parameters: componentParameters("ErrorPageContainer"),
  argTypes: {
    title: textControl,
    body: textControl,
    actions: hiddenControl,
    onBack: hiddenControl,
    onHome: hiddenControl,
  },
  args: {
    title: "페이지를 찾을 수 없어요",
    body: "입력한 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있어요",
    withActions: true,
    onBack: fn(),
    onHome: fn(),
  },
  render: function Render({ withActions, onBack, onHome, ...props }) {
    return (
      <ErrorPageContainer
        {...props}
        actions={
          withActions ? (
            <>
              <Button size="lg" variant="weak" color="brand" onClick={onBack}>
                이전으로 이동
              </Button>
              <Button size="lg" variant="fill" color="brand" onClick={onHome}>
                홈으로 이동
              </Button>
            </>
          ) : undefined
        }
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const ServerError: Story = {
  args: {
    title: "일시적인 오류가 발생했어요",
    body: "페이지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요",
  },
}

export const WithoutActions: Story = {
  args: {
    title: "서비스 준비 중이에요",
    body: "더 나은 매칭 경험을 제공하기 위해 준비 중이에요",
    withActions: false,
  },
}
