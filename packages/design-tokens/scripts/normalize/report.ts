import type { ManifestSource } from "../shared/manifest.ts"
import type { FontCrossCheck } from "./font-check.ts"
import type { Exclusion, RuleStatus, VariableRule } from "./rules.ts"
import type { TextStyleWarning } from "./text-styles.ts"
import type {
  CodeSyntaxDuplicate,
  VariableMapping,
  VariableWarning,
} from "./variables.ts"

const STATUS_LABEL: Record<RuleStatus, string> = {
  pending: "확인 대기",
  accepted: "확정",
  "changed-in-figma": "피그마 반영됨",
}

export type ExportCount = {
  file: string
  count: number
  previous: number | undefined
}

export type ReportInput = {
  sources: readonly ManifestSource[]
  counts: readonly ExportCount[]
  questions: readonly string[]
  rules: readonly VariableRule[]
  variableExclusions: readonly Exclusion[]
  codeSyntaxDuplicates: readonly CodeSyntaxDuplicate[]
  scopeWarnings: readonly VariableWarning[]
  composedSemantics: readonly string[]
  fontCrossCheck: FontCrossCheck
  textStyleExclusions: readonly Exclusion[]
  textStyleWarnings: readonly TextStyleWarning[]
  mappings: readonly VariableMapping[]
}

const cell = (value: string): string => value.replaceAll("|", "\\|")

const code = (value: string): string => `\`${value}\``

const table = (headers: string[], rows: string[][]): string[] =>
  rows.length === 0
    ? ["없음"]
    : [
        `| ${headers.join(" | ")} |`,
        `| ${headers.map(() => "---").join(" | ")} |`,
        ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
      ]

const section = (title: string, lines: string[]): string[] => [
  `## ${title}`,
  "",
  ...lines,
  "",
]

const exclusionRows = (exclusions: readonly Exclusion[]): string[][] =>
  exclusions.map((exclusion) => [
    code(exclusion.figmaName),
    exclusion.reason,
    STATUS_LABEL[exclusion.status],
  ])

export const renderNormalizationReport = (input: ReportInput): string => {
  const lines = [
    "# 피그마 정규화 리포트",
    "",
    "`pnpm tokens:normalize`가 만드는 파일이다. 손으로 고치지 않는다. 규칙은 `scripts/normalize/rules.ts`에서 바꾼다.",
    "",
    ...section(
      "입력",
      table(
        ["파일", "출처", "노드 또는 원래 이름", "받은 날"],
        input.sources.map((source) => [
          code(source.file),
          source.tool,
          source.nodeId ?? source.originalName ?? "-",
          source.fetchedAt,
        ]),
      ),
    ),
    ...section(
      "변수 개수",
      table(
        ["export 파일", "변수", "이전 스냅샷"],
        input.counts.map((count) => [
          code(count.file),
          String(count.count),
          count.previous === undefined ? "-" : String(count.previous),
        ]),
      ),
    ),
    ...section(
      "디자인 팀 확인 요청",
      input.questions.map((question, index) => `${index + 1}. ${question}`),
    ),
    ...section(
      "변수 이름 규칙",
      table(
        ["피그마 이름", "방식", "토큰 경로", "이유", "상태"],
        input.rules.map((rule) => [
          code(rule.figmaName),
          rule.match === "exact" ? "정확 일치" : "접두사",
          code(rule.tokenPath.join(".")),
          rule.reason,
          STATUS_LABEL[rule.status],
        ]),
      ),
    ),
    ...section(
      "제외한 변수",
      table(
        ["피그마 이름", "이유", "상태"],
        exclusionRows(input.variableExclusions),
      ),
    ),
    ...section(
      "codeSyntax(WEB) 중복",
      table(
        ["codeSyntax", "변수 수", "피그마 변수"],
        input.codeSyntaxDuplicates.map((duplicate) => [
          code(duplicate.codeSyntax),
          String(duplicate.figmaNames.length),
          duplicate.figmaNames.map(code).join(", "),
        ]),
      ),
    ),
    ...section(
      "scope 경고",
      table(
        ["피그마 이름", "내용"],
        input.scopeWarnings.map((warning) => [
          code(warning.figmaName),
          warning.message,
        ]),
      ),
    ),
    ...section("참조가 아닌 semantic", [
      "primitive를 참조하지 않고 값을 직접 가진 semantic이다. 투명도가 있으면 8자리 hex로 옮겼다.",
      "",
      ...input.composedSemantics.map((name) => `- ${code(name)}`),
    ]),
    ...section("타이포 교차 확인", [
      "텍스트 스타일 원문(MCP)이 참조하는 변수 값은 export 값과 모두 같다.",
      "",
      `- export에 없는 변수 이름: ${input.fontCrossCheck.mcpOnlyVariables.map(code).join(", ") || "없음"}`,
      `- 어떤 텍스트 스타일도 쓰지 않는 토큰: ${input.fontCrossCheck.unusedFontTokens.map(code).join(", ") || "없음"}`,
    ]),
    ...section(
      "제외한 텍스트 스타일",
      table(
        ["피그마 이름", "이유", "상태"],
        exclusionRows(input.textStyleExclusions),
      ),
    ),
    ...section(
      "텍스트 스타일 경고",
      table(
        ["피그마 이름", "내용"],
        input.textStyleWarnings.map((warning) => [
          code(warning.figmaName),
          warning.message,
        ]),
      ),
    ),
    ...section(
      "이름 대응표",
      table(
        ["피그마 변수", "코드 토큰", "토큰 파일"],
        input.mappings.map((mapping) => [
          code(mapping.figmaName),
          code(mapping.tokenPath),
          mapping.file,
        ]),
      ),
    ),
  ]
  return `${lines.join("\n").trimEnd()}\n`
}
