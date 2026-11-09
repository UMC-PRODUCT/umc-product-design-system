"use client"

import { PaginationBar } from "@umc-product/react"
import { useState } from "react"

import { ForceState } from "./variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid, type CellTone } from "./variants/VariantGrid.tsx"

const FIGMA_TOTAL_PAGES = 9
const FIRST_PAGE = 1

const SPEC_IDS = [
  "pagination-bar",
  "pagination-bar-dots",
  "pagination-bar-dot-current",
  "pagination-bar-dot",
  "pagination-bar-arrow-next",
  "pagination-bar-arrow-previous-disabled",
  "pagination-bar-arrow-icon",
  "pagination-bar-pulse-ring",
].join(" ")

const deepTone = (): CellTone => "deep"

export function PaginationBarPreview() {
  return (
    <div className="umc-example docs-pagination-bar-scene">
      <div data-spec-id={SPEC_IDS}>
        <PaginationBar totalPages={FIGMA_TOTAL_PAGES} highlightNext />
      </div>
    </div>
  )
}

export function PaginationBarPositions() {
  return (
    <div className="umc-example docs-pagination-bar-scene docs-pagination-bar-scene--stack">
      <PaginationBar totalPages={4} page={1} />
      <PaginationBar totalPages={4} page={2} />
      <div data-spec-id="pagination-bar-arrow-previous-hover">
        <PaginationBar totalPages={4} page={4} />
      </div>
    </div>
  )
}

export function PaginationBarHighlightOnFirst() {
  const [page, setPage] = useState(FIRST_PAGE)
  return (
    <div className="umc-example docs-pagination-bar-scene">
      <PaginationBar
        totalPages={FIGMA_TOTAL_PAGES}
        page={page}
        onPageChange={setPage}
        highlightNext={page === FIRST_PAGE}
      />
    </div>
  )
}

const DOT_ROW_PAGES: Readonly<Record<string, number>> = {
  Default: 1,
  Variant2: 2,
  Variant3: 3,
  Variant4: 4,
  Variant5: 5,
  Variant6: 6,
  Variant7: 7,
  Variant8: 8,
  Variant9: 9,
}

export function PaginationBarDotRowAllVariants() {
  return (
    <VariantGrid
      set="pagination-bar-dots"
      rows={["Property 1"]}
      columns={[]}
      tone={deepTone}
      render={(variant) => (
        <PaginationBar
          totalPages={FIGMA_TOTAL_PAGES}
          page={lookup(DOT_ROW_PAGES, variant, "Property 1")}
        />
      )}
    />
  )
}

type DotPreview = { totalPages: number; page: number }

const DOT_PREVIEWS: Readonly<Record<string, DotPreview>> = {
  "Rectangle 17967": { totalPages: 1, page: 1 },
  "Ellipse 83": { totalPages: 2, page: 2 },
}

export function PaginationBarDotAllVariants() {
  return (
    <VariantGrid
      set="pagination-bar-dot"
      rows={["Property 1"]}
      columns={[]}
      tone={deepTone}
      render={(variant) => {
        const preview = lookup(DOT_PREVIEWS, variant, "Property 1")
        return (
          <PaginationBar totalPages={preview.totalPages} page={preview.page} />
        )
      }}
    />
  )
}

const ARROW_TYPES: Readonly<Record<string, "previous" | "next">> = {
  Left: "previous",
  Right: "next",
}

function PaginationBarArrowCell({ variant }: { variant: FigmaVariant }) {
  const direction = lookup(ARROW_TYPES, variant, "type")
  const hovered = variant.props["State"] === "Hover"
  const page =
    direction === "previous" && hovered ? FIGMA_TOTAL_PAGES : FIRST_PAGE
  return (
    <ForceState states={hovered ? ["hover"] : []}>
      <PaginationBar totalPages={FIGMA_TOTAL_PAGES} page={page} />
    </ForceState>
  )
}

export function PaginationBarArrowAllVariants() {
  return (
    <VariantGrid
      set="pagination-bar-arrow"
      rows={["type"]}
      columns={["State"]}
      order={{ type: ["Left", "Right"], State: ["Default", "Hover"] }}
      tone={deepTone}
      render={(variant) => <PaginationBarArrowCell variant={variant} />}
    />
  )
}
