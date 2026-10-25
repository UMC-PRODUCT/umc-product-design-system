import { readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { repoRoot } from "./pack-packages.mjs"

export const PACKAGES_IN_DISPLAY_ORDER = ["react", "icons", "design-tokens"]

const REPO_URL = "https://github.com/UMC-PRODUCT/umc-product-design-system"
const CHANGELOG_PAGE_URL =
  "https://design.university.neordinary.com/releases/changelog/"

const VERSION_HEADING = /^## (\d+\.\d+\.\d+)(?: \((\d{4}-\d{2}-\d{2})\))?$/
const CHANGE_SECTION = /^### (Major|Minor|Patch) Changes$/
const CHANGESET_ENTRY = /^- (?:([0-9a-f]{7,40}): )?(.*)$/
const DEPENDENCY_NOTE = /^(?:Updated dependencies|@[\w-]+\/[\w-]+@\d)/

const KIND_BY_TAG = [
  ["**깨지는 변경** ", "breaking"],
  ["**화면 변화** ", "visual"],
]
const KIND_BY_SECTION = { Major: "breaking", Minor: "feature", Patch: "fix" }
export const KIND_LABELS = [
  ["breaking", "깨지는 변경"],
  ["feature", "새 기능"],
  ["visual", "화면 변화"],
  ["fix", "수정"],
]
const KINDS_NEEDING_LATEST = new Set(["breaking", "feature"])

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

export const collectReleases = () => {
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

export const firstSentenceOf = (text) => {
  const paragraph = text.split("\n\n")[0].replace(/\n/g, " ").trim()
  let inCode = false
  for (let index = 0; index < paragraph.length; index += 1) {
    const char = paragraph[index]
    if (char === "`") inCode = !inCode
    if (inCode || char !== ".") continue
    const next = paragraph[index + 1]
    if (next === undefined || /\s/.test(next)) {
      return paragraph.slice(0, index + 1)
    }
  }
  return paragraph
}

const hasDetails = (text) => firstSentenceOf(text) !== text.trim()

const changelogAnchorOf = ({ version, date }) =>
  [version, ...(date === undefined ? [] : [`(${date})`])]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/ /g, "-")

const packagesOf = (release) => {
  const touched = new Set()
  for (const change of release.changes.values()) {
    for (const directory of change.packages) touched.add(directory)
  }
  return PACKAGES_IN_DISPLAY_ORDER.filter((directory) => touched.has(directory))
}

export const groupsOf = (release) =>
  KIND_LABELS.map(([kind, label]) => ({
    kind,
    label,
    changes: [...release.changes.values()].filter(
      (change) => change.kind === kind,
    ),
  })).filter((group) => group.changes.length > 0)

export const summaryLineOf = (release) =>
  [
    `<b>${release.version}</b>`,
    ...(release.date === undefined ? [] : [release.date]),
    ...groupsOf(release).map(
      (group) => `${group.label} ${group.changes.length}`,
    ),
  ].join(" · ")

const changelogLinksOf = (release, { absolute }) =>
  packagesOf(release)
    .map((directory) => {
      const path = `packages/${directory}/CHANGELOG.md#${changelogAnchorOf(release)}`
      return `[${directory}](${absolute ? `${REPO_URL}/blob/main/${path}` : path})`
    })
    .join(" · ")

export const renderReadmeRelease = (release, index) => {
  const body = groupsOf(release)
    .map((group) =>
      [
        `**${group.label}**`,
        group.changes
          .map(
            (change) =>
              `- **${change.packages.join(" · ")}** ${firstSentenceOf(change.text)}`,
          )
          .join("\n"),
      ].join("\n\n"),
    )
    .join("\n\n")
  const details =
    release.changes.size > 0 &&
    [...release.changes.values()].some((change) => hasDetails(change.text))
  return [
    index === 0 ? "<details open>" : "<details>",
    `<summary>${summaryLineOf(release)}</summary>`,
    "",
    body,
    ...(details
      ? ["", `전문과 대응표: ${changelogLinksOf(release, { absolute: false })}`]
      : []),
    "",
    "</details>",
  ].join("\n")
}

const indentDetails = (text) =>
  text
    .split("\n")
    .map((line, index) => (index === 0 ? line : line.replace(/^  /, "")))
    .join("\n")

export const renderGithubRelease = (release) => {
  const groups = groupsOf(release)
  const needsLatest = groups.some((group) =>
    KINDS_NEEDING_LATEST.has(group.kind),
  )
  const upgrade = needsLatest
    ? 'pnpm up "@umc-product/*" --latest'
    : 'pnpm up "@umc-product/*"'
  const glance = groups.map((group) =>
    [
      `**${group.label}**`,
      ...group.changes.map(
        (change) =>
          `- ${change.packages.join(", ")}: ${firstSentenceOf(change.text)}`,
      ),
    ].join("\n"),
  )
  const detailed = groups
    .filter((group) => group.kind === "breaking" || group.kind === "visual")
    .map((group) =>
      [
        `### ${group.label}`,
        ...group.changes.map(
          (change) =>
            `- **${change.packages.join(", ")}** ${indentDetails(change.text)}`,
        ),
      ].join("\n\n"),
    )
  const packageList = PACKAGES_IN_DISPLAY_ORDER.map(
    (directory) => `\`@umc-product/${directory}@${release.version}\``,
  ).join(", ")
  return [
    "## 이번 배포 한눈에",
    "",
    glance.join("\n\n"),
    "",
    "## 개발자가 올릴 때 할 일",
    "",
    `세 패키지를 함께 ${release.version}으로 올립니다(${packageList}).`,
    "",
    "```bash",
    upgrade,
    "```",
    ...(detailed.length > 0 ? ["", detailed.join("\n\n")] : []),
    "",
    `전체 변경 기록: [문서 사이트](${CHANGELOG_PAGE_URL}) · ${changelogLinksOf(release, { absolute: true })}`,
    "",
  ].join("\n")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const requested = process.argv[2]
  const releases = collectReleases()
  const release =
    requested === undefined
      ? releases[0]
      : releases.find((candidate) => candidate.version === requested)
  if (release === undefined) {
    console.error(`CHANGELOG에 ${requested} 버전이 없습니다`)
    process.exit(1)
  }
  process.stdout.write(renderGithubRelease(release))
}
