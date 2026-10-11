import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, relative } from "node:path"

import { paths } from "./paths.ts"

export type Outputs = ReadonlyMap<string, string>

export const writeOutputs = (outputs: Outputs): void => {
  for (const [filePath, content] of outputs) {
    mkdirSync(dirname(filePath), { recursive: true })
    writeFileSync(filePath, content)
  }
}

export const findStaleOutputs = (outputs: Outputs): string[] =>
  [...outputs]
    .filter(
      ([filePath, content]) =>
        !existsSync(filePath) || readFileSync(filePath, "utf8") !== content,
    )
    .map(([filePath]) => relative(paths.packageRoot, filePath))
