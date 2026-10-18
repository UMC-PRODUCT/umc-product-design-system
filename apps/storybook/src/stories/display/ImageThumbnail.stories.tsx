import type { Meta, StoryObj } from "@storybook/react-vite"
import { ImageThumbnail } from "@umc-product/react"

import sampleImage from "../../assets/image-sample.svg?no-inline"
import { textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "표시/ImageThumbnail",
  id: "image-thumbnail",
  component: ImageThumbnail,
  parameters: componentParameters(
    "ImageThumbnail",
    "학교 로고처럼 작은 이미지를 보여 주는 칸입니다. `src`를 지우면 UMC 로고가 대신 나옵니다.",
  ),
  argTypes: {
    src: textControl,
    alt: textControl,
    size: { control: { type: "number", min: 24, max: 160, step: 2 } },
  },
  args: {
    src: sampleImage,
    alt: "가람대학교 로고",
    size: 50,
  },
} satisfies Meta<typeof ImageThumbnail>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
