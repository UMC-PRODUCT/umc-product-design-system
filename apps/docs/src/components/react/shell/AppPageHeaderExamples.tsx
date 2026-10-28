"use client"

import {
  AppPageHeader,
  TopNavigationButton,
  type AppPageHeaderMargin,
} from "@umc-product/react"
import { NotificationIcon } from "@umc-product/icons"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const PHONE_FRAME = "w-full max-w-[390px] bg-white py-4"
const VARIANT_PHONE_FRAME = "w-[390px] bg-white py-4"

const MARGINS: Readonly<Record<string, AppPageHeaderMargin>> = {
  "16": 16,
  "20": 20,
}

export function AppPageHeaderDefault() {
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div
          className={PHONE_FRAME}
          data-spec-id="app-page-header app-page-header-navigation app-page-header-text app-page-header-title app-page-header-subtitle"
        >
          <AppPageHeader
            title="학습 일정"
            subtitle="이번 주에 들을 세션을 확인해요"
            back={{ href: "/study" }}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function AppPageHeaderWithoutNavigation() {
  return (
    <div className="umc-example umc-example-flush">
      <div className={PHONE_FRAME}>
        <AppPageHeader
          title="반가워요"
          subtitle="UMC에서 함께할 파트를 골라 주세요"
        />
      </div>
    </div>
  )
}

export function AppPageHeaderWithActions() {
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div className={PHONE_FRAME}>
          <AppPageHeader
            title="학습 일정"
            back={{ href: "/study" }}
            actions={
              <TopNavigationButton variant="icon" aria-label="알림">
                <NotificationIcon />
              </TopNavigationButton>
            }
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function AppPageHeaderMargin20() {
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks>
        <div className={PHONE_FRAME} data-spec-id="app-page-header-margin-20">
          <AppPageHeader
            title="학습 일정"
            subtitle="이번 주에 들을 세션을 확인해요"
            back={{ href: "/study" }}
            margin={20}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

function AppPageHeaderCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className={VARIANT_PHONE_FRAME}>
      <AppPageHeader
        title="Title"
        subtitle="Subtitle"
        back={{ href: "/prev" }}
        margin={lookup(MARGINS, variant, "Margin")}
      />
    </div>
  )
}

export function AppPageHeaderAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="app-page-header"
        rows={["Margin"]}
        columns={[]}
        render={(variant) => <AppPageHeaderCell variant={variant} />}
      />
    </PreviewLinks>
  )
}
