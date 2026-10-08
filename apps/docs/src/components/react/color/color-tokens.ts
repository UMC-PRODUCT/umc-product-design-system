export type ColorTokenRow = {
  figmaName: string
  codeSyntax: string | null
  cssVariable: string
  utility: string | null
  tailwindName: string | null
  value: string
  reference: string | null
}

export type ColorSearchResult = {
  rows: ColorTokenRow[]
  sharedCodeSyntax: string | null
  sharedValue: string | null
}

const CSS_VARIABLE_PATTERN = /--[a-z0-9-]+/
const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/
const SHORT_HEX_LENGTH = 4
const COLOR_UTILITY_PREFIX_PATTERN =
  /^(?:bg|text|border(?:-[xytrblse])?|fill|stroke|ring|outline|divide|decoration|accent|caret|from|via|to|shadow)-/
const BORDER_SIDE_PREFIX_PATTERN = /^border-[xytrblse]-/
const ROOT_SEGMENT_PATTERN = /^(?:semantic|primitives)\//
const OPACITY_MODIFIER_PATTERN = /\/(?:\d+|\[[^\]]*\]|\([^)]*\))$/

export const countCodeSyntax = (
  rows: readonly ColorTokenRow[],
): ReadonlyMap<string, number> => {
  const counts = new Map<string, number>()
  for (const row of rows) {
    if (row.codeSyntax !== null) {
      counts.set(row.codeSyntax, (counts.get(row.codeSyntax) ?? 0) + 1)
    }
  }
  return counts
}

const expandShortHex = (hex: string): string =>
  hex.length === SHORT_HEX_LENGTH
    ? `#${[...hex.slice(1)].map((digit) => digit.repeat(2)).join("")}`
    : hex

const classNameOf = (query: string): string =>
  (query.split(":").at(-1) ?? query).replace(OPACITY_MODIFIER_PATTERN, "")

const needlesOf = (query: string): string[] => {
  const cssVariable = CSS_VARIABLE_PATTERN.exec(query)?.[0]
  if (cssVariable !== undefined) {
    return [cssVariable]
  }
  const withoutRoot = query.replace(ROOT_SEGMENT_PATTERN, "")
  const className = classNameOf(withoutRoot)
  return [
    ...new Set([
      withoutRoot,
      className,
      className.replace(BORDER_SIDE_PREFIX_PATTERN, "border-"),
      className.replace(COLOR_UTILITY_PREFIX_PATTERN, ""),
    ]),
  ]
}

const searchKeysOf = (row: ColorTokenRow): string[] =>
  [
    row.figmaName,
    row.codeSyntax,
    row.cssVariable,
    row.utility,
    row.tailwindName,
  ].flatMap((key) => (key === null ? [] : [key.toLowerCase()]))

const isExactMatch = (row: ColorTokenRow, needles: readonly string[]) => {
  const figmaName = row.figmaName.toLowerCase()
  return searchKeysOf(row).some(
    (key) =>
      needles.includes(key) ||
      needles.some(
        (needle) =>
          figmaName.endsWith(`/${needle}`) || key === `var(${needle})`,
      ),
  )
}

const byExactFirst = (
  rows: readonly ColorTokenRow[],
  needles: readonly string[],
): ColorTokenRow[] => [
  ...rows.filter((row) => isExactMatch(row, needles)),
  ...rows.filter((row) => !isExactMatch(row, needles)),
]

const searchByValue = (
  rows: readonly ColorTokenRow[],
  hex: string,
): ColorSearchResult => {
  const expanded = expandShortHex(hex)
  const matches = rows.filter((row) => row.value.startsWith(expanded))
  return {
    rows: matches,
    sharedCodeSyntax: null,
    sharedValue: matches.length > 1 ? expanded : null,
  }
}

const sharedCodeSyntaxOf = (
  matches: readonly ColorTokenRow[],
  needles: readonly string[],
): string | null => {
  const [first] = matches
  const codeSyntax = first?.codeSyntax ?? null
  const sharesQueriedCodeSyntax =
    codeSyntax !== null &&
    matches.length > 1 &&
    needles.some((needle) => codeSyntax.toLowerCase() === `var(${needle})`) &&
    matches.every((row) => row.codeSyntax === codeSyntax)
  return sharesQueriedCodeSyntax ? codeSyntax : null
}

export const searchColorTokens = (
  rows: readonly ColorTokenRow[],
  rawQuery: string,
): ColorSearchResult => {
  const query = rawQuery.trim().toLowerCase()
  if (query === "") {
    return { rows: [], sharedCodeSyntax: null, sharedValue: null }
  }
  if (HEX_PATTERN.test(query)) {
    return searchByValue(rows, query)
  }
  const needles = needlesOf(query)
  const matches = rows.filter((row) =>
    searchKeysOf(row).some((key) =>
      needles.some((needle) => key.includes(needle)),
    ),
  )
  return {
    rows: byExactFirst(matches, needles),
    sharedCodeSyntax: sharedCodeSyntaxOf(matches, needles),
    sharedValue: null,
  }
}
