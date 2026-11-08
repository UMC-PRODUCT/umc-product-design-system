import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Accordion,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
} from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

type StoryArgs = AccordionProps &
  Pick<AccordionItemProps, "title" | "body" | "prefix" | "disabled">

const PLACEHOLDER_TITLE = "UMC는 어떤 동아리이고, 어떤 활동을 하나요?"

const PLACEHOLDER_BODY =
  "UMC는 기획, 디자인, 개발 분야의 대학생들이 함께 공부하고 실제 서비스를 만들어보는 전국 단위 IT 연합 동아리예요.\n스터디 → 프로젝트 → 데모데이 순서로 약 6개월 동안 활동해요."

const meta = {
  title: "표시/Accordion",
  id: "accordion",
  component: Accordion,
  subcomponents: { AccordionItem },
  parameters: componentParameters("Accordion"),
  argTypes: {
    title: textControl,
    body: textControl,
    prefix: textControl,
    children: hiddenControl,
    value: hiddenControl,
    defaultValue: hiddenControl,
    onValueChange: hiddenControl,
  },
  args: {
    children: null,
    title: PLACEHOLDER_TITLE,
    body: PLACEHOLDER_BODY,
    prefix: "Q",
    disabled: false,
    multiple: false,
    defaultValue: [],
    onValueChange: fn(),
  },
  decorators: [withWidth(760)],
  render: function Render({
    title,
    body,
    prefix,
    disabled,
    children: _children,
    ...accordionProps
  }) {
    return (
      <Accordion {...accordionProps}>
        <AccordionItem
          value="first"
          title={title}
          body={body}
          prefix={prefix}
          disabled={disabled}
        />
        <AccordionItem
          value="second"
          title="활동 기간은 얼마나 되나요?"
          body="스터디, 프로젝트, 데모데이까지 약 6개월이에요."
          prefix={prefix}
        />
      </Accordion>
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Expanded: Story = {
  args: { defaultValue: ["first"] },
}

export const TwoLineTitle: Story = {
  args: {
    title:
      "지원자 합/불 처리는 언제부터 가능한가요? 한 번 불합격 처리한 지원자를 다시 합격으로 바꿀 수 있나요?",
  },
}

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ["first", "second"] },
}
