"use client"

import { useState } from "react"

import { CloseIcon, ExpandMoreIcon, FilterIcon } from "@umc-product/icons"
import {
  Chip,
  type ChipColor,
  type ChipSize,
  type ChipVariant,
  Menu,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { ForceState } from "../variants/VariantCells.tsx"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function ChipToggle() {
  const [selected, setSelected] = useState(false)
  return (
    <div className="umc-example">
      <Chip selected={selected} onClick={() => setSelected((s) => !s)}>
        정규 모집
      </Chip>
    </div>
  )
}

const MENU_ITEMS = [
  { label: "기획" },
  { label: "디자인" },
  { label: "프론트엔드" },
  { label: "백엔드" },
]

export function ChipMenuTrigger() {
  return (
    <div className="umc-example">
      <Menu
        trigger={
          <Chip
            trailingIcon={<ExpandMoreIcon size={14} />}
            aria-haspopup="menu"
          >
            파트 선택
          </Chip>
        }
        items={MENU_ITEMS}
      />
    </div>
  )
}

export function ChipStates() {
  return (
    <div className="umc-example">
      <span data-spec-id="chip-weak-brand-sm">
        <Chip>기본</Chip>
      </span>
      <span data-spec-id="chip-weak-brand-sm-hover">
        <Chip>호버</Chip>
      </span>
      <span data-spec-id="chip-weak-brand-sm-selected">
        <Chip selected>선택</Chip>
      </span>
      <span data-spec-id="chip-fill-brand-sm-selected">
        <Chip variant="fill" selected>
          fill 선택
        </Chip>
      </span>
      <span data-spec-id="chip-weak-neutral-sm-selected">
        <Chip color="neutral" selected>
          neutral 선택
        </Chip>
      </span>
      <span data-spec-id="chip-fill-neutral-sm">
        <Chip variant="fill" color="neutral">
          fill neutral
        </Chip>
      </span>
      <span data-spec-id="chip-weak-brand-md">
        <Chip size="md">md 크기</Chip>
      </span>
    </div>
  )
}

const FIGMA_VARIANTS: Readonly<Record<string, ChipVariant>> = {
  Weak: "weak",
  Fill: "fill",
}

const FIGMA_COLORS: Readonly<Record<string, ChipColor>> = {
  Brand: "brand",
  Neutral: "neutral",
}

const FIGMA_SIZES: Readonly<Record<string, ChipSize>> = {
  Sm: "sm",
  Md: "md",
}

function ChipVariantCell({ variant }: { variant: FigmaVariant }) {
  const iconPosition = variant.props["Icon Position"]
  const isHovered = variant.props["Pressed·Hover"] === "True"

  const chip = (
    <Chip
      variant={lookup(FIGMA_VARIANTS, variant, "Style")}
      color={lookup(FIGMA_COLORS, variant, "Color")}
      size={lookup(FIGMA_SIZES, variant, "Size")}
      selected={variant.props["Selected"] === "True"}
      leadingIcon={
        iconPosition === "Left" ? <FilterIcon size={14} /> : undefined
      }
      trailingIcon={
        iconPosition === "Right" ? <CloseIcon size={12} /> : undefined
      }
    >
      칩
    </Chip>
  )

  if (isHovered) {
    return <ForceState states={["hover"]}>{chip}</ForceState>
  }
  return chip
}

export function ChipAllVariants() {
  return (
    <VariantGrid
      set="chip"
      sections={["Size", "Style"]}
      rows={["Color", "Selected"]}
      columns={["Pressed·Hover", "Icon Position"]}
      order={{
        Size: ["Sm", "Md"],
        Style: ["Weak", "Fill"],
        Color: ["Brand", "Neutral"],
        Selected: ["False", "True"],
        "Pressed·Hover": ["False", "True"],
        "Icon Position": ["Right", "Left", "None"],
      }}
      render={(variant) => <ChipVariantCell variant={variant} />}
    />
  )
}
