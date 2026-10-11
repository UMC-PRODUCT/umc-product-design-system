"use client"

import { BottomNavigation, BottomNavigationItem } from "@umc-product/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { useState } from "react"

import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const PHONE_FRAME = "w-full max-w-[375px] bg-white shadow-sm overflow-hidden"
const VARIANT_PHONE_FRAME = "w-[375px] bg-white shadow-sm overflow-hidden"

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "매칭", href: "/matching" },
  { label: "지원", href: "/apply" },
  { label: "프로필", href: "/profile" },
]

export function BottomNavigationDefault() {
  const [path, setPath] = useState("/")
  return (
    <div className="umc-example umc-example-flush">
      <PreviewLinks onNavigate={setPath}>
        <div className={PHONE_FRAME} data-spec-id="bottom-navigation-ios">
          <BottomNavigation>
            {NAV_ITEMS.map((item) => (
              <BottomNavigationItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={<ExpandMoreIcon weight="fill" />}
                currentPath={path}
              />
            ))}
          </BottomNavigation>
        </div>
      </PreviewLinks>
    </div>
  )
}

function BottomNavigationCell({ variant }: { variant: FigmaVariant }) {
  const platform = variant.props["Platform"]

  return (
    <div className={VARIANT_PHONE_FRAME}>
      <div className="text-xs text-center py-1 text-gray-400">{platform}</div>
      <BottomNavigation>
        {NAV_ITEMS.map((item, index) => (
          <BottomNavigationItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={<ExpandMoreIcon weight="fill" />}
            currentPath={index === 0 ? item.href : "/other"}
          />
        ))}
      </BottomNavigation>
    </div>
  )
}

function BottomNavigationTabItemCell({ variant }: { variant: FigmaVariant }) {
  const selected = variant.props["Selected"] === "True"

  return (
    <div
      className="w-[80px]"
      data-spec-id={
        selected
          ? "bottom-navigation-tab-active"
          : "bottom-navigation-tab-inactive"
      }
    >
      <BottomNavigation>
        <BottomNavigationItem
          href="/"
          label="홈"
          icon={<ExpandMoreIcon weight="fill" />}
          currentPath={selected ? "/" : "/other"}
        />
      </BottomNavigation>
    </div>
  )
}

export function BottomNavigationAllVariants() {
  return (
    <PreviewLinks>
      <>
        <VariantGrid
          set="bottom-navigation"
          rows={[]}
          columns={["Platform"]}
          render={(variant) => <BottomNavigationCell variant={variant} />}
        />
        <VariantGrid
          set="bottom-navigation-tab-item"
          rows={["Selected"]}
          columns={[]}
          render={(variant) => (
            <BottomNavigationTabItemCell variant={variant} />
          )}
        />
      </>
    </PreviewLinks>
  )
}
