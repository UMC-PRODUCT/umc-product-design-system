import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join } from "node:path"

import { z } from "zod"

import type { Outputs } from "./files.ts"
import { paths } from "./paths.ts"
import {
  EXCLUDED_COMPONENTS,
  ICON_FIXED_COLORS,
  ICON_PRIMARY_COLOR,
  ICON_VIEWBOX,
  ICON_WEIGHT_ORDER,
  LOGO_PRIMARY_COLOR,
  mapIconColor,
  mapLogoColor,
  mapPictogramColor,
  MODE_PROPERTY_NAMES,
  MODE_RULES,
  NAME_FIXES,
  OPEN_QUESTIONS,
  PICTOGRAM_FIXED_COLORS,
  PICTOGRAM_MODE_ORDER,
  PICTOGRAM_PRIMARY_COLORS,
  PICTOGRAM_VIEWBOX,
  PLACEMENTS,
  VARIANT_NAME_FIXES,
  VIEWBOX_EXCEPTIONS,
  WEIGHT_PROPERTY_NAMES,
  WEIGHT_RULES,
  type IconWeight,
  type Offset,
  type PictogramMode,
  type WeightRule,
} from "./rules.ts"
import {
  parseSvg,
  renderJsx,
  transformSvg,
  type ColorMapper,
  type ColorReplacement,
  type SvgNode,
  type TransformResult,
} from "./svg.ts"

const DEFAULT_WEIGHT_PREFERENCE: readonly IconWeight[] = [
  "regular",
  "fill",
  "thin",
]

const PLACEMENT_TOLERANCE = 0.001

const manifestSchema = z.object({
  fileKey: z.string(),
  fetchedAt: z.string(),
  tool: z.string(),
  sources: z.array(
    z.object({
      nodeId: z.string(),
      kind: z.enum(["icon", "pictogram", "logo"]),
      componentName: z.string(),
      variantName: z.string(),
      files: z.array(
        z.object({
          file: z.string(),
          sha256: z.string().regex(/^[0-9a-f]{64}$/),
        }),
      ),
      status: z.enum(["ok", "multiple-assets", "png", "failed"]),
    }),
  ),
})

export type IconManifest = z.infer<typeof manifestSchema>

export type ManifestSource = IconManifest["sources"][number]

type Variant = {
  key: string
  source: ManifestSource
  viewBox: string
  color?: string
  jsx: string
}

export type GeneratedComponent = {
  kind: ManifestSource["kind"]
  name: string
  figmaName: string
  variants: Variant[]
  weightNotes: { variantName: string; rule: WeightRule }[]
}

export type Canvas = {
  viewBox: string
  offset: Offset | undefined
}

type ExportedSource = {
  viewBox: string
  colors: string[]
  jsx: string
}

export const readIconManifest = (): IconManifest =>
  manifestSchema.parse(JSON.parse(readFileSync(paths.figmaManifest, "utf8")))

export const parseVariant = (variantName: string): Map<string, string> =>
  new Map(
    variantName
      .split(/,\s*/)
      .filter((part) => part.includes("="))
      .map((part) => {
        const [key = "", ...value] = part.split("=")
        return [key.trim(), value.join("=").trim()] as const
      }),
  )

const nameWords = (componentName: string): string[] =>
  componentName
    .replace(/^(Icon|Pictogram|Logo)[/_]/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s/_-]+/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase()
      return NAME_FIXES[lower] ?? lower
    })

export const toComponentName = (
  componentName: string,
  suffix: "Icon" | "Pictogram" | "Logo",
): string =>
  `${nameWords(componentName)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join("")}${suffix}`

const toKebab = (componentName: string): string =>
  nameWords(componentName).join("-")

export const resolveWeight = (
  variantName: string,
): { weight: IconWeight; rule: WeightRule } => {
  const fix = VARIANT_NAME_FIXES[variantName]
  const variant = parseVariant(fix?.variantName ?? variantName)
  const value = WEIGHT_PROPERTY_NAMES.map((name) => variant.get(name)).find(
    (found) => found !== undefined,
  )
  const weightRule = value === undefined ? undefined : WEIGHT_RULES[value]
  if (!weightRule) {
    throw new Error(`굵기 규칙이 없는 변형입니다: "${variantName}"`)
  }
  const rule = fix
    ? { weight: weightRule.weight, status: fix.status, reason: fix.reason }
    : weightRule
  return { weight: rule.weight, rule }
}

export const resolveMode = (variantName: string): PictogramMode => {
  const variant = parseVariant(variantName)
  const value = MODE_PROPERTY_NAMES.map((name) => variant.get(name)).find(
    (found) => found !== undefined,
  )
  if (value === undefined) {
    return "light"
  }
  const mode = MODE_RULES[value]
  if (!mode) {
    throw new Error(`모드 규칙이 없는 변형입니다: "${variantName}"`)
  }
  return mode
}

const readVerifiedSvg = (source: ManifestSource): string => {
  const [asset, ...rest] = source.files
  if (source.status !== "ok" || !asset || rest.length > 0) {
    throw new Error(`SVG 원문이 하나가 아닙니다(${source.status})`)
  }
  const content = readFileSync(join(paths.figmaDir, asset.file))
  const sha256 = createHash("sha256").update(content).digest("hex")
  if (sha256 !== asset.sha256) {
    throw new Error(`${asset.file} 원문이 manifest의 sha256과 다릅니다`)
  }
  return content.toString("utf8")
}

const inSource = <T>(source: ManifestSource, run: () => T): T => {
  try {
    return run()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(
      `${source.componentName} ${source.variantName}(${source.nodeId}): ${message}`,
    )
  }
}

const STANDARD_VIEWBOXES: Readonly<
  Record<ManifestSource["kind"], string | undefined>
> = {
  icon: ICON_VIEWBOX,
  pictogram: PICTOGRAM_VIEWBOX,
  logo: undefined,
}

const isLength = (value: number | undefined): value is number =>
  value !== undefined && Number.isFinite(value) && value > 0

export const frameSize = (viewBox: string) => {
  const [minX, minY, width, height] = viewBox.trim().split(/\s+/).map(Number)
  if (minX !== 0 || minY !== 0 || !isLength(width) || !isLength(height)) {
    throw new Error(`프레임 ${viewBox}는 "0 0 너비 높이" 형식이어야 합니다`)
  }
  return { width, height }
}

export const resolveCanvas = (
  source: Pick<ManifestSource, "nodeId" | "kind">,
  exported: Pick<TransformResult, "viewBox" | "width" | "height">,
): Canvas => {
  if (!exported.viewBox.startsWith("0 0 ")) {
    throw new Error(`viewBox ${exported.viewBox}가 0 0에서 시작하지 않습니다`)
  }
  const placement = PLACEMENTS.find((rule) =>
    rule.nodeIds.includes(source.nodeId),
  )
  if (placement) {
    const frame = frameSize(placement.frame)
    const fits =
      placement.offset.x + exported.width <=
        frame.width + PLACEMENT_TOLERANCE &&
      placement.offset.y + exported.height <= frame.height + PLACEMENT_TOLERANCE
    if (!fits) {
      throw new Error(
        `내보낸 도형 ${exported.viewBox}가 배치 규칙의 프레임 ${placement.frame}에 들어가지 않습니다`,
      )
    }
    return { viewBox: placement.frame, offset: placement.offset }
  }
  const expected =
    VIEWBOX_EXCEPTIONS.find((rule) => rule.nodeIds.includes(source.nodeId))
      ?.viewBox ?? STANDARD_VIEWBOXES[source.kind]
  if (expected !== undefined && exported.viewBox !== expected) {
    throw new Error(
      `viewBox ${exported.viewBox}가 ${expected}가 아닙니다. 피그마 프레임을 확인하고 rules.ts에 배치나 viewBox 규칙을 추가하세요`,
    )
  }
  return { viewBox: exported.viewBox, offset: undefined }
}

export const assertIconPrimaryColor = (colors: readonly string[]): void => {
  if (!colors.includes(ICON_PRIMARY_COLOR)) {
    throw new Error(
      `아이콘 주색 ${ICON_PRIMARY_COLOR}이 없습니다(${colors.join(", ") || "색 없음"})`,
    )
  }
}

export const assertLogoPrimaryColor = (colors: readonly string[]): void => {
  if (!colors.includes(LOGO_PRIMARY_COLOR)) {
    throw new Error(
      `로고 주색 ${LOGO_PRIMARY_COLOR}이 없습니다(${colors.join(", ") || "색 없음"})`,
    )
  }
}

export const pictogramDefaultColor = (colors: readonly string[]): string => {
  const primaries = Object.entries(PICTOGRAM_PRIMARY_COLORS).filter(([color]) =>
    colors.includes(color),
  )
  const [primary] = primaries
  if (!primary || primaries.length > 1) {
    throw new Error(
      `픽토그램 주색이 하나가 아닙니다(${colors.join(", ") || "색 없음"})`,
    )
  }
  return primary[1]
}

const placeAt = (offset: Offset | undefined, children: SvgNode[]): SvgNode[] =>
  offset === undefined
    ? children
    : [
        {
          name: "g",
          attributes: [["transform", `translate(${offset.x} ${offset.y})`]],
          style: [],
          children,
        },
      ]

const exportSource = (
  source: ManifestSource,
  idPrefix: string,
  mapColor: ColorMapper,
): ExportedSource => {
  const exported = transformSvg(parseSvg(readVerifiedSvg(source)), {
    idPrefix,
    mapColor,
  })
  const canvas = resolveCanvas(source, exported)
  return {
    viewBox: canvas.viewBox,
    colors: exported.colors,
    jsx: renderJsx(placeAt(canvas.offset, exported.children)),
  }
}

const groupByComponent = (
  sources: readonly ManifestSource[],
): Map<string, ManifestSource[]> => {
  const groups = new Map<string, ManifestSource[]>()
  for (const source of sources) {
    const key = `${source.kind}:${source.componentName}`
    groups.set(key, [...(groups.get(key) ?? []), source])
  }
  return groups
}

const assertUniqueKeys = (name: string, keys: readonly string[]) => {
  const duplicated = keys.filter((key, index) => keys.indexOf(key) !== index)
  if (duplicated.length > 0) {
    throw new Error(
      `${name}: 같은 변형이 두 번 나옵니다(${duplicated.join(", ")})`,
    )
  }
}

const buildIcon = (sources: ManifestSource[]): GeneratedComponent => {
  const [first] = sources
  if (!first) {
    throw new Error("빈 아이콘 그룹입니다")
  }
  const name = toComponentName(first.componentName, "Icon")
  const resolved = sources.map((source) => ({
    source,
    ...resolveWeight(source.variantName),
  }))
  assertUniqueKeys(
    name,
    resolved.map(({ weight }) => weight),
  )
  const variants = resolved
    .sort(
      (left, right) =>
        ICON_WEIGHT_ORDER.indexOf(left.weight) -
        ICON_WEIGHT_ORDER.indexOf(right.weight),
    )
    .map(({ source, weight }) =>
      inSource(source, () => {
        const exported = exportSource(
          source,
          `${toKebab(source.componentName)}-${weight}`,
          mapIconColor,
        )
        assertIconPrimaryColor(exported.colors)
        return {
          key: weight,
          source,
          viewBox: exported.viewBox,
          jsx: exported.jsx,
        }
      }),
    )
  return {
    kind: "icon",
    name,
    figmaName: first.componentName,
    variants,
    weightNotes: resolved.map(({ source, rule }) => ({
      variantName: source.variantName,
      rule,
    })),
  }
}

const buildPictogram = (sources: ManifestSource[]): GeneratedComponent => {
  const [first] = sources
  if (!first) {
    throw new Error("빈 픽토그램 그룹입니다")
  }
  const name = toComponentName(first.componentName, "Pictogram")
  const resolved = sources.map((source) => ({
    source,
    mode: resolveMode(source.variantName),
  }))
  assertUniqueKeys(
    name,
    resolved.map(({ mode }) => mode),
  )
  const variants = resolved
    .sort(
      (left, right) =>
        PICTOGRAM_MODE_ORDER.indexOf(left.mode) -
        PICTOGRAM_MODE_ORDER.indexOf(right.mode),
    )
    .map(({ source, mode }) =>
      inSource(source, () => {
        const exported = exportSource(
          source,
          `${toKebab(source.componentName)}-${mode}`,
          mapPictogramColor,
        )
        return {
          key: mode,
          source,
          viewBox: exported.viewBox,
          color: pictogramDefaultColor(exported.colors),
          jsx: exported.jsx,
        }
      }),
    )
  return {
    kind: "pictogram",
    name,
    figmaName: first.componentName,
    variants,
    weightNotes: [],
  }
}

const buildLogo = (sources: ManifestSource[]): GeneratedComponent => {
  const [source, ...rest] = sources
  if (!source || rest.length > 0) {
    throw new Error("로고는 변형이 하나여야 합니다")
  }
  const variant = inSource(source, () => {
    const exported = exportSource(
      source,
      toKebab(source.componentName),
      mapLogoColor,
    )
    assertLogoPrimaryColor(exported.colors)
    frameSize(exported.viewBox)
    return {
      key: "default",
      source,
      viewBox: exported.viewBox,
      jsx: exported.jsx,
    }
  })
  return {
    kind: "logo",
    name: toComponentName(source.componentName, "Logo"),
    figmaName: source.componentName,
    variants: [variant],
    weightNotes: [],
  }
}

const BUILDERS: Readonly<
  Record<
    ManifestSource["kind"],
    (sources: ManifestSource[]) => GeneratedComponent
  >
> = {
  icon: buildIcon,
  pictogram: buildPictogram,
  logo: buildLogo,
}

export const buildComponents = (
  manifest: IconManifest,
): GeneratedComponent[] => {
  const excludedNames = new Set(
    EXCLUDED_COMPONENTS.map((exclusion) => exclusion.componentName),
  )
  const presentNames = new Set(
    manifest.sources.map((source) => source.componentName),
  )
  const staleExclusions = [...excludedNames].filter(
    (name) => !presentNames.has(name),
  )
  if (staleExclusions.length > 0) {
    throw new Error(
      `원문에 없는 제외 규칙입니다: ${staleExclusions.join(", ")}`,
    )
  }
  const presentVariantNames = new Set(
    manifest.sources.map((source) => source.variantName),
  )
  const staleFixes = Object.keys(VARIANT_NAME_FIXES).filter(
    (variantName) => !presentVariantNames.has(variantName),
  )
  if (staleFixes.length > 0) {
    throw new Error(
      `원문에 없는 변형 이름 규칙입니다: ${staleFixes.join(", ")}`,
    )
  }
  const ruleNodeIds = [...PLACEMENTS, ...VIEWBOX_EXCEPTIONS].flatMap(
    (rule) => rule.nodeIds,
  )
  assertUniqueKeys("배치와 viewBox 규칙의 노드", ruleNodeIds)
  const presentNodeIds = new Set(
    manifest.sources.map((source) => source.nodeId),
  )
  const staleNodeIds = ruleNodeIds.filter(
    (nodeId) => !presentNodeIds.has(nodeId),
  )
  if (staleNodeIds.length > 0) {
    throw new Error(
      `원문에 없는 노드를 가리키는 배치나 viewBox 규칙입니다: ${staleNodeIds.join(", ")}`,
    )
  }

  const components = [
    ...groupByComponent(
      manifest.sources.filter(
        (source) => !excludedNames.has(source.componentName),
      ),
    ).values(),
  ].map((sources) => BUILDERS[sources[0]?.kind ?? "icon"](sources))
  assertUniqueKeys(
    "컴포넌트 이름",
    components.map((component) => component.name),
  )
  return components.sort(
    (left, right) =>
      left.kind.localeCompare(right.kind) ||
      left.name.localeCompare(right.name),
  )
}

const defaultWeightOf = (component: GeneratedComponent): string =>
  DEFAULT_WEIGHT_PREFERENCE.find((weight) =>
    component.variants.some((variant) => variant.key === weight),
  ) ?? ""

const renderVariant = (variant: Variant): string[] => [
  `    ${variant.key}: {`,
  `      viewBox: "${variant.viewBox}",`,
  ...(variant.color === undefined
    ? []
    : [`      color: ${JSON.stringify(variant.color)},`]),
  `      content: ${variant.jsx},`,
  "    },",
]

const renderLogoModule = (component: GeneratedComponent): string => {
  const [variant] = component.variants
  if (!variant) {
    throw new Error(`${component.name}: 로고 원문이 없습니다`)
  }
  const frame = frameSize(variant.viewBox)
  return [
    'import { createLogo } from "../../create-logo.tsx"',
    "",
    `export const ${component.name} = createLogo({`,
    `  name: "${component.name}",`,
    `  frame: { width: ${frame.width}, height: ${frame.height} },`,
    `  content: ${variant.jsx},`,
    "})",
    "",
  ].join("\n")
}

const renderComponentModule = (component: GeneratedComponent): string => {
  if (component.kind === "logo") {
    return renderLogoModule(component)
  }
  const isIcon = component.kind === "icon"
  return [
    isIcon
      ? 'import { createIcon } from "../../create-icon.tsx"'
      : 'import { createPictogram } from "../../create-pictogram.tsx"',
    "",
    `export const ${component.name} = ${isIcon ? "createIcon" : "createPictogram"}({`,
    `  name: "${component.name}",`,
    isIcon
      ? `  defaultWeight: "${defaultWeightOf(component)}",`
      : '  defaultMode: "light",',
    isIcon ? "  weights: {" : "  modes: {",
    ...component.variants.flatMap(renderVariant),
    "  },",
    "})",
    "",
  ].join("\n")
}

const FOLDERS: Readonly<Record<ManifestSource["kind"], string>> = {
  icon: "icons",
  pictogram: "pictograms",
  logo: "logos",
}

const folderOf = (component: GeneratedComponent): string =>
  FOLDERS[component.kind]

const renderIndex = (components: readonly GeneratedComponent[]): string => {
  const icons = components.filter((component) => component.kind === "icon")
  const pictograms = components.filter(
    (component) => component.kind === "pictogram",
  )
  const logos = components.filter((component) => component.kind === "logo")
  const variantKeys = (component: GeneratedComponent) =>
    `[${component.variants.map((variant) => `"${variant.key}"`).join(", ")}]`
  return [
    ...components.map(
      (component) =>
        `import { ${component.name} } from "./${folderOf(component)}/${component.name}.tsx"`,
    ),
    "",
    "export {",
    ...components.map((component) => `  ${component.name},`),
    "}",
    "",
    "export const iconCatalog = [",
    ...icons.map(
      (component) =>
        `  { name: "${component.name}", figmaName: "${component.figmaName}", defaultWeight: "${defaultWeightOf(component)}", weights: ${variantKeys(component)}, component: ${component.name} },`,
    ),
    "] as const",
    "",
    "export const pictogramCatalog = [",
    ...pictograms.map(
      (component) =>
        `  { name: "${component.name}", figmaName: "${component.figmaName}", modes: ${variantKeys(component)}, component: ${component.name} },`,
    ),
    "] as const",
    "",
    "export const logoCatalog = [",
    ...logos.map(
      (component) =>
        `  { name: "${component.name}", figmaName: "${component.figmaName}", component: ${component.name} },`,
    ),
    "] as const",
    "",
  ].join("\n")
}

const cell = (value: string): string => value.replaceAll("|", "\\|")

const describeReplacement = (replacement: ColorReplacement): string =>
  "attribute" in replacement
    ? `속성 \`${replacement.attribute}\``
    : `style \`${replacement.style}\``

const renderReport = (
  manifest: IconManifest,
  components: readonly GeneratedComponent[],
): string => {
  const table = (headers: string[], rows: string[][]) =>
    rows.length === 0
      ? ["없음"]
      : [
          `| ${headers.join(" | ")} |`,
          `| ${headers.map(() => "---").join(" | ")} |`,
          ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
        ]
  const nodeLabels = new Map(
    manifest.sources.map((source) => [
      source.nodeId,
      `\`${source.componentName}\` ${source.variantName || "(변형 없음)"}`,
    ]),
  )
  const nodeList = (nodeIds: readonly string[]) =>
    nodeIds
      .map((nodeId) => `${nodeLabels.get(nodeId) ?? "?"}(${nodeId})`)
      .join("<br>")
  const pendingWeights = components.flatMap((component) =>
    component.weightNotes
      .filter((note) => note.rule.status === "pending")
      .map((note) => [
        `\`${component.figmaName}\``,
        `\`${note.variantName}\``,
        note.rule.weight,
        note.rule.reason,
      ]),
  )
  return [
    "# 아이콘 정규화 리포트",
    "",
    "`pnpm icons:build`가 만드는 파일이다. 손으로 고치지 않는다. 규칙은 `scripts/rules.ts`에서 바꾼다.",
    "",
    "## 입력",
    "",
    `- 피그마 파일 \`${manifest.fileKey}\`, ${manifest.tool}, 받은 날 ${manifest.fetchedAt}`,
    `- 노드 ${manifest.sources.length}개, 컴포넌트 ${components.length}개(아이콘 ${components.filter((component) => component.kind === "icon").length}, 픽토그램 ${components.filter((component) => component.kind === "pictogram").length}, 로고 ${components.filter((component) => component.kind === "logo").length})`,
    "",
    "## 디자인 팀 확인 요청",
    "",
    ...OPEN_QUESTIONS.map((question, index) => `${index + 1}. ${question}`),
    "",
    "## 확인 대기 굵기 대응",
    "",
    ...table(
      ["피그마 컴포넌트", "피그마 변형", "코드 굵기", "이유"],
      pendingWeights,
    ),
    "",
    "## 제외한 컴포넌트",
    "",
    ...table(
      ["피그마 컴포넌트", "이유"],
      EXCLUDED_COMPONENTS.map((exclusion) => [
        `\`${exclusion.componentName}\``,
        exclusion.reason,
      ]),
    ),
    "",
    "## 배치 보정",
    "",
    "피그마가 프레임 대신 안쪽 도형만 내보낸 변형이다. 도형을 프레임 안 원래 위치로 옮긴다.",
    "",
    ...table(
      ["노드", "프레임 viewBox", "도형 위치", "이유"],
      PLACEMENTS.map((placement) => [
        nodeList(placement.nodeIds),
        placement.frame,
        `${placement.offset.x}, ${placement.offset.y}`,
        placement.reason,
      ]),
    ),
    "",
    "## viewBox 예외",
    "",
    ...table(
      ["노드", "viewBox", "이유"],
      VIEWBOX_EXCEPTIONS.map((exception) => [
        nodeList(exception.nodeIds),
        exception.viewBox,
        exception.reason,
      ]),
    ),
    "",
    "## 색 규칙",
    "",
    ...table(
      ["대상", "피그마 색", "코드"],
      [
        ["아이콘 주색", ICON_PRIMARY_COLOR, "`currentColor`(글자색을 따른다)"],
        ["로고 주색", LOGO_PRIMARY_COLOR, "`currentColor`(글자색을 따른다)"],
        ...Object.entries(ICON_FIXED_COLORS).map(([color, replacement]) => [
          "아이콘 고정색",
          color,
          describeReplacement(replacement),
        ]),
        ...Object.entries(PICTOGRAM_PRIMARY_COLORS).map(
          ([color, defaultColor]) => [
            "픽토그램 주색",
            color,
            `\`currentColor\`, 기본 \`color\`는 \`${defaultColor}\``,
          ],
        ),
        ...Object.entries(PICTOGRAM_FIXED_COLORS).map(
          ([color, replacement]) => [
            "픽토그램 고정색",
            color,
            describeReplacement(replacement),
          ],
        ),
      ],
    ),
    "",
    "## 이름 대응표",
    "",
    ...table(
      ["피그마 컴포넌트", "코드 컴포넌트", "변형"],
      components.map((component) => [
        `\`${component.figmaName}\``,
        `\`${component.name}\``,
        component.variants
          .map((variant) => `${variant.key}(${variant.source.nodeId})`)
          .join(", "),
      ]),
    ),
    "",
  ].join("\n")
}

export const generateAll = (): Outputs => {
  const manifest = readIconManifest()
  const components = buildComponents(manifest)
  return new Map([
    ...components.map(
      (component) =>
        [
          join(
            paths.generatedDir,
            folderOf(component),
            `${component.name}.tsx`,
          ),
          renderComponentModule(component),
        ] as const,
    ),
    [join(paths.generatedDir, "index.ts"), renderIndex(components)],
    [paths.report, renderReport(manifest, components)],
  ])
}
