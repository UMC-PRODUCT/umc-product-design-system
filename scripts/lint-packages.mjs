import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { packageManifestOf, packPackages, repoRoot } from "./pack-packages.mjs"

const CSS_ENTRY_PATTERN = /\.css$/
const REQUIRED_FILES = ["package/LICENSE", "package/README.md"]

const run = (command, args) =>
  execFileSync(command, args, { cwd: repoRoot, stdio: "inherit" })

const cssEntrypointsOf = (directory) =>
  Object.keys(packageManifestOf(directory).exports).filter((entry) =>
    CSS_ENTRY_PATTERN.test(entry),
  )

const assertRequiredFiles = (name, tarball) => {
  const entries = new Set(
    execFileSync("tar", ["-tzf", tarball], { encoding: "utf8" }).split("\n"),
  )
  const missing = REQUIRED_FILES.filter((file) => !entries.has(file))
  if (missing.length > 0) {
    throw new Error(`${name} tarball에 없는 파일: ${missing.join(", ")}`)
  }
}

const packDir = mkdtempSync(join(tmpdir(), "umc-ds-lint-"))
try {
  for (const { directory, name, tarball } of packPackages(packDir)) {
    console.log(`\n${name}`)
    assertRequiredFiles(name, tarball)
    run("pnpm", ["exec", "publint", "run", tarball, "--strict"])
    const cssEntrypoints = cssEntrypointsOf(directory)
    run("pnpm", [
      "exec",
      "attw",
      tarball,
      "--profile",
      "esm-only",
      "--no-emoji",
      ...(cssEntrypoints.length > 0
        ? ["--exclude-entrypoints", ...cssEntrypoints]
        : []),
    ])
  }
} finally {
  rmSync(packDir, { recursive: true, force: true })
}
