"use client"

import { useState } from "react"

import { SegmentedControl, type SegmentedControlItem } from "@umc-product/react"

const VIEW_ITEMS: SegmentedControlItem[] = [
  { value: "list", label: "목록" },
  { value: "grid", label: "그리드" },
  { value: "map", label: "지도" },
]

const CHAPTER_ITEMS: SegmentedControlItem[] = [
  { value: "regular", label: "정규 매칭" },
  { value: "extra", label: "추가 매칭" },
]

export function SegmentedControlBasic() {
  return (
    <div className="umc-example">
      <div
        className="w-full"
        data-spec-id="segmented-control-container segmented-control-item-selected segmented-control-item-unselected segmented-control-item-hover"
      >
        <SegmentedControl
          items={VIEW_ITEMS}
          aria-label="보기 방식"
          defaultValue="list"
        />
      </div>
    </div>
  )
}

export function SegmentedControlWidth() {
  return (
    <div className="umc-example">
      <SegmentedControl
        items={CHAPTER_ITEMS}
        aria-label="매칭 종류"
        defaultValue="regular"
        className="max-w-[734px]"
      />
    </div>
  )
}

export function SegmentedControlControlled() {
  const [view, setView] = useState<string>("list")

  return (
    <div className="umc-example umc-example-stack">
      <SegmentedControl
        items={VIEW_ITEMS}
        aria-label="보기 방식"
        value={view}
        onValueChange={setView}
      />
      <p>선택된 보기: {view}</p>
    </div>
  )
}
