import {
  tokenManifest,
  type TokenManifestEntry,
} from "@umc-product/design-tokens/manifest"

import { element, readVariable, section } from "./dom.ts"

const semanticColors = tokenManifest.filter(
  (token) => token.tier === "color-semantic",
)
const primitiveColors = tokenManifest.filter(
  (token) => token.tier === "color-primitive",
)

const groupNameOf = (token: TokenManifestEntry): string =>
  token.name.split(".")[1] ?? ""

const chip = (cssVariable: string, className: string): HTMLElement => {
  const node = element("div", `rounded-lg ring-1 ring-black/10 ${className}`)
  node.style.background = `var(${cssVariable})`
  return node
}

const semanticSwatch = (token: TokenManifestEntry): HTMLElement =>
  element("li", "", [
    chip(token.cssVariable, "h-14"),
    element("p", "text-label-6-semibold mt-2 break-words", [
      token.utility ?? token.tailwindName ?? "",
    ]),
    element("p", "text-caption-3-regular break-words text-black/50", [
      token.cssVariable,
    ]),
    element("p", "text-caption-3-medium text-black/70", [
      readVariable(token.cssVariable),
    ]),
  ])

const renderSemanticGroups = (): HTMLElement[] => {
  const groups = Map.groupBy(semanticColors, groupNameOf)
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
  const palettes = Map.groupBy(primitiveColors, groupNameOf)
  return [...palettes].map(([paletteName, colors]) =>
    element("div", "mt-6 first:mt-0", [
      element("h3", "text-label-4-semibold", [paletteName]),
      element(
        "ul",
        "mt-2 grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2",
        colors.map((token) =>
          element("li", "", [
            chip(token.cssVariable, "h-12"),
            element("p", "text-caption-3-medium mt-1", [
              token.tailwindName ?? "",
            ]),
            element("p", "text-caption-3-regular text-black/50", [
              readVariable(token.cssVariable),
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
    `semantic ${semanticColors.length}개와 primitive ${primitiveColors.length}개입니다. 이름 아래 글자는 Tailwind 클래스입니다(예: bg-surface-default, text-neutral-default). Tag와 primitive는 bg-, text-, border- 뒤에 붙입니다.`,
    [
      element("div", "", renderSemanticGroups()),
      element("h3", "text-heading-4-semibold mt-12", ["Primitive"]),
      element("div", "mt-4", renderPrimitivePalettes()),
    ],
  )
