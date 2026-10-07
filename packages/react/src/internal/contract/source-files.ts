import { readdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const contractDir = dirname(fileURLToPath(import.meta.url))

export const sourceDir = resolve(contractDir, "../..")

export const tokenBaseCssPath = resolve(
  sourceDir,
  "../../design-tokens/src/generated/base.css",
)

export const listSourceFiles = (extension: string): string[] =>
  readdirSync(sourceDir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(extension))
    .sort()

export const readSource = (file: string): string =>
  readFileSync(join(sourceDir, file), "utf8")
