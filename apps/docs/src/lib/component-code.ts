export const COMPONENT_CODE_ATTRIBUTE = "data-docs-code"

type ElementLike = {
  type: unknown
  props: Record<string, unknown>
}

const LINE_LIMIT = 72
const MAX_DEPTH = 8
const INDENT = "  "
const OMITTED_PROPS = new Set(["children", "key", "ref"])
const DOCS_ONLY_PROP = /^data-/
const UNSAFE_JSX_TEXT = /[{}<>]/
const UNKNOWN_VALUE = "…"
const REACT_FRAGMENT = Symbol.for("react.fragment")

declare global {
  var __umcDocsComponentNames: Map<unknown, string> | undefined
}

const componentNames = (globalThis.__umcDocsComponentNames ??= new Map<
  unknown,
  string
>())

export const registerComponents = (components: Record<string, unknown>) => {
  for (const [name, component] of Object.entries(components)) {
    if (/^[A-Z]/.test(name) && typeof component === "function") {
      componentNames.set(component, name)
    }
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const isElement = (value: unknown): value is ElementLike =>
  isRecord(value) && "$$typeof" in value && "type" in value && "props" in value

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!isRecord(value)) return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

const isMultiline = (text: string) => text.includes("\n")

const indent = (text: string) =>
  text
    .split("\n")
    .map((line) => (line ? `${INDENT}${line}` : line))
    .join("\n")

const nameOf = (type: unknown) => {
  const registered = componentNames.get(type)
  if (registered) return registered
  if (typeof type === "string") return type
  if (typeof type === "function" && "displayName" in type) {
    const { displayName } = type
    if (typeof displayName === "string") return displayName
  }
  return "Component"
}

type Trail = ReadonlySet<object>

const enter = (trail: Trail, value: object) => new Set(trail).add(value)

const listCode = (open: string, close: string, items: string[]) => {
  const inline = `${open}${items.join(", ")}${close}`
  if (inline.length <= LINE_LIMIT && !items.some(isMultiline)) return inline
  return `${open}\n${items.map((item) => `${indent(item)},`).join("\n")}\n${close}`
}

function valueCode(value: unknown, trail: Trail): string {
  if (typeof value === "string") return JSON.stringify(value)
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value)
  }
  if (value === null) return "null"
  if (!isRecord(value) || trail.has(value) || trail.size >= MAX_DEPTH) {
    return UNKNOWN_VALUE
  }
  const nested = enter(trail, value)
  if (isElement(value)) return elementCode(value.type, value.props, nested)
  if (Array.isArray(value)) {
    return listCode(
      "[",
      "]",
      value.map((item) => valueCode(item, nested)),
    )
  }
  if (!isPlainObject(value)) return UNKNOWN_VALUE
  const entries = Object.entries(value)
    .filter(([, entry]) => entry !== undefined && typeof entry !== "function")
    .map(([key, entry]) => `${key}: ${valueCode(entry, nested)}`)
  return entries.length === 0 ? "{}" : listCode("{ ", " }", entries)
}

const quotedAttributeValue = (value: string) => {
  if (value.includes("\n")) return undefined
  if (!value.includes('"')) return `"${value}"`
  if (!value.includes("'")) return `'${value}'`
  return undefined
}

const attributeCode = (key: string, value: unknown, trail: Trail) => {
  if (value === true) return key
  const quoted =
    typeof value === "string" ? quotedAttributeValue(value) : undefined
  return quoted ? `${key}=${quoted}` : `${key}={${valueCode(value, trail)}}`
}

const attributesOf = (props: Record<string, unknown>, trail: Trail) =>
  Object.entries(props)
    .filter(
      ([key, value]) =>
        !OMITTED_PROPS.has(key) &&
        !DOCS_ONLY_PROP.test(key) &&
        value !== undefined &&
        value !== null &&
        typeof value !== "function",
    )
    .map(([key, value]) => attributeCode(key, value, trail))

const textCode = (text: string) =>
  UNSAFE_JSX_TEXT.test(text) ? `{${JSON.stringify(text)}}` : text

function childrenOf(children: unknown, trail: Trail): string[] {
  if (Array.isArray(children)) {
    return children.flatMap((child) => childrenOf(child, trail))
  }
  if (typeof children === "string" || typeof children === "number") {
    const text = String(children).replace(/\s+/g, " ").trim()
    return text ? [textCode(text)] : []
  }
  if (isElement(children) && !trail.has(children)) {
    return [elementCode(children.type, children.props, enter(trail, children))]
  }
  return []
}

function elementCode(
  type: unknown,
  props: Record<string, unknown>,
  trail: Trail,
): string {
  const name = type === REACT_FRAGMENT ? "" : nameOf(type)
  const attributes = attributesOf(props, trail)
  const children = childrenOf(props.children, trail)
  const inlineOpen = `<${name}${attributes.map((attribute) => ` ${attribute}`).join("")}`
  const breaksAttributes =
    inlineOpen.length > LINE_LIMIT || attributes.some(isMultiline)
  const open = breaksAttributes
    ? `<${name}\n${attributes.map(indent).join("\n")}\n`
    : inlineOpen
  if (children.length === 0) {
    return breaksAttributes ? `${open}/>` : `${open} />`
  }
  const close = `</${name}>`
  const [onlyChild] = children
  if (
    !breaksAttributes &&
    children.length === 1 &&
    onlyChild !== undefined &&
    !isMultiline(onlyChild)
  ) {
    const inline = `${open}>${onlyChild}${close}`
    if (inline.length <= LINE_LIMIT) return inline
  }
  return `${open}>\n${children.map(indent).join("\n")}\n${close}`
}

export const isDocumentedComponent = (type: unknown) => componentNames.has(type)

export const componentCodeOf = (type: unknown, props: unknown) =>
  isDocumentedComponent(type) && isRecord(props)
    ? elementCode(type, props, new Set([props]))
    : undefined

export const withComponentCode = (type: unknown, props: unknown): unknown => {
  const code = componentCodeOf(type, props)
  if (code === undefined || !isRecord(props)) return props
  return { ...props, [COMPONENT_CODE_ATTRIBUTE]: code }
}
