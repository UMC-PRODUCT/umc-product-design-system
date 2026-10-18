import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { PACKAGE_DIRECTORIES, repoRoot } from "./pack-packages.mjs"

const UNDATED_VERSION_HEADING = /^## (\d+\.\d+\.\d+)$/gm

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
}).format(new Date())

for (const directory of PACKAGE_DIRECTORIES) {
  const changelogPath = join(repoRoot, "packages", directory, "CHANGELOG.md")
  const changelog = readFileSync(changelogPath, "utf8")
  const stamped = changelog.replace(UNDATED_VERSION_HEADING, `## $1 (${today})`)
  if (stamped !== changelog) {
    writeFileSync(changelogPath, stamped)
    console.log(
      `${directory} CHANGELOG의 새 버전 제목에 날짜(${today})를 붙였습니다`,
    )
  }
}
