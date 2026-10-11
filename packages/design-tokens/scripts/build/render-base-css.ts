import { TOKEN_FILE_ORDER } from "../shared/token-files.ts"
import { toDeclarations } from "./declarations.ts"
import type { ModelEntry } from "./model.ts"

export const renderBaseCss = (entries: readonly ModelEntry[]): string => {
  const sections = TOKEN_FILE_ORDER.map((file) =>
    entries
      .filter((entry) => entry.file === file)
      .flatMap(toDeclarations)
      .map(({ name, value }) => `    ${name}: ${value};`),
  ).filter((lines) => lines.length > 0)

  return [
    "@layer umc.tokens {",
    "  :root {",
    sections.map((lines) => lines.join("\n")).join("\n\n"),
    "  }",
    "}",
    "",
  ].join("\n")
}
