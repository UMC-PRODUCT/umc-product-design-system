import { UmcLogo } from "@umc-product/icons"
import type { ComponentPropsWithRef } from "react"

import { cx } from "../../internal/cx.ts"

type GenerationContext = "operation" | "activity"

export type UmcLogoLockupContextProps =
  | { context?: "main" | "product-tech"; generation?: never }
  | { context: GenerationContext; generation: number }

export type UmcLogoLockupProps = UmcLogoLockupContextProps &
  Omit<ComponentPropsWithRef<"span">, "children" | "color">

type LockupLabel = { title: string; subtitle?: string }

const GENERATION_CONTEXT_TITLES: Readonly<Record<GenerationContext, string>> = {
  operation: "Operation",
  activity: "Activity",
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

const labelOf = (props: UmcLogoLockupContextProps): LockupLabel | undefined => {
  switch (props.context) {
    case "operation":
    case "activity":
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

export function UmcLogoLockup(props: UmcLogoLockupProps) {
  const { context, generation, className, ...spanProps } = props
  const label = labelOf(props)

  return (
    <span
      {...spanProps}
      className={cx("umc-logo-lockup", className)}
      data-context={context ?? "main"}
      data-labeled={label ? "" : undefined}
    >
      <UmcLogo
        className="umc-logo-lockup__logo"
        aria-label="UMC"
        height={label ? LABELED_LOGO_HEIGHT : undefined}
      />
      {label && (
        <>
          {" "}
          <span className="umc-logo-lockup__label">
            <span className="umc-logo-lockup__title">{label.title}</span>
            {label.subtitle && (
              <>
                {" "}
                <span className="umc-logo-lockup__subtitle">
                  {label.subtitle}
                </span>
              </>
            )}
          </span>
        </>
      )}
    </span>
  )
}
