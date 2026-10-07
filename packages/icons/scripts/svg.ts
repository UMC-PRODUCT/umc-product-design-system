export type SvgAttribute = readonly [name: string, value: string]

export type SvgNode = {
  name: string
  attributes: SvgAttribute[]
  style: SvgAttribute[]
  children: SvgNode[]
}

export type ColorReplacement = { attribute: string } | { style: string }

export type ColorMapper = (color: string) => ColorReplacement

export type TransformOptions = {
  idPrefix: string
  mapColor: ColorMapper
}

export type TransformResult = {
  viewBox: string
  width: number
  height: number
  children: SvgNode[]
  colors: string[]
}

const TAG_PATTERN =
  /<(\/?)([A-Za-z][\w:.-]*)((?:\s+[\w:.-]+="[^"]*")*)\s*(\/?)>/g
const ATTRIBUTE_PATTERN = /([\w:.-]+)="([^"]*)"/g
const UNSUPPORTED_PATTERN = /<!--|<!\[CDATA\[|<\?|<!DOCTYPE|<style\b|<script\b/i
const URL_REFERENCE_PATTERN = /url\(#([^)]+)\)/g
const COLOR_ATTRIBUTES = ["fill", "stroke", "stop-color", "flood-color"]
const DEFINITION_ELEMENTS = new Set(["clipPath", "mask"])
const FORBIDDEN_ATTRIBUTES = new Set(["style", "class"])
const DROPPED_ATTRIBUTES = new Set(["data-name"])
const KEPT_COLOR_VALUES = new Set(["none", "currentcolor"])
const NAMED_COLORS: Readonly<Record<string, string>> = {
  white: "#ffffff",
  black: "#000000",
}
const JSX_SAFE_VALUE = /^[^"\\{}<>&]*$/

const createNode = (name: string, attributes: SvgAttribute[]): SvgNode => ({
  name,
  attributes,
  style: [],
  children: [],
})

const assertWhitespace = (text: string) => {
  if (text.trim() !== "") {
    throw new Error(`태그 밖에 내용이 있습니다: ${text.trim().slice(0, 40)}`)
  }
}

export const parseSvg = (source: string): SvgNode => {
  if (UNSUPPORTED_PATTERN.test(source)) {
    throw new Error(
      "주석, style, script 같은 지원하지 않는 SVG 구문이 있습니다",
    )
  }

  const document = createNode("#document", [])
  const stack: SvgNode[] = [document]
  let cursor = 0

  for (const match of source.matchAll(TAG_PATTERN)) {
    assertWhitespace(source.slice(cursor, match.index))
    cursor = match.index + match[0].length
    const [, closing = "", name = "", rawAttributes = "", selfClosing = ""] =
      match
    const parent = stack.at(-1)
    if (!parent) {
      throw new Error(`여는 태그 없이 </${name}>가 나왔습니다`)
    }
    if (closing) {
      if (parent.name !== name) {
        throw new Error(`</${name}>가 <${parent.name}>와 짝이 맞지 않습니다`)
      }
      stack.pop()
      continue
    }
    const attributes = [...rawAttributes.matchAll(ATTRIBUTE_PATTERN)].map(
      ([, key = "", value = ""]): SvgAttribute => [key, value],
    )
    const node = createNode(name, attributes)
    parent.children.push(node)
    if (!selfClosing) {
      stack.push(node)
    }
  }

  assertWhitespace(source.slice(cursor))
  if (stack.length !== 1) {
    throw new Error("닫히지 않은 태그가 있습니다")
  }
  const [root] = document.children
  if (!root || root.name !== "svg" || document.children.length !== 1) {
    throw new Error("루트 요소가 svg 하나가 아닙니다")
  }
  return root
}

const attributeOf = (node: SvgNode, name: string): string | undefined =>
  node.attributes.find(([key]) => key === name)?.[1]

const referencedIds = (value: string): string[] =>
  [...value.matchAll(URL_REFERENCE_PATTERN)].map(([, id = ""]) => id)

const walk = (node: SvgNode): SvgNode[] => [
  node,
  ...node.children.flatMap(walk),
]

const parseViewBox = (svg: SvgNode) => {
  const viewBox = attributeOf(svg, "viewBox")
  const [, , width, height] = (viewBox ?? "").trim().split(/\s+/).map(Number)
  if (
    viewBox === undefined ||
    width === undefined ||
    height === undefined ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  ) {
    throw new Error(`viewBox를 읽지 못했습니다: ${viewBox ?? "(없음)"}`)
  }
  return { viewBox: viewBox.trim(), width, height }
}

const isFullCanvasRect = (node: SvgNode, width: number, height: number) =>
  node.name === "rect" &&
  ["x", "y"].every((name) =>
    ["0", undefined].includes(attributeOf(node, name)),
  ) &&
  Number(attributeOf(node, "width")) === width &&
  Number(attributeOf(node, "height")) === height &&
  attributeOf(node, "transform") === undefined

const fullCanvasClipIds = (
  svg: SvgNode,
  width: number,
  height: number,
): Set<string> =>
  new Set(
    walk(svg).flatMap((node) => {
      const [only] = node.children
      const id = attributeOf(node, "id")
      return node.name === "clipPath" &&
        node.children.length === 1 &&
        only !== undefined &&
        id !== undefined &&
        isFullCanvasRect(only, width, height)
        ? [id]
        : []
    }),
  )

const removeClips = (
  node: SvgNode,
  clipIds: ReadonlySet<string>,
): SvgNode[] => {
  if (node.name === "clipPath" && clipIds.has(attributeOf(node, "id") ?? "")) {
    return []
  }
  const children = node.children.flatMap((child) => removeClips(child, clipIds))
  if (node.name === "defs" && children.length === 0) {
    return []
  }
  const attributes = node.attributes.filter(
    ([name, value]) =>
      !(
        name === "clip-path" &&
        referencedIds(value).some((id) => clipIds.has(id))
      ),
  )
  return [{ ...node, attributes, children }]
}

const normalizeColor = (value: string): string => {
  const lower = value.trim().toLowerCase()
  const named = NAMED_COLORS[lower]
  if (named) {
    return named
  }
  return /^#[0-9a-f]{3}$/.test(lower)
    ? `#${[...lower.slice(1)].map((digit) => digit + digit).join("")}`
    : lower
}

const toCamelCase = (name: string): string =>
  name.replace(/[-:]([a-z])/g, (_, character: string) =>
    character.toUpperCase(),
  )

type RewriteContext = {
  idPrefix: string
  mapColor: ColorMapper
  keptIds: ReadonlySet<string>
  colors: string[]
}

const prefixReferences = (value: string, idPrefix: string): string =>
  value.replace(
    URL_REFERENCE_PATTERN,
    (_, id: string) => `url(#${idPrefix}-${id})`,
  )

const rewrite = (
  node: SvgNode,
  context: RewriteContext,
  insideDefinition: boolean,
): SvgNode[] => {
  const childContext = insideDefinition || DEFINITION_ELEMENTS.has(node.name)
  const children = node.children.flatMap((child) =>
    rewrite(child, context, childContext),
  )
  const attributes: SvgAttribute[] = []
  const style: SvgAttribute[] = []

  for (const [name, value] of node.attributes) {
    if (FORBIDDEN_ATTRIBUTES.has(name)) {
      throw new Error(`<${node.name}>에 지원하지 않는 ${name} 속성이 있습니다`)
    }
    if (DROPPED_ATTRIBUTES.has(name)) {
      continue
    }
    if (name === "id") {
      if (context.keptIds.has(value)) {
        attributes.push([name, `${context.idPrefix}-${value}`])
      }
      continue
    }
    if (name === "href" || name === "xlink:href") {
      attributes.push([name, value.replace(/^#/, `#${context.idPrefix}-`)])
      continue
    }
    const isColor = COLOR_ATTRIBUTES.includes(name)
    const color = normalizeColor(value)
    if (
      !isColor ||
      insideDefinition ||
      KEPT_COLOR_VALUES.has(color) ||
      color.startsWith("url(")
    ) {
      attributes.push([name, prefixReferences(value, context.idPrefix)])
      continue
    }
    if (!context.colors.includes(color)) {
      context.colors.push(color)
    }
    const replacement = context.mapColor(color)
    if ("attribute" in replacement) {
      attributes.push([name, replacement.attribute])
    } else {
      style.push([toCamelCase(name), replacement.style])
    }
  }

  if (node.name === "g" && attributes.length === 0 && style.length === 0) {
    return children
  }
  return [{ ...node, attributes, style, children }]
}

export const transformSvg = (
  svg: SvgNode,
  { idPrefix, mapColor }: TransformOptions,
): TransformResult => {
  const { viewBox, width, height } = parseViewBox(svg)
  const clipIds = fullCanvasClipIds(svg, width, height)
  const cleaned = svg.children.flatMap((child) => removeClips(child, clipIds))
  const keptIds = new Set(
    cleaned
      .flatMap(walk)
      .flatMap((node) =>
        node.attributes.flatMap(([name, value]) =>
          name === "href" || name === "xlink:href"
            ? [value.replace(/^#/, "")]
            : referencedIds(value),
        ),
      ),
  )
  const context: RewriteContext = { idPrefix, mapColor, keptIds, colors: [] }
  const children = cleaned.flatMap((child) => rewrite(child, context, false))
  return { viewBox, width, height, children, colors: context.colors }
}

const renderAttribute = ([name, value]: SvgAttribute): string =>
  JSX_SAFE_VALUE.test(value)
    ? `${toCamelCase(name)}="${value}"`
    : `${toCamelCase(name)}={${JSON.stringify(value)}}`

const renderStyle = (style: readonly SvgAttribute[]): string =>
  `style={{ ${style.map(([property, value]) => `${property}: ${JSON.stringify(value)}`).join(", ")} }}`

const renderNode = (node: SvgNode): string => {
  const parts = [
    ...node.attributes.map(renderAttribute),
    ...(node.style.length > 0 ? [renderStyle(node.style)] : []),
  ]
  const open = `<${node.name}${parts.length > 0 ? ` ${parts.join(" ")}` : ""}`
  return node.children.length === 0
    ? `${open} />`
    : `${open}>${node.children.map(renderNode).join("")}</${node.name}>`
}

export const renderJsx = (nodes: readonly SvgNode[]): string => {
  const rendered = nodes.map(renderNode)
  const [first] = rendered
  if (first === undefined) {
    throw new Error("그릴 요소가 없습니다")
  }
  return rendered.length === 1 ? first : `<>${rendered.join("")}</>`
}
