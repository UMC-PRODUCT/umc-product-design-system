"use client"

import { useState } from "react"
import { Button, Dimmed } from "@umc-product/react"

export function DimmedStaticPreview() {
  return (
    <div className="umc-example" style={{ gap: "8px", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "var(--umc-color-fill-neutral-default)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--umc-color-dimmed-weak)",
          }}
          data-spec-id="dimmed-weak"
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "var(--umc-color-fill-neutral-default)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--umc-color-dimmed-medium)",
          }}
          data-spec-id="dimmed-medium"
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "var(--umc-color-fill-neutral-default)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--umc-color-dimmed-strong)",
          }}
          data-spec-id="dimmed-strong"
        />
      </div>
    </div>
  )
}

export function DimmedIntensities() {
  const [active, setActive] = useState<"weak" | "medium" | "strong" | null>(
    null,
  )

  return (
    <div className="umc-example" style={{ gap: "8px" }}>
      {(["weak", "medium", "strong"] as const).map((intensity) => (
        <Button
          key={intensity}
          size="sm"
          variant="weak"
          color="neutral"
          onClick={() => setActive(intensity)}
        >
          {intensity}
        </Button>
      ))}
      {active !== null && (
        <Dimmed
          intensity={active}
          onClick={() => setActive(null)}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  )
}
