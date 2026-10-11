const CSS_VARIABLE_PREFIX = "--umc"
const SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ALIAS_PATTERN = /^\{([a-z0-9-]+(?:\.[a-z0-9-]+)*)\}$/

export type TokenPath = readonly string[]

export const isValidSegment = (segment: string): boolean =>
  SEGMENT_PATTERN.test(segment)

export const toSegment = (figmaName: string): string =>
  figmaName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/(\d+)px$/i, "$1")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

export const toCssVariable = (path: TokenPath): string =>
  `${CSS_VARIABLE_PREFIX}-${path.join("-")}`

export const toAlias = (path: TokenPath): string => `{${path.join(".")}}`

export const parseAlias = (value: string): TokenPath | null => {
  const target = ALIAS_PATTERN.exec(value)?.[1]
  return target ? target.split(".") : null
}

export const toCamelKey = (segment: string): string =>
  segment.replace(/-([a-z0-9])/g, (_, character: string) =>
    character.toUpperCase(),
  )
