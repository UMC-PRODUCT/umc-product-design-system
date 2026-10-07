import { cssVariables, semanticColors } from "@umc-product/design-tokens"

import { element, readVariable, section } from "./dom.ts"

const COLOR_VARIABLE_PREFIX = "--umc-color-"
const STEP_SUFFIX_PATTERN = /-\d+$/

const groupNameOf = (cssVariable: string): string =>
  cssVariable.slice(COLOR_VARIABLE_PREFIX.length).split("-")[0] ?? ""

const paletteNameOf = (cssVariable: string): string =>
  cssVariable
    .slice(COLOR_VARIABLE_PREFIX.length)
    .replace(STEP_SUFFIX_PATTERN, "")

const chip = (cssVariable: string, className: string): HTMLElement => {
  const node = element("div", `rounded-lg ring-1 ring-black/10 ${className}`)
  node.style.background = `var(${cssVariable})`
  return node
}

const semanticSwatch = (color: {
  cssVariable: string
  tailwindColor: string
}): HTMLElement =>
  element("li", "", [
    chip(color.cssVariable, "h-14"),
    element("p", "text-label-6-semibold mt-2 break-words", [
      color.tailwindColor,
    ]),
    element("p", "text-caption-3-regular break-words text-black/50", [
      color.cssVariable,
    ]),
    element("p", "text-caption-3-medium text-black/70", [
      readVariable(color.cssVariable),
    ]),
  ])

const renderSemanticGroups = (): HTMLElement[] => {
  const groups = Map.groupBy(semanticColors, (color) =>
    groupNameOf(color.cssVariable),
  )
  return [...groups].map(([groupName, colors]) =>
    element("div", "mt-8 first:mt-0", [
      element("h3", "text-title-4-semibold capitalize", [
        `${groupName} (${colors.length})`,
      ]),
      element(
        "ul",
        "mt-3 grid grid-cols-[repeat(auto-fill,minmax(168px,1fr))] gap-4",
        colors.map(semanticSwatch),
      ),
    ]),
  )
}

const renderPrimitivePalettes = (): HTMLElement[] => {
  const semanticVariables = new Set<string>(
    semanticColors.map((color) => color.cssVariable),
  )
  const primitives = cssVariables.filter(
    (name) =>
      name.startsWith(COLOR_VARIABLE_PREFIX) && !semanticVariables.has(name),
  )
  const palettes = Map.groupBy(primitives, paletteNameOf)
  return [...palettes].map(([paletteName, names]) =>
    element("div", "mt-6 first:mt-0", [
      element("h3", "text-label-4-semibold", [paletteName]),
      element(
        "ul",
        "mt-2 grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2",
        names.map((name) =>
          element("li", "", [
            chip(name, "h-12"),
            element("p", "text-caption-3-medium mt-1", [
              name.slice(
                COLOR_VARIABLE_PREFIX.length + paletteName.length + 1,
              ) || paletteName,
            ]),
            element("p", "text-caption-3-regular text-black/50", [
              readVariable(name),
            ]),
          ]),
        ),
      ),
    ]),
  )
}

export const renderColorSection = (): HTMLElement =>
  section(
    "컬러",
    `앱에서는 semantic ${semanticColors.length}개만 씁니다. 이름은 Tailwind 유틸리티 뒤에 붙이는 값입니다(예: bg-surface-default, text-fg-neutral-default). primitive는 참고용입니다.`,
    [
      element("div", "", renderSemanticGroups()),
      element("h3", "text-heading-4-semibold mt-12", ["Primitive"]),
      element("div", "mt-4", renderPrimitivePalettes()),
    ],
  )
