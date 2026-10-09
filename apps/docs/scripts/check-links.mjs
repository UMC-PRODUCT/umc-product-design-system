import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const docsDir = fileURLToPath(new URL("..", import.meta.url))
const distDir = join(docsDir, "dist")
const BASE_PATH = "/umc-product-design-system"

const URL_TAG = /<(?:a|link|script|img|source|iframe)\b[^>]*>/gi
const URL_ATTRIBUTE = /\s(?:href|src)="([^"]*)"/g
const PREVIEW_LINK_MARKER = "data-preview-link"
const EXTERNAL_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i
const ENTITIES = { "&amp;": "&", "&quot;": '"', "&#39;": "'" }

const decode = (value) =>
  value.replace(/&(?:amp|quot|#39);/g, (entity) => ENTITIES[entity])

const pageUrlOf = (file) => {
  const path = relative(distDir, file).split("\\").join("/")
  const directory = path.endsWith("index.html")
    ? path.slice(0, -"index.html".length)
    : path
  return `${BASE_PATH}/${directory}`
}

const targetExists = (pathname) => {
  if (!pathname.startsWith(`${BASE_PATH}/`) && pathname !== BASE_PATH) {
    return false
  }
  const local = join(
    distDir,
    decodeURIComponent(pathname.slice(BASE_PATH.length)),
  )
  if (existsSync(local) && statSync(local).isFile()) {
    return true
  }
  return existsSync(join(local, "index.html"))
}

const htmlFiles = readdirSync(distDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".html"))
  .map((file) => join(distDir, file))

const broken = []
for (const file of htmlFiles) {
  const pageUrl = new URL(pageUrlOf(file), "https://docs.local")
  for (const [tag] of readFileSync(file, "utf8").matchAll(URL_TAG)) {
    if (tag.includes(PREVIEW_LINK_MARKER)) {
      continue
    }
    for (const [, rawUrl] of tag.matchAll(URL_ATTRIBUTE)) {
      const url = decode(rawUrl)
      if (url === "" || EXTERNAL_URL.test(url)) {
        continue
      }
      const { pathname } = new URL(url, pageUrl)
      if (!targetExists(pathname)) {
        broken.push(`${relative(distDir, file)}: ${url}`)
      }
    }
  }
}

if (broken.length > 0) {
  console.error(`깨진 내부 링크 ${broken.length}건`)
  for (const entry of [...new Set(broken)]) {
    console.error(`  ${entry}`)
  }
  process.exit(1)
}
console.log(`HTML ${htmlFiles.length}개의 내부 링크를 모두 확인했습니다`)
