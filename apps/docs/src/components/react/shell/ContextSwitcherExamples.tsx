"use client"

import { ContextSwitcher, type ContextSwitcherOption } from "@umc-product/react"
import { useState } from "react"

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
