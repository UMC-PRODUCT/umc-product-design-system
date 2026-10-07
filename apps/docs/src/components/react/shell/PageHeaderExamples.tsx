import { PageHeader } from "@umc-product/react"

const probeStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: 0,
}

export function PageHeaderDefault() {
  return (
    <>
      <div className="umc-example umc-example-block">
        <div data-spec-id="page-header-full">
          <PageHeader
            title="지원자 목록"
            description="현재 차수에 지원한 모든 지원자를 확인합니다."
            breadcrumbs={[
              { label: "리크루팅", href: "/recruiting" },
              { label: "지원자 목록" },
            ]}
          />
        </div>
      </div>
      <div data-spec-id="page-header-breadcrumb-item" style={probeStyle}>
        <PageHeader
          title="지원자 목록"
          breadcrumbs={[{ label: "리크루팅", href: "/recruiting" }]}
        />
      </div>
      <div data-spec-id="page-header-title" style={probeStyle}>
        <PageHeader title="지원자 목록" />
      </div>
      <div data-spec-id="page-header-description" style={probeStyle}>
        <PageHeader
          title="지원자 목록"
          description="현재 차수에 지원한 모든 지원자를 확인합니다."
        />
      </div>
    </>
  )
}

export function PageHeaderSimple() {
  return (
    <div className="umc-example umc-example-block">
      <PageHeader title="대시보드" />
    </div>
  )
}
