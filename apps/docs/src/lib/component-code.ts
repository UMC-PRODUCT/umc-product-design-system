import { COMPONENT_CODE_ATTRIBUTE } from "./component-code-attribute.ts"

export const CODE_PLACEHOLDER = Symbol("code placeholder")

export type CodeProps<P> = {
  [K in keyof P]?: P[K] | typeof CODE_PLACEHOLDER
}

type ElementLike = {
  type: unknown
  props: Record<string, unknown>
}

type CodeAttribute = { [COMPONENT_CODE_ATTRIBUTE]?: string }

const LINE_LIMIT = 72
const MAX_DEPTH = 8
const INDENT = "  "
const OMITTED_CODE = "…"
const OMITTED_PROPS = new Set(["children", "key", "ref"])
const DOCS_ONLY_PROP = /^data-/
const APP_SETUP_COMPONENT = /Provider$/
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/
const HTML_ENTITY = /&#?\w+;/
const UNSAFE_JSX_TEXT = /[{}<>]/
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

const tagNameOf = (type: unknown) => {
  if (type === REACT_FRAGMENT) return ""
  if (typeof type === "string") return type
  return componentNames.get(type)
}

type Trail = ReadonlySet<object>

const enter = (trail: Trail, value: object) => new Set(trail).add(value)

type ListBrackets = { open: string; close: string; padding: string }

const ARRAY_BRACKETS: ListBrackets = { open: "[", close: "]", padding: "" }
const OBJECT_BRACKETS: ListBrackets = { open: "{", close: "}", padding: " " }

const listCode = ({ open, close, padding }: ListBrackets, items: string[]) => {
  const inline = `${open}${padding}${items.join(", ")}${padding}${close}`
  if (inline.length <= LINE_LIMIT && !items.some(isMultiline)) return inline
  return `${open}\n${items.map((item) => `${indent(item)},`).join("\n")}\n${close}`
}

const propertyKeyCode = (key: string) =>
  IDENTIFIER.test(key) ? key : JSON.stringify(key)

function valueCode(value: unknown, trail: Trail): string {
  if (typeof value === "string") return JSON.stringify(value)
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  if (typeof value === "bigint") return `${value}n`
  if (value === null) return "null"
  if (!isRecord(value) || trail.has(value) || trail.size >= MAX_DEPTH) {
    return OMITTED_CODE
  }
  const nested = enter(trail, value)
  if (isElement(value)) return elementCode(value.type, value.props, nested)
  if (Array.isArray(value)) {
    return listCode(
      ARRAY_BRACKETS,
      value.map((item) => valueCode(item, nested)),
    )
  }
  if (!isPlainObject(value)) return OMITTED_CODE
  const entries = Object.entries(value)
    .filter(([, entry]) => entry !== undefined)
    .map(
      ([key, entry]) => `${propertyKeyCode(key)}: ${valueCode(entry, nested)}`,
    )
  return entries.length === 0 ? "{}" : listCode(OBJECT_BRACKETS, entries)
}

const quotedAttributeValue = (value: string) => {
  if (value.includes("\n") || HTML_ENTITY.test(value)) return undefined
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
        value !== undefined,
    )
    .map(([key, value]) => attributeCode(key, value, trail))

const textCode = (text: string) =>
  UNSAFE_JSX_TEXT.test(text) || HTML_ENTITY.test(text)
    ? `{${JSON.stringify(text)}}`
    : text

function childrenOf(children: unknown, trail: Trail): string[] {
  if (Array.isArray(children)) {
    return children.flatMap((child) => childrenOf(child, trail))
  }
  if (typeof children === "string" || typeof children === "number") {
    const text = String(children).replace(/\s+/g, " ").trim()
    return text ? [textCode(text)] : []
  }
  if (typeof children === "function" || children === CODE_PLACEHOLDER) {
    return [OMITTED_CODE]
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
  const name = tagNameOf(type)
  if (name === undefined) return OMITTED_CODE
  const attributes = attributesOf(props, trail)
  const children = childrenOf(props.children, trail)
  if (name === "" && children.length === 0) return "<></>"
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

const codeOfElement = (type: unknown, props: Record<string, unknown>) =>
  elementCode(type, props, new Set([props]))

export const componentCodeOf = <P>(
  component: (props: P) => unknown,
  props: CodeProps<P>,
) => {
  if (!componentNames.has(component)) {
    throw new Error(
      `${component.name} 컴포넌트가 등록되지 않았습니다. 미리보기 파일에서 @umc-product/react나 @umc-product/icons를 직접 import하세요.`,
    )
  }
  const record: unknown = props
  return isRecord(record) ? codeOfElement(component, record) : OMITTED_CODE
}

export const callCodeOf = (callee: string, argument: unknown) =>
  `${callee}(${valueCode(argument, new Set())})`

export const codeAttributeOf = (code: string): CodeAttribute => ({
  [COMPONENT_CODE_ATTRIBUTE]: code,
})

export const withCodeAttribute = (type: unknown, props: unknown): unknown => {
  const name = componentNames.get(type)
  if (!name || APP_SETUP_COMPONENT.test(name) || !isRecord(props)) return props
  return { ...props, [COMPONENT_CODE_ATTRIBUTE]: codeOfElement(type, props) }
}
