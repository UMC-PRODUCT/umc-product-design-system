"use client"

import {
  ContextSwitcher,
  SearchField,
  SideNavigation,
  type ContextSwitcherOption,
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

type View = "chapter" | "central"

const VIEWS: ContextSwitcherOption<View>[] = [
  { value: "chapter", label: "지부 운영진 뷰" },
  { value: "central", label: "중앙 운영진 뷰" },
]

function filterItems(
  items: SideNavigationItem[],
  query: string,
): SideNavigationItem[] {
  const keyword = query.trim()
  if (!keyword) return items
  return items.flatMap((item) => {
    if (String(item.label).includes(keyword)) return [item]
    if (!("children" in item)) return []
    const children = item.children.filter((child) =>
      String(child.label).includes(keyword),
    )
    return children.length > 0 ? [{ ...item, children }] : []
  })
}

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
  const [query, setQuery] = useState("")
  const [view, setView] = useState<View>("chapter")
  return (
    <div className="umc-example">
      <PreviewLinks onNavigate={setPath}>
        <div className="h-[480px]">
          <SideNavigation
            aria-label="검색 슬롯 예시"
            items={filterItems(ITEMS, query)}
            currentPath={path}
            slot={
              <SearchField
                placeholder="메뉴 검색"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            }
          />
        </div>
        <div className="h-[480px]" data-spec-id="side-navigation-slot">
          <SideNavigation
            aria-label="맥락 전환 슬롯 예시"
            items={ITEMS}
            currentPath={path}
            slot={
              <ContextSwitcher
                options={VIEWS}
                value={view}
                onValueChange={setView}
              />
            }
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

const ignoreViewChange = () => {}

const viewSlot = (
  <ContextSwitcher
    options={VIEWS}
    value="chapter"
    onValueChange={ignoreViewChange}
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
          slot={variant.props["Slot"] === "True" ? viewSlot : undefined}
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
                variant.props["Type"] === "With Slot" ? viewSlot : undefined
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
