import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const docsDir = fileURLToPath(new URL("..", import.meta.url))
const distDir = join(docsDir, "dist")
const snapshot = JSON.parse(
  readFileSync(join(docsDir, "src/data/figma-variants.json"), "utf8"),
)

const MARKER = /data-figma-set="([^"]+)"|data-figma-variant="([^"]+)"/g
const ENTITIES = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&lt;": "<",
  "&gt;": ">",
}

const decode = (value) =>
  value.replace(/&(?:amp|quot|#39|lt|gt);/g, (entity) => ENTITIES[entity])

const pageFiles = readdirSync(distDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith("index.html"))
  .map((file) => join(distDir, file))

const rendered = new Map()
for (const file of pageFiles) {
  let currentSet = ""
  for (const [, set, variant] of readFileSync(file, "utf8").matchAll(MARKER)) {
    if (set) {
      currentSet = set
      continue
    }
    const key = `${currentSet} › ${decode(variant)}`
    rendered.set(key, [...(rendered.get(key) ?? []), relative(distDir, file)])
  }
}

const expected = Object.entries(snapshot.sets).flatMap(([set, { variants }]) =>
  variants.map((name) => `${set} › ${name}`),
)
const expectedKeys = new Set(expected)
const missing = expected.filter((key) => !rendered.has(key))
const unknown = [...rendered.keys()].filter((key) => !expectedKeys.has(key))
const duplicated = [...rendered].filter(([, files]) => files.length > 1)

console.log(
  `피그마 변형 ${expected.length}개 중 ${expected.length - missing.length}개를 문서에 그렸습니다`,
)
for (const key of missing) console.log(`빠짐: ${key}`)
for (const key of unknown) console.log(`스냅샷에 없음: ${key}`)
for (const [key, files] of duplicated) {
  console.log(`두 번 이상 그림: ${key} (${files.join(", ")})`)
}
if (missing.length + unknown.length + duplicated.length > 0) {
  process.exitCode = 1
}
