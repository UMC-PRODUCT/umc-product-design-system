import { ScrollFog } from "@umc-product/react"

const ITEMS = Array.from({ length: 12 }, (_, index) => `항목 ${index + 1}`)

const itemStyle = {
  background: "var(--umc-color-fill-neutral-medium-100)",
}

export function ScrollFogHorizontal() {
  return (
    <div className="umc-example block p-0">
      <div className="relative overflow-hidden rounded-xl">
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
        <ScrollFog side="right" data-spec-id="scroll-fog-right" />
      </div>
    </div>
  )
}

export function ScrollFogVertical() {
  return (
    <div className="umc-example block p-0">
      <div className="relative h-60 overflow-hidden rounded-xl">
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
        <ScrollFog side="bottom" data-spec-id="scroll-fog-bottom" />
      </div>
    </div>
  )
}
