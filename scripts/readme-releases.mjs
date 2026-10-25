import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { format, resolveConfig } from "prettier"

import { repoRoot } from "./pack-packages.mjs"
import { collectReleases, renderReadmeRelease } from "./release-notes.mjs"

const README_PATH = join(repoRoot, "README.md")
const START_MARKER = "<!-- releases:start -->"
const END_MARKER = "<!-- releases:end -->"

const readme = readFileSync(README_PATH, "utf8")
const start = readme.indexOf(START_MARKER)
const end = readme.indexOf(END_MARKER)
if (start === -1 || end < start) {
  console.error(
    `README.md에 릴리스 절 표시(${START_MARKER}, ${END_MARKER})가 차례로 있어야 합니다`,
  )
  process.exit(1)
}

const releases = collectReleases()
const section = [
  START_MARKER,
  ...releases.map(renderReadmeRelease),
  END_MARKER,
].join("\n\n")
const expected = await format(
  readme.slice(0, start) + section + readme.slice(end + END_MARKER.length),
  { ...(await resolveConfig(README_PATH)), filepath: README_PATH },
)

if (process.argv.includes("--check")) {
  if (expected !== readme) {
    console.error(
      "README.md의 릴리스 절이 CHANGELOG와 다릅니다. pnpm readme:build로 다시 만드세요",
    )
    process.exit(1)
  }
  console.log(
    `README.md의 릴리스 절이 CHANGELOG의 버전 ${releases.length}개와 같습니다`,
  )
} else {
  writeFileSync(README_PATH, expected)
  console.log(`README.md의 릴리스 절에 버전 ${releases.length}개를 썼습니다`)
}
