"use client"

import { useState } from "react"
import { ContextSwitcher, type ContextSwitcherOption } from "@umc-product/react"

const options: ContextSwitcherOption<string>[] = [
  { label: "10기", value: "10" },
  { label: "11기", value: "11" },
  { label: "12기", value: "12" },
]

const probeStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  top: 0,
}

export function ContextSwitcherDefault() {
  const [value, setValue] = useState("10")
  return (
    <>
      <div className="umc-example">
        <div data-spec-id="context-switcher-default">
          <ContextSwitcher
            options={options}
            value={value}
            onValueChange={setValue}
          />
        </div>
      </div>
      <div
        className="umc-context-switcher__popup"
        data-spec-id="context-switcher-selected"
        style={probeStyle}
      />
    </>
  )
}
