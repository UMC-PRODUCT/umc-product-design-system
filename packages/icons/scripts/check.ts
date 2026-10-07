import { findStaleOutputs } from "./files.ts"
import { generateAll } from "./generate.ts"

const stale = findStaleOutputs(generateAll())
if (stale.length > 0) {
  console.error(
    `원문에서 다시 만든 결과와 다른 파일이 있습니다. pnpm icons:build를 실행하세요:\n${stale.join("\n")}`,
  )
  process.exit(1)
}
console.log("아이콘 원문과 생성물이 모두 최신입니다")
