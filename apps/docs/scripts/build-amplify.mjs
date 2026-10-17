import { execFileSync } from "node:child_process"
import { cpSync, mkdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { BASE_PATH, SITE_URL } from "../site-config.mjs"

const REQUIRED_VARIABLES = ["DOCS_SITE_URL", "DOCS_BASE_PATH"]

const missingVariables = REQUIRED_VARIABLES.filter((name) => !process.env[name])
if (missingVariables.length > 0) {
  console.error(`Amplify 환경 변수가 없습니다: ${missingVariables.join(", ")}`)
  process.exit(1)
}

const docsDir = fileURLToPath(new URL("..", import.meta.url))
const outputDir = join(docsDir, "amplify-dist")
const docsOutputDir = join(outputDir, BASE_PATH)
const docsUrl = `${SITE_URL}${BASE_PATH}`
const storybookUrl = `${docsUrl}/storybook/`

const runPnpm = (args, variables = {}) =>
  execFileSync("pnpm", args, {
    cwd: docsDir,
    stdio: "inherit",
    env: { ...process.env, ...variables },
  })

runPnpm(["run", "build"], { PUBLIC_STORYBOOK_URL: storybookUrl })
runPnpm(["run", "links:check"])
runPnpm(["-w", "run", "storybook:build"], { STORYBOOK_DOCS_URL: docsUrl })

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(docsOutputDir, { recursive: true })
cpSync(join(docsDir, "dist"), docsOutputDir, { recursive: true })
cpSync(
  join(docsDir, "../storybook/storybook-static"),
  join(docsOutputDir, "storybook"),
  { recursive: true },
)

console.log(
  `문서 ${docsUrl}/와 Storybook ${storybookUrl}을 amplify-dist에 모았습니다`,
)
