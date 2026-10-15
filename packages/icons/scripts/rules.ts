import type { ColorReplacement } from "./svg.ts"

export type IconWeight = "thin" | "regular" | "fill"

export type PictogramMode = "light" | "dark"

export type RuleStatus = "accepted" | "pending"

export type WeightRule = {
  weight: IconWeight
  status: RuleStatus
  reason: string
}

export type VariantNameFix = {
  variantName: string
  status: RuleStatus
  reason: string
}

export type Exclusion = {
  componentName: string
  reason: string
}

export type Offset = { x: number; y: number }

export type Placement = {
  nodeIds: readonly string[]
  frame: string
  offset: Offset
  reason: string
}

export type ViewBoxException = {
  nodeIds: readonly string[]
  viewBox: string
  reason: string
}

export const ICON_VIEWBOX = "0 0 24 24"
export const PICTOGRAM_VIEWBOX = "0 0 30 30"
export const ICON_WEIGHT_ORDER: readonly IconWeight[] = [
  "thin",
  "regular",
  "fill",
]
export const PICTOGRAM_MODE_ORDER: readonly PictogramMode[] = ["light", "dark"]

export const WEIGHT_PROPERTY_NAMES: readonly string[] = ["Weight"]
export const MODE_PROPERTY_NAMES: readonly string[] = [
  "Varient",
  "Variant",
  "Mode",
]

export const WEIGHT_RULES: Readonly<Record<string, WeightRule>> = {
  Thin: { weight: "thin", status: "accepted", reason: "피그마 Weight=Thin" },
  Regular: {
    weight: "regular",
    status: "accepted",
    reason: "피그마 Weight=Regular",
  },
  Fill: { weight: "fill", status: "accepted", reason: "피그마 Weight=Fill" },
}

export const VARIANT_NAME_FIXES: Readonly<Record<string, VariantNameFix>> = {}

export const MODE_RULES: Readonly<Record<string, PictogramMode>> = {
  Light: "light",
  Dark: "dark",
}

export const NAME_FIXES: Readonly<Record<string, string>> = {
  visable: "visible",
  invisable: "invisible",
}

export const EXCLUDED_COMPONENTS: readonly Exclusion[] = [
  {
    componentName: "Pictogram/Person",
    reason: "SVG 경로가 아니라 PNG 마스크다. 디자인 팀에 SVG를 요청했다",
  },
]

export const PLACEMENTS: readonly Placement[] = [
  {
    nodeIds: [
      "3060:94610",
      "3060:94614",
      "3060:94618",
      "3060:94199",
      "3060:94203",
      "3060:94207",
    ],
    frame: "0 0 24 24",
    offset: { x: 4, y: 0 },
    reason:
      "Chevron_Left, Chevron_Right는 24×24 프레임이 아니라 안쪽 16×24 도형만 내보낸다. 프레임 안 위치로 되돌린다",
  },
  {
    nodeIds: ["2505:16490", "3060:93819"],
    frame: "0 0 22 24",
    offset: { x: 1, y: 1 },
    reason:
      "Person Regular, Fill은 22×24 프레임이 아니라 안쪽 20×22 그룹만 내보낸다. 프레임 크기는 피그마 값 그대로 둔다",
  },
  {
    nodeIds: ["2505:16951", "3060:94086"],
    frame: "0 0 24 24",
    offset: { x: 1.9997, y: 2.0004 },
    reason:
      "Setting은 24×24 프레임이 아니라 안쪽 20×20 그룹만 내보낸다. 프레임 안 위치로 되돌린다",
  },
  {
    nodeIds: ["3156:42932", "3156:42994"],
    frame: "0 0 30 30",
    offset: { x: 0.6006, y: 0.8994 },
    reason:
      "Under-construction은 30×30 프레임이 아니라 안쪽 28.8×27 그룹만 내보낸다. 프레임 안 위치로 되돌린다",
  },
]

export const VIEWBOX_EXCEPTIONS: readonly ViewBoxException[] = [
  {
    nodeIds: [
      "3060:96491",
      "3060:96492",
      "3060:96494",
      "3060:96493",
      "3060:96072",
      "3095:97510",
      "3095:97511",
      "3095:97517",
    ],
    viewBox: "0 0 23.8462 25",
    reason:
      "피그마 프레임이 23.85×25다. 피그마 값 그대로 두고 정사각형 svg 안에 비율을 지켜 가운데 놓는다",
  },
  {
    nodeIds: ["3095:97369", "3095:97372", "3095:97376"],
    viewBox: "0 0 24 25",
    reason:
      "피그마 프레임이 24×25다. 피그마 값 그대로 두고 정사각형 svg 안에 비율을 지켜 가운데 놓는다",
  },
]

export const ICON_PRIMARY_COLOR = "#3f4141"

export const LOGO_PRIMARY_COLOR = "#3f4141"

export const ICON_FIXED_COLORS: Readonly<Record<string, ColorReplacement>> = {
  "#dc3d3d": { style: "var(--umc-color-red-500)" },
  "#ffffff": { style: "var(--umc-color-white)" },
}

export const PICTOGRAM_PRIMARY_COLORS: Readonly<Record<string, string>> = {
  "#02746c": "var(--umc-color-icon-brand-strong-600)",
  "#008a80": "var(--umc-color-icon-brand-medium-500)",
  "#0b6b64": "#0b6b64",
  "#0e8179": "#0e8179",
}

export const PICTOGRAM_FIXED_COLORS: Readonly<
  Record<string, ColorReplacement>
> = {
  "#ddf4f1": { style: "var(--umc-color-teal-100)" },
  "#ffffff": { style: "var(--umc-color-white)" },
  "#b3e6e1": { attribute: "#b3e6e1" },
}

const CURRENT_COLOR: ColorReplacement = { attribute: "currentColor" }

export const mapIconColor = (color: string): ColorReplacement => {
  if (color === ICON_PRIMARY_COLOR) {
    return CURRENT_COLOR
  }
  const fixed = ICON_FIXED_COLORS[color]
  if (!fixed) {
    throw new Error(`아이콘 색 ${color}에 대응하는 규칙이 없습니다`)
  }
  return fixed
}

export const mapLogoColor = (color: string): ColorReplacement => {
  if (color === LOGO_PRIMARY_COLOR) {
    return CURRENT_COLOR
  }
  throw new Error(`로고 색 ${color}에 대응하는 규칙이 없습니다`)
}

export const mapPictogramColor = (color: string): ColorReplacement => {
  if (PICTOGRAM_PRIMARY_COLORS[color] !== undefined) {
    return CURRENT_COLOR
  }
  const fixed = PICTOGRAM_FIXED_COLORS[color]
  if (!fixed) {
    throw new Error(`픽토그램 색 ${color}에 대응하는 규칙이 없습니다`)
  }
  return fixed
}

export const OPEN_QUESTIONS: readonly string[] = [
  "`Icon/Search`는 Regular 굵기만 있습니다. Thin과 Fill 굵기를 추가할지 알려 주세요.",
  "`Icon/Eye_visable`, `Icon/Eye_invisable`의 철자가 visable입니다. visible로 바꿔 주실 수 있나요?",
  "Bold, Italic, Strikethrough, Underline, Time의 Fill 변형과 ThumbsUp 전체는 프레임이 23.85×25이고, Link는 24×25, Person Regular와 Fill은 22×24입니다. 코드에서는 24px 정사각형 안에 비율을 지켜 줄여 넣어서, 기본 크기에서 2~4% 작게 보입니다. warning Fill과 Location Fill처럼 24×24로 맞춰 주실 수 있나요?",
  "`Icon/ThumbsUp`에 보이지 않는 `Format italic` 요소가 남아 있습니다.",
  "Notification, Notification-Off의 빨간 점(`#dc3d3d`)과 흰 테두리, Check_circle Fill의 흰 체크, warning과 warning-Triangle Fill의 흰 느낌표는 아이콘 색을 바꿔도 고정입니다. 흰 배경이 아닌 곳에서도 흰색으로 보이는 것이 의도인지, 뚫린 모양으로 그릴지 알려 주세요.",
  "아이콘 섹션 설명대로 패키지 아이콘은 24px이 기본이고, 다른 크기는 Scale(K)처럼 선 두께까지 비례해 줄어듭니다. 그런데 Scale 없이 크기만 줄인 인스턴스는 선 아이콘의 두께가 그대로 남습니다(예: Option Button 20px의 `Icon/Check`는 선 두께 2). 이런 인스턴스를 Scale로 다시 맞춰 주시거나, 선 아이콘을 면(Outline stroke)으로 바꿔 주실 수 있나요?",
  "`Pictogram/Person`은 PNG 마스크라 코드에서 뺐습니다. 크기 변형(30px, 36px, 24px)이 생겼지만 세 변형 모두 아직 PNG입니다. SVG로 받을 수 있나요?",
  "`Pictogram/School`의 `#0b6b64`와 `Pictogram/Check`의 `#0e8179`는 2기 색(teal-600, teal-500)이라 3기 색 변수에 없습니다. 다른 픽토그램처럼 3기 Teal-600(`#02746c`)이나 Teal-500(`#008a80`)이 맞는지 알려 주세요. 지금은 피그마 값을 기본색으로 둡니다.",
  "`Pictogram/Under-construction`의 변형 이름이 `Varient`입니다. Dark 변형의 `#b3e6e1`은 Teal-200(`#b3e5e1`)과 1만큼 달라 피그마 값 그대로 두었습니다.",
  "`Icon/Checkbox`의 Thin(3060:96785)에 1.6px, Regular(3060:96734)에 1.2px 그림이 들어 있어 섹션 설명(Thin 1.2px, Regular 1.6px)과 반대입니다. 2026-10-07에 받은 그림은 설명과 같았습니다. 코드는 설명대로 Thin 1.2px, Regular 1.6px을 그대로 둡니다. 두 변형을 바로잡아 주세요.",
  "`Icon/home`, `Icon/warning`, `Icon/warning-Triangle`, `Icon/remove_circle`은 소문자로 시작합니다. 단어 구분도 `_`, `-`, 대문자가 섞여 있습니다. 이름 규칙을 맞춰 주실 수 있나요?",
]
