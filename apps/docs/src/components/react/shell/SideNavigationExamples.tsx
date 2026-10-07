import { SideNavigation, type SideNavigationItem } from "@umc-product/react/shell"

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

export function SideNavigationDefault() {
  return (
    <div
      className="umc-example umc-example-block"
      style={{ maxWidth: 216, border: "1px solid #e2e3e3", borderRadius: 8 }}
    >
      <SideNavigation
        title="관리 메뉴"
        items={items}
        currentPath="/matching/status"
      />
    </div>
  )
}
