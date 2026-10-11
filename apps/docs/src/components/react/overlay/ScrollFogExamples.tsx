import { ScrollFog } from "@umc-product/react"

import {
  codeAttributeOf,
  componentCodeOf,
} from "../../../lib/component-code.ts"

const ITEMS = Array.from({ length: 12 }, (_, index) => `항목 ${index + 1}`)

const itemStyle = {
  background: "var(--umc-color-fill-neutral-medium-100)",
}

const HORIZONTAL_FOG = {
  side: "right",
  "data-spec-id": "scroll-fog-right",
} as const

const VERTICAL_FOG = {
  side: "bottom",
  "data-spec-id": "scroll-fog-bottom",
} as const

export function ScrollFogHorizontal() {
  return (
    <div className="umc-example block p-0">
      <div
        className="relative overflow-hidden rounded-xl"
        {...codeAttributeOf(componentCodeOf(ScrollFog, HORIZONTAL_FOG))}
      >
        <div className="flex gap-2 overflow-x-auto p-4">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="shrink-0 rounded-lg px-4 py-2 text-sm"
              style={itemStyle}
            >
              {item}
            </span>
          ))}
        </div>
        <ScrollFog {...HORIZONTAL_FOG} />
      </div>
    </div>
  )
}

export function ScrollFogVertical() {
  return (
    <div className="umc-example block p-0">
      <div
        className="relative h-60 overflow-hidden rounded-xl"
        {...codeAttributeOf(componentCodeOf(ScrollFog, VERTICAL_FOG))}
      >
        <div className="flex h-full flex-col gap-2 overflow-y-auto p-4">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-lg px-4 py-2 text-sm"
              style={itemStyle}
            >
              {item}
            </span>
          ))}
        </div>
        <ScrollFog {...VERTICAL_FOG} />
      </div>
    </div>
  )
}
