import { SectionHeader, type SectionHeaderSize } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const LG_SPEC_IDS = [
  "section-header-lg-root",
  "section-header-lg-number",
  "section-header-lg-body",
  "section-header-lg-title",
  "section-header-lg-description",
  "section-header-title-row",
  "section-header-required",
].join(" ")

export function SectionHeaderDefault() {
  return (
    <div className="umc-example">
      <SectionHeader
        className="w-full"
        number="01"
        title="기본 정보"
        required
        description="프로젝트 이름과 한 줄 소개를 적어 주세요"
        data-spec-id={LG_SPEC_IDS}
      />
    </div>
  )
}

export function SectionHeaderWithSlot() {
  return (
    <div className="umc-example">
      <SectionHeader
        className="w-full"
        number="02"
        title="지원 현황"
        slot={
          <span className="text-body-3-regular text-neutral-medium-600">
            26.10.19 14:00 기준
          </span>
        }
      />
    </div>
  )
}

const SIZE_EXAMPLES = [
  {
    size: "lg",
    title: "모집 문항",
    specId: undefined,
  },
  {
    size: "md",
    title: "자기소개를 적어 주세요",
    specId:
      "section-header-md-number section-header-md-body section-header-md-title section-header-md-description",
  },
  {
    size: "sm",
    title: "지원 파트를 골라 주세요",
    specId:
      "section-header-sm-number section-header-sm-title section-header-sm-description",
  },
] as const

export function SectionHeaderSizes() {
  return (
    <div className="umc-example umc-example-stack">
      {SIZE_EXAMPLES.map(({ size, title, specId }) => (
        <SectionHeader
          key={size}
          className="w-full"
          size={size}
          number="01"
          title={title}
          description="지원자에게 보이는 설명입니다"
          data-spec-id={specId}
        />
      ))}
    </div>
  )
}

const FIGMA_SIZES: Readonly<Record<string, SectionHeaderSize>> = {
  Lg: "lg",
  Md: "md",
  Sm: "sm",
}

export function SectionHeaderAllVariants() {
  return (
    <VariantGrid
      set="section-header"
      rows={["Size"]}
      columns={[]}
      order={{ Size: ["Lg", "Md", "Sm"] }}
      render={(variant: FigmaVariant) => (
        <div className="w-[480px]">
          <SectionHeader
            size={lookup(FIGMA_SIZES, variant, "Size")}
            number="00"
            title="타이틀"
            description="설명을 적어 주세요"
          />
        </div>
      )}
    />
  )
}
