"use client"

import { cx } from "../../internal/cx.ts"
import { useLinkComponent } from "../link-provider/LinkProvider.tsx"
import {
  UmcLogoLockup,
  type UmcLogoLockupContextProps,
} from "../umc-logo-lockup/UmcLogoLockup.tsx"

export type HeaderHomeLinkProps = UmcLogoLockupContextProps & {
  href?: string
  className?: string
}

const lockupOf = (props: UmcLogoLockupContextProps) =>
  props.context === "operation" || props.context === "study" ? (
    <UmcLogoLockup context={props.context} generation={props.generation} />
  ) : (
    <UmcLogoLockup context={props.context} />
  )

export function HeaderHomeLink(props: HeaderHomeLinkProps) {
  const Link = useLinkComponent()

  return (
    <Link
      href={props.href ?? "/"}
      className={cx("umc-header-home-link", props.className)}
    >
      {lockupOf(props)}
    </Link>
  )
}
