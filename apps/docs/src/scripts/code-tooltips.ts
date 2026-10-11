import {
  COMPONENT_CODE_ATTRIBUTE,
  componentCodeOf,
  isDocumentedComponent,
} from "../lib/component-code.ts"
import { tokenizeJsx, type JsxToken } from "../lib/jsx-tokens.ts"

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
  code: HTMLElement
  copy: HTMLButtonElement
}

const CONTENT_ROOT = ".sl-markdown-content"
const VARIANT_CELL = ".umc-variant-grid td[data-figma-variant]"
const CODE_SELECTOR = `[${COMPONENT_CODE_ATTRIBUTE}]`
const FIBER_KEY_PREFIX = "__reactFiber$"
const SHOW_DELAY_MS = 150
const HIDE_DELAY_MS = 250
const COPY_FEEDBACK_MS = 1500
const GAP_PX = 8
const VIEWPORT_MARGIN_PX = 12
const BRACKET_COLOR_COUNT = 3
const COPY_LABEL = "복사"
const COPIED_LABEL = "복사됨"
const COPY_FAILED_LABEL = "복사 실패"

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

const tokenNodeOf = (token: JsxToken) => {
  if (token.kind === "plain") return document.createTextNode(token.text)
  const span = document.createElement("span")
  span.dataset.token = token.kind
  if (token.depth !== undefined) {
    span.dataset.depth = String(token.depth % BRACKET_COLOR_COUNT)
  }
  span.textContent = token.text
  return span
}

const createTip = (): Tip => {
  const root = document.createElement("div")
  root.className = "docs-code-tip"
  root.setAttribute("aria-hidden", "true")
  root.hidden = true
  const header = document.createElement("div")
  header.className = "docs-code-tip__header"
  const copy = document.createElement("button")
  copy.type = "button"
  copy.tabIndex = -1
  copy.className = "docs-code-tip__copy"
  copy.textContent = COPY_LABEL
  header.append(copy)
  const code = document.createElement("pre")
  code.className = "docs-code-tip__code"
  root.append(header, code)
  document.body.append(root)
  return { root, code, copy }
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
  let shown: CodeTarget | undefined
  let pending: CodeTarget | undefined
  let dismissed: Element | undefined
  let pressedInTip = false
  let showTimer: number | undefined
  let hideTimer: number | undefined
  let copyTimer: number | undefined

  const isInTip = (target: EventTarget | null) =>
    target instanceof Node && tip.root.contains(target)

  const keepShown = () => {
    window.clearTimeout(showTimer)
    window.clearTimeout(hideTimer)
    pending = undefined
  }

  const hide = () => {
    keepShown()
    shown = undefined
    tip.root.hidden = true
  }

  const dismiss = () => {
    dismissed = shown?.anchor ?? pending?.anchor
    hide()
  }

  const resetCopyLabel = () => {
    window.clearTimeout(copyTimer)
    tip.copy.textContent = COPY_LABEL
  }

  const showCopyResult = (label: string) => {
    window.clearTimeout(copyTimer)
    tip.copy.textContent = label
    copyTimer = window.setTimeout(resetCopyLabel, COPY_FEEDBACK_MS)
  }

  const copyShownCode = async () => {
    const code = shown?.code
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      showCopyResult(COPIED_LABEL)
    } catch {
      showCopyResult(COPY_FAILED_LABEL)
    }
  }

  const show = (target: CodeTarget) => {
    pending = undefined
    if (!target.anchor.isConnected) return hide()
    shown = target
    resetCopyLabel()
    tip.code.replaceChildren(...tokenizeJsx(target.code).map(tokenNodeOf))
    tip.root.hidden = false
    tip.code.scrollTo(0, 0)
    place(tip.root, target.anchor)
  }

  const scheduleShow = (target: CodeTarget) => {
    window.clearTimeout(showTimer)
    window.clearTimeout(hideTimer)
    pending = target
    showTimer = window.setTimeout(() => show(target), SHOW_DELAY_MS)
  }

  const scheduleHide = () => {
    window.clearTimeout(showTimer)
    pending = undefined
    if (!shown) return
    window.clearTimeout(hideTimer)
    hideTimer = window.setTimeout(hide, HIDE_DELAY_MS)
  }

  const release = () => {
    pressedInTip = false
  }

  tip.copy.addEventListener("mousedown", (event) => event.preventDefault())
  tip.copy.addEventListener("click", () => {
    void copyShownCode()
  })

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || pressedInTip) return
    if (isInTip(event.target)) return keepShown()
    if (!(event.target instanceof Element)) return
    const next = codeTargetOf(event.target)
    if (!next) {
      dismissed = undefined
      return scheduleHide()
    }
    if (next.anchor === shown?.anchor) return keepShown()
    if (next.anchor === pending?.anchor || next.anchor === dismissed) return
    dismissed = undefined
    scheduleShow(next)
  })

  document.addEventListener("pointerout", (event) => {
    if (event.relatedTarget === null && !pressedInTip) scheduleHide()
  })
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (isInTip(event.target)) {
        pressedInTip = true
        return
      }
      dismiss()
    },
    { capture: true },
  )
  document.addEventListener("pointerup", release, { capture: true })
  document.addEventListener("pointercancel", release, { capture: true })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dismiss()
  })
  document.addEventListener(
    "scroll",
    (event) => {
      if (!isInTip(event.target)) hide()
    },
    { capture: true, passive: true },
  )
  window.addEventListener("resize", hide)
}
