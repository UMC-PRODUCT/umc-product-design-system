import { cpSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = fileURLToPath(new URL("../", import.meta.url))
const sourceDir = join(packageRoot, "src")
const distDir = join(packageRoot, "dist")

const cssFiles = readdirSync(sourceDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".css"))
  .map((file) => join(sourceDir, file))

for (const file of cssFiles) {
  cpSync(file, join(distDir, relative(sourceDir, file)))
  console.log(`복사 완료: ${relative(packageRoot, file)}`)
}
