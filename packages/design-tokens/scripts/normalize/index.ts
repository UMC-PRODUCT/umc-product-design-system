import { relative } from "node:path"

import { writeOutputs } from "../shared/files.ts"
import { paths } from "../shared/paths.ts"
import { normalizeAll } from "./normalize-all.ts"

const outputs = normalizeAll()
writeOutputs(outputs)

for (const filePath of outputs.keys()) {
  console.log(`정규화 완료: ${relative(paths.packageRoot, filePath)}`)
}
