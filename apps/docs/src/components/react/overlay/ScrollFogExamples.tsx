"use client"

import { ScrollFog } from "@umc-product/react"

const ITEMS = Array.from({ length: 12 }, (_, i) => `항목 ${i + 1}`)

export function ScrollFogHorizontal() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "8px",
          scrollbarWidth: "none",
        }}
      >
        {ITEMS.map((item) => (
          <div
            key={item}
            style={{
              flexShrink: 0,
              padding: "8px 16px",
              background: "var(--umc-color-fill-neutral-default)",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <ScrollFog
        side="right"
        style={{ width: "80px" }}
        data-spec-id="scroll-fog-right"
      />
      <ScrollFog side="left" style={{ width: "80px" }} />
    </div>
  )
}

export function ScrollFogVertical() {
  return (
    <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
          height: "100%",
          padding: "8px",
          scrollbarWidth: "none",
        }}
      >
        {ITEMS.map((item) => (
          <div
            key={item}
            style={{
              padding: "8px 16px",
              background: "var(--umc-color-fill-neutral-default)",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <ScrollFog
        side="bottom"
        style={{ height: "60px" }}
        data-spec-id="scroll-fog-bottom"
      />
    </div>
  )
}
