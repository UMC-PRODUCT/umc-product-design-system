"use client"

import { useId, type ComponentPropsWithRef, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

export type FooterVariant = "default" | "hero"

export type FooterMode = "light" | "gray" | "dark"

export type FooterItem = {
  label: ReactNode
  href?: string
}

export type FooterColumn = {
  title: ReactNode
  items: FooterItem[]
}

export type FooterSocialPlatform = "facebook" | "instagram" | "youtube"

export type FooterSocialLink = {
  platform: FooterSocialPlatform
  href: string
  label?: string
}

export type FooterProps = Omit<
  ComponentPropsWithRef<"footer">,
  "children" | "title"
> & {
  variant?: FooterVariant
  mode?: FooterMode
  columns?: FooterColumn[]
  socialLinks?: FooterSocialLink[]
  title?: ReactNode
  copyright?: ReactNode
}

type FooterContentProps = {
  columns: FooterColumn[]
  socialLinks: FooterSocialLink[]
  title: ReactNode
  copyright: ReactNode
}

const DEFAULT_TITLE = "University MakeUs Challenge"

const SOCIAL_LABELS: Readonly<Record<FooterSocialPlatform, string>> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
}

const LOGO_WIDTH = 63.6364
const LOGO_HEIGHT = 20
const LOGO_U_PATH =
  "M18.6017 0H0.97902C0.438622 0 0 0.448012 0 1.00005V10C0 15.522 4.38412 20 9.79041 20C15.1966 20 19.5807 15.522 19.5807 10V1.00005C19.5807 0.448012 19.1422 0 18.6017 0Z"
const LOGO_M_PATH =
  "M40.6294 0C35.7636 0 31.818 3.02805 31.818 8.00004C31.818 3.02805 27.8725 0 23.0067 0C22.4663 0 22.0277 0.448012 22.0277 1.00005V19C22.0277 19.552 22.4663 20 23.0067 20H40.6294C41.1698 20 41.6084 19.552 41.6084 19V1.00005C41.6084 0.448012 41.1698 0 40.6294 0Z"
const LOGO_C_PATH =
  "M63.6364 19V1.00005C63.6364 0.448012 63.1979 0 62.6571 0H53.8458C48.4396 0 44.0554 4.47805 44.0554 10C44.0554 15.522 48.4396 20 53.8458 20H62.6571C63.1979 20 63.6364 19.552 63.6364 19Z"

const GLOW_WIDTH = 2265.19
const GLOW_HEIGHT = 1317.11
const GLOW_PATH =
  "M394.829 917.362C793.996 943.862 1647.93 876.462 1870.33 394.862"
const GLOW_STROKE_WIDTH = 325.377
const GLOW_BLUR = 116.067
const GLOW_FILTER_ORIGIN = -1.52588e-5

const FACEBOOK_WIDTH = 10.077
const FACEBOOK_HEIGHT = 18.956
const FACEBOOK_PATH =
  "M9.416 10.583L9.939 7.178H6.672V4.968C6.672 4.037 7.128 3.128 8.592 3.128H10.077V0.23C10.077 0.23 8.729 0 7.44 0C4.75 0 2.99 1.63 2.99 4.583V7.178H0V10.583H2.99V18.956H6.672V10.583H9.416Z"

const INSTAGRAM_SIZE = 18.5202
const INSTAGRAM_FRAME_PATH =
  "M9.26 0C6.745 0 6.43 0.00999976 5.442 0.0559998C4.457 0.101 3.783 0.257 3.194 0.486C2.586 0.723 2.069 1.04 1.554 1.554C1.04 2.069 0.723 2.586 0.486 3.194C0.257 3.784 0.101 4.457 0.0559998 5.442C0.0109998 6.43 0 6.745 0 9.26C0 11.775 0.00999976 12.09 0.0559998 13.078C0.101 14.064 0.257 14.737 0.486 15.326C0.723 15.935 1.04 16.451 1.554 16.966C2.069 17.481 2.586 17.797 3.194 18.034C3.784 18.263 4.457 18.419 5.442 18.464C6.43 18.509 6.745 18.52 9.26 18.52C11.775 18.52 12.09 18.51 13.078 18.464C14.063 18.419 14.737 18.263 15.326 18.034C15.934 17.797 16.451 17.481 16.966 16.966C17.48 16.451 17.797 15.935 18.034 15.326C18.263 14.736 18.419 14.064 18.464 13.078C18.509 12.09 18.52 11.775 18.52 9.26C18.52 6.745 18.51 6.43 18.464 5.442C18.419 4.457 18.263 3.783 18.034 3.194C17.797 2.586 17.48 2.069 16.966 1.554C16.451 1.04 15.934 0.723 15.326 0.486C14.736 0.257 14.063 0.101 13.078 0.0559998C12.09 0.00999976 11.775 0 9.26 0ZM9.26 1.669C11.732 1.669 12.025 1.679 13.002 1.723C13.905 1.763 14.395 1.915 14.722 2.041C15.153 2.209 15.462 2.41 15.786 2.734C16.11 3.058 16.311 3.367 16.479 3.799C16.605 4.125 16.756 4.615 16.797 5.519C16.842 6.495 16.851 6.788 16.851 9.26C16.851 11.733 16.842 12.025 16.797 13.002C16.757 13.905 16.605 14.395 16.479 14.722C16.311 15.153 16.109 15.462 15.786 15.786C15.462 16.11 15.153 16.311 14.721 16.479C14.395 16.605 13.905 16.756 13.001 16.797C12.026 16.842 11.733 16.851 9.26 16.851C6.787 16.851 6.494 16.842 5.518 16.797C4.615 16.757 4.125 16.605 3.798 16.479C3.367 16.311 3.058 16.109 2.734 15.786C2.41 15.462 2.209 15.153 2.041 14.721C1.915 14.395 1.764 13.905 1.723 13.001C1.678 12.025 1.669 11.733 1.669 9.26C1.669 6.788 1.678 6.495 1.723 5.518C1.763 4.615 1.915 4.125 2.041 3.798C2.209 3.367 2.411 3.058 2.734 2.734C3.058 2.41 3.367 2.209 3.799 2.041C4.125 1.915 4.615 1.764 5.519 1.723C6.495 1.678 6.788 1.669 9.26 1.669Z"
const INSTAGRAM_LENS_PATH =
  "M9.25914 12.3473C7.55414 12.3473 6.17214 10.9653 6.17214 9.26029C6.17214 7.55529 7.55414 6.17329 9.25914 6.17329C10.9641 6.17329 12.3461 7.55529 12.3461 9.26029C12.3461 10.9653 10.9641 12.3473 9.25914 12.3473ZM9.25914 4.50529C6.63314 4.50529 4.50414 6.63429 4.50414 9.26029C4.50414 11.8863 6.63314 14.0153 9.25914 14.0153C11.8851 14.0153 14.0141 11.8863 14.0141 9.26029C14.0141 6.63429 11.8851 4.50529 9.25914 4.50529ZM15.3131 4.31729C15.3131 4.93129 14.8161 5.42829 14.2021 5.42829C13.5881 5.42829 13.0911 4.93129 13.0911 4.31829C13.0911 3.70329 13.5881 3.20629 14.2011 3.20629C14.8161 3.20629 15.3131 3.70329 15.3131 4.31729Z"

const YOUTUBE_WIDTH = 20.9701
const YOUTUBE_HEIGHT = 14.8031
const YOUTUBE_FRAME_PATH =
  "M20.65 2.35308C20.35 1.35308 19.65 0.653083 18.75 0.453083C17.55 -0.0469171 5.75 -0.246917 2.35 0.453083C1.35 0.753083 0.65 1.45308 0.45 2.35308C-0.15 4.75308 -0.15 9.95308 0.45 12.4531C0.65 13.3531 1.35 14.0531 2.15 14.3531C4.55 14.9531 15.95 14.9531 18.55 14.3531C19.55 14.0531 20.25 13.3531 20.45 12.4531C21.05 9.85308 21.15 4.95308 20.65 2.35308ZM8.41 10.5531V4.35308L13.81 7.45308L8.41 10.5531Z"
const YOUTUBE_PLAY_PATH =
  "M8.41016 10.5516L13.8102 7.45156L8.41016 4.35156V10.5516Z"

const currentYear = () => new Date().getFullYear()

function FooterLogo() {
  return (
    <svg
      className="umc-footer__logo"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      viewBox={`0 0 ${LOGO_WIDTH} ${LOGO_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={LOGO_U_PATH} fill="currentColor" />
      <path d={LOGO_M_PATH} fill="currentColor" />
      <path d={LOGO_C_PATH} fill="currentColor" />
    </svg>
  )
}

function FooterGlow() {
  const filterId = useId()

  return (
    <svg
      className="umc-footer__glow"
      width={GLOW_WIDTH}
      height={GLOW_HEIGHT}
      viewBox={`0 0 ${GLOW_WIDTH} ${GLOW_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={filterId}
          x={GLOW_FILTER_ORIGIN}
          y={GLOW_FILTER_ORIGIN}
          width={GLOW_WIDTH}
          height={GLOW_HEIGHT}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation={GLOW_BLUR} />
        </filter>
      </defs>
      <path
        className="umc-footer__glow-stroke"
        d={GLOW_PATH}
        strokeWidth={GLOW_STROKE_WIDTH}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
      />
    </svg>
  )
}

function SocialGlyph({ platform }: { platform: FooterSocialPlatform }) {
  switch (platform) {
    case "facebook":
      return (
        <svg
          className="umc-footer__social-glyph"
          width={FACEBOOK_WIDTH}
          height={FACEBOOK_HEIGHT}
          viewBox={`0 0 ${FACEBOOK_WIDTH} ${FACEBOOK_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d={FACEBOOK_PATH}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      )
    case "instagram":
      return (
        <svg
          className="umc-footer__social-glyph"
          width={INSTAGRAM_SIZE}
          height={INSTAGRAM_SIZE}
          viewBox={`0 0 ${INSTAGRAM_SIZE} ${INSTAGRAM_SIZE}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d={INSTAGRAM_FRAME_PATH}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
          />
          <path
            d={INSTAGRAM_LENS_PATH}
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      )
    case "youtube":
      return (
        <svg
          className="umc-footer__social-glyph"
          width={YOUTUBE_WIDTH}
          height={YOUTUBE_HEIGHT}
          viewBox={`0 0 ${YOUTUBE_WIDTH} ${YOUTUBE_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={YOUTUBE_FRAME_PATH} fill="currentColor" />
          <path className="umc-footer__social-play" d={YOUTUBE_PLAY_PATH} />
        </svg>
      )
  }
}

function FooterBrand({ title }: { title: ReactNode }) {
  return (
    <div className="umc-footer__brand">
      <FooterLogo />
      <p className="umc-footer__title">{title}</p>
    </div>
  )
}

function FooterCopyright({ copyright }: { copyright: ReactNode }) {
  return (
    <p className="umc-footer__copyright" suppressHydrationWarning>
      {copyright}
    </p>
  )
}

function FooterColumnList({ column }: { column: FooterColumn }) {
  const Link = useLinkComponent()
  const titleId = useId()

  return (
    <div className="umc-footer__column">
      <p id={titleId} className="umc-footer__column-title">
        {column.title}
      </p>
      <ul className="umc-footer__items" aria-labelledby={titleId}>
        {column.items.map((item, index) => (
          <li key={index} className="umc-footer__item">
            {item.href ? (
              <Link href={item.href} className="umc-footer__link">
                {item.label}
              </Link>
            ) : (
              <span className="umc-footer__text">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterColumns({ columns }: { columns: FooterColumn[] }) {
  if (columns.length === 0) return null

  return (
    <nav className="umc-footer__columns" aria-label="푸터 메뉴">
      {columns.map((column, index) => (
        <FooterColumnList key={index} column={column} />
      ))}
    </nav>
  )
}

function FooterSocial({ socialLinks }: { socialLinks: FooterSocialLink[] }) {
  const Link = useLinkComponent()

  if (socialLinks.length === 0) return null

  return (
    <ul className="umc-footer__social" aria-label="소셜 미디어">
      {socialLinks.map((socialLink, index) => (
        <li
          key={`${socialLink.platform}-${index}`}
          className="umc-footer__social-item"
        >
          <Link href={socialLink.href} className="umc-footer__social-link">
            <SocialGlyph platform={socialLink.platform} />
            <span className="umc-visually-hidden">
              {socialLink.label ?? SOCIAL_LABELS[socialLink.platform]}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function HeroContent({
  columns,
  socialLinks,
  title,
  copyright,
}: FooterContentProps) {
  return (
    <>
      <FooterColumns columns={columns} />
      <div className="umc-footer__hero-identity">
        <FooterBrand title={title} />
        <div className="umc-footer__hero-meta">
          <FooterCopyright copyright={copyright} />
          <FooterSocial socialLinks={socialLinks} />
        </div>
      </div>
    </>
  )
}

function DefaultContent({
  columns,
  socialLinks,
  title,
  copyright,
}: FooterContentProps) {
  return (
    <>
      <div className="umc-footer__default-top">
        <div className="umc-footer__default-identity">
          <FooterBrand title={title} />
          <FooterCopyright copyright={copyright} />
        </div>
        <FooterSocial socialLinks={socialLinks} />
      </div>
      <FooterColumns columns={columns} />
    </>
  )
}

export function Footer({
  variant = "default",
  mode = "light",
  columns = [],
  socialLinks = [],
  title = DEFAULT_TITLE,
  copyright = `© ${currentYear()} UMC Product All rights reserved.`,
  className,
  ...props
}: FooterProps) {
  const content = { columns, socialLinks, title, copyright }

  return (
    <footer
      {...props}
      className={cx("umc-footer", className)}
      data-variant={variant}
      data-mode={mode}
    >
      {mode === "dark" && <FooterGlow />}
      <div className="umc-footer__content">
        {variant === "hero" ? (
          <HeroContent {...content} />
        ) : (
          <DefaultContent {...content} />
        )}
      </div>
    </footer>
  )
}
