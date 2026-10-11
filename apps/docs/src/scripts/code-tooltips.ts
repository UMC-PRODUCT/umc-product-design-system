import { COMPONENT_CODE_ATTRIBUTE } from "../lib/component-code-attribute.ts"
import { tokenizeJsx, type JsxToken } from "../lib/jsx-tokens.ts"

type Fiber = {
  memoizedProps: unknown
  stateNode: unknown
  return: Fiber | null
  child: Fiber | null
  sibling: Fiber | null
  alternate: Fiber | null
}

type CodeTarget = {
  anchor: Element
  code: string
}

type CopyButton = {
  element: HTMLButtonElement
  reset: () => void
}

type Tip = {
  root: HTMLElement
  code: HTMLElement
  copy: CopyButton
}

const CONTENT_ROOT = ".sl-markdown-content"
const VARIANT_CELL = ".umc-variant-grid td[data-figma-variant]"
const CODE_SELECTOR = `[${COMPONENT_CODE_ATTRIBUTE}]`
const FIBER_KEY_PREFIX = "__reactFiber$"
const PRIMARY_BUTTON = 0
const SHOW_DELAY_MS = 150
const HIDE_DELAY_MS = 250
const COPY_FEEDBACK_MS = 1500
const GAP_PX = 8
const VIEWPORT_MARGIN_PX = 12
const MIN_CODE_HEIGHT_PX = 96
const BRACKET_COLOR_COUNT = 3
const COPY_LABEL = "복사"
const COPIED_LABEL = "복사됨"
const COPY_FAILED_LABEL = "복사 실패"

const isFiber = (value: unknown): value is Fiber =>
  typeof value === "object" &&
  value !== null &&
  "return" in value &&
  "child" in value &&
  "alternate" in value

const isCurrentTree = (fiber: Fiber) => {
  let root = fiber
  while (root.return) root = root.return
  const container = root.stateNode
  return (
    typeof container === "object" &&
    container !== null &&
    "current" in container &&
    container.current === root
  )
}

const currentFiberOf = (fiber: Fiber) =>
  fiber.alternate && !isCurrentTree(fiber) ? fiber.alternate : fiber

const fiberOf = (node: Element): Fiber | undefined => {
  const key = Object.keys(node).find((name) =>
    name.startsWith(FIBER_KEY_PREFIX),
  )
  const value: unknown = key ? Reflect.get(node, key) : undefined
  return isFiber(value) ? currentFiberOf(value) : undefined
}

const hostNodeOf = (first: Fiber | null): Element | undefined => {
  for (let fiber = first; fiber; fiber = fiber.sibling) {
    if (fiber.stateNode instanceof Element) return fiber.stateNode
    const nested = hostNodeOf(fiber.child)
    if (nested) return nested
  }
  return undefined
}

const codeOfFiber = (fiber: Fiber) => {
  const props = fiber.memoizedProps
  if (typeof props !== "object" || props === null) return undefined
  const code: unknown = Reflect.get(props, COMPONENT_CODE_ATTRIBUTE)
  return typeof code === "string" && code !== "" ? code : undefined
}

const anchorOf = (fiber: Fiber) =>
  fiber.stateNode instanceof Element ? fiber.stateNode : hostNodeOf(fiber.child)

const fiberCodeTarget = (target: Element): CodeTarget | undefined => {
  let found: CodeTarget | undefined
  for (let fiber = fiberOf(target) ?? null; fiber; fiber = fiber.return) {
    const code = codeOfFiber(fiber)
    const anchor = code ? anchorOf(fiber) : undefined
    if (code && anchor?.contains(target)) found = { anchor, code }
  }
  return found
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
    const code = codeOfFiber(fiber)
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

const createCopyButton = (codeToCopy: () => string | undefined) => {
  const element = document.createElement("button")
  element.type = "button"
  element.tabIndex = -1
  element.className = "docs-code-tip__copy"
  element.textContent = COPY_LABEL
  let labelTimer: number | undefined

  const reset = () => {
    window.clearTimeout(labelTimer)
    element.textContent = COPY_LABEL
  }

  const showResult = (label: string) => {
    window.clearTimeout(labelTimer)
    element.textContent = label
    labelTimer = window.setTimeout(reset, COPY_FEEDBACK_MS)
  }

  const copy = async () => {
    const code = codeToCopy()
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      showResult(COPIED_LABEL)
    } catch {
      showResult(COPY_FAILED_LABEL)
    }
  }

  element.addEventListener("mousedown", (event) => event.preventDefault())
  element.addEventListener("click", () => {
    void copy()
  })
  return { element, reset }
}

const createTip = (codeToCopy: () => string | undefined): Tip => {
  const root = document.createElement("div")
  root.className = "docs-code-tip"
  root.setAttribute("aria-hidden", "true")
  root.hidden = true
  const header = document.createElement("div")
  header.className = "docs-code-tip__header"
  const copy = createCopyButton(codeToCopy)
  header.append(copy.element)
  const code = document.createElement("pre")
  code.className = "docs-code-tip__code"
  code.tabIndex = -1
  root.append(header, code)
  document.body.append(root)
  return { root, code, copy }
}

const fitCodeHeight = (tip: Tip, space: number) => {
  const tipHeight = tip.root.getBoundingClientRect().height
  const chromeHeight = tipHeight - tip.code.getBoundingClientRect().height
  const codeHeight = space - chromeHeight
  if (codeHeight >= MIN_CODE_HEIGHT_PX) {
    tip.code.style.maxHeight = `${codeHeight}px`
  }
}

const place = (tip: Tip, anchor: Element) => {
  tip.code.style.maxHeight = ""
  const rect = anchor.getBoundingClientRect()
  const { clientWidth, clientHeight } = document.documentElement
  const spaceBelow = clientHeight - rect.bottom - GAP_PX - VIEWPORT_MARGIN_PX
  const spaceAbove = rect.top - GAP_PX - VIEWPORT_MARGIN_PX
  const naturalHeight = tip.root.getBoundingClientRect().height
  const fitsBelow = naturalHeight <= spaceBelow
  const fitsAbove = naturalHeight <= spaceAbove
  const below = fitsBelow || (!fitsAbove && spaceBelow >= spaceAbove)
  if (!fitsBelow && !fitsAbove) {
    fitCodeHeight(tip, below ? spaceBelow : spaceAbove)
  }
  const { width, height } = tip.root.getBoundingClientRect()
  const preferredTop = below ? rect.bottom + GAP_PX : rect.top - GAP_PX - height
  const lowestTop = clientHeight - height - VIEWPORT_MARGIN_PX
  const top = Math.min(Math.max(VIEWPORT_MARGIN_PX, preferredTop), lowestTop)
  const rightmostLeft = clientWidth - width - VIEWPORT_MARGIN_PX
  const left = Math.max(VIEWPORT_MARGIN_PX, Math.min(rect.left, rightmostLeft))
  tip.root.style.top = `${top}px`
  tip.root.style.left = `${left}px`
}

export const applyCodeTooltips = () => {
  let shown: CodeTarget | undefined
  let pending: CodeTarget | undefined
  let dismissed: Element | undefined
  let pressedInTip = false
  let showTimer: number | undefined
  let hideTimer: number | undefined
  const tip = createTip(() => shown?.code)

  const isInTip = (target: EventTarget | null) =>
    target instanceof Node && tip.root.contains(target)

  const cancelPending = () => {
    window.clearTimeout(showTimer)
    window.clearTimeout(hideTimer)
    pending = undefined
  }

  const hide = () => {
    cancelPending()
    shown = undefined
    tip.root.hidden = true
  }

  const show = (target: CodeTarget) => {
    pending = undefined
    if (!target.anchor.isConnected) return hide()
    shown = target
    tip.copy.reset()
    tip.code.replaceChildren(...tokenizeJsx(target.code).map(tokenNodeOf))
    tip.root.hidden = false
    tip.code.scrollTo(0, 0)
    place(tip, target.anchor)
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

  const releasePress = () => {
    pressedInTip = false
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return
    if (event.buttons === 0) releasePress()
    if (pressedInTip) return
    if (isInTip(event.target)) return cancelPending()
    if (!(event.target instanceof Element)) return
    const next = codeTargetOf(event.target)
    if (!next) {
      dismissed = undefined
      return scheduleHide()
    }
    if (shown && next.anchor === shown.anchor) {
      cancelPending()
      if (next.code !== shown.code) show(next)
      return
    }
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
        pressedInTip = event.button === PRIMARY_BUTTON
        return
      }
      dismissed =
        event.target instanceof Element
          ? codeTargetOf(event.target)?.anchor
          : undefined
      hide()
    },
    { capture: true },
  )
  document.addEventListener("pointerup", releasePress, { capture: true })
  document.addEventListener("pointercancel", releasePress, { capture: true })
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return
    dismissed = shown?.anchor ?? pending?.anchor ?? dismissed
    hide()
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
