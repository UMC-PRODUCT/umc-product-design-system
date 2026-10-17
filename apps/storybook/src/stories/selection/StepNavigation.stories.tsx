import type { Meta, StoryObj } from "@storybook/react-vite"
import { StepNavigation } from "@umc-product/react"

import { componentParameters } from "../../docs-links.ts"

const STEPS = ["기본 정보", "지원서 작성", "제출 확인"]

const meta = {
  title: "선택/StepNavigation",
  id: "step-navigation",
  component: StepNavigation,
  parameters: componentParameters("StepNavigation"),
  argTypes: {
    currentStep: {
      control: { type: "range", min: 1, max: STEPS.length, step: 1 },
    },
  },
  args: {
    steps: STEPS,
    currentStep: 1,
    "aria-label": "지원 단계",
  },
} satisfies Meta<typeof StepNavigation>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
