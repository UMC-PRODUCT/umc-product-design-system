import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, relative } from "node:path"

import { paths } from "./paths.ts"

export type Outputs = ReadonlyMap<string, string>

export const writeOutputs = (outputs: Outputs): string[] =>
  [...outputs].map(([file, content]) => {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
    return relative(paths.packageRoot, file)
  })

export const findStaleOutputs = (outputs: Outputs): string[] =>
  [...outputs]
    .filter(
      ([file, content]) =>
        !existsSync(file) || readFileSync(file, "utf8") !== content,
    )
    .map(([file]) => relative(paths.packageRoot, file))
