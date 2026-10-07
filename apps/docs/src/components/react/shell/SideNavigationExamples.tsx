import { SideNavigation, type SideNavigationItem } from "@umc-product/react"

const items: SideNavigationItem[] = [
  { label: "대시보드", href: "/dashboard" },
  {
    label: "매칭 관리",
    children: [
      { label: "매칭 목록", href: "/matching" },
      { label: "매칭 현황", href: "/matching/status" },
    ],
  },
  {
    label: "리크루팅",
    children: [
      { label: "지원서", href: "/recruiting/applications" },
      { label: "지원자 평가", href: "/recruiting/reviews" },
    ],
  },
  { label: "설정", href: "/settings" },
]

const probeItems: SideNavigationItem[] = [
  { label: "메뉴", href: "/menu" },
  { label: "선택됨", href: "/selected" },
  {
    label: "그룹",
    children: [
      { label: "서브메뉴", href: "/sub/default" },
      { label: "선택된 서브", href: "/sub/selected" },
    ],
  },
]

const probeStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: 0,
}

export function SideNavigationDefault() {
  return (
    <>
      <div
        className="umc-example umc-example-block"
        style={{ maxWidth: 216, border: "1px solid #e2e3e3", borderRadius: 8 }}
      >
        <div data-spec-id="side-navigation-default">
          <SideNavigation
            title="관리 메뉴"
            items={items}
            currentPath="/matching/status"
          />
        </div>
      </div>
      <div data-spec-id="side-navigation-menu-item-default" style={probeStyle}>
        <SideNavigation items={probeItems} currentPath="/other" />
      </div>
      <div data-spec-id="side-navigation-menu-item-selected" style={probeStyle}>
        <SideNavigation items={probeItems} currentPath="/selected" />
      </div>
      <div
        data-spec-id="side-navigation-submenu-item-default"
        style={probeStyle}
      >
        <SideNavigation items={probeItems} currentPath="/sub/selected" />
      </div>
      <div
        data-spec-id="side-navigation-submenu-item-selected"
        style={probeStyle}
      >
        <SideNavigation items={probeItems} currentPath="/sub/selected" />
      </div>
    </>
  )
}
