import {
  Button,
  GuidanceMessage,
  type GuidanceMessageColor,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function GuidanceMessageDefault() {
  return (
    <div className="umc-example">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-4">
        <div className="flex w-full gap-2.5">
          <Button variant="weak" color="brand" className="flex-1">
            기획보기
          </Button>
          <Button disabled className="flex-1">
            모집 문항 보기
          </Button>
        </div>
        <GuidanceMessage data-spec-id="guidance-message-default guidance-message-icon">
          지금은 프로젝트 지원 기간이 아니에요
        </GuidanceMessage>
      </div>
    </div>
  )
}

const COLOR_EXAMPLES: readonly {
  color: GuidanceMessageColor
  text: string
  specId?: string
}[] = [
  { color: "neutral", text: "지원서는 제출한 뒤에 수정할 수 없어요" },
  {
    color: "success",
    text: "사용할 수 있는 아이디예요",
    specId: "guidance-message-success",
  },
  {
    color: "warning",
    text: "모집 마감까지 하루 남았어요",
    specId: "guidance-message-warning",
  },
  {
    color: "error",
    text: "이미 사용 중인 아이디예요",
    specId: "guidance-message-error",
  },
]

export function GuidanceMessageColors() {
  return (
    <div className="umc-example umc-example-stack">
      {COLOR_EXAMPLES.map(({ color, text, specId }) => (
        <GuidanceMessage key={color} color={color} data-spec-id={specId}>
          {text}
        </GuidanceMessage>
      ))}
    </div>
  )
}

export function GuidanceMessageWithoutIcon() {
  return (
    <div className="umc-example">
      <GuidanceMessage showIcon={false}>
        지원 기간은 3월 2일부터 3월 9일까지예요
      </GuidanceMessage>
    </div>
  )
}

const FIGMA_COLORS: Readonly<Record<string, GuidanceMessageColor>> = {
  Default: "neutral",
  Success: "success",
  Yellow: "warning",
  Error: "error",
}

const FIGMA_TEXTS: Readonly<Record<string, string>> = {
  Default: "안내 메시지",
  Success: "성공 메시지",
  Yellow: "경고 메시지",
  Error: "오류 메시지",
}

export function GuidanceMessageAllVariants() {
  return (
    <VariantGrid
      set="guidance-message"
      rows={["Type"]}
      columns={[]}
      order={{ Type: ["Default", "Success", "Yellow", "Error"] }}
      render={(variant: FigmaVariant) => (
        <GuidanceMessage color={lookup(FIGMA_COLORS, variant, "Type")}>
          {lookup(FIGMA_TEXTS, variant, "Type")}
        </GuidanceMessage>
      )}
    />
  )
}
