"use client"

import { Button, Header } from "@umc-product/react"
import { useState } from "react"

import { PreviewLinks } from "./PreviewLinks.tsx"

const NAV_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

const DARK_BACKDROP = "linear-gradient(180deg, #56625f 0%, #a9b1af 100%)"

function Logo({ color }: { color: string }) {
  return <span style={{ fontSize: 22, fontWeight: 800, color }}>UMC</span>
}

export function HeaderLight() {
  const [path, setPath] = useState("/matching")
  return (
    <div className="umc-example umc-example-flush overflow-x-auto">
      <PreviewLinks onNavigate={setPath}>
        <div
          className="min-w-[720px]"
          data-spec-id="header-light header-light-logo header-light-navigation header-light-item header-light-item-hover header-light-item-selected header-light-actions"
        >
          <Header
            logo={<Logo color="var(--umc-color-text-neutral-strong)" />}
            navItems={NAV_ITEMS}
            currentPath={path}
            actions={<Button size="md">로그인</Button>}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function HeaderDark() {
  const [path, setPath] = useState("/about")
  return (
    <div
      className="umc-example umc-example-flush overflow-x-auto"
      style={{ background: DARK_BACKDROP }}
    >
      <PreviewLinks onNavigate={setPath}>
        <div
          className="min-w-[720px]"
          data-spec-id="header-dark header-dark-navigation header-dark-item header-dark-item-hover header-dark-item-selected"
        >
          <Header
            mode="dark"
            logo={<Logo color="var(--umc-color-text-inverse)" />}
            navItems={NAV_ITEMS}
            currentPath={path}
          />
        </div>
      </PreviewLinks>
    </div>
  )
}
