import { execFileSync } from "node:child_process"
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { packPackages } from "./pack-packages.mjs"

const KEEP_FLAG = "--keep"

const CONSUMER_VERSIONS = {
  react: "19.3.0",
  "react-dom": "19.3.0",
  vite: "7.3.7",
  tailwindcss: "4.3.3",
  "@tailwindcss/vite": "4.3.3",
  typescript: "5.9.3",
  "@types/react": "19.3.0",
  "@types/react-dom": "19.3.0",
}

const EXPECTED_CSS = [
  ".umc-button",
  ".umc-checkbox",
  "--umc-color-text-neutral-default-900",
  ".text-heading-2-bold",
  ".text-neutral-default-900",
  ".bg-surface-default",
  ".border-neutral-weak-200",
  "@font-face",
  ".bg-teal-500",
]

const FORBIDDEN_CSS = [".bg-indigo-500"]

const EXPECTED_FONT_ASSETS = [/pretendard.*\.woff2$/i, /orbitron.*\.woff2$/i]

const SERVER_RENDER_SCRIPT = `import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { Button } from "@umc-product/react"

const html = renderToString(createElement(Button, null, "확인"))
if (!html.includes("umc-button")) {
  throw new Error("서버 렌더링 결과에 umc-button이 없습니다: " + html)
}
`

const MAIN_TSX = `import { textStyleUtilities } from "@umc-product/design-tokens"
import { SearchIcon } from "@umc-product/icons"
import { Button, Checkbox, TextFieldBox } from "@umc-product/react"
import { createRoot } from "react-dom/client"

import "./app.css"

const styleCount: number = textStyleUtilities.length

function App() {
  return (
    <main className="bg-surface-default border border-neutral-weak-200 p-(--umc-spacing-padding-16)">
      <h1 className="text-heading-2-bold text-neutral-default-900">
        텍스트 스타일 {styleCount}개
      </h1>
      <TextFieldBox label="이름" placeholder="이름을 입력하세요" />
      <Checkbox defaultChecked>개인정보 수집 동의</Checkbox>
      <Button leadingIcon={<SearchIcon />}>검색</Button>
      <p className="bg-teal-500 bg-indigo-500">기본 팔레트 초기화</p>
    </main>
  )
}

const container = document.getElementById("root")
if (container === null) {
  throw new Error("root 요소가 없습니다")
}
createRoot(container).render(<App />)
`

const APP_CSS = `@import "tailwindcss";
@import "@umc-product/react/styles.css";
@import "@umc-product/design-tokens/tailwind.css";
`

const INDEX_HTML = `<!doctype html>
<html lang="ko">
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const VITE_CONFIG = `import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({ plugins: [tailwindcss()] })
`

const TSCONFIG = {
  compilerOptions: {
    target: "ES2022",
    module: "ESNext",
    moduleResolution: "bundler",
    jsx: "react-jsx",
    strict: true,
    noEmit: true,
    skipLibCheck: false,
    types: ["vite/client"],
  },
  include: ["src"],
}

const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, stdio: "inherit" })

const writeApp = (appDir, tarballs) => {
  const fileSpecOf = (name) =>
    `file:${tarballs.find((item) => item.name === name).tarball}`
  const dependencies = Object.fromEntries(
    tarballs.map(({ name }) => [name, fileSpecOf(name)]),
  )
  const manifest = {
    name: "umc-ds-smoke-consumer",
    private: true,
    type: "module",
    scripts: { build: "tsc && vite build" },
    dependencies: {
      ...dependencies,
      react: CONSUMER_VERSIONS.react,
      "react-dom": CONSUMER_VERSIONS["react-dom"],
    },
    devDependencies: {
      vite: CONSUMER_VERSIONS.vite,
      tailwindcss: CONSUMER_VERSIONS.tailwindcss,
      "@tailwindcss/vite": CONSUMER_VERSIONS["@tailwindcss/vite"],
      typescript: CONSUMER_VERSIONS.typescript,
      "@types/react": CONSUMER_VERSIONS["@types/react"],
      "@types/react-dom": CONSUMER_VERSIONS["@types/react-dom"],
    },
    pnpm: { overrides: dependencies },
  }
  mkdirSync(join(appDir, "src"), { recursive: true })
  writeFileSync(
    join(appDir, "package.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  )
  writeFileSync(
    join(appDir, "tsconfig.json"),
    `${JSON.stringify(TSCONFIG, null, 2)}\n`,
  )
  writeFileSync(join(appDir, "index.html"), INDEX_HTML)
  writeFileSync(join(appDir, "vite.config.ts"), VITE_CONFIG)
  writeFileSync(join(appDir, "src", "main.tsx"), MAIN_TSX)
  writeFileSync(join(appDir, "src", "app.css"), APP_CSS)
}

const assertBuiltAssets = (appDir) => {
  const assetsDir = join(appDir, "dist", "assets")
  const assetFiles = readdirSync(assetsDir)
  const css = assetFiles
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assetsDir, file), "utf8"))
    .join("\n")
  const missing = EXPECTED_CSS.filter((needle) => !css.includes(needle))
  if (missing.length > 0) {
    throw new Error(`빌드한 CSS에 없는 것: ${missing.join(", ")}`)
  }
  const leaked = FORBIDDEN_CSS.filter((needle) => css.includes(needle))
  if (leaked.length > 0) {
    throw new Error(`기본 팔레트가 지워지지 않았습니다: ${leaked.join(", ")}`)
  }
  const missingFonts = EXPECTED_FONT_ASSETS.filter(
    (pattern) => !assetFiles.some((file) => pattern.test(file)),
  )
  if (missingFonts.length > 0) {
    throw new Error(`빌드에 없는 글꼴: ${missingFonts.join(", ")}`)
  }
}

const assertServerRender = (appDir) =>
  run("node", ["--input-type=module", "-e", SERVER_RENDER_SCRIPT], appDir)

const assertPublishedDependencies = (tarballs, workDir) => {
  const extractDir = join(workDir, "extracted")
  mkdirSync(extractDir)
  for (const { name, tarball } of tarballs) {
    run("tar", ["-xzf", tarball, "-C", extractDir], workDir)
    const manifest = readFileSync(
      join(extractDir, "package", "package.json"),
      "utf8",
    )
    if (manifest.includes("workspace:")) {
      throw new Error(`${name}에 workspace: 의존성이 남아 있습니다`)
    }
    rmSync(join(extractDir, "package"), { recursive: true, force: true })
  }
}

const workDir = mkdtempSync(join(tmpdir(), "umc-ds-smoke-"))
const keep = process.argv.includes(KEEP_FLAG)
try {
  const packDir = join(workDir, "packs")
  const appDir = join(workDir, "app")
  mkdirSync(packDir)
  const tarballs = packPackages(packDir)
  assertPublishedDependencies(tarballs, workDir)
  writeApp(appDir, tarballs)
  run("pnpm", ["install", "--prefer-offline", "--ignore-workspace"], appDir)
  run("pnpm", ["run", "build"], appDir)
  assertBuiltAssets(appDir)
  assertServerRender(appDir)
  console.log("소비자 스모크 테스트 통과")
} finally {
  if (keep) {
    console.log(`작업 폴더를 남겼습니다: ${workDir}`)
  } else {
    rmSync(workDir, { recursive: true, force: true })
  }
}
