"use client"

import { useState } from "react"
import { ContextSwitcher, type ContextSwitcherOption } from "@umc-product/react/shell"

const options: ContextSwitcherOption<string>[] = [
  { label: "10기", value: "10" },
  { label: "11기", value: "11" },
  { label: "12기", value: "12" },
]

export function ContextSwitcherDefault() {
  const [value, setValue] = useState("10")
  return (
    <div className="umc-example">
      <ContextSwitcher options={options} value={value} onValueChange={setValue} />
    </div>
  )
}
