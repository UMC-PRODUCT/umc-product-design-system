"use client"

import { useState } from "react"
import { Button, Dimmed } from "@umc-product/react"

import { lookup } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

export function DimmedStaticPreview() {
  return (
    <div className="umc-example" style={{ gap: "8px", alignItems: "center" }}>
      {(["weak", "medium", "strong"] as const).map((intensity) => (
        <div
          key={intensity}
          style={{
            position: "relative",
            width: "80px",
            height: "80px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--umc-color-fill-neutral-default)",
          }}
        >
          <Dimmed
            intensity={intensity}
            className="absolute inset-0"
            data-spec-id={`dimmed-${intensity}`}
          />
        </div>
      ))}
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

const DIMMED_INTENSITIES = {
  Weak: "weak",
  Medium: "medium",
  Strong: "strong",
} as const

export function DimmedAllVariants() {
  return (
    <VariantGrid
      set="dimmed"
      rows={[]}
      columns={["Intensity"]}
      order={{ Intensity: ["Weak", "Medium", "Strong"] }}
      render={(variant) => (
        <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-[var(--umc-color-fill-neutral-default)]">
          <Dimmed
            intensity={lookup(DIMMED_INTENSITIES, variant, "Intensity")}
            className="absolute inset-0"
          />
        </div>
      )}
    />
  )
}
