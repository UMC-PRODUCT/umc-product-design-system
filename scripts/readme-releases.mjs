import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { format, resolveConfig } from "prettier"

import { repoRoot } from "./pack-packages.mjs"

const PACKAGES_IN_DISPLAY_ORDER = ["react", "icons", "design-tokens"]
const README_PATH = join(repoRoot, "README.md")
const START_MARKER = "<!-- releases:start -->"
const END_MARKER = "<!-- releases:end -->"

const VERSION_HEADING = /^## (\d+\.\d+\.\d+)(?: \((\d{4}-\d{2}-\d{2})\))?$/
const CHANGE_SECTION = /^### (Major|Minor|Patch) Changes$/
const CHANGESET_ENTRY = /^- (?:([0-9a-f]{7,40}): )?(.*)$/
const DEPENDENCY_NOTE = /^(?:Updated dependencies|@[\w-]+\/[\w-]+@\d)/

const KIND_BY_TAG = [
  ["**깨지는 변경** ", "breaking"],
  ["**화면 변화** ", "visual"],
]
const KIND_BY_SECTION = { Major: "breaking", Minor: "feature", Patch: "fix" }
const KIND_LABELS = [
  ["breaking", "깨지는 변경"],
  ["feature", "새 기능"],
  ["visual", "화면 변화"],
  ["fix", "수정"],
]

const parseChangelog = (markdown) => {
  const releases = []
  let release
  let section
  let entry
  for (const line of markdown.split("\n")) {
    const heading = line.match(VERSION_HEADING)
    if (heading) {
      release = { version: heading[1], date: heading[2], entries: [] }
      releases.push(release)
      section = undefined
      entry = undefined
      continue
    }
    const changeSection = line.match(CHANGE_SECTION)
    if (changeSection) {
      section = changeSection[1]
      entry = undefined
      continue
    }
    const changeset = section === undefined ? null : line.match(CHANGESET_ENTRY)
    if (changeset !== null && DEPENDENCY_NOTE.test(changeset[2])) {
      entry = undefined
      continue
    }
    if (changeset !== null) {
      entry = { hash: changeset[1], section, lines: [changeset[2]] }
      release.entries.push(entry)
      continue
    }
    if (entry !== undefined && (line === "" || line.startsWith("  "))) {
      entry.lines.push(line)
      continue
    }
    entry = undefined
  }
  return releases
}

const changeOf = ({ section, lines: [firstLine, ...restLines] }) => {
  const tagged = KIND_BY_TAG.find(([tag]) => firstLine.startsWith(tag))
  const summaryLine =
    tagged === undefined ? firstLine : firstLine.slice(tagged[0].length)
  return {
    kind: tagged === undefined ? KIND_BY_SECTION[section] : tagged[1],
    text: [summaryLine, ...restLines].join("\n").trimEnd(),
  }
}

const compareVersionsDescending = (left, right) => {
  const leftParts = left.split(".").map(Number)
  const rightParts = right.split(".").map(Number)
  return (
    leftParts
      .map((part, index) => rightParts[index] - part)
      .find((difference) => difference !== 0) ?? 0
  )
}

const collectReleases = () => {
  const releases = new Map()
  for (const directory of PACKAGES_IN_DISPLAY_ORDER) {
    const changelog = readFileSync(
      join(repoRoot, "packages", directory, "CHANGELOG.md"),
      "utf8",
    )
    for (const { version, date, entries } of parseChangelog(changelog)) {
      const release = releases.get(version) ?? {
        version,
        date,
        changes: new Map(),
      }
      release.date ??= date
      releases.set(version, release)
      for (const entry of entries) {
        const { kind, text } = changeOf(entry)
        const key = `${entry.hash ?? ""}:${text}`
        const change = release.changes.get(key) ?? { kind, text, packages: [] }
        change.packages.push(directory)
        release.changes.set(key, change)
      }
    }
  }
  return [...releases.values()].sort((left, right) =>
    compareVersionsDescending(left.version, right.version),
  )
}

const renderRelease = ({ version, date, changes }, index) => {
  const groups = KIND_LABELS.map(([kind, label]) => ({
    label,
    changes: [...changes.values()].filter((change) => change.kind === kind),
  })).filter((group) => group.changes.length > 0)
  const summary = [
    `<b>${version}</b>`,
    ...(date === undefined ? [] : [date]),
    ...groups.map((group) => `${group.label} ${group.changes.length}`),
  ].join(" · ")
  const body = groups
    .map((group) =>
      [
        `**${group.label}**`,
        group.changes
          .map(
            (change) => `- **${change.packages.join(" · ")}** ${change.text}`,
          )
          .join("\n"),
      ].join("\n\n"),
    )
    .join("\n\n")
  return [
    index === 0 ? "<details open>" : "<details>",
    `<summary>${summary}</summary>`,
    "",
    body,
    "",
    "</details>",
  ].join("\n")
}

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
const section = [START_MARKER, ...releases.map(renderRelease), END_MARKER].join(
  "\n\n",
)
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
