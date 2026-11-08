"use client"

import { useId, type ComponentPropsWithRef, type ReactNode } from "react"

import { cx } from "../../internal/cx.ts"

export type ErrorPageContainerProps = Omit<
  ComponentPropsWithRef<"div">,
  "title"
> & {
  title: ReactNode
  body?: ReactNode
  actions?: ReactNode
}

const ILLUSTRATION_WIDTH = 192
const ILLUSTRATION_HEIGHT = 180
const CONE_BODY_PATH =
  "M89.6203 13.7925L26.623 161.08H164.416L101.419 13.7925C99.1988 8.60182 91.8405 8.60183 89.6203 13.7925Z"
const CONE_STRIPES_PATH =
  "M164.416 161.083H26.623L35.6787 139.91H155.36L164.416 161.083ZM142.397 109.604H48.6416L63.0244 75.9757H128.015L142.397 109.604ZM89.6201 13.795C91.8404 8.60474 99.1986 8.60478 101.419 13.795L115.052 45.669H75.9873L89.6201 13.795Z"
const CONE_SHADE_PATH =
  "M94.6924 9.95436C97.3443 9.62021 100.181 10.9012 101.419 13.7962L164.416 161.083H26.623L28.4854 156.729H94.6924V9.95436Z"
const CONE_SHEEN_OPACITY = 0.2
const CONE_SHADE_OPACITY = 0.2

function UnderConstructionIllustration() {
  const sheenId = useId()

  return (
    <svg
      className="umc-error-page-container__illustration"
      width={ILLUSTRATION_WIDTH}
      height={ILLUSTRATION_HEIGHT}
      viewBox={`0 0 ${ILLUSTRATION_WIDTH} ${ILLUSTRATION_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={sheenId}
          x1="63.5151"
          y1="37.5683"
          x2="165.182"
          y2="178.031"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="umc-error-page-container__cone-sheen-start" />
          <stop
            offset="0.653846"
            className="umc-error-page-container__cone-sheen-middle"
          />
          <stop
            offset="1"
            className="umc-error-page-container__cone-sheen-end"
          />
        </linearGradient>
      </defs>
      <path
        className="umc-error-page-container__cone-body"
        d={CONE_BODY_PATH}
      />
      <path
        d={CONE_BODY_PATH}
        fill={`url(#${sheenId})`}
        fillOpacity={CONE_SHEEN_OPACITY}
      />
      <rect
        className="umc-error-page-container__cone-stripe"
        y="160.937"
        width={ILLUSTRATION_WIDTH}
        height="19.0626"
        rx="9.53129"
      />
      <path
        className="umc-error-page-container__cone-stripe"
        d={CONE_STRIPES_PATH}
      />
      <path
        className="umc-error-page-container__cone-shade"
        d={CONE_SHADE_PATH}
        fillOpacity={CONE_SHADE_OPACITY}
      />
    </svg>
  )
}

export function ErrorPageContainer({
  title,
  body,
  actions,
  className,
  ...props
}: ErrorPageContainerProps) {
  return (
    <div {...props} className={cx("umc-error-page-container", className)}>
      <UnderConstructionIllustration />
      <div className="umc-error-page-container__text">
        <h1 className="umc-error-page-container__title">{title}</h1>
        {body !== undefined && (
          <p className="umc-error-page-container__body">{body}</p>
        )}
      </div>
      {actions !== undefined && (
        <div className="umc-error-page-container__actions">{actions}</div>
      )}
    </div>
  )
}
