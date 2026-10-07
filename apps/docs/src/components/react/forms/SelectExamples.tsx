"use client"

import { Select } from "@umc-product/react"

const fruitOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나", caption: "달콤한 과일" },
  { value: "cherry", label: "체리", disabled: true },
]

const sizeOptions = [
  { value: "xs", label: "Extra Small" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
]

export function SelectDefault() {
  return (
    <div data-spec-id="select-lg-default">
      <Select
        label="과일 선택"
        options={fruitOptions}
        placeholder="선택하세요"
      />
    </div>
  )
}

export function SelectMd() {
  return (
    <div data-spec-id="select-md-default">
      <Select
        label="크기"
        options={sizeOptions}
        size="md"
        placeholder="선택하세요"
      />
    </div>
  )
}

export function SelectSearchable() {
  return (
    <Select
      label="검색 가능 선택"
      options={fruitOptions}
      searchable
      searchPlaceholder="과일 검색..."
      placeholder="선택하세요"
    />
  )
}

export function SelectItemSizes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        label="xs 항목"
        options={fruitOptions}
        itemSize="xs"
        placeholder="선택"
      />
      <Select
        label="sm 항목 (기본)"
        options={fruitOptions}
        itemSize="sm"
        placeholder="선택"
      />
      <Select
        label="md 항목"
        options={fruitOptions}
        itemSize="md"
        placeholder="선택"
      />
    </div>
  )
}

export function SelectInvalid() {
  return (
    <Select
      label="과일 선택"
      options={fruitOptions}
      invalid
      errorMessage="필수 선택 항목입니다"
      placeholder="선택하세요"
    />
  )
}

export function SelectWithCaption() {
  return (
    <Select
      label="카테고리"
      options={fruitOptions}
      caption="선택 항목은 나중에 변경할 수 있습니다"
      placeholder="선택하세요"
    />
  )
}

export function SelectPopupExample() {
  return (
    <div
      data-spec-id="select-popup"
      style={{ position: "relative", display: "inline-block" }}
    >
      <div className="umc-select__popup" style={{ position: "relative" }}>
        <div className="umc-select__item">사과</div>
        <div className="umc-select__item">바나나</div>
        <div className="umc-select__item">체리</div>
      </div>
    </div>
  )
}
