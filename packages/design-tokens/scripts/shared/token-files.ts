export const TOKEN_FILE_ORDER = [
  "color.primitive.json",
  "font.json",
  "spacing.json",
  "radius.json",
  "color.semantic.json",
  "typography.json",
  "layout.json",
] as const

export type TokenFileName = (typeof TOKEN_FILE_ORDER)[number]
