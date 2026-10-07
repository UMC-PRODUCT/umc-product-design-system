"use client"

import { UmcLogo } from "@umc-product/icons"

import { cx } from "../../internal/cx.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"

type GenerationContext = "operation" | "study"

type HeaderHomeLinkContextProps =
  | { context?: "main" | "product-tech"; generation?: never }
  | { context: GenerationContext; generation: number }

export type HeaderHomeLinkProps = HeaderHomeLinkContextProps & {
  href?: string
  className?: string
}

type HomeLinkLabel = { title: string; subtitle?: string }

const GENERATION_CONTEXT_TITLES: Readonly<Record<GenerationContext, string>> = {
  operation: "Operation",
  study: "Study",
}

const ORDINAL_SUFFIXES: Readonly<Record<Intl.LDMLPluralRule, string>> = {
  zero: "th",
  one: "st",
  two: "nd",
  few: "rd",
  many: "th",
  other: "th",
}

const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" })

const LABELED_LOGO_HEIGHT = 21.9287

const ordinalOf = (value: number) =>
  `${value}${ORDINAL_SUFFIXES[ordinalRules.select(value)]}`

const isGeneration = (value: number) => Number.isInteger(value) && value > 0

const labelOf = (
  props: HeaderHomeLinkContextProps,
): HomeLinkLabel | undefined => {
  switch (props.context) {
    case "operation":
    case "study":
      return {
        title: GENERATION_CONTEXT_TITLES[props.context],
        subtitle: isGeneration(props.generation)
          ? ordinalOf(props.generation)
          : undefined,
      }
    case "product-tech":
      return { title: "Product", subtitle: "Tech" }
    default:
      return undefined
  }
}

export function HeaderHomeLink(props: HeaderHomeLinkProps) {
  const Link = useLinkComponent()
  const label = labelOf(props)

  return (
    <Link
      href={props.href ?? "/"}
      className={cx("umc-header-home-link", props.className)}
    >
      <span className="umc-header-home-link__body">
        <UmcLogo
          className="umc-header-home-link__logo"
          aria-label="UMC"
          height={label ? LABELED_LOGO_HEIGHT : undefined}
        />
        {label && (
          <>
            {" "}
            <span className="umc-header-home-link__label">
              <span className="umc-header-home-link__title">{label.title}</span>
              {label.subtitle && (
                <>
                  {" "}
                  <span className="umc-header-home-link__subtitle">
                    {label.subtitle}
                  </span>
                </>
              )}
            </span>
          </>
        )}
      </span>
    </Link>
  )
}
