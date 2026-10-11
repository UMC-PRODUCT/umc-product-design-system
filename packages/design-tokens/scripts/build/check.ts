import { findStaleOutputs } from "../shared/files.ts"
import { normalizeAll } from "../normalize/normalize-all.ts"
import { loadTokenModel } from "./model.ts"
import { renderAll } from "./render-all.ts"

const staleOutputs = [
  ...findStaleOutputs(normalizeAll()),
  ...findStaleOutputs(renderAll(loadTokenModel())),
]

if (staleOutputs.length > 0) {
  console.error(
    "재생성 결과와 다른 파일이 있습니다. pnpm tokens:normalize && pnpm tokens:build를 실행하세요.",
  )
  for (const filePath of staleOutputs) {
    console.error(`- ${filePath}`)
  }
  process.exit(1)
}

console.log("원문, 토큰, 생성물이 모두 최신입니다")
