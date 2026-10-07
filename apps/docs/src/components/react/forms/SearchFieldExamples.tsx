"use client"

import { SearchField } from "@umc-product/react"

export function SearchFieldDefault() {
  return (
    <div data-spec-id="search-field-lg-default">
      <SearchField placeholder="검색어를 입력하세요" />
    </div>
  )
}

export function SearchFieldMd() {
  return <SearchField size="md" placeholder="검색" />
}

export function SearchFieldClearable() {
  return (
    <SearchField
      placeholder="입력하면 지우기 버튼이 나타납니다"
      defaultValue="검색어"
      clearable
    />
  )
}

export function SearchFieldNoClear() {
  return (
    <SearchField
      placeholder="항상 검색 아이콘 표시"
      defaultValue="검색어"
      clearable={false}
    />
  )
}
