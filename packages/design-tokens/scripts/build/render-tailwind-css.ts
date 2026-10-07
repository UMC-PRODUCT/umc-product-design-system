import { toCssVariable, type TokenPath } from "../shared/naming.ts"
import { TYPOGRAPHY_PROPERTIES, typographyVariable } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"

const TEXT_GROUP_ALIAS = "fg"

export const TAILWIND_SPACING_ALIASES = [
  { name: "grid-gutter", path: ["grid", "gutter"] },
  { name: "grid-margin-desktop", path: ["grid", "margin", "desktop"] },
  { name: "grid-margin-mobile", path: ["grid", "margin", "mobile"] },
  { name: "header", path: ["layout", "header", "height"] },
  { name: "sidebar", path: ["layout", "sidebar", "width"] },
] as const satisfies readonly { name: string; path: TokenPath }[]

export const tailwindColorName = (path: TokenPath): string => {
  const [, group, ...rest] = path
  return [group === "text" ? TEXT_GROUP_ALIAS : group, ...rest].join("-")
}

export const textStyleUtility = (path: TokenPath): string =>
  `text-${path.slice(1).join("-")}`

const renderSpacingAliases = (entries: readonly ModelEntry[]): string[] => {
  const declaredPaths = new Set(entries.map((entry) => entry.path.join(".")))
  return TAILWIND_SPACING_ALIASES.map(({ name, path }) => {
    if (!declaredPaths.has(path.join("."))) {
      throw new Error(
        `Tailwind spacing 별칭 ${name}의 토큰 ${path.join(".")}가 없습니다`,
      )
    }
    return `  --spacing-${name}: var(${toCssVariable(path)});`
  })
}

const renderTextStyleUtility = (entry: ModelEntry): string =>
  [
    `@utility ${textStyleUtility(entry.path)} {`,
    ...TYPOGRAPHY_PROPERTIES.map(
      ({ cssProperty }) =>
        `  ${cssProperty}: var(${typographyVariable(entry, cssProperty)});`,
    ),
    "}",
  ].join("\n")

export const renderTailwindCss = (entries: readonly ModelEntry[]): string => {
  const colorAliases = entries
    .filter((entry) => entry.file === "color.semantic.json")
    .map(
      (entry) =>
        `  --color-${tailwindColorName(entry.path)}: var(${toCssVariable(entry.path)});`,
    )
  const themeSections = [colorAliases, renderSpacingAliases(entries)].filter(
    (lines) => lines.length > 0,
  )
  const utilities = entries
    .filter((entry) => entry.file === "typography.json")
    .map(renderTextStyleUtility)

  return [
    "@theme inline {",
    themeSections.map((lines) => lines.join("\n")).join("\n\n"),
    "}",
    "",
    utilities.join("\n\n"),
    "",
  ].join("\n")
}
