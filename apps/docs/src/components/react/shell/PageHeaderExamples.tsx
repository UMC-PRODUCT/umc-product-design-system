import { PageHeader } from "@umc-product/react/shell"

export function PageHeaderDefault() {
  return (
    <div className="umc-example umc-example-block">
      <PageHeader
        title="지원자 목록"
        description="현재 차수에 지원한 모든 지원자를 확인합니다."
        breadcrumbs={[
          { label: "리크루팅", href: "/recruiting" },
          { label: "지원자 목록" },
        ]}
      />
    </div>
  )
}

export function PageHeaderSimple() {
  return (
    <div className="umc-example umc-example-block">
      <PageHeader title="대시보드" />
    </div>
  )
}
