"use client"

import {
  Footer,
  type FooterColumn,
  type FooterMode,
  type FooterSocialLink,
  type FooterVariant,
} from "@umc-product/react"

import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"
import { PreviewLinks } from "./PreviewLinks.tsx"

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "About",
    items: [
      { label: "UMC PRODUCT", href: "/product" },
      { label: "중앙사무국", href: "/office" },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "UMC APP" },
      { label: "UMC 공식 홈페이지", href: "/home" },
      { label: "데모데이 매칭 서비스", href: "/matching" },
      { label: "리크루팅 서비스" },
      { label: "UMC Operation" },
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "서비스이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "카카오톡 채널", href: "/contact/kakao" },
      {
        label: "university@neordinary.com",
        href: "mailto:university@neordinary.com",
      },
      {
        label: "business@neordinary.com",
        href: "mailto:business@neordinary.com",
      },
    ],
  },
]

const ITEM_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    items: [
      { label: "UMC 공식 홈페이지", href: "/home" },
      { label: "리크루팅 서비스" },
    ],
  },
]

const SOCIAL_LINKS: FooterSocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/" },
  { platform: "instagram", href: "https://www.instagram.com/" },
  { platform: "youtube", href: "https://www.youtube.com/" },
]

const FOOTER_MODES: Readonly<Record<string, FooterMode>> = {
  Dark: "dark",
  Gray: "gray",
  Light: "light",
}

const FOOTER_VARIANTS: Readonly<Record<string, FooterVariant>> = {
  Hero: "hero",
  Default: "default",
}

const FRAME = "umc-example umc-example-flush docs-footer-frame"

const STACK = "umc-example umc-example-flush docs-footer-stack"

const darkTone = (variant: FigmaVariant) =>
  variant.props["Property 1"] === "Dark" ? "dark" : undefined

export function FooterPreview() {
  return (
    <PreviewLinks>
      <div
        className={FRAME}
        data-spec-id="footer-light-default footer-light-default-column-title footer-light-default-link footer-light-default-logo footer-light-default-title footer-light-default-copyright footer-light-default-social-link"
      >
        <Footer columns={FOOTER_COLUMNS} socialLinks={SOCIAL_LINKS} />
      </div>
    </PreviewLinks>
  )
}

export function FooterVariants() {
  return (
    <PreviewLinks>
      <div className={STACK}>
        <div
          className="docs-footer-frame"
          data-spec-id="footer-dark-hero footer-dark-hero-glow footer-dark-hero-content footer-dark-hero-columns footer-dark-hero-column footer-dark-hero-column-title footer-dark-hero-items footer-dark-hero-link footer-dark-hero-text footer-dark-hero-brand footer-dark-hero-logo footer-dark-hero-title footer-dark-hero-copyright footer-dark-hero-social footer-dark-hero-social-link"
        >
          <Footer
            variant="hero"
            mode="dark"
            columns={FOOTER_COLUMNS}
            socialLinks={SOCIAL_LINKS}
          />
        </div>
        <div
          className="docs-footer-frame"
          data-spec-id="footer-dark-default-identity"
        >
          <Footer
            variant="default"
            mode="dark"
            columns={FOOTER_COLUMNS}
            socialLinks={SOCIAL_LINKS}
          />
        </div>
      </div>
    </PreviewLinks>
  )
}

export function FooterModes() {
  return (
    <PreviewLinks>
      <div className={STACK}>
        <div className="docs-footer-frame">
          <Footer
            mode="light"
            columns={FOOTER_COLUMNS}
            socialLinks={SOCIAL_LINKS}
          />
        </div>
        <div
          className="docs-footer-frame"
          data-spec-id="footer-gray-hero footer-gray-hero-column-title footer-gray-hero-copyright footer-gray-hero-social-link"
        >
          <Footer
            variant="hero"
            mode="gray"
            columns={FOOTER_COLUMNS}
            socialLinks={SOCIAL_LINKS}
          />
        </div>
        <div className="docs-footer-frame">
          <Footer
            mode="dark"
            columns={FOOTER_COLUMNS}
            socialLinks={SOCIAL_LINKS}
          />
        </div>
      </div>
    </PreviewLinks>
  )
}

export function FooterItems() {
  return (
    <PreviewLinks>
      <div className={FRAME}>
        <Footer columns={ITEM_COLUMNS} />
      </div>
    </PreviewLinks>
  )
}

function FooterVariantCell({ variant }: { variant: FigmaVariant }) {
  return (
    <div className="min-w-[1024px]">
      <Footer
        variant={lookup(FOOTER_VARIANTS, variant, "Type")}
        mode={lookup(FOOTER_MODES, variant, "Property 1")}
        columns={FOOTER_COLUMNS}
        socialLinks={SOCIAL_LINKS}
      />
    </div>
  )
}

export function FooterAllVariants() {
  return (
    <PreviewLinks>
      <VariantGrid
        set="footer"
        sections={["Property 1"]}
        rows={["Type"]}
        columns={[]}
        order={{
          "Property 1": ["Light", "Gray", "Dark"],
          Type: ["Default", "Hero"],
        }}
        tone={darkTone}
        render={(variant) => <FooterVariantCell variant={variant} />}
      />
    </PreviewLinks>
  )
}
