export type NestedRecord = { [key: string]: string | NestedRecord }

const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/
const INDENT = "  "

const formatKey = (key: string): string =>
  IDENTIFIER_PATTERN.test(key) ? key : JSON.stringify(key)

export const formatPropertyAccess = (
  root: string,
  keys: readonly string[],
): string =>
  `${root}${keys
    .map((key) =>
      IDENTIFIER_PATTERN.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`,
    )
    .join("")}`

export const serializeRecord = (record: NestedRecord, depth = 0): string => {
  const indent = INDENT.repeat(depth + 1)
  const lines = Object.entries(record).map(([key, value]) =>
    typeof value === "string"
      ? `${indent}${formatKey(key)}: ${JSON.stringify(value)},`
      : `${indent}${formatKey(key)}: ${serializeRecord(value, depth + 1)},`,
  )
  return `{\n${lines.join("\n")}\n${INDENT.repeat(depth)}}`
}

export const serializeList = (values: readonly string[]): string =>
  `[\n${values.map((value) => `${INDENT}${JSON.stringify(value)},`).join("\n")}\n]`

export const setNested = (
  record: NestedRecord,
  keys: readonly string[],
  value: string,
): void => {
  const [key, ...rest] = keys
  if (key === undefined) {
    throw new Error("빈 경로에는 값을 넣을 수 없습니다")
  }
  if (rest.length === 0) {
    if (key in record) {
      throw new Error(`${key} 키가 이미 있습니다`)
    }
    record[key] = value
    return
  }
  const child = record[key] ?? {}
  if (typeof child === "string") {
    throw new Error(`${key} 키가 값이라 하위 그룹을 둘 수 없습니다`)
  }
  record[key] = child
  setNested(child, rest, value)
}
