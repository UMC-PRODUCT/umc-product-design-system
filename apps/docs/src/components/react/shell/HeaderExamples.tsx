"use client"

import {
  Button,
  Header,
  HeaderActionButton,
  HeaderHomeLink,
  type HeaderHomeLinkProps,
} from "@umc-product/react"
import { ExpandMoreIcon } from "@umc-product/icons"
import { useState } from "react"

import { ForceState, NotImplemented } from "../variants/VariantCells.tsx"
import {
  lookup,
  type FigmaVariant,
  type VariantSetKey,
} from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const NAV_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
]

const DARK_BACKDROP = "linear-gradient(180deg, #56625f 0%, #a9b1af 100%)"

const MAIN_HOME_LINK: HeaderHomeLinkProps = {}
const OPERATION_HOME_LINK: HeaderHomeLinkProps = {
  context: "operation",
  generation: 11,
}
const STUDY_HOME_LINK: HeaderHomeLinkProps = {
  context: "study",
  generation: 11,
}
const PRODUCT_TECH_HOME_LINK: HeaderHomeLinkProps = {
  context: "product-tech",
}

export function HeaderLight() {
  const [path, setPath] = useState("/matching")
  return (
    <div className="umc-example umc-example-flush overflow-x-auto">
      <PreviewLinks onNavigate={setPath}>
        <div
          className="min-w-[720px]"
          data-spec-id="header-light header-light-logo header-light-navigation header-light-item header-light-item-hover header-light-item-selected header-light-actions home-link-main home-link-main-logo home-link-main-hover"
        >
          <Header
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
          data-spec-id="header-dark header-dark-navigation header-dark-item header-dark-item-hover header-dark-item-selected home-link-dark home-link-dark-hover"
        >
          <Header mode="dark" navItems={NAV_ITEMS} currentPath={path} />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function HeaderHomeLinks() {
  return (
    <div className="umc-example umc-example-flush overflow-x-auto">
      <PreviewLinks>
        <div className="grid min-w-[320px]">
          <Header logo={<HeaderHomeLink {...MAIN_HOME_LINK} />} />
          <div data-spec-id="home-link-labeled-slot home-link-labeled home-link-labeled-body home-link-labeled-logo home-link-labeled-title home-link-labeled-subtitle">
            <Header logo={<HeaderHomeLink {...OPERATION_HOME_LINK} />} />
          </div>
          <Header logo={<HeaderHomeLink {...STUDY_HOME_LINK} />} />
          <Header logo={<HeaderHomeLink {...PRODUCT_TECH_HOME_LINK} />} />
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

const HOME_LINK_CONTEXTS = {
  Main: MAIN_HOME_LINK,
  Operation: OPERATION_HOME_LINK,
  Study: STUDY_HOME_LINK,
  "Product Tech": PRODUCT_TECH_HOME_LINK,
}

const HOME_LINK_PRIMITIVE_SETS: ReadonlyArray<{
  set: VariantSetKey
  homeLink: HeaderHomeLinkProps
}> = [
  { set: "header-home-link-umc", homeLink: MAIN_HOME_LINK },
  { set: "header-home-link-operation", homeLink: OPERATION_HOME_LINK },
  { set: "header-home-link-study", homeLink: STUDY_HOME_LINK },
  { set: "header-home-link-product-tech", homeLink: PRODUCT_TECH_HOME_LINK },
]

const LOGGED_IN_REASON =
  "로그인 상태의 프로필 아바타 에셋이 정해지지 않아 아직 없습니다"

const darkTone = (variant: FigmaVariant) =>
  variant.props["Mode"] === "Dark" ? "dark" : undefined

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
  return (
    <div className="min-w-[720px]">
      <Header
        mode={lookup(HEADER_MODES, variant, "Mode")}
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

function HomeLinkPrimitiveCell({
  variant,
  homeLink,
}: {
  variant: FigmaVariant
  homeLink: HeaderHomeLinkProps
}) {
  return (
    <ForceState
      states={
        variant.props["State"] === "Hover & Pressed" ? ["hover", "active"] : []
      }
    >
      <Header
        mode={lookup(HEADER_MODES, variant, "Mode")}
        logo={<HeaderHomeLink {...homeLink} />}
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
        render={(variant) => (
          <Header
            logo={
              <HeaderHomeLink
                {...lookup(HOME_LINK_CONTEXTS, variant, "Context")}
              />
            }
          />
        )}
      />
      {HOME_LINK_PRIMITIVE_SETS.map(({ set, homeLink }) => (
        <VariantGrid
          key={set}
          set={set}
          rows={["State"]}
          columns={["Mode"]}
          order={MODE_ORDER}
          tone={darkTone}
          render={(variant) => (
            <HomeLinkPrimitiveCell variant={variant} homeLink={homeLink} />
          )}
        />
      ))}
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
