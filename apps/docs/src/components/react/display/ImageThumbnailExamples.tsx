import { ImageThumbnail } from "@umc-product/react"

import { SAMPLE_IMAGE_SRC } from "../example-images.ts"
import { lookup, type FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

const SCHOOLS = [
  { name: "가람대학교", logo: SAMPLE_IMAGE_SRC },
  { name: "나래대학교", logo: null },
] as const

export function ImageThumbnailDefault() {
  return (
    <div className="umc-example">
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {SCHOOLS.map(({ name, logo }) => (
          <li key={name} className="m-0 flex items-center gap-3">
            <ImageThumbnail
              src={logo}
              alt={`${name} 로고`}
              data-spec-id={
                logo === null
                  ? "image-thumbnail-fallback"
                  : "image-thumbnail-default"
              }
            />
            <span className="text-body-1-medium text-neutral-strong-800">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SIZES = [50, 64, 80] as const

export function ImageThumbnailSizes() {
  return (
    <div className="umc-example umc-example-stack">
      <div className="flex items-end gap-4">
        {SIZES.map((size) => (
          <ImageThumbnail
            key={size}
            size={size}
            src={SAMPLE_IMAGE_SRC}
            alt="가람대학교 로고"
          />
        ))}
      </div>
      <div className="flex items-end gap-4">
        {SIZES.map((size) => (
          <ImageThumbnail key={size} size={size} alt="나래대학교 로고" />
        ))}
      </div>
    </div>
  )
}

const FIGMA_SIZES: Readonly<Record<string, number>> = { "50px": 50 }

const FIGMA_SOURCES: Readonly<Record<string, string>> = {
  Default: SAMPLE_IMAGE_SRC,
  Fallback: "",
}

export function ImageThumbnailAllVariants() {
  return (
    <VariantGrid
      set="image-thumbnail"
      rows={["Type"]}
      columns={["Size"]}
      order={{ Type: ["Default", "Fallback"] }}
      render={(variant: FigmaVariant) => (
        <ImageThumbnail
          size={lookup(FIGMA_SIZES, variant, "Size")}
          src={lookup(FIGMA_SOURCES, variant, "Type")}
          alt=""
        />
      )}
    />
  )
}
