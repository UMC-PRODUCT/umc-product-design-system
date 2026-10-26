import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

import { repoRoot } from "./pack-packages.mjs"

export const PACKAGES_IN_DISPLAY_ORDER = ["react", "icons", "design-tokens"]

const REPO_URL = "https://github.com/UMC-PRODUCT/umc-product-design-system"
const DOCS_URL = "https://design.university.neordinary.com"
const CHANGELOG_PAGE_URL = `${DOCS_URL}/releases/changelog/`
const REACT_SOURCE_DIR = join(repoRoot, "packages/react/src")

const VERSION_HEADING = /^## (\d+\.\d+\.\d+)(?: \((\d{4}-\d{2}-\d{2})\))?$/
const CHANGE_SECTION = /^### (Major|Minor|Patch) Changes$/
const CHANGESET_ENTRY = /^- (?:([0-9a-f]{7,40}): )?(.*)$/
const DEPENDENCY_NOTE = /^(?:Updated dependencies|@[\w-]+\/[\w-]+@\d)/
const STRUCTURED_SUMMARY =
  /^(?<where>[^:]+?): (?<what>.+?)(?: \((?<delta>[^()]*→[^()]*)\))?\.$/u
const COMPONENT_MENTION = /`([A-Z][A-Za-z0-9]+)`/g
const MAX_DOCS_LINKS = 4
const TABLE_HEADER = [
  "| 대상 | 변경사항 | 변경&nbsp;전&nbsp;→&nbsp;변경&nbsp;후 | 보기 |",
  "| --- | --- | --- | --- |",
]

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

export const summaryOf = (text) => {
  const sentence = firstSentenceOf(text)
  const structured = sentence.match(STRUCTURED_SUMMARY)
  if (structured === null) {
    return { where: "", what: sentence.replace(/\.$/, ""), delta: "" }
  }
  const { where, what, delta = "" } = structured.groups
  return { where, what, delta }
}

let componentPages
const componentPagesOf = () => {
  if (componentPages !== undefined) return componentPages
  componentPages = new Map()
  const entries = readdirSync(REACT_SOURCE_DIR, {
    recursive: true,
    withFileTypes: true,
  })
  for (const entry of entries) {
    if (entry.name !== "figma-spec.json") continue
    const directory = entry.parentPath ?? entry.path
    const spec = JSON.parse(readFileSync(join(directory, entry.name), "utf8"))
    if (spec.page !== undefined) componentPages.set(spec.component, spec.page)
  }
  return componentPages
}

const UNCHANGED_SENTENCE = /그대로|바뀌지 않|남깁니다|남겼습니다/

const changedSentencesOf = (text) =>
  text
    .split(/(?<=\.)\s+/)
    .filter((sentence) => !UNCHANGED_SENTENCE.test(sentence))
    .join(" ")

export const docsLinksOf = (text) => {
  const pages = componentPagesOf()
  const mentioned = [
    ...changedSentencesOf(text).matchAll(COMPONENT_MENTION),
  ].map(([, name]) => name)
  const names = [...new Set(mentioned)].filter((name) => pages.has(name))
  const shown = names
    .slice(0, MAX_DOCS_LINKS)
    .map((name) => `[${name}](${DOCS_URL}${pages.get(name)})`)
  const hidden = names.length - shown.length
  return [...shown, ...(hidden > 0 ? [`외 ${hidden}`] : [])].join(" · ")
}

const cellOf = (value) => value.replace(/\|/g, "\\|")

export const tableOf = (changes) =>
  [
    ...TABLE_HEADER,
    ...changes.map((change) => {
      const { where, what, delta } = summaryOf(change.text)
      return `| ${cellOf(where)} | ${cellOf(what)} | ${cellOf(delta)} | ${docsLinksOf(change.text)} |`
    }),
  ].join("\n")

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
      [`**${group.label}**`, "", tableOf(group.changes)].join("\n"),
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

export const renderGithubRelease = (release, extraSections = []) => {
  const groups = groupsOf(release)
  const breaking = groups.find((group) => group.kind === "breaking")
  const needsLatest = groups.some((group) =>
    KINDS_NEEDING_LATEST.has(group.kind),
  )
  const upgrade = needsLatest
    ? 'pnpm up "@umc-product/*" --latest'
    : 'pnpm up "@umc-product/*"'
  const tables = groups.map((group) =>
    [`### ${group.label}`, "", tableOf(group.changes)].join("\n"),
  )
  const packageList = PACKAGES_IN_DISPLAY_ORDER.map(
    (directory) => `\`@umc-product/${directory}@${release.version}\``,
  ).join(", ")
  return [
    "## 이번 배포에서 달라지는 것",
    "",
    tables.join("\n\n"),
    "",
    ...(breaking === undefined
      ? ["깨지는 변경은 없습니다. 올려도 고칠 코드가 없습니다.", ""]
      : [
          "## 올릴 때 반드시 확인",
          "",
          "깨지는 변경입니다. 올리기 전에 아래 대응표대로 코드를 고칩니다.",
          "",
          ...breaking.changes.map(
            (change) => `- ${indentDetails(change.text)}`,
          ),
          "",
        ]),
    ...extraSections,
    "## 개발자",
    "",
    `세 패키지를 함께 ${release.version}으로 올립니다(${packageList}).`,
    "",
    "```bash",
    upgrade,
    "```",
    "",
    `전체 변경 기록: [문서 사이트](${CHANGELOG_PAGE_URL}) · ${changelogLinksOf(release, { absolute: true })}`,
    "",
  ].join("\n")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [requested, screensPath] = process.argv.slice(2)
  const releases = collectReleases()
  const release =
    requested === undefined
      ? releases[0]
      : releases.find((candidate) => candidate.version === requested)
  if (release === undefined) {
    console.error(`CHANGELOG에 ${requested} 버전이 없습니다`)
    process.exit(1)
  }
  const extraSections =
    screensPath === undefined
      ? []
      : ["## 전후 화면", "", readFileSync(screensPath, "utf8").trim(), ""]
  process.stdout.write(renderGithubRelease(release, extraSections))
}
