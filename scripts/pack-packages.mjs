import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

export const repoRoot = fileURLToPath(new URL("..", import.meta.url))

export const PACKAGE_DIRECTORIES = ["design-tokens", "icons", "react"]

export const packageManifestOf = (directory) =>
  JSON.parse(
    readFileSync(join(repoRoot, "packages", directory, "package.json"), "utf8"),
  )

export const packPackages = (destination) => {
  for (const directory of PACKAGE_DIRECTORIES) {
    execFileSync("pnpm", ["pack", "--pack-destination", destination], {
      cwd: join(repoRoot, "packages", directory),
      stdio: ["ignore", "ignore", "inherit"],
    })
  }
  return PACKAGE_DIRECTORIES.map((directory) => {
    const { name, version } = packageManifestOf(directory)
    const fileName = `${name.replace("@", "").replace("/", "-")}-${version}.tgz`
    if (!readdirSync(destination).includes(fileName)) {
      throw new Error(`${fileName}을 만들지 못했습니다`)
    }
    return { directory, name, tarball: join(destination, fileName) }
  })
}
