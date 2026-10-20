import { Pagination } from "@umc-product/react"

import { ForceState, NotImplemented } from "./variants/VariantCells.tsx"
import { lookup, type FigmaVariant } from "./variants/figma-variants.ts"
import { VariantGrid } from "./variants/VariantGrid.tsx"

const FIGMA_TOTAL_PAGES = 4

export function PaginationPositions() {
  return (
    <div className="umc-example umc-example-stack">
      <Pagination
        totalPages={FIGMA_TOTAL_PAGES}
        page={1}
        data-spec-id="pagination-first pagination-first-pages pagination-item-selected pagination-item-number pagination-item-arrow pagination-item-arrow-icon"
      />
      <Pagination
        totalPages={FIGMA_TOTAL_PAGES}
        page={2}
        data-spec-id="pagination-middle"
      />
      <Pagination
        totalPages={FIGMA_TOTAL_PAGES}
        page={4}
        data-spec-id="pagination-last"
      />
    </div>
  )
}

export function PaginationGroups() {
  return (
    <div className="umc-example">
      <Pagination totalPages={10} defaultPage={4} />
    </div>
  )
}

const FIGMA_CURRENT_PAGES: Readonly<Record<string, number>> = {
  "First (첫 페이지)": 1,
  Middle: 2,
  "Last (마지막 페이지)": FIGMA_TOTAL_PAGES,
}

export function PaginationAllVariants() {
  return (
    <VariantGrid
      set="pagination"
      rows={["Current Page"]}
      columns={[]}
      render={(variant) => (
        <Pagination
          totalPages={FIGMA_TOTAL_PAGES}
          page={lookup(FIGMA_CURRENT_PAGES, variant, "Current Page")}
        />
      )}
    />
  )
}

type ItemPreview = { totalPages: number; page: number }

const ITEM_PREVIEWS: Readonly<Record<string, ItemPreview>> = {
  Number: { totalPages: 2, page: 1 },
  "Arrow-Left": { totalPages: 2, page: 2 },
  "Arrow-Right": { totalPages: 2, page: 1 },
}

const SELECTED_NUMBER_PREVIEW: ItemPreview = { totalPages: 1, page: 1 }

function PaginationItemCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  const type = variant.props["Type"]
  if (state === "Selected" && type !== "Number") {
    return <NotImplemented reason="화살표에는 선택 상태가 없습니다" />
  }
  const preview =
    state === "Selected"
      ? SELECTED_NUMBER_PREVIEW
      : lookup(ITEM_PREVIEWS, variant, "Type")
  return (
    <ForceState states={state === "Hover&Pressed" ? ["active"] : []}>
      <Pagination totalPages={preview.totalPages} page={preview.page} />
    </ForceState>
  )
}

export function PaginationItemAllVariants() {
  return (
    <VariantGrid
      set="pagination-item"
      rows={["Type"]}
      columns={["State"]}
      order={{
        Type: ["Number", "Arrow-Left", "Arrow-Right"],
        State: ["Unselected", "Hover&Pressed", "Selected"],
      }}
      render={(variant) => <PaginationItemCell variant={variant} />}
    />
  )
}
