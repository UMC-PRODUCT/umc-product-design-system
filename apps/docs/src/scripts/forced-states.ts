const FORCED_STATES = [
  { state: "hover", pattern: /:hover(?![-\w])/g },
  { state: "active", pattern: /:active(?![-\w])/g },
  { state: "focus-visible", pattern: /:focus-visible(?![-\w])/g },
  { state: "focus-within", pattern: /:focus-within(?![-\w])/g },
  { state: "focus", pattern: /:focus(?![-\w])/g },
  { state: "popup-open", pattern: /\[data-popup-open\]/g },
  { state: "highlighted", pattern: /\[data-highlighted\]/g },
] as const

const COMPONENT_SELECTOR = /\.umc-/

const OPENING_BRACKETS = new Set(["(", "["])
const CLOSING_BRACKETS = new Set([")", "]"])

const splitSelectorList = (selectorText: string): string[] => {
  const selectors: string[] = []
  let depth = 0
  let start = 0
  for (let index = 0; index < selectorText.length; index += 1) {
    const char = selectorText.charAt(index)
    if (OPENING_BRACKETS.has(char)) depth += 1
    if (CLOSING_BRACKETS.has(char)) depth -= 1
    if (char === "," && depth === 0) {
      selectors.push(selectorText.slice(start, index).trim())
      start = index + 1
    }
  }
  selectors.push(selectorText.slice(start).trim())
  return selectors
}

const forcedSelectorsOf = (selector: string): string[] =>
  FORCED_STATES.filter(({ pattern }) => selector.search(pattern) !== -1)
    .map(
      ({ state, pattern }) =>
        `[data-force-state~="${state}"] ${selector.replace(pattern, "")}`,
    )
    .filter((forced) => CSS.supports(`selector(${forced})`))

const rulesOf = (container: CSSStyleSheet | CSSGroupingRule) => {
  try {
    return container.cssRules
  } catch {
    return null
  }
}

const cloneForcedRules = (container: CSSStyleSheet | CSSGroupingRule) => {
  const rules = rulesOf(container)
  if (!rules) return
  for (let index = rules.length - 1; index >= 0; index -= 1) {
    const rule = rules[index]
    if (rule instanceof CSSStyleRule) {
      if (!COMPONENT_SELECTOR.test(rule.selectorText)) continue
      for (const selector of splitSelectorList(rule.selectorText).flatMap(
        forcedSelectorsOf,
      )) {
        container.insertRule(`${selector} { ${rule.style.cssText} }`, index + 1)
      }
    } else if (rule instanceof CSSGroupingRule) {
      cloneForcedRules(rule)
    } else if (rule instanceof CSSImportRule && rule.styleSheet) {
      cloneForcedRules(rule.styleSheet)
    }
  }
}

export const applyForcedStates = () => {
  for (const sheet of Array.from(document.styleSheets)) {
    cloneForcedRules(sheet)
  }
}
