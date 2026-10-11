import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..")

export const paths = {
  packageRoot,
  figmaDir: join(packageRoot, "figma"),
  figmaManifest: join(packageRoot, "figma", "manifest.json"),
  generatedDir: join(packageRoot, "src", "generated"),
  report: join(packageRoot, "reports", "icon-normalization.md"),
} as const
