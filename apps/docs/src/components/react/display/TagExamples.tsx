import { NumberTag, StatusTag, Tag } from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function TagStaticPreview() {
  return (
    <div
      className="umc-example umc-example-row"
      style={{ flexWrap: "wrap", gap: "8px", alignItems: "center" }}
    >
      <div data-spec-id="tag-brand-weak-sm">
        <Tag color="brand" variant="weak" size="sm">
          브랜드
        </Tag>
      </div>
      <div data-spec-id="tag-brand-fill-sm">
        <Tag color="brand" variant="fill" size="sm">
          브랜드
        </Tag>
      </div>
      <div data-spec-id="tag-neutral-weak-sm">
        <Tag color="neutral" variant="weak" size="sm">
          중립
        </Tag>
      </div>
      <div data-spec-id="tag-neutral-fill-sm">
        <Tag color="neutral" variant="fill" size="sm">
          중립
        </Tag>
      </div>
      <div data-spec-id="tag-warning-weak-sm">
        <Tag color="warning" variant="weak" size="sm">
          경고
        </Tag>
      </div>
      <div data-spec-id="tag-warning-fill-sm">
        <Tag color="warning" variant="fill" size="sm">
          경고
        </Tag>
      </div>
      <div data-spec-id="tag-success-weak-sm">
        <Tag color="success" variant="weak" size="sm">
          성공
        </Tag>
      </div>
      <div data-spec-id="tag-success-fill-sm">
        <Tag color="success" variant="fill" size="sm">
          성공
        </Tag>
      </div>
      <div data-spec-id="tag-error-weak-sm">
        <Tag color="error" variant="weak" size="sm">
          오류
        </Tag>
      </div>
      <div data-spec-id="tag-error-fill-sm">
        <Tag color="error" variant="fill" size="sm">
          오류
        </Tag>
      </div>
      <div data-spec-id="tag-brand-weak-md">
        <Tag color="brand" variant="weak" size="md">
          브랜드 Md
        </Tag>
      </div>
      <div data-spec-id="tag-brand-weak-lg">
        <Tag color="brand" variant="weak" size="lg">
          브랜드 Lg
        </Tag>
      </div>
      <div data-spec-id="status-tag-brand status-tag-brand-dot">
        <StatusTag color="brand">진행 중</StatusTag>
      </div>
      <div data-spec-id="status-tag-neutral">
        <StatusTag color="neutral">대기</StatusTag>
      </div>
      <div data-spec-id="status-tag-warning">
        <StatusTag color="warning">경고</StatusTag>
      </div>
      <div data-spec-id="status-tag-success status-tag-success-dot">
        <StatusTag color="success">완료</StatusTag>
      </div>
      <div data-spec-id="status-tag-error">
        <StatusTag color="error">오류</StatusTag>
      </div>
      <div data-spec-id="number-tag-brand-primary">
        <NumberTag color="brand" variant="primary">
          1
        </NumberTag>
      </div>
      <div data-spec-id="number-tag-brand-secondary">
        <NumberTag color="brand" variant="secondary">
          2
        </NumberTag>
      </div>
      <div data-spec-id="number-tag-brand-tertiary">
        <NumberTag color="brand" variant="tertiary">
          3
        </NumberTag>
      </div>
      <div data-spec-id="number-tag-neutral-primary">
        <NumberTag color="neutral" variant="primary">
          R
        </NumberTag>
      </div>
      <div data-spec-id="number-tag-neutral-secondary">
        <NumberTag color="neutral" variant="secondary">
          R
        </NumberTag>
      </div>
      <div data-spec-id="number-tag-neutral-tertiary">
        <NumberTag color="neutral" variant="tertiary">
          R
        </NumberTag>
      </div>
    </div>
  )
}

export function TagAllVariants() {
  return (
    <VariantGrid
      set="tag-basic"
      rows={["Style", "Color"]}
      columns={["Size"]}
      render={(variant: FigmaVariant) => {
        const style = lookup(
          { Weak: "weak", Fill: "fill" } as const,
          variant,
          "Style",
        )
        const color = lookup(
          {
            Brand: "brand",
            Neutral: "neutral",
            Warning: "warning",
            Success: "success",
            Error: "error",
          } as const,
          variant,
          "Color",
        )
        const size = lookup(
          { Sm: "sm", Md: "md", Lg: "lg" } as const,
          variant,
          "Size",
        )
        return (
          <Tag variant={style} color={color} size={size}>
            태그
          </Tag>
        )
      }}
    />
  )
}

export function StatusTagAllVariants() {
  return (
    <VariantGrid
      set="tag-status"
      rows={["Color"]}
      columns={[]}
      render={(variant: FigmaVariant) => {
        const color = lookup(
          {
            Default: "brand",
            Neutral: "neutral",
            Yellow: "warning",
            Green: "success",
            Red: "error",
          } as const,
          variant,
          "Color",
        )
        return <StatusTag color={color}>태그</StatusTag>
      }}
    />
  )
}

export function NumberTagAllVariants() {
  return (
    <VariantGrid
      set="tag-number"
      rows={["Color"]}
      columns={["Type"]}
      render={(variant: FigmaVariant) => {
        const color = lookup(
          { Brand: "brand", Neutral: "neutral" } as const,
          variant,
          "Color",
        )
        const type = lookup(
          {
            Primary: "primary",
            Secondary: "secondary",
            Tertiary: "tertiary",
          } as const,
          variant,
          "Type",
        )
        return (
          <NumberTag color={color} variant={type}>
            1
          </NumberTag>
        )
      }}
    />
  )
}
