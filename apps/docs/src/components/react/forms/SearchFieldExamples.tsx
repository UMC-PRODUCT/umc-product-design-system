"use client"

import { SearchField } from "@umc-product/react"

import { ForceState, type ForcedState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function SearchFieldDefault() {
  return (
    <div className="umc-example umc-example-stack">
      <div
        className="w-full max-w-[456px]"
        data-spec-id="search-field search-field-input search-field-icon"
      >
        <SearchField placeholder="프로젝트 이름으로 검색하세요" />
      </div>
      <div className="w-full max-w-[456px]" data-spec-id="search-field-clear">
        <SearchField defaultValue="UMC 프로덕트" />
      </div>
    </div>
  )
}

export function SearchFieldDropdown() {
  return (
    <div className="umc-example">
      <div
        className="w-[140px]"
        data-spec-id="search-field-dropdown search-field-dropdown-hover search-field-dropdown-icon"
      >
        <SearchField variant="dropdown" placeholder="검색" />
      </div>
      <div className="w-[140px]" data-spec-id="search-field-dropdown-typing">
        <SearchField variant="dropdown" defaultValue="검색" />
      </div>
    </div>
  )
}

const FORCED_SEARCH_STATES: Readonly<Record<string, readonly ForcedState[]>> = {
  Hover: ["hover"],
  Typing: ["focus-within"],
}

function SearchFieldVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"] ?? ""
  const isDropdown = variant.props["Type"] === "with Dropdown List"
  return (
    <div className={isDropdown ? "w-[140px]" : "w-[320px]"}>
      <ForceState states={FORCED_SEARCH_STATES[state] ?? []}>
        <SearchField
          variant={isDropdown ? "dropdown" : "default"}
          placeholder={isDropdown ? "검색" : "프로젝트 이름으로 검색하세요"}
          defaultValue={
            state === "Typing"
              ? isDropdown
                ? "웹"
                : "UMC 프로덕트"
              : undefined
          }
        />
      </ForceState>
    </div>
  )
}

export function SearchFieldAllVariants() {
  return (
    <VariantGrid
      set="search-field"
      rows={["State"]}
      columns={["Type"]}
      order={{ State: ["Default", "Hover", "Typing"] }}
      render={(variant) => <SearchFieldVariantCell variant={variant} />}
    />
  )
}
