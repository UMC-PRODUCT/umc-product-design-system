import { toCssVariable, type TokenPath } from "../shared/naming.ts"
import { TYPOGRAPHY_PROPERTIES, typographyVariable } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"

const TAILWIND_SPACING_ALIASES = [
  { name: "grid-gutter", path: ["grid", "gutter"] },
  { name: "grid-margin-desktop", path: ["grid", "margin", "desktop"] },
  { name: "grid-margin-mobile", path: ["grid", "margin", "mobile"] },
  { name: "header", path: ["layout", "header", "height"] },
  { name: "sidebar", path: ["layout", "sidebar", "width"] },
] as const satisfies readonly { name: string; path: TokenPath }[]

export const COLOR_PROPERTY_UTILITIES = {
  text: [{ prefix: "text", property: "color" }],
  border: [
    { prefix: "border", property: "border-color" },
    { prefix: "border-x", property: "border-inline-color" },
    { prefix: "border-y", property: "border-block-color" },
    { prefix: "border-s", property: "border-inline-start-color" },
    { prefix: "border-e", property: "border-inline-end-color" },
    { prefix: "border-t", property: "border-top-color" },
    { prefix: "border-r", property: "border-right-color" },
    { prefix: "border-b", property: "border-bottom-color" },
    { prefix: "border-l", property: "border-left-color" },
  ],
} as const satisfies Record<
  string,
  readonly { prefix: string; property: string }[]
>

type PropertyColorGroup = keyof typeof COLOR_PROPERTY_UTILITIES

type SemanticGroupRule =
  | { kind: "property"; group: PropertyColorGroup }
  | { kind: "color"; utilityPrefix: string | null }

const SEMANTIC_GROUP_RULES: Readonly<Record<string, SemanticGroupRule>> = {
  text: { kind: "property", group: "text" },
  border: { kind: "property", group: "border" },
  icon: { kind: "color", utilityPrefix: "text" },
  background: { kind: "color", utilityPrefix: "bg" },
  surface: { kind: "color", utilityPrefix: "bg" },
  fill: { kind: "color", utilityPrefix: "bg" },
  dimmed: { kind: "color", utilityPrefix: "bg" },
  tag: { kind: "color", utilityPrefix: null },
}

type Utility = {
  name: string
  declarations: string[]
}

const pathKey = (path: TokenPath): string => path.join(".")

const nameAfterRoot = (path: TokenPath): string => path.slice(1).join("-")

const nameAfterGroup = (path: TokenPath): string => path.slice(2).join("-")

const semanticGroupRuleOf = (entry: ModelEntry): SemanticGroupRule => {
  const group = entry.path[1] ?? ""
  const rule = SEMANTIC_GROUP_RULES[group]
  if (rule === undefined) {
    throw new Error(
      `semantic 그룹 ${group}을 Tailwind로 내는 규칙이 없습니다. SEMANTIC_GROUP_RULES에 더하세요`,
    )
  }
  return rule
}

export const textStyleUtility = (path: TokenPath): string =>
  `text-${nameAfterRoot(path)}`

export const shadowUtility = (path: TokenPath): string =>
  `shadow-${nameAfterRoot(path)}`

export const tailwindNameOf = (entry: ModelEntry): string | null => {
  if (entry.file === "color.primitive.json" || entry.file === "shadow.json") {
    return nameAfterRoot(entry.path)
  }
  if (entry.file === "color.semantic.json") {
    return semanticGroupRuleOf(entry).kind === "property"
      ? null
      : nameAfterRoot(entry.path)
  }
  const spacingAlias = TAILWIND_SPACING_ALIASES.find(
    (alias) => pathKey(alias.path) === pathKey(entry.path),
  )
  return spacingAlias?.name ?? null
}

const semanticColorUtility = (entry: ModelEntry): string | null => {
  const rule = semanticGroupRuleOf(entry)
  if (rule.kind === "property") {
    const [primary] = COLOR_PROPERTY_UTILITIES[rule.group]
    return `${primary.prefix}-${nameAfterGroup(entry.path)}`
  }
  return rule.utilityPrefix === null
    ? null
    : `${rule.utilityPrefix}-${nameAfterRoot(entry.path)}`
}

export const tailwindUtilityOf = (entry: ModelEntry): string | null => {
  switch (entry.file) {
    case "typography.json":
      return textStyleUtility(entry.path)
    case "shadow.json":
      return shadowUtility(entry.path)
    case "color.semantic.json":
      return semanticColorUtility(entry)
    default:
      return null
  }
}

const colorPropertyRules = (entry: ModelEntry): Utility[] => {
  const rule = semanticGroupRuleOf(entry)
  if (rule.kind !== "property") {
    return []
  }
  return COLOR_PROPERTY_UTILITIES[rule.group].map(({ prefix, property }) => ({
    name: `${prefix}-${nameAfterGroup(entry.path)}`,
    declarations: [`${property}: var(${toCssVariable(entry.path)});`],
  }))
}

const textStyleRule = (entry: ModelEntry): Utility => ({
  name: textStyleUtility(entry.path),
  declarations: TYPOGRAPHY_PROPERTIES.map(
    ({ cssProperty }) =>
      `${cssProperty}: var(${typographyVariable(entry, cssProperty)});`,
  ),
})

const assertUniqueNames = (utilities: readonly Utility[]): void => {
  const duplicates = [
    ...Map.groupBy(utilities, (utility) => utility.name),
  ].filter(([, group]) => group.length > 1)
  if (duplicates.length > 0) {
    throw new Error(
      `같은 이름의 유틸리티가 있습니다: ${duplicates.map(([name]) => name).join(", ")}`,
    )
  }
}

const renderUtility = ({ name, declarations }: Utility): string =>
  [`@utility ${name} {`, ...declarations.map((line) => `  ${line}`), "}"].join(
    "\n",
  )

const renderThemeAliases = (
  entries: readonly ModelEntry[],
  file: ModelEntry["file"],
  namespace: string,
): string[] =>
  entries
    .filter((entry) => entry.file === file)
    .flatMap((entry) => {
      const name = tailwindNameOf(entry)
      return name === null
        ? []
        : [`  --${namespace}-${name}: var(${toCssVariable(entry.path)});`]
    })

const renderSpacingAliases = (entries: readonly ModelEntry[]): string[] => {
  const declaredPaths = new Set(entries.map((entry) => pathKey(entry.path)))
  return TAILWIND_SPACING_ALIASES.map(({ name, path }) => {
    if (!declaredPaths.has(pathKey(path))) {
      throw new Error(
        `Tailwind spacing 별칭 ${name}의 토큰 ${pathKey(path)}가 없습니다`,
      )
    }
    return `  --spacing-${name}: var(${toCssVariable(path)});`
  })
}

export const renderTailwindCss = (entries: readonly ModelEntry[]): string => {
  const themeSections = [
    ["  --color-*: initial;"],
    renderThemeAliases(entries, "color.primitive.json", "color"),
    renderThemeAliases(entries, "color.semantic.json", "color"),
    renderSpacingAliases(entries),
    renderThemeAliases(entries, "shadow.json", "shadow"),
  ].filter((lines) => lines.length > 0)
  const utilities = [
    ...entries
      .filter((entry) => entry.file === "color.semantic.json")
      .flatMap(colorPropertyRules),
    ...entries
      .filter((entry) => entry.file === "typography.json")
      .map(textStyleRule),
  ]
  assertUniqueNames(utilities)

  return [
    "@theme inline {",
    themeSections.map((lines) => lines.join("\n")).join("\n\n"),
    "}",
    "",
    utilities.map(renderUtility).join("\n\n"),
    "",
  ].join("\n")
}
