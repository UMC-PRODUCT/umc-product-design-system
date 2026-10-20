import type { Meta, StoryObj } from "@storybook/react-vite"
import { ImageThumbnailEditor } from "@umc-product/react"
import { fn } from "storybook/test"

import { hiddenControl, textControl } from "../../arg-types.tsx"
import { componentParameters } from "../../docs-links.ts"

const meta = {
  title: "폼 입력/ImageThumbnailEditor",
  id: "image-thumbnail-editor",
  component: ImageThumbnailEditor,
  parameters: componentParameters(
    "ImageThumbnailEditor",
    "눌러서 이미지 파일을 고르면 미리보기를 보여 주는 업로드 칸입니다. 형식과 용량을 검사해 맞으면 `onValueChange`, 아니면 `onReject`를 부릅니다. 서버 업로드는 앱이 합니다.",
  ),
  argTypes: {
    value: hiddenControl,
    defaultValue: hiddenControl,
    label: textControl,
    description: textControl,
    src: textControl,
    maxSize: { control: { type: "number", min: 0, step: 1024 } },
  },
  args: {
    disabled: false,
    onValueChange: fn(),
    onReject: fn(),
  },
} satisfies Meta<typeof ImageThumbnailEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
