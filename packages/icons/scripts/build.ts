import { writeOutputs } from "./files.ts"
import { generateAll } from "./generate.ts"

for (const file of writeOutputs(generateAll())) {
  console.log(`생성 완료: ${file}`)
}
