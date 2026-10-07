"use client"

import { Button, Header, HeaderActionButton } from "@umc-product/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { useState } from "react"

import { ForceState, NotImplemented } from "../variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
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

export function HeaderActions() {
  const [path, setPath] = useState("/matching")
  return (
    <div className="umc-example umc-example-flush overflow-x-auto">
      <PreviewLinks onNavigate={setPath}>
        <div className="min-w-[720px]">
          <Header
            logo={<Logo color="var(--umc-color-text-neutral-strong)" />}
            navItems={NAV_ITEMS}
            currentPath={path}
            actions={
              <>
                <span data-spec-id="header-action-button header-action-button-hover">
                  <HeaderActionButton>문의사항</HeaderActionButton>
                </span>
                <span data-spec-id="header-action-button-suffix header-action-button-suffix-icon">
                  <HeaderActionButton suffix={<ExpandMoreIcon weight="fill" />}>
                    10기 운영진
                  </HeaderActionButton>
                </span>
              </>
            }
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

const HEADER_MODES = { Light: "light", Dark: "dark" } as const

const LOGGED_IN_REASON =
  "로그인 상태의 프로필 아바타 에셋이 정해지지 않아 아직 없습니다"

const darkTone = (variant: FigmaVariant) =>
  variant.props["Mode"] === "Dark" ? "dark" : undefined

const logoColorOf = (mode: "light" | "dark") =>
  mode === "dark"
    ? "var(--umc-color-text-inverse)"
    : "var(--umc-color-text-neutral-strong)"

function LoggedOutActions({ withCta }: { withCta: boolean }) {
  return (
    <>
      {withCta && <Button size="md">버튼</Button>}
      <HeaderActionButton>문의사항</HeaderActionButton>
      <Button size="md" variant="weak">
        로그인
      </Button>
    </>
  )
}

function HeaderVariantCell({ variant }: { variant: FigmaVariant }) {
  if (variant.props["Login Status"] === "Logged In") {
    return <NotImplemented reason={LOGGED_IN_REASON} />
  }
  const mode = lookup(HEADER_MODES, variant, "Mode")
  return (
    <div className="min-w-[720px]">
      <Header
        mode={mode}
        logo={<Logo color={logoColorOf(mode)} />}
        navItems={NAV_ITEMS}
        currentPath="/matching"
        actions={
          <LoggedOutActions
            withCta={variant.props["Show CTA Button"] === "True"}
          />
        }
      />
    </div>
  )
}

function HeaderActionsCell({ variant }: { variant: FigmaVariant }) {
  if (variant.props["Login Status"] === "Logged In") {
    return <NotImplemented reason={LOGGED_IN_REASON} />
  }
  return (
    <Header
      mode={lookup(HEADER_MODES, variant, "Mode")}
      logo={null}
      actions={
        <LoggedOutActions
          withCta={variant.props["Show CTA Button"] === "True"}
        />
      }
    />
  )
}

function NavigationItemCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  return (
    <ForceState states={state === "Hover" ? ["hover"] : []}>
      <Header
        mode={lookup(HEADER_MODES, variant, "Mode")}
        logo={null}
        navItems={[{ label: "팀 매칭", href: "/matching" }]}
        currentPath={state === "Selected" ? "/matching" : "/"}
      />
    </ForceState>
  )
}

const MODE_ORDER = { Mode: ["Light", "Dark"] }

export function HeaderAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="header"
        sections={["Mode"]}
        rows={["Login Status", "Show CTA Button"]}
        columns={[]}
        order={{
          ...MODE_ORDER,
          "Login Status": ["Logged Out", "Logged In"],
          "Show CTA Button": ["False", "True"],
        }}
        tone={darkTone}
        render={(variant) => <HeaderVariantCell variant={variant} />}
      />
      <VariantGrid
        set="header-home-link"
        rows={["Context"]}
        columns={[]}
        render={() => (
          <NotImplemented reason="맥락별 로고 에셋을 받지 못했습니다. 지금은 앱이 logo로 로고를 넘깁니다" />
        )}
      />
      <VariantGrid
        set="header-navigation"
        rows={["Mode"]}
        columns={[]}
        order={MODE_ORDER}
        tone={darkTone}
        render={(variant) => (
          <Header
            mode={lookup(HEADER_MODES, variant, "Mode")}
            logo={null}
            navItems={NAV_ITEMS}
            currentPath="/matching"
          />
        )}
      />
      <VariantGrid
        set="header-navigation-item"
        rows={["State"]}
        columns={["Mode"]}
        order={{ ...MODE_ORDER, State: ["Default", "Hover", "Selected"] }}
        tone={darkTone}
        render={(variant) => <NavigationItemCell variant={variant} />}
      />
      <VariantGrid
        set="header-actions"
        sections={["Mode"]}
        rows={["Login Status", "Show CTA Button"]}
        columns={[]}
        order={{
          ...MODE_ORDER,
          "Login Status": ["Logged Out", "Logged In"],
          "Show CTA Button": ["False", "True"],
        }}
        tone={darkTone}
        render={(variant) => <HeaderActionsCell variant={variant} />}
      />
      <VariantGrid
        set="header-action-button"
        rows={["Suffix"]}
        columns={["Property 1"]}
        order={{ Suffix: ["False", "True"] }}
        render={(variant) => (
          <ForceState
            states={variant.props["Property 1"] === "Hover" ? ["hover"] : []}
          >
            <HeaderActionButton
              suffix={
                variant.props["Suffix"] === "True" ? (
                  <ExpandMoreIcon weight="fill" />
                ) : undefined
              }
            >
              10기 운영진
            </HeaderActionButton>
          </ForceState>
        )}
      />
    </PreviewLinks>
  )
}
