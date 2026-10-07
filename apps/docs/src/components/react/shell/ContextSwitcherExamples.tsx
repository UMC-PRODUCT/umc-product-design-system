"use client"

import { ContextSwitcher, type ContextSwitcherOption } from "@umc-product/react"
import { useState } from "react"

import { LegacyCheckGlyph } from "../../../../../../packages/react/src/internal/glyphs.tsx"
import { ForceState } from "../variants/VariantCells.tsx"
import type { FigmaVariant } from "../variants/figma-variants.ts"
import { VariantGrid } from "../variants/VariantGrid.tsx"

type View = "challenger" | "chapter" | "central"

const VIEWS: ContextSwitcherOption<View>[] = [
  { value: "challenger", label: "챌린저 뷰" },
  { value: "chapter", label: "지부 운영진 뷰" },
  { value: "central", label: "중앙 운영진 뷰" },
]

export function ContextSwitcherDefault() {
  const [view, setView] = useState<View>("chapter")
  return (
    <div className="umc-example umc-example-stack">
      <div data-spec-id="context-switcher-trigger context-switcher-trigger-icon context-switcher-trigger-hover context-switcher-popup context-switcher-option context-switcher-option-checked">
        <ContextSwitcher options={VIEWS} value={view} onValueChange={setView} />
      </div>
      <p className="m-0 text-sm">현재 맥락: {view}</p>
    </div>
  )
}

const ignoreViewChange = () => {}
const CURRENT_VIEW: View = "chapter"

function ContextSwitcherPopupPreview() {
  return (
    <div className="umc-context-switcher__popup mt-1 w-[172px]">
      {VIEWS.map((view) => {
        const checked = view.value === CURRENT_VIEW
        return (
          <div
            key={view.value}
            className="umc-context-switcher__option"
            data-checked={checked ? "" : undefined}
            data-unchecked={checked ? undefined : ""}
          >
            <span className="umc-context-switcher__option-label">
              {view.label}
            </span>
            {checked && (
              <span className="umc-context-switcher__option-indicator">
                <LegacyCheckGlyph />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ContextSwitcherVariantCell({ variant }: { variant: FigmaVariant }) {
  const state = variant.props["State"]
  return (
    <div>
      <ForceState
        states={state === "Hover & Pressed" ? ["hover", "active"] : []}
      >
        <ContextSwitcher
          options={VIEWS}
          value={CURRENT_VIEW}
          onValueChange={ignoreViewChange}
        />
      </ForceState>
      {state === "Selected" && <ContextSwitcherPopupPreview />}
    </div>
  )
}

export function ContextSwitcherAllVariants() {
  return (
    <VariantGrid
      set="context-switcher"
      rows={[]}
      columns={["State"]}
      order={{ State: ["Default", "Hover & Pressed", "Selected"] }}
      render={(variant) => <ContextSwitcherVariantCell variant={variant} />}
    />
  )
}
