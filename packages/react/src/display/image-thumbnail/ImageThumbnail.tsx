"use client"

import { UmcLogo } from "@umc-product/icons"
import { useState, type ComponentPropsWithRef, type CSSProperties } from "react"

import { cx } from "../../internal/cx.ts"

export type ImageThumbnailProps = Omit<
  ComponentPropsWithRef<"span">,
  "children"
> & {
  src?: string | null
  alt: string
  size?: number
}

type ImageThumbnailStyle = CSSProperties & {
  "--umc-image-thumbnail-size"?: string
}

export function ImageThumbnail({
  src,
  alt,
  size,
  className,
  style,
  ...props
}: ImageThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const imageSrc =
    src === null || src === undefined || src === "" || src === failedSrc
      ? undefined
      : src
  const showsFallback = imageSrc === undefined
  const namesFallback = showsFallback && alt !== ""
  const thumbnailStyle: ImageThumbnailStyle | undefined =
    size === undefined
      ? style
      : { ...style, "--umc-image-thumbnail-size": `${size}px` }

  return (
    <span
      {...props}
      className={cx("umc-image-thumbnail", className)}
      style={thumbnailStyle}
      role={namesFallback ? "img" : undefined}
      aria-label={namesFallback ? alt : undefined}
      data-fallback={showsFallback ? "" : undefined}
    >
      {showsFallback ? (
        <UmcLogo className="umc-image-thumbnail__logo" />
      ) : (
        <img
          className="umc-image-thumbnail__image"
          src={imageSrc}
          alt={alt}
          onError={() => setFailedSrc(imageSrc)}
        />
      )}
    </span>
  )
}
