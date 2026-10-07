"use client"

import { useState } from "react"

import { SegmentedControl, type SegmentedControlItem } from "@umc-product/react"

const VIEW_ITEMS: SegmentedControlItem[] = [
  {
    value: "list",
    label: "목록",
    "data-spec-id": "segmented-control-item-selected",
  },
  {
    value: "grid",
    label: "그리드",
    "data-spec-id": "segmented-control-item-unselected",
  },
  { value: "map", label: "지도" },
]

export function SegmentedControlBasic() {
  return (
    <div className="umc-example">
      <SegmentedControl
        items={VIEW_ITEMS}
        aria-label="보기 방식"
        defaultValue="list"
      />
    </div>
  )
}

export function SegmentedControlControlled() {
  const [view, setView] = useState<string>("list")

  return (
    <div
      className="umc-example"
      style={{ flexDirection: "column", gap: "12px" }}
    >
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
