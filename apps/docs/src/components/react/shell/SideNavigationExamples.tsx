"use client"

import {
  ContextSwitcher,
  SideNavigation,
  type SideNavigationItem,
} from "@umc-product/react"
import { PeoplePictogram } from "@umc-product/icons"
import { useState } from "react"

import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const menuIcon = <PeoplePictogram color="currentColor" />

const ITEMS: SideNavigationItem[] = [
  { label: "대시보드", href: "/dashboard", icon: menuIcon },
  {
    label: "매칭 관리",
    icon: menuIcon,
    children: [
      { label: "매칭 목록", href: "/matching" },
      { label: "매칭 현황", href: "/matching/status" },
      { label: "매칭 결과", href: "/matching/result" },
    ],
  },
  {
    label: "리크루팅",
    icon: menuIcon,
    children: [
      { label: "지원서", href: "/recruiting/applications" },
      { label: "지원자 평가", href: "/recruiting/reviews" },
    ],
  },
  { label: "설정", href: "/settings", icon: menuIcon },
]

const GENERATIONS = [
  { value: "10", label: "10기 운영진 뷰" },
  { value: "11", label: "11기 운영진 뷰" },
]

export function SideNavigationDefault() {
  const [path, setPath] = useState("/matching/status")
  return (
    <div className="umc-example umc-example-flush overflow-hidden">
      <PreviewLinks onNavigate={setPath}>
        <div
          className="h-[560px]"
          data-spec-id="side-navigation-root side-navigation-title side-navigation-menu-item side-navigation-menu-item-hover side-navigation-menu-item-label side-navigation-menu-item-icon side-navigation-group-selected side-navigation-group-selected-icon side-navigation-submenu-item side-navigation-submenu-bullet side-navigation-submenu-item-selected side-navigation-submenu-bullet-selected"
        >
          <SideNavigation title="관리 메뉴" items={ITEMS} currentPath={path} />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function SideNavigationWithSlot() {
  const [path, setPath] = useState("/dashboard")
  const [generation, setGeneration] = useState("10")
  return (
    <div className="umc-example umc-example-flush overflow-hidden">
      <PreviewLinks onNavigate={setPath}>
        <div className="h-[480px]" data-spec-id="side-navigation-slot">
          <SideNavigation
            items={ITEMS}
            currentPath={path}
            slot={
              <ContextSwitcher
                options={GENERATIONS}
                value={generation}
                onValueChange={setGeneration}
              />
            }
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

const ignoreGenerationChange = () => {}

const generationSlot = (
  <ContextSwitcher
    options={GENERATIONS}
    value="10"
    onValueChange={ignoreGenerationChange}
  />
)

const SELECTED_GROUP: SideNavigationItem = {
  label: "매칭 관리",
  icon: menuIcon,
  children: [
    { label: "매칭 목록", href: "/matching" },
    { label: "매칭 현황", href: "/matching/status" },
    { label: "매칭 결과", href: "/matching/result" },
  ],
}

const PLAIN_ITEM: SideNavigationItem = {
  label: "대시보드",
  href: "/dashboard",
  icon: menuIcon,
}

function MenuItemCell({ variant }: { variant: FigmaVariant }) {
  const selected = variant.props["Selected"] === "True"
  return (
    <div className="w-[216px]">
      <ForceState states={variant.props["State"] === "Hover" ? ["hover"] : []}>
        <SideNavigation
          aria-label="메뉴 항목"
          items={[selected ? SELECTED_GROUP : PLAIN_ITEM]}
          currentPath={selected ? "/matching/status" : "/"}
          slot={variant.props["Slot"] === "True" ? generationSlot : undefined}
        />
      </ForceState>
    </div>
  )
}

function SubmenuItemCell({ variant }: { variant: FigmaVariant }) {
  const selected = variant.props["Selected"] === "True"
  return (
    <div className="w-[216px]">
      <SideNavigation
        aria-label="하위 메뉴 항목"
        items={[
          {
            label: "매칭 관리",
            icon: menuIcon,
            children: [
              { label: "매칭 목록", href: "/matching" },
              { label: "매칭 현황", href: "/matching/status" },
            ],
          },
        ]}
        currentPath={selected ? "/matching" : "/matching/status"}
      />
    </div>
  )
}

export function SideNavigationAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="side-navigation"
        rows={[]}
        columns={["Type"]}
        render={(variant) => (
          <div className="h-[480px] w-[216px]">
            <SideNavigation
              title={
                variant.props["Type"] === "Default" ? "관리 메뉴" : undefined
              }
              items={ITEMS}
              currentPath="/matching/status"
              slot={
                variant.props["Type"] === "With Slot"
                  ? generationSlot
                  : undefined
              }
            />
          </div>
        )}
      />
      <VariantGrid
        set="side-navigation-menu-item"
        rows={["Selected", "State"]}
        columns={["Slot"]}
        order={{
          Selected: ["False", "True"],
          State: ["Default", "Hover"],
          Slot: ["False", "True"],
        }}
        render={(variant) => <MenuItemCell variant={variant} />}
      />
      <VariantGrid
        set="side-navigation-submenu-item"
        rows={[]}
        columns={["Selected"]}
        order={{ Selected: ["False", "True"] }}
        render={(variant) => <SubmenuItemCell variant={variant} />}
      />
    </PreviewLinks>
  )
}
