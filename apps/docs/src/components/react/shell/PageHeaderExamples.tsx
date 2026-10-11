"use client"

import { PageHeader } from "@umc-product/react"

import { ForceState } from "../variants/VariantCells.tsx"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

export function PageHeaderDefault() {
  return (
    <div className="umc-example">
      <PreviewLinks>
        <div
          className="w-full"
          data-spec-id="page-header-root page-header-breadcrumbs page-header-breadcrumb-item page-header-breadcrumb-item-hover page-header-breadcrumb-separator page-header-title page-header-description"
        >
          <PageHeader
            title="지원자 목록"
            description="현재 차수에 지원한 모든 지원자를 확인합니다."
            breadcrumbs={[
              { label: "리크루팅", href: "/recruiting" },
              { label: "지원서 관리", href: "/recruiting/applications" },
              { label: "지원자 목록" },
            ]}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function PageHeaderSimple() {
  return (
    <div className="umc-example">
      <PageHeader title="대시보드" />
    </div>
  )
}

export function PageHeaderAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="breadcrumb-item"
        rows={[]}
        columns={["State"]}
        render={(variant) => (
          <ForceState
            states={variant.props["State"] === "Hover" ? ["hover"] : []}
          >
            <PageHeader
              title="지원자 목록"
              breadcrumbs={[
                { label: "리크루팅", href: "/recruiting" },
                { label: "지원자 목록" },
              ]}
            />
          </ForceState>
        )}
      />
    </PreviewLinks>
  )
}
