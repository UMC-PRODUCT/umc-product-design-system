import {
  COMPONENT_CODE_ATTRIBUTE,
  componentCodeOf,
  isDocumentedComponent,
} from "../lib/component-code.ts"

type Fiber = {
  type: unknown
  memoizedProps: unknown
  stateNode: unknown
  return: Fiber | null
  child: Fiber | null
  sibling: Fiber | null
}

type CodeTarget = {
  anchor: Element
  code: string
}

type Tip = {
  root: HTMLElement
  caption: HTMLElement
  code: HTMLElement
}

const CONTENT_ROOT = ".sl-markdown-content"
const VARIANT_CELL = ".umc-variant-grid td[data-figma-variant]"
const CODE_SELECTOR = `[${COMPONENT_CODE_ATTRIBUTE}]`
const FIBER_KEY_PREFIX = "__reactFiber$"
const MAX_CODE_LINES = 24
const SHOW_DELAY_MS = 150
const GAP_PX = 8
const VIEWPORT_MARGIN_PX = 12

const isFiber = (value: unknown): value is Fiber =>
  typeof value === "object" &&
  value !== null &&
  "type" in value &&
  "return" in value &&
  "child" in value

const fiberOf = (node: Element): Fiber | undefined => {
  const key = Object.keys(node).find((name) =>
    name.startsWith(FIBER_KEY_PREFIX),
  )
  const value: unknown = key ? Reflect.get(node, key) : undefined
  return isFiber(value) ? value : undefined
}

const hostNodeOf = (first: Fiber | null): Element | undefined => {
  for (let fiber = first; fiber; fiber = fiber.sibling) {
    if (fiber.stateNode instanceof Element) return fiber.stateNode
    const nested = hostNodeOf(fiber.child)
    if (nested) return nested
  }
  return undefined
}

const codeOfFiber = (fiber: Fiber) =>
  componentCodeOf(fiber.type, fiber.memoizedProps)

const fiberCodeTarget = (target: Element): CodeTarget | undefined => {
  let found: { fiber: Fiber; anchor: Element } | undefined
  for (let fiber = fiberOf(target) ?? null; fiber; fiber = fiber.return) {
    if (!isDocumentedComponent(fiber.type)) continue
    const anchor = hostNodeOf(fiber.child)
    if (anchor?.contains(target)) found = { fiber, anchor }
  }
  const code = found ? codeOfFiber(found.fiber) : undefined
  return found && code ? { anchor: found.anchor, code } : undefined
}

const attributeCodeTarget = (target: Element): CodeTarget | undefined => {
  let found: CodeTarget | undefined
  for (let node: Element | null = target; node; node = node.parentElement) {
    const code = node.getAttribute(COMPONENT_CODE_ATTRIBUTE)
    if (code) found = { anchor: node, code }
  }
  return found
}

const topLevelFiberCodes = (first: Fiber | null): string[] => {
  const codes: string[] = []
  for (let fiber = first; fiber; fiber = fiber.sibling) {
    const code = isDocumentedComponent(fiber.type)
      ? codeOfFiber(fiber)
      : undefined
    codes.push(...(code ? [code] : topLevelFiberCodes(fiber.child)))
  }
  return codes
}

const topLevelAttributeCodes = (cell: Element) =>
  [...cell.querySelectorAll(CODE_SELECTOR)]
    .filter((element) => !element.parentElement?.closest(CODE_SELECTOR))
    .map((element) => element.getAttribute(COMPONENT_CODE_ATTRIBUTE) ?? "")
    .filter((code) => code !== "")

const cellCodeTarget = (cell: Element): CodeTarget | undefined => {
  const fiberCodes = topLevelFiberCodes(fiberOf(cell)?.child ?? null)
  const codes =
    fiberCodes.length > 0 ? fiberCodes : topLevelAttributeCodes(cell)
  return codes.length > 0 ? { anchor: cell, code: codes.join("\n") } : undefined
}

const codeTargetOf = (target: Element): CodeTarget | undefined => {
  if (!target.closest(CONTENT_ROOT)) return undefined
  const component = fiberCodeTarget(target) ?? attributeCodeTarget(target)
  if (component) return component
  const cell = target.closest(VARIANT_CELL)
  return cell ? cellCodeTarget(cell) : undefined
}

const clampLines = (code: string) => {
  const lines = code.split("\n")
  if (lines.length <= MAX_CODE_LINES) return code
  return [...lines.slice(0, MAX_CODE_LINES - 1), "…"].join("\n")
}

const createTip = (): Tip => {
  const root = document.createElement("div")
  root.className = "docs-code-tip"
  root.setAttribute("aria-hidden", "true")
  root.hidden = true
  const caption = document.createElement("p")
  caption.className = "docs-code-tip__caption"
  const code = document.createElement("pre")
  code.className = "docs-code-tip__code"
  root.append(caption, code)
  document.body.append(root)
  return { root, caption, code }
}

const place = (tip: HTMLElement, anchor: Element) => {
  const rect = anchor.getBoundingClientRect()
  const { width, height } = tip.getBoundingClientRect()
  const { clientWidth, clientHeight } = document.documentElement
  const fitsBelow =
    rect.bottom + GAP_PX + height + VIEWPORT_MARGIN_PX <= clientHeight
  const top = fitsBelow
    ? rect.bottom + GAP_PX
    : Math.max(VIEWPORT_MARGIN_PX, rect.top - GAP_PX - height)
  const maxLeft = clientWidth - width - VIEWPORT_MARGIN_PX
  const left = Math.max(VIEWPORT_MARGIN_PX, Math.min(rect.left, maxLeft))
  tip.style.top = `${top}px`
  tip.style.left = `${left}px`
}

export const applyCodeTooltips = () => {
  const tip = createTip()
  let anchor: Element | undefined
  let dismissed: Element | undefined
  let timer: number | undefined

  const hide = () => {
    window.clearTimeout(timer)
    anchor = undefined
    tip.root.hidden = true
  }

  const dismiss = () => {
    dismissed = anchor
    hide()
  }

  const show = (target: CodeTarget, caption: string) => {
    if (!target.anchor.isConnected) return
    tip.caption.textContent = caption
    tip.caption.hidden = caption === ""
    tip.code.textContent = clampLines(target.code)
    tip.root.hidden = false
    place(tip.root, target.anchor)
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || !(event.target instanceof Element)) {
      return
    }
    const next = codeTargetOf(event.target)
    if (next?.anchor === anchor) return
    hide()
    if (!next) {
      dismissed = undefined
      return
    }
    if (next.anchor === dismissed) return
    dismissed = undefined
    anchor = next.anchor
    const caption =
      event.target.closest(VARIANT_CELL)?.getAttribute("data-figma-variant") ??
      ""
    timer = window.setTimeout(() => show(next, caption), SHOW_DELAY_MS)
  })

  document.addEventListener("pointerout", (event) => {
    if (event.relatedTarget === null) hide()
  })
  document.addEventListener("pointerdown", dismiss, { capture: true })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dismiss()
  })
  document.addEventListener("scroll", hide, { capture: true, passive: true })
  window.addEventListener("resize", hide)
}
