"use client"

import { useRef, useState, type KeyboardEvent } from "react"

type RovingItemProps = {
  ref: (element: HTMLElement | null) => void
  tabIndex: number
  onFocus: () => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

const stepOf = (key: string, index: number, last: number) => {
  if (key === "ArrowRight" || key === "ArrowDown")
    return Math.min(index + 1, last)
  if (key === "ArrowLeft" || key === "ArrowUp") return Math.max(index - 1, 0)
  if (key === "Home") return 0
  if (key === "End") return last
  return undefined
}

export function useRovingFocus(count: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsRef = useRef<(HTMLElement | null)[]>([])
  const last = Math.max(count - 1, 0)
  const tabbableIndex = Math.min(activeIndex, last)

  return (index: number): RovingItemProps => ({
    ref: (element) => {
      itemsRef.current[index] = element
    },
    tabIndex: index === tabbableIndex ? 0 : -1,
    onFocus: () => setActiveIndex(index),
    onKeyDown: (event) => {
      const hasShortcutModifier = event.altKey || event.ctrlKey || event.metaKey
      if (hasShortcutModifier) return
      const next = stepOf(event.key, index, last)
      if (next === undefined) return
      event.preventDefault()
      setActiveIndex(next)
      itemsRef.current[next]?.focus()
    },
  })
}
