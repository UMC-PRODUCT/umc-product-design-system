import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BottomSheetActions,
  Button,
  Checkbox,
  Panel,
  PanelCloseButton,
  type PanelProps,
} from "@umc-product/react"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

type StoryArgs = PanelProps & {
  onConfirm: () => void
  onBack: () => void
}

const SCHOOLS = [
  "가람대학교",
  "나래대학교",
  "다온대학교",
  "라온대학교",
  "마루대학교",
  "바다대학교",
]

const OVERLAY_PARAMETERS = {
  docs: { story: { inline: false, height: "640px" } },
  pseudo: { rootSelector: "body" },
}

const INTRODUCTION = [
  "UMC의 첫걸음을 내딛는 챌린저를 위해 각 학교와 중앙운영사무국이 여는 자리입니다.",
  "UMC가 어떤 곳인지, 우리만의 문화와 앞으로 도전할 목표, 커리큘럼을 소개합니다.",
  "스터디가 어떻게 진행되는지, 파트별로 무엇을 준비하면 좋은지 함께 나눕니다.",
  "기수가 끝날 때까지 함께할 운영진과 챌린저를 처음 만나는 자리이기도 합니다.",
]

const meta = {
  title: "오버레이와 피드백/Panel",
  id: "panel",
  component: Panel,
  subcomponents: { PanelCloseButton },
  parameters: componentParameters(
    "Panel",
    "웹 화면 가운데에 띄워 목록이나 선택처럼 긴 내용을 다루는 패널입니다. 짧은 확인은 Dialog를 씁니다.",
  ),
  argTypes: {
    trigger: hiddenControl,
    headSlot: hiddenControl,
    children: hiddenControl,
    control: hiddenControl,
    actions: hiddenControl,
    title: textControl,
    description: textControl,
  },
  args: {
    open: true,
    title: "모집 공고 복제하기",
    description: "선택한 학교의 공유 보관함에 추가돼요",
    children: (
      <div className="flex flex-col gap-5 py-2">
        {SCHOOLS.map((school) => (
          <Checkbox key={school} size="lg" color="brand" labelPlacement="end">
            {school}
          </Checkbox>
        ))}
      </div>
    ),
    onOpenChange: fn(),
    onConfirm: fn(),
    onBack: fn(),
  },
  render: function Render({ onConfirm, onBack, ...panelProps }) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <Panel
        {...panelProps}
        trigger={<Button>열기</Button>}
        headSlot={<PanelCloseButton />}
        actions={
          <BottomSheetActions
            layout="emphasis"
            primary={{ label: "복제하기", onClick: onConfirm }}
            secondary={{ label: "돌아가기", onClick: onBack }}
          />
        }
        onOpenChange={(open) => {
          panelProps.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  parameters: OVERLAY_PARAMETERS,
}

export const ContentOnly: Story = {
  args: {
    title: "OT 안내",
    description: undefined,
    children: (
      <div className="flex flex-col gap-4 text-body-1-regular text-neutral-medium-600">
        {[...INTRODUCTION, ...INTRODUCTION, ...INTRODUCTION].map(
          (sentence, index) => (
            <p key={`${index}-${sentence}`} className="m-0">
              {sentence}
            </p>
          ),
        )}
      </div>
    ),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <Panel
        {...args}
        trigger={<Button>열기</Button>}
        headSlot={<PanelCloseButton />}
        onOpenChange={(open) => {
          args.onOpenChange?.(open)
          updateArgs({ open })
        }}
      />
    )
  },
  parameters: OVERLAY_PARAMETERS,
}
