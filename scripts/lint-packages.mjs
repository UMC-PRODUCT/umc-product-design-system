import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { packageManifestOf, packPackages, repoRoot } from "./pack-packages.mjs"

const CSS_ENTRY_PATTERN = /\.css$/

const run = (command, args) =>
  execFileSync(command, args, { cwd: repoRoot, stdio: "inherit" })

const cssEntrypointsOf = (directory) =>
  Object.keys(packageManifestOf(directory).exports).filter((entry) =>
    CSS_ENTRY_PATTERN.test(entry),
  )

const packDir = mkdtempSync(join(tmpdir(), "umc-ds-lint-"))
try {
  for (const { directory, name, tarball } of packPackages(packDir)) {
    console.log(`\n${name}`)
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
