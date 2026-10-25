import type { Meta, StoryObj } from "@storybook/react-vite"
import { OpenNewIcon, UmcSymbolLogo } from "@umc-product/icons"
import {
  Button,
  FormHeader,
  FormQuestion,
  FormSection,
  FormSheet,
  FormTextAnswer,
  IconButton,
} from "@umc-product/react"

import { hiddenControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"
import { withWidth } from "../../decorators.tsx"

const meta = {
  title: "질문지/FormSheet",
  id: "form-sheet",
  component: FormSheet,
  parameters: componentParameters(
    "FormSheet",
    "지원서 한 장을 머리, 설명, 질문, 조작 버튼으로 묶는 틀입니다. 작성 화면과 조회 화면 모두 같은 틀을 씁니다.",
  ),
  decorators: [withWidth(1000)],
  argTypes: {
    header: hiddenControl,
    action: hiddenControl,
    description: hiddenControl,
    control: hiddenControl,
    children: hiddenControl,
  },
  args: {
    header: (
      <FormHeader
        title="UMC 10기 지원서"
        subtitle="Web Product Engineering"
        thumbnail={<UmcSymbolLogo height={28} />}
      />
    ),
    action: (
      <IconButton
        size="sm"
        color="white"
        icon={<OpenNewIcon />}
        aria-label="새 창에서 열기"
      />
    ),
    description: (
      <p className="m-0">
        디자이너, 개발자, 기획자가 아이디어와 역량을 연결해 사이드 프로젝트를
        시작하는 플랫폼입니다
      </p>
    ),
    control: <Button size="md">다음</Button>,
    children: (
      <FormSection title="기본 문항">
        <div className="flex flex-col gap-8 px-6 py-6">
          <FormQuestion
            number="01"
            title="자기소개를 적어 주세요"
            description="500자 이내로 적어 주세요"
            required
          >
            <FormTextAnswer maxLength={500} placeholder="작성하세요" />
          </FormQuestion>
        </div>
      </FormSection>
    ),
  },
} satisfies Meta<typeof FormSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
