import { join } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = fileURLToPath(new URL("../../", import.meta.url))

export const paths = {
  packageRoot,
  figmaExportDir: join(packageRoot, "figma", "export"),
  figmaManifest: join(packageRoot, "figma", "manifest.json"),
  mcpDir: join(packageRoot, "figma", "mcp"),
  textStylesSource: join(
    packageRoot,
    "figma",
    "mcp",
    "get-variable-defs.2268-1706.json",
  ),
  tokensDir: join(packageRoot, "tokens"),
  generatedDir: join(packageRoot, "src", "generated"),
  normalizationReport: join(packageRoot, "reports", "figma-normalization.md"),
} as const
