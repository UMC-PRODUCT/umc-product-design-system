"use client"

import { TopNavigation, TopNavigationButton } from "@umc-product/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { useState } from "react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const PHONE_FRAME = "w-[375px] bg-white shadow-sm overflow-hidden"

function makeActions(count: number) {
  return (
    <>
      {count >= 2 && (
        <TopNavigationButton variant="icon" aria-label="검색">
          <ExpandMoreIcon weight="fill" />
        </TopNavigationButton>
      )}
      <TopNavigationButton variant="icon" aria-label="더보기">
        <ExpandMoreIcon weight="fill" />
      </TopNavigationButton>
    </>
  )
}

export function TopNavigationDefault() {
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div className={PHONE_FRAME} data-spec-id="top-navigation-main-left">
          <TopNavigation title="홈" actions={makeActions(1)} />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function TopNavigationWithBack() {
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div className={PHONE_FRAME} data-spec-id="top-navigation-sub-center">
          <TopNavigation
            title="프로필 수정"
            titleAlign="center"
            back={{ href: "/profile" }}
            actions={makeActions(1)}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function TopNavigationDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div className={PHONE_FRAME}>
          <TopNavigation
            title="서울 캠퍼스"
            onTitleClick={() => setOpen((prev) => !prev)}
            titleExpanded={open}
            actions={makeActions(1)}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

function TopNavigationCell({ variant }: { variant: FigmaVariant }) {
  const isMain = variant.props["Page Type"] === "Main"
  const isCenter = variant.props["Title Alignment"] === "Center"
  const hasBack = !isMain
  const hasDropdown = variant.props["Icon"] === "Dropdown"

  return (
    <div className={PHONE_FRAME}>
      <TopNavigation
        title={isMain ? "홈" : "상세 페이지"}
        titleAlign={isCenter ? "center" : "start"}
        back={hasBack ? { href: "/prev" } : undefined}
        onTitleClick={hasDropdown ? () => {} : undefined}
        actions={makeActions(1)}
      />
    </div>
  )
}

function TopNavigationButtonCell({ variant }: { variant: FigmaVariant }) {
  const type = variant.props["Type"]

  if (type === "Icon") {
    return (
      <TopNavigationButton variant="icon" aria-label="검색">
        <ExpandMoreIcon weight="fill" />
      </TopNavigationButton>
    )
  }

  if (type === "Text-Primary") {
    return (
      <TopNavigationButton variant="text" color="primary">
        완료
      </TopNavigationButton>
    )
  }

  if (type === "Text-Neutral") {
    return (
      <TopNavigationButton variant="text" color="neutral">
        취소
      </TopNavigationButton>
    )
  }

  return (
    <TopNavigationButton variant="icon" aria-label="슬롯">
      <ExpandMoreIcon weight="fill" />
    </TopNavigationButton>
  )
}

export function TopNavigationAllVariants() {
  return (
    <PreviewLinks>
      <>
        <VariantGrid
          set="top-navigation"
          sections={["Page Type"]}
          rows={["Title Alignment"]}
          columns={["Icon"]}
          render={(variant) => <TopNavigationCell variant={variant} />}
        />
        <VariantGrid
          set="top-navigation-button"
          rows={["Type"]}
          columns={[]}
          render={(variant) => <TopNavigationButtonCell variant={variant} />}
        />
      </>
    </PreviewLinks>
  )
}
