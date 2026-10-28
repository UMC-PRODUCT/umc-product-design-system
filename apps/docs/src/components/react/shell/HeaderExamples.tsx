"use client"

import {
  Button,
  HeaderDesktop,
  HeaderActionButton,
  HeaderHomeLink,
  HeaderMobile,
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

const MOBILE_NAV_ITEMS = [
  { label: "소개", href: "/about" },
  { label: "팀 매칭", href: "/matching" },
  { label: "지원하기", href: "/apply" },
  { label: "공지사항", href: "/notices" },
]

const DARK_BACKDROP = "linear-gradient(180deg, #56625f 0%, #a9b1af 100%)"

const MOBILE_FRAME = "w-[390px] max-w-full"
const MOBILE_OPENED_FRAME = `${MOBILE_FRAME} h-[376px]`

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
          <HeaderDesktop
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
          <HeaderDesktop mode="dark" navItems={NAV_ITEMS} currentPath={path} />
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
          <HeaderDesktop logo={<HeaderHomeLink {...MAIN_HOME_LINK} />} />
          <div data-spec-id="home-link-labeled-slot home-link-labeled home-link-labeled-body home-link-labeled-logo home-link-labeled-title home-link-labeled-subtitle">
            <HeaderDesktop logo={<HeaderHomeLink {...OPERATION_HOME_LINK} />} />
          </div>
          <HeaderDesktop logo={<HeaderHomeLink {...STUDY_HOME_LINK} />} />
          <HeaderDesktop
            logo={<HeaderHomeLink {...PRODUCT_TECH_HOME_LINK} />}
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
          <HeaderDesktop
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

function MobileMenuCta() {
  return (
    <Button size="md" variant="weak">
      지원하기
    </Button>
  )
}

export function HeaderMobileLight() {
  const [path, setPath] = useState("/about")
  return (
    <div className="umc-example umc-example-flush overflow-x-auto">
      <PreviewLinks onNavigate={setPath}>
        <div
          className={MOBILE_OPENED_FRAME}
          data-spec-id="header-mobile-light header-mobile-logo header-mobile-actions header-mobile-menu-button header-mobile-menu header-mobile-nav-list header-mobile-item header-mobile-item-hover header-mobile-item-selected"
        >
          <HeaderMobile
            navItems={MOBILE_NAV_ITEMS}
            currentPath={path}
            actions={<MobileMenuCta />}
            defaultOpen
          />
        </div>
      </PreviewLinks>
    </div>
  )
}

export function HeaderMobileDark() {
  const [path, setPath] = useState("/about")
  return (
    <div
      className="umc-example umc-example-flush overflow-x-auto"
      style={{ background: DARK_BACKDROP }}
    >
      <PreviewLinks onNavigate={setPath}>
        <div
          className={MOBILE_OPENED_FRAME}
          data-spec-id="header-mobile-dark header-mobile-dark-menu-button header-mobile-dark-menu header-mobile-dark-item header-mobile-dark-item-hover header-mobile-dark-item-selected"
        >
          <HeaderMobile
            mode="dark"
            navItems={MOBILE_NAV_ITEMS}
            currentPath={path}
            actions={<MobileMenuCta />}
            defaultOpen
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

function renderLoggedOutActions(withCta: boolean) {
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
      <HeaderDesktop
        mode={lookup(HEADER_MODES, variant, "Mode")}
        navItems={NAV_ITEMS}
        currentPath="/matching"
        actions={renderLoggedOutActions(
          variant.props["Show CTA Button"] === "True",
        )}
      />
    </div>
  )
}

function HeaderActionsCell({ variant }: { variant: FigmaVariant }) {
  if (variant.props["Login Status"] === "Logged In") {
    return <NotImplemented reason={LOGGED_IN_REASON} />
  }
  return (
    <HeaderDesktop
      mode={lookup(HEADER_MODES, variant, "Mode")}
      logo={null}
      actions={renderLoggedOutActions(
        variant.props["Show CTA Button"] === "True",
      )}
    />
  )
}

function NavigationItemCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  return (
    <ForceState states={state === "Hover" ? ["hover"] : []}>
      <HeaderDesktop
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
      <HeaderDesktop
        mode={lookup(HEADER_MODES, variant, "Mode")}
        logo={<HeaderHomeLink {...homeLink} />}
      />
    </ForceState>
  )
}

const MENU_CONTAINER_MODES = { Light: "light", Variant2: "dark" } as const

const menuContainerTone = (variant: FigmaVariant) =>
  variant.props["Property 1"] === "Variant2" ? "dark" : undefined

function HeaderMobileCell({ variant }: { variant: FigmaVariant }) {
  const opened = variant.props["Menu State"] === "Opened"
  return (
    <div className={opened ? MOBILE_OPENED_FRAME : MOBILE_FRAME}>
      <HeaderMobile
        mode={lookup(HEADER_MODES, variant, "Mode")}
        navItems={MOBILE_NAV_ITEMS}
        currentPath="/about"
        actions={<MobileMenuCta />}
        open={opened}
      />
    </div>
  )
}

function ActionsMobileCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className="h-20 w-[130px] overflow-hidden">
      <HeaderMobile
        mode={lookup(HEADER_MODES, variant, "Mode")}
        logo={null}
        navItems={MOBILE_NAV_ITEMS}
        open={variant.props["Menu State"] === "Opened"}
      />
    </div>
  )
}

function MenuItemCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["Property 1"]
  return (
    <ForceState states={state === "Hover" ? ["hover"] : []}>
      <div className={`${MOBILE_FRAME} h-[164px]`}>
        <HeaderMobile
          mode={lookup(HEADER_MODES, variant, "Mode")}
          navItems={[{ label: "팀 매칭", href: "/matching" }]}
          currentPath={state === "Selected" ? "/matching" : "/"}
          open
        />
      </div>
    </ForceState>
  )
}

function MenuContainerCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className={MOBILE_OPENED_FRAME}>
      <HeaderMobile
        mode={lookup(MENU_CONTAINER_MODES, variant, "Property 1")}
        navItems={MOBILE_NAV_ITEMS}
        currentPath="/about"
        actions={<MobileMenuCta />}
        open
      />
    </div>
  )
}

const MODE_ORDER = { Mode: ["Light", "Dark"] }

export function HeaderAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="header-desktop"
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
        set="header-mobile"
        rows={["Menu State"]}
        columns={["Mode"]}
        order={{ ...MODE_ORDER, "Menu State": ["Default", "Opened"] }}
        tone={darkTone}
        render={(variant) => <HeaderMobileCell variant={variant} />}
      />
      <VariantGrid
        set="header-home-link"
        rows={["Context"]}
        columns={[]}
        render={(variant) => (
          <HeaderDesktop
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
          <HeaderDesktop
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
        set="header-actions-desktop"
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
        set="header-actions-mobile"
        rows={["Menu State"]}
        columns={["Mode"]}
        order={{ ...MODE_ORDER, "Menu State": ["Default", "Opened"] }}
        tone={darkTone}
        render={(variant) => <ActionsMobileCell variant={variant} />}
      />
      <VariantGrid
        set="header-menu-container"
        rows={["Property 1"]}
        columns={[]}
        tone={menuContainerTone}
        render={(variant) => <MenuContainerCell variant={variant} />}
      />
      <VariantGrid
        set="header-menu-item"
        rows={["Property 1"]}
        columns={["Mode"]}
        order={{
          ...MODE_ORDER,
          "Property 1": ["Unselected", "Hover", "Selected"],
        }}
        tone={darkTone}
        render={(variant) => <MenuItemCell variant={variant} />}
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
