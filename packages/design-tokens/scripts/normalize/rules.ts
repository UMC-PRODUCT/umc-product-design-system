import type { TokenPath } from "../shared/naming.ts"
import type { TokenFileName } from "../shared/token-files.ts"

export type RuleStatus = "pending" | "accepted" | "changed-in-figma"

export type ValueKind = "color" | "px" | "font-weight" | "font-family"

export type VariableRule = {
  figmaName: string
  match: "exact" | "prefix"
  file: TokenFileName
  tokenPath: TokenPath
  kind: ValueKind
  reason: string
  status: RuleStatus
}

export type Exclusion = {
  figmaName: string
  reason: string
  status: RuleStatus
}

export const VARIABLE_RULES: readonly VariableRule[] = [
  {
    figmaName: "Semantic/Fill/Disabled/Disalbed",
    match: "exact",
    file: "color.semantic.json",
    tokenPath: ["color", "fill", "disabled"],
    kind: "color",
    reason: "오타 Disalbed를 뺀 Disabled 한 단계로 읽음",
    status: "pending",
  },
  {
    figmaName: "Semantic/Border/Disabled/Disalbed",
    match: "exact",
    file: "color.semantic.json",
    tokenPath: ["color", "border", "disabled"],
    kind: "color",
    reason: "오타 Disalbed를 뺀 Disabled 한 단계로 읽음",
    status: "pending",
  },
  {
    figmaName: "Primitives/Base/",
    match: "prefix",
    file: "color.primitive.json",
    tokenPath: ["color"],
    kind: "color",
    reason: "흰색과 검은색은 color 바로 아래에 둠",
    status: "accepted",
  },
  {
    figmaName: "Primitives/Grey/TealGrey-",
    match: "prefix",
    file: "color.primitive.json",
    tokenPath: ["color", "teal-grey"],
    kind: "color",
    reason: "Grey 그룹의 TealGrey 팔레트를 teal-grey로 둠",
    status: "accepted",
  },
  {
    figmaName: "Primitives/",
    match: "prefix",
    file: "color.primitive.json",
    tokenPath: ["color"],
    kind: "color",
    reason: "팔레트 이름 반복 제거(Teal/Teal-500 → teal.500)",
    status: "accepted",
  },
  {
    figmaName: "Semantic/",
    match: "prefix",
    file: "color.semantic.json",
    tokenPath: ["color"],
    kind: "color",
    reason:
      "피그마 이름 그대로, 단계 숫자도 남김(Neutral-Weak-400 → neutral-weak-400)",
    status: "accepted",
  },
  {
    figmaName: "Typography/Base/FontSize/",
    match: "prefix",
    file: "font.json",
    tokenPath: ["font-size"],
    kind: "px",
    reason: "타이포 기본 크기",
    status: "accepted",
  },
  {
    figmaName: "Typography/Base/FontWeight/",
    match: "prefix",
    file: "font.json",
    tokenPath: ["font-weight"],
    kind: "font-weight",
    reason: "타이포 기본 굵기, 이름을 숫자로 바꿈",
    status: "accepted",
  },
  {
    figmaName: "Typography/Base/Fontweight/",
    match: "prefix",
    file: "font.json",
    tokenPath: ["font-weight"],
    kind: "font-weight",
    reason: "export에 없는 대소문자 변형, Display/3-Bold만 참조",
    status: "pending",
  },
  {
    figmaName: "Typography/Base/FontFamily/",
    match: "prefix",
    file: "font.json",
    tokenPath: ["font-family"],
    kind: "font-family",
    reason: "타이포 기본 서체",
    status: "accepted",
  },
  {
    figmaName: "Typography/Base/Fontfamily/",
    match: "prefix",
    file: "font.json",
    tokenPath: ["font-family"],
    kind: "font-family",
    reason: "export에 없는 대소문자 변형, Display/3-Bold만 참조",
    status: "pending",
  },
  {
    figmaName: "Spacing/Primitive/",
    match: "prefix",
    file: "spacing.json",
    tokenPath: ["spacing"],
    kind: "px",
    reason: "간격 기본 값",
    status: "accepted",
  },
  {
    figmaName: "Spacing/Semantic/",
    match: "prefix",
    file: "spacing.json",
    tokenPath: ["spacing"],
    kind: "px",
    reason: "그룹 이름 반복 제거(Padding/Padding 16 → padding.16)",
    status: "accepted",
  },
  {
    figmaName: "Radius/Primitive/",
    match: "prefix",
    file: "radius.json",
    tokenPath: ["radius"],
    kind: "px",
    reason: "모서리 기본 값",
    status: "accepted",
  },
  {
    figmaName: "Radius/Semantic/Button/R Button ",
    match: "prefix",
    file: "radius.json",
    tokenPath: ["radius", "button"],
    kind: "px",
    reason: "R Button 접두어 제거(R Button 12 → button.12)",
    status: "pending",
  },
  {
    figmaName: "Radius/Semantic/",
    match: "prefix",
    file: "radius.json",
    tokenPath: ["radius"],
    kind: "px",
    reason: "그룹 이름 반복 제거(Toast/Toast → toast)",
    status: "accepted",
  },
]

export const EXCLUDED_VARIABLES: readonly Exclusion[] = [
  {
    figmaName: "Label",
    reason: "용도를 알 수 없는 문자열 변수이고 ALL_SCOPES",
    status: "pending",
  },
  {
    figmaName: "Radius/Primitive/48",
    reason: "Radius 그룹인데 문자열 타입이고 FONT_FAMILY scope",
    status: "pending",
  },
]

export const EXCLUDED_TEXT_STYLES: readonly Exclusion[] = [
  {
    figmaName: "Heading/Heading3-Semibold",
    reason: "이름 규칙 밖이고 22px 크기가 변수에 연결되지 않음",
    status: "pending",
  },
  {
    figmaName: "Mobile Web/Body/4-Regular",
    reason: "Mobile Web 별도 이름 공간이고 행간이 20px 고정값",
    status: "pending",
  },
]

export const FONT_WEIGHT_BY_NAME: Readonly<Record<string, number>> = {
  Bold: 700,
  SemiBold: 600,
  Semibold: 600,
  Medium: 500,
  Regular: 400,
}

export type StyleSourceRule = {
  file: string
  nodeName: string
  reason: string
}

export const MCP_STYLE_SOURCES: readonly StyleSourceRule[] = [
  {
    file: "get-variable-defs.2268-1706.json",
    nodeName: "Mobile.Web Typography",
    reason: "텍스트 스타일 기준 원문. 같은 이름이면 이 정의가 이긴다",
  },
  {
    file: "get-variable-defs.2858-65987.json",
    nodeName: "Web/Header",
    reason: "Drop/Neutral_3, Inner/Neutral_2, Title/3-Medium",
  },
  {
    file: "get-variable-defs.2621-33487.json",
    nodeName: "Toast",
    reason: "Drop/Neutral_1, Inner/Neutral_1",
  },
  {
    file: "get-variable-defs.2621-36220.json",
    nodeName: "Tooltip",
    reason: "Caption/2-Bold",
  },
  {
    file: "get-variable-defs.3155-19976.json",
    nodeName: "Dialog",
    reason: "Title/2-Semibold",
  },
  {
    file: "get-variable-defs.3155-19501.json",
    nodeName: "App/Top Navigation",
    reason: "Title/1-Semibold",
  },
  {
    file: "get-variable-defs.2621-32882.json",
    nodeName: "Option Button",
    reason: "Title/2-Medium, Drop/Neutral_2",
  },
]

export const EFFECT_STYLES: readonly string[] = [
  "Shadow/Drop/Neutral_1",
  "Shadow/Drop/Neutral_2",
  "Shadow/Drop/Neutral_3",
  "Shadow/Inner/Neutral_1",
  "Shadow/Inner/Neutral_2",
]

export const OPEN_QUESTIONS: readonly string[] = [
  "codeSyntax(WEB)가 여러 변수에 중복으로 붙어 있습니다. 예를 들어 `var(--color-border-default)`는 `Border/Neutral/Medium-300`(회색)과 `Border/Primary/Weak-200`(틸)에 함께 붙어 있습니다. Dev Mode 코드 패널과 피그마 MCP는 이 이름을 보여 주는데, 코드의 CSS 변수(`--umc-color-…`)와 다른 이름이라 개발자와 AI 도구가 길을 잃습니다. 아래 '이름 대응표와 codeSyntax 제안'의 제안 값(`var(--umc-color-…)`)으로 바꿔 줄 수 있나요? primitive와 Token 컬렉션 변수에도 같은 규칙으로 넣어 주시면 Dev Mode에 보이는 이름이 코드와 같아집니다.",
  "`Fill/Disabled/Disalbed`, `Border/Disabled/Disalbed`의 오타를 빼고 `fill.disabled`, `border.disabled`로 읽었습니다. 피그마 이름도 고칠 수 있나요?",
  "같은 틸 역할을 Fill과 Border는 `Primary`, Background, Surface, Text, Icon은 `Brand`로 부릅니다. 한 이름으로 맞출 수 있나요?",
  "`Display/3-Bold`가 Token 컬렉션에 없는 `Typography/Base/Fontfamily/Brand`, `Fontweight/Bold`를 참조합니다(다른 라이브러리 변수로 보입니다). `FontFamily`, `FontWeight`로 다시 연결해 주세요.",
  "Primitive 컬러 문서 프레임에 쓰인 `primitives/orange/*`, `Base/Grey/Grey 900`, `Grey 800`, `Medium/H1`(PingFang SC)은 Color 컬렉션 export에 없습니다. 다른 라이브러리 것인지, 정리 대상인지 알려 주세요.",
  "Violet, Purple, Pink, Cobalt, Blue, Brown 팔레트에는 50, 100, 500, 600 단계만 있습니다. 의도인가요?",
  "`Body/4-Semibold`(13px), `Label/2`(17px), `Caption/3`(11px)의 크기가 변수에 연결되어 있지 않습니다. 17px은 `FontSize` 변수가 없으니 추가가 필요합니다. 반대로 `FontSize/22px`, `32px`은 어떤 텍스트 스타일에도 쓰이지 않습니다.",
  "`Heading/Heading3-Semibold`(22px), `Mobile Web/Body/4-Regular`(행간 20px)는 폐기 대상인가요? 노드 2268:1706에 쓰인 텍스트 스타일이 전체 목록인지도 알려 주세요.",
  "Display 3 문서 표에는 자간이 -2%로 적혀 있지만 실제 스타일 `Display/3-Bold`는 -1.5%입니다. 어느 쪽이 맞나요?",
  "`Tag/Role/Challenger&Super-Admin`과 `Tag/Role/Product`는 Weak와 Medium이 같은 색입니다(Teal-100, TealGrey-100). 의도인가요?",
  "`Label`(문자열 변수)과 `Radius/Primitive/48`(문자열 타입에 FONT_FAMILY scope)은 용도가 무엇인가요? 코드에서는 제외했습니다.",
  "scope 정리가 필요해 보입니다. `Border/Neutral/Default`에는 채우기 scope가, `Border/Disabled/Disalbed`에는 ALL_SCOPES가 붙어 있고, primitive 대부분이 ALL_SCOPES입니다. 모드 이름 `Mode 1`도 `Default`로 바꿀 수 있나요?",
  "그리드: 브레이크포인트 경계값, 모바일 컬럼 수와 거터, 1440px 초과 시 최대 폭, Layout No.2의 컬럼 폭 문구를 확인해 주세요. 콘텐츠 폭은 1224px(1440 - 사이드바 216)이어야 문서의 컬럼 폭 82px과 맞습니다. 1220px이면 81.67px이 됩니다.",
  "같은 이름에 정의가 여러 개인 스타일이 있습니다(아래 '같은 이름의 다른 정의' 표). 글꼴을 값으로 직접 적은 정의는 2기 라이브러리, 3기 변수에 연결됐지만 값이 다른 정의는 예전에 게시한 라이브러리 버전으로 보입니다. 컴포넌트를 3기 스타일로 다시 연결하고 라이브러리를 재게시해 주세요.",
  "`Shadow/Inner/Neutral_1`은 Toast와 Desktop Layout에서 청록 2겹(inset 1 1 3 `#0B6B6421` + inset -1 -1 1 `#FFFFFF40`), Side Navigation과 Option Button에서 회색 1겹(inset 1 1 2 `#D3D8D833`)입니다. 코드는 청록 2겹을 토큰으로 삼았습니다. 어느 쪽이 맞나요?",
  "`Title/2-Bold`, `Title/3-Semibold`는 라이브러리에 있지만 어떤 노드도 쓰지 않아 값을 읽지 못했습니다. 계속 쓸 스타일이면 문서 프레임에 적용해 주세요.",
]
