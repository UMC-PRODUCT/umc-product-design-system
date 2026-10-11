"use client"

import { PageHeader } from "@umc-product/react"
import { useState } from "react"

import { PreviewLinks } from "./PreviewLinks.tsx"

export function LinkProviderDefault() {
  const [lastHref, setLastHref] = useState<string>()
  return (
    <div className="umc-example umc-example-stack">
      <PreviewLinks onNavigate={setLastHref}>
        <PageHeader
          title="지원자 목록"
          breadcrumbs={[
            { label: "리크루팅", href: "/recruiting" },
            { label: "지원서 관리", href: "/recruiting/applications" },
            { label: "지원자 목록" },
          ]}
        />
      </PreviewLinks>
      <p className="m-0 text-sm">
        주입한 링크가 받은 경로: {lastHref ?? "아직 없음"}
      </p>
    </div>
  )
}
