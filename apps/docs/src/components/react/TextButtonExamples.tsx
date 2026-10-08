import { AddIcon, ChevronRightIcon } from "@umc-product/icons"
import {
  TextButton,
  type TextButtonColor,
  type TextButtonSize,
} from "@umc-product/react"

import { ForceState } from "./variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid } from "./variants/VariantGrid.tsx"

const leadingIcon = <AddIcon weight="fill" />
const trailingIcon = <ChevronRightIcon weight="fill" />

const SIZES: readonly TextButtonSize[] = ["xs", "sm", "md"]

export function TextButtonBasics() {
  return (
    <div className="umc-example">
      <TextButton leadingIcon={leadingIcon}>항목 추가</TextButton>
      <TextButton trailingIcon={trailingIcon}>전체 보기</TextButton>
      <TextButton>취소</TextButton>
      <TextButton variant="underline">약관 보기</TextButton>
    </div>
  )
}

export function TextButtonColors() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="flex flex-wrap items-center gap-6">
        <TextButton
          trailingIcon={trailingIcon}
          data-spec-id="text-button-brand-trailing-xs text-button-brand-trailing-xs-icon"
        >
          공지 더보기
        </TextButton>
        <TextButton data-spec-id="text-button-brand-plain-xs">
          공지 더보기
        </TextButton>
        <TextButton
          variant="underline"
          data-spec-id="text-button-brand-underline-xs"
        >
          공지 더보기
        </TextButton>
        <TextButton disabled data-spec-id="text-button-brand-disabled-xs">
          공지 더보기
        </TextButton>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <TextButton
          color="neutral"
          leadingIcon={leadingIcon}
          data-spec-id="text-button-neutral-leading-xs-icon"
        >
          옵션 추가
        </TextButton>
        <TextButton color="neutral" data-spec-id="text-button-neutral-plain-xs">
          옵션 추가
        </TextButton>
        <TextButton color="neutral" variant="underline">
          옵션 추가
        </TextButton>
        <TextButton
          color="neutral"
          disabled
          data-spec-id="text-button-neutral-disabled-xs"
        >
          옵션 추가
        </TextButton>
      </div>
    </div>
  )
}

export function TextButtonSizes() {
  return (
    <div className="umc-example">
      {SIZES.map((size) => (
        <TextButton
          key={size}
          size={size}
          trailingIcon={trailingIcon}
          data-spec-id={`text-button-size-${size} text-button-size-${size}-icon`}
        >
          {size.toUpperCase()} 텍스트 버튼
        </TextButton>
      ))}
    </div>
  )
}

const FIGMA_COLORS: Readonly<Record<string, TextButtonColor>> = {
  Brand: "brand",
  Neutral: "neutral",
}

const FIGMA_SIZES: Readonly<Record<string, TextButtonSize>> = {
  Xs: "xs",
  Sm: "sm",
  Md: "md",
}

function TextButtonVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  const type = variant.props["Type"]
  return (
    <ForceState states={state === "Hover·Pressed" ? ["hover", "active"] : []}>
      <TextButton
        color={lookup(FIGMA_COLORS, variant, "Color")}
        size={lookup(FIGMA_SIZES, variant, "Size")}
        variant={type === "Underline" ? "underline" : "plain"}
        disabled={state === "Disabled"}
        leadingIcon={type === "Leading Acc" ? leadingIcon : undefined}
        trailingIcon={type === "Tailling Acc" ? trailingIcon : undefined}
      >
        텍스트 버튼
      </TextButton>
    </ForceState>
  )
}

export function TextButtonAllVariants() {
  return (
    <VariantGrid
      set="text-button"
      sections={["Size"]}
      rows={["Color", "State"]}
      columns={["Type"]}
      order={{ Type: ["Leading Acc", "Tailling Acc", "Plain", "Underline"] }}
      render={(variant) => <TextButtonVariantCell variant={variant} />}
    />
  )
}
