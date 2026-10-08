export type ColorTokenRow = {
  figmaName: string
  codeSyntax: string | null
  cssVariable: string
  utility: string | null
  tailwindName: string | null
  vanillaExtract: string | null
  value: string
  reference: string | null
}

export type ColorSearchNotice =
  | { kind: "shared-code-syntax"; codeSyntax: string; count: number }
  | {
      kind: "narrowed-by-value"
      codeSyntax: string
      count: number
      value: string
    }
  | { kind: "shared-value"; value: string; count: number }
  | { kind: "opacity-unsupported"; prefix: string; cssVariable: string }

export type ColorSearchResult = {
  rows: ColorTokenRow[]
  notice: ColorSearchNotice | null
}

type ValueQuery = { kind: "value"; exact: string; prefix: string }

type CssVariableQuery = {
  kind: "css-variable"
  name: string
  fallbackValue: string | null
}

type NameQuery = {
  kind: "name"
  exactNeedles: string[]
  looseNeedles: string[]
  hasOpacity: boolean
}

type ParsedQuery = ValueQuery | CssVariableQuery | NameQuery

const CSS_VARIABLE_PATTERN = /--[a-z0-9-]+/
const FALLBACK_HEX_PATTERN = /,\s*(#[0-9a-f]{3,8})\s*\)/
const HEX_WITH_HASH_PATTERN = /^#([0-9a-f]{1,8})$/
const HEX_WITHOUT_HASH_PATTERN = /^(?:[0-9a-f]{6}|[0-9a-f]{8})$/
const RGB_PATTERN =
  /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)(%?)\s*)?\)$/
const COLOR_UTILITY_PREFIX_PATTERN =
  /^(?:bg|text|border(?:-[xytrblse])?|fill|stroke|ring|outline|divide|decoration|accent|caret|from|via|to|shadow)-/
const BORDER_SIDE_PREFIX_PATTERN = /^border-[xytrblse]-/
const ROOT_SEGMENT_PATTERN = /^(?:semantic|primitives)\//
const OPACITY_MODIFIER_PATTERN = /\/(?:\d+|\[[^\]]*\]|\([^)]*\))$/
const IMPORTANT_PATTERN = /^!|!$/g
const PROPERTY_UTILITY_PATTERN = /^(text|border)-/
const SHORT_HEX_DIGITS = 3
const MIN_LOOSE_NEEDLE_LENGTH = 3
const OPAQUE_ALPHA = 1
const ALPHA_CHANNEL_MAX = 255
const PERCENT = 100

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

const expandShortHex = (digits: string): string =>
  digits.length === SHORT_HEX_DIGITS
    ? [...digits].map((digit) => digit.repeat(2)).join("")
    : digits

const toHexChannel = (channel: number): string =>
  Math.min(channel, ALPHA_CHANNEL_MAX).toString(16).padStart(2, "0")

const rgbToHex = (match: RegExpExecArray): string => {
  const [, red = "0", green = "0", blue = "0", alpha, percent] = match
  const base = `#${[red, green, blue]
    .map((channel) => toHexChannel(Number(channel)))
    .join("")}`
  if (alpha === undefined) {
    return base
  }
  const opacity = percent === "%" ? Number(alpha) / PERCENT : Number(alpha)
  return opacity >= OPAQUE_ALPHA
    ? base
    : `${base}${toHexChannel(Math.round(opacity * ALPHA_CHANNEL_MAX))}`
}

const parseValueQuery = (query: string): ValueQuery | null => {
  const rgb = RGB_PATTERN.exec(query)
  if (rgb !== null) {
    const hex = rgbToHex(rgb)
    return { kind: "value", exact: hex, prefix: hex }
  }
  const digits =
    HEX_WITH_HASH_PATTERN.exec(query)?.[1] ??
    (HEX_WITHOUT_HASH_PATTERN.test(query) ? query : undefined)
  if (digits === undefined) {
    return null
  }
  return {
    kind: "value",
    exact: `#${expandShortHex(digits)}`,
    prefix: `#${digits}`,
  }
}

const parseNameQuery = (query: string): NameQuery => {
  const withoutImportant = query.replace(IMPORTANT_PATTERN, "")
  const withoutRoot = withoutImportant.replace(ROOT_SEGMENT_PATTERN, "")
  const withoutVariants = withoutRoot.split(":").at(-1) ?? withoutRoot
  const className = withoutVariants.replace(OPACITY_MODIFIER_PATTERN, "")
  const withoutPrefix = className.replace(COLOR_UTILITY_PREFIX_PATTERN, "")
  const isMeaningfulLooseNeedle =
    withoutPrefix !== className &&
    withoutPrefix.length >= MIN_LOOSE_NEEDLE_LENGTH &&
    /[a-z]/.test(withoutPrefix)
  return {
    kind: "name",
    exactNeedles: [
      ...new Set([
        withoutRoot,
        className,
        className.replace(BORDER_SIDE_PREFIX_PATTERN, "border-"),
      ]),
    ],
    looseNeedles: isMeaningfulLooseNeedle ? [withoutPrefix] : [],
    hasOpacity: className !== withoutVariants,
  }
}

const parseQuery = (rawQuery: string): ParsedQuery | null => {
  const query = rawQuery.trim().toLowerCase()
  if (query === "") {
    return null
  }
  const valueQuery = parseValueQuery(query)
  if (valueQuery !== null) {
    return valueQuery
  }
  const cssVariable = CSS_VARIABLE_PATTERN.exec(query)?.[0]
  if (cssVariable !== undefined) {
    const fallback = FALLBACK_HEX_PATTERN.exec(query)?.[1]
    return {
      kind: "css-variable",
      name: cssVariable,
      fallbackValue:
        fallback === undefined ? null : `#${expandShortHex(fallback.slice(1))}`,
    }
  }
  return parseNameQuery(query)
}

const searchKeysOf = (row: ColorTokenRow): string[] =>
  [
    row.figmaName,
    row.codeSyntax,
    row.cssVariable,
    row.utility,
    row.tailwindName,
    row.tailwindName === null ? null : `--color-${row.tailwindName}`,
    row.vanillaExtract,
  ].flatMap((key) => (key === null ? [] : [key.toLowerCase()]))

const namesMatch = (row: ColorTokenRow, needle: string): boolean =>
  row.figmaName.toLowerCase().endsWith(`/${needle}`) ||
  searchKeysOf(row).some((key) => key === needle || key === `var(${needle})`)

const rankRows = (
  rows: readonly ColorTokenRow[],
  rankOf: (row: ColorTokenRow) => number,
): ColorTokenRow[] =>
  rows
    .map((row, index) => ({ row, index, rank: rankOf(row) }))
    .sort((left, right) => left.rank - right.rank || left.index - right.index)
    .map(({ row }) => row)

const searchByValue = (
  rows: readonly ColorTokenRow[],
  query: ValueQuery,
): ColorSearchResult => {
  const matches = rows.filter(
    (row) => row.value.startsWith(query.prefix) || row.value === query.exact,
  )
  const exactCount = matches.filter((row) => row.value === query.exact).length
  return {
    rows: rankRows(matches, (row) => (row.value === query.exact ? 0 : 1)),
    notice:
      exactCount > 1
        ? { kind: "shared-value", value: query.exact, count: exactCount }
        : null,
  }
}

const sharedCodeSyntaxOf = (
  matches: readonly ColorTokenRow[],
  name: string,
): string | null => {
  const codeSyntax = matches[0]?.codeSyntax ?? null
  const allShareQueriedName =
    codeSyntax !== null &&
    matches.length > 1 &&
    codeSyntax.toLowerCase() === `var(${name})` &&
    matches.every((row) => row.codeSyntax === codeSyntax)
  return allShareQueriedName ? codeSyntax : null
}

const searchByCssVariable = (
  rows: readonly ColorTokenRow[],
  query: CssVariableQuery,
): ColorSearchResult => {
  const matches = rankRows(
    rows.filter((row) =>
      searchKeysOf(row).some((key) => key.includes(query.name)),
    ),
    (row) => (namesMatch(row, query.name) ? 0 : 1),
  )
  const sharedCodeSyntax = sharedCodeSyntaxOf(matches, query.name)
  if (sharedCodeSyntax === null) {
    return { rows: matches, notice: null }
  }
  const sameValue = matches.filter((row) => row.value === query.fallbackValue)
  if (sameValue.length > 0 && query.fallbackValue !== null) {
    return {
      rows: sameValue,
      notice: {
        kind: "narrowed-by-value",
        codeSyntax: sharedCodeSyntax,
        count: matches.length,
        value: query.fallbackValue,
      },
    }
  }
  return {
    rows: matches,
    notice: {
      kind: "shared-code-syntax",
      codeSyntax: sharedCodeSyntax,
      count: matches.length,
    },
  }
}

const opacityNoticeOf = (
  query: NameQuery,
  bestMatch: ColorTokenRow | undefined,
): ColorSearchNotice | null => {
  if (!query.hasOpacity || bestMatch === undefined) {
    return null
  }
  const prefix =
    bestMatch.tailwindName === null
      ? PROPERTY_UTILITY_PATTERN.exec(bestMatch.utility ?? "")?.[1]
      : undefined
  return prefix === undefined
    ? null
    : {
        kind: "opacity-unsupported",
        prefix,
        cssVariable: bestMatch.cssVariable,
      }
}

const searchByName = (
  rows: readonly ColorTokenRow[],
  query: NameQuery,
): ColorSearchResult => {
  const needles = [...query.exactNeedles, ...query.looseNeedles]
  const rankOf = (row: ColorTokenRow): number => {
    if (query.exactNeedles.some((needle) => namesMatch(row, needle))) {
      return 0
    }
    return query.looseNeedles.some((needle) => namesMatch(row, needle)) ? 1 : 2
  }
  const matches = rankRows(
    rows.filter((row) =>
      searchKeysOf(row).some((key) =>
        needles.some((needle) => key.includes(needle)),
      ),
    ),
    rankOf,
  )
  return { rows: matches, notice: opacityNoticeOf(query, matches[0]) }
}

export const searchColorTokens = (
  rows: readonly ColorTokenRow[],
  rawQuery: string,
): ColorSearchResult => {
  const query = parseQuery(rawQuery)
  if (query === null) {
    return { rows: [], notice: null }
  }
  switch (query.kind) {
    case "value":
      return searchByValue(rows, query)
    case "css-variable":
      return searchByCssVariable(rows, query)
    case "name":
      return searchByName(rows, query)
  }
}
