import { copyFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

import { paths } from "./shared/paths.ts"

const distDir = join(paths.packageRoot, "dist")
const cssFiles = readdirSync(paths.generatedDir).filter((name) =>
  name.endsWith(".css"),
)

for (const fileName of cssFiles) {
  copyFileSync(join(paths.generatedDir, fileName), join(distDir, fileName))
  console.log(`복사 완료: dist/${fileName}`)
}
