"use client"

import { SearchField } from "@umc-product/react"

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
