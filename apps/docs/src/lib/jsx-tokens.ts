export type JsxTokenKind =
  | "plain"
  | "punctuation"
  | "component"
  | "tag"
  | "attribute"
  | "string"
  | "number"
  | "keyword"
  | "property"
  | "bracket"

export type JsxToken = {
  kind: JsxTokenKind
  text: string
  depth?: number
}

type Mode = "children" | "tag" | "expression"

const WHITESPACE = /\s+/y
const TAG_NAME = /[A-Za-z][\w.]*/y
const ATTRIBUTE_NAME = /[A-Za-z_$][\w$:.-]*/y
const QUOTED_ATTRIBUTE = /"[^"]*"|'[^']*'/y
const JSON_STRING = /"(?:[^"\\]|\\.)*"/y
const NUMBER = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?n?/iy
const IDENTIFIER = /[A-Za-z_$][\w$-]*/y
const PROPERTY_KEY_END = /\s*:/y
const ELEMENT_START = /<(?=[A-Za-z>])/y
const CHILD_TEXT = /[^<{]+/y
const COMPONENT_NAME = /^[A-Z]/
const KEYWORDS = new Set(["true", "false", "null", "undefined"])
const OPENING_BRACKETS = new Set(["{", "["])
const CLOSING_BRACKETS = new Set(["}", "]"])

export const tokenizeJsx = (code: string): JsxToken[] => {
  const tokens: JsxToken[] = []
  const modes: Mode[] = ["children"]
  let index = 0
  let depth = 0

  const matchAt = (pattern: RegExp) => {
    pattern.lastIndex = index
    return pattern.exec(code)?.[0]
  }

  const emit = (kind: JsxTokenKind, text: string) => {
    tokens.push({ kind, text })
    index += text.length
  }

  const openBracket = (bracket: string) => {
    tokens.push({ kind: "bracket", text: bracket, depth })
    depth += 1
    index += bracket.length
    modes.push("expression")
  }

  const closeBracket = (bracket: string) => {
    depth = Math.max(0, depth - 1)
    tokens.push({ kind: "bracket", text: bracket, depth })
    index += bracket.length
    if (modes.length > 1) modes.pop()
  }

  const emitTagName = () => {
    const name = matchAt(TAG_NAME)
    if (name) emit(COMPONENT_NAME.test(name) ? "component" : "tag", name)
  }

  const openElement = () => {
    emit("punctuation", "<")
    emitTagName()
    modes.push("tag")
  }

  const closeElement = () => {
    emit("punctuation", "</")
    emitTagName()
    if (code.startsWith(">", index)) emit("punctuation", ">")
    if (modes.length > 1) modes.pop()
  }

  const identifierKind = (identifier: string): JsxTokenKind => {
    if (KEYWORDS.has(identifier)) return "keyword"
    PROPERTY_KEY_END.lastIndex = index + identifier.length
    return PROPERTY_KEY_END.test(code) ? "property" : "plain"
  }

  const readChildren = () => {
    if (code.startsWith("</", index)) return closeElement()
    ELEMENT_START.lastIndex = index
    if (ELEMENT_START.test(code)) return openElement()
    if (code.startsWith("{", index)) return openBracket("{")
    emit("plain", matchAt(CHILD_TEXT) ?? code.charAt(index))
  }

  const readTag = () => {
    const space = matchAt(WHITESPACE)
    if (space) return emit("plain", space)
    if (code.startsWith("/>", index)) {
      emit("punctuation", "/>")
      modes.pop()
      return
    }
    if (code.startsWith(">", index)) {
      emit("punctuation", ">")
      modes[modes.length - 1] = "children"
      return
    }
    if (code.startsWith("{", index)) return openBracket("{")
    const quoted = matchAt(QUOTED_ATTRIBUTE)
    if (quoted) return emit("string", quoted)
    const name = matchAt(ATTRIBUTE_NAME)
    if (name) return emit("attribute", name)
    emit("plain", code.charAt(index))
  }

  const readExpression = () => {
    const space = matchAt(WHITESPACE)
    if (space) return emit("plain", space)
    const char = code.charAt(index)
    if (OPENING_BRACKETS.has(char)) return openBracket(char)
    if (CLOSING_BRACKETS.has(char)) return closeBracket(char)
    ELEMENT_START.lastIndex = index
    if (ELEMENT_START.test(code)) return openElement()
    const string = matchAt(JSON_STRING)
    if (string) return emit("string", string)
    const number = matchAt(NUMBER)
    if (number) return emit("number", number)
    const identifier = matchAt(IDENTIFIER)
    if (identifier) return emit(identifierKind(identifier), identifier)
    emit("plain", char)
  }

  const readers: Record<Mode, () => void> = {
    children: readChildren,
    tag: readTag,
    expression: readExpression,
  }

  while (index < code.length) {
    readers[modes.at(-1) ?? "children"]()
  }
  return tokens
}
