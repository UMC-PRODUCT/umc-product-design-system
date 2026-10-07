import { relative } from "node:path"

import { writeOutputs } from "../shared/files.ts"
import { paths } from "../shared/paths.ts"
import { loadTokenModel } from "./model.ts"
import { renderAll } from "./render-all.ts"

const outputs = renderAll(loadTokenModel())
writeOutputs(outputs)

for (const filePath of outputs.keys()) {
  console.log(`생성 완료: ${relative(paths.packageRoot, filePath)}`)
}
