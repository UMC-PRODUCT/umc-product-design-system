import {
  listExportFiles,
  parseFigmaAlias,
  PREVIOUS_SNAPSHOT_COUNT,
  readFigmaExport,
} from "./normalize/figma-export.ts"

const exportFiles = listExportFiles()
if (exportFiles.length === 0) {
  console.error("figma/export/에 피그마 Variables JSON이 없습니다")
  process.exit(1)
}

const variables = readFigmaExport()
const variableNames = new Set(variables.map((variable) => variable.name))

for (const fileName of exportFiles) {
  const fileVariables = variables.filter(
    (variable) => variable.sourceFile === fileName,
  )
  const countByType = Object.groupBy(fileVariables, (variable) => variable.type)
  const aliasCount = fileVariables.filter(
    (variable) =>
      typeof variable.value === "string" && parseFigmaAlias(variable.value),
  ).length
  const previous = PREVIOUS_SNAPSHOT_COUNT[fileName]
  console.log(
    `${fileName}: ${fileVariables.length}개 (이전 스냅샷 ${previous ?? "없음"}), ` +
      Object.entries(countByType)
        .map(([type, items]) => `${type} ${items?.length ?? 0}`)
        .join(", ") +
      `, 참조 ${aliasCount}개`,
  )
}

const unresolvedAliases = variables.flatMap((variable) => {
  const target =
    typeof variable.value === "string" ? parseFigmaAlias(variable.value) : null
  return target && !variableNames.has(target)
    ? [`${variable.name} → ${target}`]
    : []
})

const codeSyntaxGroups = Object.entries(
  Object.groupBy(
    variables.filter((variable) => variable.webCodeSyntax !== undefined),
    (variable) => variable.webCodeSyntax ?? "",
  ),
).filter(([, items]) => (items?.length ?? 0) > 1)

console.log(
  `codeSyntax(WEB) 중복: ${codeSyntaxGroups.length}종이 둘 이상의 변수에 붙어 있습니다`,
)

if (unresolvedAliases.length > 0) {
  console.error("풀리지 않는 참조가 있습니다:")
  for (const line of unresolvedAliases) {
    console.error(`- ${line}`)
  }
  process.exit(1)
}

console.log("검사 통과: 스키마, srgb 색, 참조가 모두 정상입니다")
