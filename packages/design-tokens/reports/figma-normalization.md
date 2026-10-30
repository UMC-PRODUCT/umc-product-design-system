# 피그마 정규화 리포트

`pnpm tokens:normalize`가 만드는 파일이다. 손으로 고치지 않는다. 규칙은 `scripts/normalize/rules.ts`에서 바꾼다.

## 입력

| 파일 | 출처 | 노드 또는 원래 이름 | 받은 날 |
| --- | --- | --- | --- |
| `mcp/get-variable-defs.2268-1706.json` | get_variable_defs | 2268:1706 | 2026-10-24 |
| `mcp/get-variable-defs.2858-65987.json` | get_variable_defs | 2858:65987 | 2026-10-07 |
| `mcp/get-variable-defs.2621-33487.json` | get_variable_defs | 2621:33487 | 2026-10-07 |
| `mcp/get-variable-defs.2621-36220.json` | get_variable_defs | 2621:36220 | 2026-10-24 |
| `mcp/get-variable-defs.3155-19976.json` | get_variable_defs | 3155:19976 | 2026-10-07 |
| `mcp/get-variable-defs.3155-19501.json` | get_variable_defs | 3155:19501 | 2026-10-07 |
| `mcp/get-variable-defs.2621-32882.json` | get_variable_defs | 2621:32882 | 2026-10-07 |
| `mcp/get-variable-defs.2621-33341.json` | get_variable_defs | 2621:33341 | 2026-10-24 |
| `export/color.mode-1.tokens.json` | Figma Variables Export modes (Color 컬렉션) | Mode 1.tokens.json | 2026-10-08 |
| `export/token.mode-1.tokens.json` | Figma Variables Export modes (Token 컬렉션) | Mode 1.tokens.json | 2026-10-30 |

## 변수 개수

| export 파일 | 변수 | 이전 스냅샷 |
| --- | --- | --- |
| `color.mode-1.tokens.json` | 230 | 229 |
| `token.mode-1.tokens.json` | 90 | 83 |

## 디자인 팀 확인 요청

1. codeSyntax(WEB)가 여러 변수에 중복으로 붙어 있습니다. 예를 들어 `var(--color-border-default)`는 `Border/Neutral/Medium-300`(회색)과 `Border/Primary/Weak-200`(틸)에 함께 붙어 있습니다. Dev Mode 코드 패널과 피그마 MCP는 이 이름을 보여 주는데, 코드의 CSS 변수(`--umc-color-…`)와 다른 이름이라 개발자와 AI 도구가 길을 잃습니다. 아래 '이름 대응표와 codeSyntax 제안'의 제안 값(`var(--umc-color-…)`)으로 바꿔 줄 수 있나요? primitive와 Token 컬렉션 변수에도 같은 규칙으로 넣어 주시면 Dev Mode에 보이는 이름이 코드와 같아집니다.
2. `Fill/Neutral/Disalbed`의 오타를 고쳐 `fill.neutral.disabled`로 읽었습니다. 같은 오타였던 Border는 `Border/Neutral/Disabled`로 고쳐졌습니다. Fill 이름도 고칠 수 있나요?
3. 같은 틸 역할을 Fill과 Border는 `Primary`, Background, Surface, Text, Icon은 `Brand`로 부릅니다. 한 이름으로 맞출 수 있나요?
4. `Display/3-Bold`가 Token 컬렉션에 없는 `Typography/Base/Fontfamily/Brand`, `Fontweight/Bold`를 참조합니다(다른 라이브러리 변수로 보입니다). `FontFamily`, `FontWeight`로 다시 연결해 주세요.
5. Primitive 컬러 문서 프레임에 쓰인 `primitives/orange/*`, `Base/Grey/Grey 900`, `Grey 800`, `Medium/H1`(PingFang SC)은 Color 컬렉션 export에 없습니다. 다른 라이브러리 것인지, 정리 대상인지 알려 주세요.
6. Violet, Purple, Pink, Cobalt, Blue, Brown 팔레트에는 50, 100, 500, 600 단계만 있습니다. 의도인가요?
7. `Body/4-Semibold`(13px), `Label/2`(17px), `Caption/4`(11px)의 크기가 변수에 연결되어 있지 않습니다. 17px은 `FontSize` 변수가 없으니 추가가 필요합니다. 반대로 `FontSize/22px`, `32px`은 어떤 텍스트 스타일에도 쓰이지 않습니다.
8. `Heading/Heading3-Semibold`(22px), `Mobile Web/Body/4-Regular`(행간 20px)는 폐기 대상인가요? 노드 2268:1706에 쓰인 텍스트 스타일이 전체 목록인지도 알려 주세요.
9. Display 3 문서 표에는 자간이 -2%로 적혀 있지만 실제 스타일 `Display/3-Bold`는 -1.5%입니다. 어느 쪽이 맞나요?
10. `Tag/Role/Challenger&Super-Admin`과 `Tag/Role/Product`는 Weak와 Medium이 같은 색입니다(Teal-100, TealGrey-100). 의도인가요?
11. `Tag/Part`에 단계 숫자가 붙었는데, PM·Design·Mobile-PE는 숫자와 참조하는 primitive 단계가 다릅니다(`PM/Weak-200`이 Violet-100, `Medium-300`이 Violet-500, `Strong-400`이 Violet-600). Web-PE는 같습니다(`Weak-100`이 Yellow-100). `Tag/Role`에는 아직 숫자가 없습니다. 어느 규칙이 맞나요? 코드는 피그마 이름을 그대로 씁니다.
12. 새로 생긴 `Fill/Neutral/Stronger-300`은 TealGrey-200이라 `Strong-200`과 값이 같고, 이름의 300과 단계도 다릅니다. `Stronger-Hover(Pressed)`도 `Strong-Hover(Pressed)`와 같은 TealGrey-300입니다. 의도인가요?
13. `Label`(문자열 변수)과 `Radius/Primitive/48`(문자열 타입에 FONT_FAMILY scope)은 용도가 무엇인가요? 코드에서는 제외했습니다.
14. scope 정리가 필요해 보입니다. `Border/Neutral/Default`에는 채우기 scope가, `Border/Neutral/Disabled`에는 ALL_SCOPES가 붙어 있고, primitive 대부분이 ALL_SCOPES입니다. 모드 이름 `Mode 1`도 `Default`로 바꿀 수 있나요?
15. 그리드: 브레이크포인트 경계값, 모바일 컬럼 수와 거터, 1440px 초과 시 최대 폭, Layout No.2의 컬럼 폭 문구를 확인해 주세요. 콘텐츠 폭은 1224px(1440 - 사이드바 216)이어야 문서의 컬럼 폭 82px과 맞습니다. 1220px이면 81.67px이 됩니다.
16. 같은 이름에 정의가 여러 개인 스타일이 있습니다(아래 '같은 이름의 다른 정의' 표). 글꼴을 값으로 직접 적은 정의는 2기 라이브러리, 3기 변수에 연결됐지만 값이 다른 정의는 예전에 게시한 라이브러리 버전으로 보입니다. 컴포넌트를 3기 스타일로 다시 연결하고 라이브러리를 재게시해 주세요.
17. `Shadow/Inner/Neutral_1`은 Toast와 Desktop Layout에서 청록 2겹(inset 1 1 3 `#0B6B6421` + inset -1 -1 1 `#FFFFFF40`), Side Navigation과 Option Button에서 회색 1겹(inset 1 1 2 `#D3D8D833`)입니다. 코드는 청록 2겹을 토큰으로 삼았습니다. 어느 쪽이 맞나요?
18. `Title/2-Bold`, `Title/3-Semibold`는 라이브러리에 있지만 어떤 노드도 쓰지 않아 값을 읽지 못했습니다. 계속 쓸 스타일이면 문서 프레임에 적용해 주세요.

## 변수 이름 규칙

| 피그마 이름 | 방식 | 토큰 경로 | 이유 | 상태 |
| --- | --- | --- | --- | --- |
| `Semantic/Fill/Neutral/Disalbed` | 정확 일치 | `color.fill.neutral.disabled` | 오타 Disalbed를 Disabled로 읽음 | 확인 대기 |
| `Primitives/Base/` | 접두사 | `color` | 흰색과 검은색은 color 바로 아래에 둠 | 확정 |
| `Primitives/Grey/TealGrey-` | 접두사 | `color.teal-grey` | Grey 그룹의 TealGrey 팔레트를 teal-grey로 둠 | 확정 |
| `Primitives/` | 접두사 | `color` | 팔레트 이름 반복 제거(Teal/Teal-500 → teal.500) | 확정 |
| `Semantic/` | 접두사 | `color` | 피그마 이름 그대로, 단계 숫자도 남김(Neutral-Weak-400 → neutral-weak-400) | 확정 |
| `Typography/Base/FontSize/` | 접두사 | `font-size` | 타이포 기본 크기 | 확정 |
| `Typography/Base/FontWeight/` | 접두사 | `font-weight` | 타이포 기본 굵기, 이름을 숫자로 바꿈 | 확정 |
| `Typography/Base/Fontweight/` | 접두사 | `font-weight` | export에 없는 대소문자 변형, Display/3-Bold만 참조 | 확인 대기 |
| `Typography/Base/FontFamily/` | 접두사 | `font-family` | 타이포 기본 서체 | 확정 |
| `Typography/Base/Fontfamily/` | 접두사 | `font-family` | export에 없는 대소문자 변형, Display/3-Bold만 참조 | 확인 대기 |
| `Spacing/Primitive/` | 접두사 | `spacing` | 간격 기본 값 | 확정 |
| `Spacing/Semantic/` | 접두사 | `spacing` | 그룹 이름 반복 제거(Padding/Padding 16 → padding.16) | 확정 |
| `Radius/Primitive/` | 접두사 | `radius` | 모서리 기본 값 | 확정 |
| `Radius/Semantic/Button/R Button ` | 접두사 | `radius.button` | R Button 접두어 제거(R Button 12 → button.12) | 확인 대기 |
| `Radius/Semantic/` | 접두사 | `radius` | 그룹 이름 반복 제거(Toast/Toast → toast) | 확정 |

## 제외한 변수

| 피그마 이름 | 이유 | 상태 |
| --- | --- | --- |
| `Label` | 용도를 알 수 없는 문자열 변수이고 ALL_SCOPES | 확인 대기 |
| `Radius/Primitive/48` | Radius 그룹인데 문자열 타입이고 FONT_FAMILY scope | 확인 대기 |

## codeSyntax(WEB) 중복

| codeSyntax | 변수 수 | 피그마 변수 |
| --- | --- | --- |
| `var(--color-action-primary-default)` | 32 | `Semantic/Fill/Neutral/Default`, `Semantic/Fill/Neutral/Weaker-50`, `Semantic/Fill/Neutral/Weak-75`, `Semantic/Fill/Neutral/Medium-100`, `Semantic/Fill/Neutral/Strong-200`, `Semantic/Fill/Neutral/Stronger-300`, `Semantic/Fill/Neutral-Inverse/Weak-400`, `Semantic/Fill/Neutral-Inverse/Medium-500`, `Semantic/Fill/Neutral-Inverse/Strong-600`, `Semantic/Fill/Neutral-Inverse/Stronger-700`, `Semantic/Fill/Primary/Weaker-50`, `Semantic/Fill/Primary/Weaker-Hover(Pressed)`, `Semantic/Fill/Primary/Weak-75`, `Semantic/Fill/Primary/Weak-Hover(Pressed)`, `Semantic/Fill/Primary/Medium-100`, `Semantic/Fill/Primary/Strong-200`, `Semantic/Fill/Primary/Stronger-300`, `Semantic/Fill/Primary-Inverse/Weak-400`, `Semantic/Fill/Primary-Inverse/Weak-Hover(Pressed)`, `Semantic/Fill/Primary-Inverse/Medium-500`, `Semantic/Fill/Primary-Inverse/Strong-600`, `Semantic/Fill/Primary-Inverse/Strong-Hover(Pressed)`, `Semantic/Fill/Error/Weak-50`, `Semantic/Fill/Error/Medium-100`, `Semantic/Fill/Error/Strong-500`, `Semantic/Fill/Warning/Weak-50`, `Semantic/Fill/Warning/Medium-100`, `Semantic/Fill/Warning/Strong-500`, `Semantic/Fill/Success/Weak-50`, `Semantic/Fill/Success/Medium-100`, `Semantic/Fill/Success/Strong-500`, `Semantic/Border/Neutral/Default` |
| `var(--color-action-primary-pressed)` | 18 | `Semantic/Fill/Neutral/Weak-Hover(Pressed)`, `Semantic/Fill/Neutral/Medium-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Weak-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Medium-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Strong-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Stronger-Hover(Pressed)`, `Semantic/Fill/Primary/Medium-Hover(Pressed)`, `Semantic/Fill/Primary/Strong-Hover(Pressed)`, `Semantic/Fill/Primary/Stronger-Hover(Pressed)-400`, `Semantic/Fill/Primary-Inverse/Medium-Hover(Pressed)`, `Semantic/Fill/Error/Medium-Hover(Pressed)`, `Semantic/Fill/Error/Strong-Hover(Pressed)`, `Semantic/Fill/Warning/Weak-Hover(Pressed)`, `Semantic/Fill/Warning/Medium-Hover(Pressed)`, `Semantic/Fill/Warning/Strong-Hover(Pressed)`, `Semantic/Fill/Success/Weak-Hover(Pressed)`, `Semantic/Fill/Success/Medium-Hover(Pressed)`, `Semantic/Fill/Success/Strong-Hover(Pressed)` |
| `var(--color-border-strong)` | 10 | `Semantic/Border/Neutral/Strong-400`, `Semantic/Border/Neutral/Stronger-600`, `Semantic/Border/Primary/Medium-300`, `Semantic/Border/Primary/Strong-500`, `Semantic/Border/Error/Medium-300`, `Semantic/Border/Error/Strong-500`, `Semantic/Border/Warning/Medium-300`, `Semantic/Border/Warning/Strong-500`, `Semantic/Border/Success/Medium-300`, `Semantic/Border/Success/Strong-500` |
| `var(--color-border-subtle)` | 6 | `Semantic/Border/Neutral/Weaker-100`, `Semantic/Border/Neutral/Weak-200`, `Semantic/Border/Primary/Weaker-100`, `Semantic/Border/Error/Weaker-100`, `Semantic/Border/Warning/Weaker-100`, `Semantic/Border/Success/Weaker-100` |
| `var(--color-border-default)` | 5 | `Semantic/Border/Neutral/Medium-300`, `Semantic/Border/Primary/Weak-200`, `Semantic/Border/Error/Weak-200`, `Semantic/Border/Warning/Weak-200`, `Semantic/Border/Success/Weak-200` |
| `var(--color-icon-brand)` | 5 | `Semantic/Icon/Brand-Medium-500`, `Semantic/Icon/Brand-Strong-600`, `Semantic/Icon/Success`, `Semantic/Icon/Error`, `Semantic/Icon/Warning` |
| `var(--color-action-primary-hover)` | 4 | `Semantic/Fill/Neutral/Weaker-Hover(Pressed)`, `Semantic/Fill/Neutral/Strong-Hover(Pressed)`, `Semantic/Fill/Neutral/Stronger-Hover(Pressed)`, `Semantic/Fill/Error/Weak-Hover(Pressed)` |
| `var(--color-surface-inverse)` | 3 | `Semantic/Surface/Brand-Weak`, `Semantic/Surface/Brand-Medium`, `Semantic/Surface/Brand-Inverse` |
| `var(--color-surface-subtle)` | 3 | `Semantic/Surface/Neutral-Weak`, `Semantic/Surface/Neutral-Medium`, `Semantic/Surface/Neutral-Inverse` |
| `var(--color-text-brand)` | 3 | `Semantic/Text/Brand-Disabled-300`, `Semantic/Text/Brand-Default-600`, `Semantic/Text/Brand-Strong-800` |
| `var(--color-text-link)` | 3 | `Semantic/Text/Success`, `Semantic/Text/Error`, `Semantic/Text/Warning` |
| `var(--color-text-subtle)` | 3 | `Semantic/Text/Neutral-Weak-500`, `Semantic/Text/Neutral-Medium-600`, `Semantic/Text/Neutral-Strong-800` |
| `var(--color-bg-brand-subtle)` | 2 | `Semantic/Background/Brand-Weak`, `Semantic/Background/Brand-Medium` |
| `var(--color-bg-subtle)` | 2 | `Semantic/Background/Neutral-Weak`, `Semantic/Background/Neutral-Medium` |
| `var(--color-icon-subtle)` | 2 | `Semantic/Icon/Neutral-Weak-400`, `Semantic/Icon/Neutral-Medium-500` |
| `var(--color-tag-part-design-bg)` | 2 | `Semantic/Tag/Part/Design/Weaker-50`, `Semantic/Tag/Part/Design/Weak-200` |
| `var(--color-tag-part-mobile-pe-bg)` | 2 | `Semantic/Tag/Part/Mobile-PE/Weaker-50`, `Semantic/Tag/Part/Mobile-PE/Weak-200` |
| `var(--color-tag-part-pm-bg)` | 2 | `Semantic/Tag/Part/PM/Weaker-50`, `Semantic/Tag/Part/PM/Weak-200` |
| `var(--color-tag-part-web-pe-bg)` | 2 | `Semantic/Tag/Part/Web-PE/Weaker-50`, `Semantic/Tag/Part/Web-PE/Weak-100` |
| `var(--color-tag-role-campus-bg)` | 2 | `Semantic/Tag/Role/Campus/Weaker`, `Semantic/Tag/Role/Campus/Weak` |
| `var(--color-tag-role-central-border)` | 2 | `Semantic/Tag/Role/Central/Weak`, `Semantic/Tag/Role/Central/Medium` |
| `var(--color-tag-role-chapter-border)` | 2 | `Semantic/Tag/Role/Chapter/Weak`, `Semantic/Tag/Role/Chapter/Medium` |
| `var(--color-tag-role-product-border)` | 2 | `Semantic/Tag/Role/Product/Weak`, `Semantic/Tag/Role/Product/Medium` |
| `var(--color-tag-role-super-admin-bg)` | 2 | `Semantic/Tag/Role/Challenger&Super-Admin/Weaker`, `Semantic/Tag/Role/Challenger&Super-Admin/Weak` |
| `var(--color-text-disabled)` | 2 | `Semantic/Text/Disabled`, `Semantic/Text/Placeholder` |

## scope 경고

| 피그마 이름 | 내용 |
| --- | --- |
| `Primitives/*` | primitive 78개 중 76개가 ALL_SCOPES라 디자이너 선택 목록에 그대로 노출됩니다 |
| `Semantic/Border/Neutral/Disabled` | Border인데 STROKE scope가 없습니다 (ALL_SCOPES) |
| `Semantic/Border/Neutral/Default` | Border인데 STROKE scope가 없습니다 (FRAME_FILL, SHAPE_FILL) |

## 참조가 아닌 semantic

primitive를 참조하지 않고 값을 직접 가진 semantic이다. 투명도가 있으면 8자리 hex로 옮겼다.

- `Semantic/Dimmed/Weak`
- `Semantic/Dimmed/Medium`
- `Semantic/Dimmed/Strong`

## 타이포 교차 확인

텍스트 스타일 원문(MCP)이 참조하는 변수 값은 export 값과 모두 같다.

- export에 없는 변수 이름: `Typography/Base/Fontweight/Bold`, `Typography/Base/Fontfamily/Brand`
- 어떤 텍스트 스타일도 쓰지 않는 토큰: 없음

## 제외한 텍스트 스타일

| 피그마 이름 | 이유 | 상태 |
| --- | --- | --- |
| `Heading/Heading3-Semibold` | 이름 규칙 밖이고 22px 크기가 변수에 연결되지 않음 | 확인 대기 |
| `Mobile Web/Body/4-Regular` | Mobile Web 별도 이름 공간이고 행간이 20px 고정값 | 확인 대기 |

## 텍스트 스타일 경고

| 피그마 이름 | 내용 |
| --- | --- |
| `Body/4-Semibold` | 크기 13px가 변수에 연결되지 않았습니다 |
| `Label/2-Semibold` | 크기 17px가 변수에 연결되지 않았습니다 |
| `Label/2-Medium` | 크기 17px가 변수에 연결되지 않았습니다 |
| `Caption/4-Medium` | 크기 11px가 변수에 연결되지 않았습니다 |
| `Caption/4-Regular` | 크기 11px가 변수에 연결되지 않았습니다 |
| `Caption/3-Bold` | 크기 12px가 변수에 연결되지 않았습니다 |

## 스타일 원문 우선순위

| 순서 | 파일 | 노드 | 쓰임 |
| --- | --- | --- | --- |
| 1 | `get-variable-defs.2268-1706.json` | Mobile.Web Typography | 텍스트 스타일 기준 원문. 같은 이름이면 이 정의가 이긴다 |
| 2 | `get-variable-defs.2858-65987.json` | Web/Header | Drop/Neutral_3, Inner/Neutral_2, Title/3-Medium |
| 3 | `get-variable-defs.2621-33487.json` | Toast | Drop/Neutral_1, Inner/Neutral_1 |
| 4 | `get-variable-defs.2621-36220.json` | Tooltip | Caption/3-Bold |
| 5 | `get-variable-defs.3155-19976.json` | Dialog | Title/2-Semibold |
| 6 | `get-variable-defs.3155-19501.json` | App/Top Navigation | Title/1-Semibold |
| 7 | `get-variable-defs.2621-32882.json` | Option Button | Title/2-Medium, Drop/Neutral_2 |
| 8 | `get-variable-defs.2621-33341.json` | Help Text | Caption/1-Regular |

## 그림자 effect 스타일

| 피그마 스타일 | 코드 토큰 | 정의를 가져온 원문 |
| --- | --- | --- |
| `Shadow/Drop/Neutral_1` | `shadow.drop.neutral-1` | `get-variable-defs.2621-33487.json` |
| `Shadow/Drop/Neutral_2` | `shadow.drop.neutral-2` | `get-variable-defs.2621-32882.json` |
| `Shadow/Drop/Neutral_3` | `shadow.drop.neutral-3` | `get-variable-defs.2858-65987.json` |
| `Shadow/Inner/Neutral_1` | `shadow.inner.neutral-1` | `get-variable-defs.2621-33487.json` |
| `Shadow/Inner/Neutral_2` | `shadow.inner.neutral-2` | `get-variable-defs.2858-65987.json` |

## 같은 이름의 다른 정의

| 피그마 이름 | 원문 | 정의 | 처리 |
| --- | --- | --- | --- |
| `Label/1-Medium` | `get-variable-defs.2621-33487.json`, `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Medium, size: 16, weight: 500, lineHeight: 1.399999976158142, letterSpacing: -2)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Body/1-Regular` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Regular, size: 16, weight: 400, lineHeight: 1.4500000476837158, letterSpacing: -1)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Body/2-Medium` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Medium, size: 14, weight: 500, lineHeight: 1.5, letterSpacing: -1)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Body/2-Regular` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Regular, size: 14, weight: 400, lineHeight: 1.5, letterSpacing: -1)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Label/1-Semibold` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: SemiBold, size: 16, weight: 600, lineHeight: 1.399999976158142, letterSpacing: -2)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Body/1-Medium` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Medium, size: 16, weight: 500, lineHeight: 1.4500000476837158, letterSpacing: -1)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Shadow/Inner/Neutral_2` | `get-variable-defs.2621-32882.json` | `Effect(type: INNER_SHADOW, color: #E4E4E433, offset: (-1, 2.5), radius: 4, spread: 0)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |
| `Shadow/Inner/Neutral_1` | `get-variable-defs.2621-32882.json` | `Effect(type: INNER_SHADOW, color: #D3D8D833, offset: (1, 1), radius: 2, spread: 0)` | 같은 이름의 다른 정의. 기준 원문 또는 먼저 나온 원문의 정의를 썼다 |

## 토큰에 넣지 않은 스타일

| 피그마 이름 | 원문 | 정의 | 이유 |
| --- | --- | --- | --- |
| `Heading/5-Semibold` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: SemiBold, size: 24, weight: 600, lineHeight: 1.350000023841858, letterSpacing: -2)` | 글꼴을 값으로 직접 적은 정의(2기 스타일로 보임) |
| `Subtitle/3-Semibold` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: SemiBold, size: 16, weight: 600, lineHeight: 1.5, letterSpacing: -1)` | 이름 규칙 밖의 스타일 |
| `Heading/7-Semibold` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: SemiBold, size: 18, weight: 600, lineHeight: 1.399999976158142, letterSpacing: -1)` | 글꼴을 값으로 직접 적은 정의(2기 스타일로 보임) |
| `Subtitle/2-Medium` | `get-variable-defs.2621-32882.json` | `Font(family: "Pretendard Variable", style: Medium, size: 18, weight: 500, lineHeight: 1.5, letterSpacing: -1)` | 이름 규칙 밖의 스타일 |

## 이름 대응표와 codeSyntax 제안

codeSyntax(WEB)를 둘째 칸 값으로 바꾸면 Dev Mode 코드 패널과 피그마 MCP가 코드에 있는 CSS 변수를 그대로 보여 준다.

| 피그마 변수 | 제안 codeSyntax(WEB) | 지금 codeSyntax(WEB) |
| --- | --- | --- |
| `Semantic/Icon/Disabled` | `var(--umc-color-icon-disabled)` | `var(--color-icon-disabled)` |
| `Semantic/Icon/Inverse` | `var(--umc-color-icon-inverse)` | `var(--color-icon-inverse)` |
| `Semantic/Icon/Neutral-Weak-400` | `var(--umc-color-icon-neutral-weak-400)` | `var(--color-icon-subtle)` |
| `Semantic/Icon/Neutral-Medium-500` | `var(--umc-color-icon-neutral-medium-500)` | `var(--color-icon-subtle)` |
| `Semantic/Icon/Neutral-Strong-600` | `var(--umc-color-icon-neutral-strong-600)` | `var(--color-icon-default)` |
| `Semantic/Icon/Neutral-Stronger-700` | `var(--umc-color-icon-neutral-stronger-700)` | `var(--color-icon-strong)` |
| `Semantic/Icon/Brand-Medium-500` | `var(--umc-color-icon-brand-medium-500)` | `var(--color-icon-brand)` |
| `Semantic/Icon/Brand-Strong-600` | `var(--umc-color-icon-brand-strong-600)` | `var(--color-icon-brand)` |
| `Semantic/Icon/Success` | `var(--umc-color-icon-success)` | `var(--color-icon-brand)` |
| `Semantic/Icon/Error` | `var(--umc-color-icon-error)` | `var(--color-icon-brand)` |
| `Semantic/Icon/Warning` | `var(--umc-color-icon-warning)` | `var(--color-icon-brand)` |
| `Semantic/Fill/Neutral/Default` | `var(--umc-color-fill-neutral-default)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Disalbed` | `var(--umc-color-fill-neutral-disabled)` | 없음 |
| `Semantic/Fill/Neutral/Weaker-50` | `var(--umc-color-fill-neutral-weaker-50)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Weaker-Hover(Pressed)` | `var(--umc-color-fill-neutral-weaker-hover-pressed)` | `var(--color-action-primary-hover)` |
| `Semantic/Fill/Neutral/Weak-75` | `var(--umc-color-fill-neutral-weak-75)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Weak-Hover(Pressed)` | `var(--umc-color-fill-neutral-weak-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Neutral/Medium-100` | `var(--umc-color-fill-neutral-medium-100)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Medium-Hover(Pressed)` | `var(--umc-color-fill-neutral-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Neutral/Strong-200` | `var(--umc-color-fill-neutral-strong-200)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Strong-Hover(Pressed)` | `var(--umc-color-fill-neutral-strong-hover-pressed)` | `var(--color-action-primary-hover)` |
| `Semantic/Fill/Neutral/Stronger-300` | `var(--umc-color-fill-neutral-stronger-300)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral/Stronger-Hover(Pressed)` | `var(--umc-color-fill-neutral-stronger-hover-pressed)` | `var(--color-action-primary-hover)` |
| `Semantic/Fill/Neutral-Inverse/Weak-400` | `var(--umc-color-fill-neutral-inverse-weak-400)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral-Inverse/Weak-Hover(Pressed)` | `var(--umc-color-fill-neutral-inverse-weak-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Neutral-Inverse/Medium-500` | `var(--umc-color-fill-neutral-inverse-medium-500)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral-Inverse/Medium-Hover(Pressed)` | `var(--umc-color-fill-neutral-inverse-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Neutral-Inverse/Strong-600` | `var(--umc-color-fill-neutral-inverse-strong-600)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral-Inverse/Strong-Hover(Pressed)` | `var(--umc-color-fill-neutral-inverse-strong-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Neutral-Inverse/Stronger-700` | `var(--umc-color-fill-neutral-inverse-stronger-700)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Neutral-Inverse/Stronger-Hover(Pressed)` | `var(--umc-color-fill-neutral-inverse-stronger-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Primary/Weaker-50` | `var(--umc-color-fill-primary-weaker-50)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Weaker-Hover(Pressed)` | `var(--umc-color-fill-primary-weaker-hover-pressed)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Weak-75` | `var(--umc-color-fill-primary-weak-75)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Weak-Hover(Pressed)` | `var(--umc-color-fill-primary-weak-hover-pressed)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Medium-100` | `var(--umc-color-fill-primary-medium-100)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Medium-Hover(Pressed)` | `var(--umc-color-fill-primary-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Primary/Strong-200` | `var(--umc-color-fill-primary-strong-200)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Strong-Hover(Pressed)` | `var(--umc-color-fill-primary-strong-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Primary/Stronger-300` | `var(--umc-color-fill-primary-stronger-300)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary/Stronger-Hover(Pressed)-400` | `var(--umc-color-fill-primary-stronger-hover-pressed-400)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Primary-Inverse/Weak-400` | `var(--umc-color-fill-primary-inverse-weak-400)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary-Inverse/Weak-Hover(Pressed)` | `var(--umc-color-fill-primary-inverse-weak-hover-pressed)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary-Inverse/Medium-500` | `var(--umc-color-fill-primary-inverse-medium-500)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary-Inverse/Medium-Hover(Pressed)` | `var(--umc-color-fill-primary-inverse-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Primary-Inverse/Strong-600` | `var(--umc-color-fill-primary-inverse-strong-600)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Primary-Inverse/Strong-Hover(Pressed)` | `var(--umc-color-fill-primary-inverse-strong-hover-pressed)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Error/Weak-50` | `var(--umc-color-fill-error-weak-50)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Error/Weak-Hover(Pressed)` | `var(--umc-color-fill-error-weak-hover-pressed)` | `var(--color-action-primary-hover)` |
| `Semantic/Fill/Error/Medium-100` | `var(--umc-color-fill-error-medium-100)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Error/Medium-Hover(Pressed)` | `var(--umc-color-fill-error-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Error/Strong-500` | `var(--umc-color-fill-error-strong-500)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Error/Strong-Hover(Pressed)` | `var(--umc-color-fill-error-strong-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Warning/Weak-50` | `var(--umc-color-fill-warning-weak-50)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Warning/Weak-Hover(Pressed)` | `var(--umc-color-fill-warning-weak-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Warning/Medium-100` | `var(--umc-color-fill-warning-medium-100)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Warning/Medium-Hover(Pressed)` | `var(--umc-color-fill-warning-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Warning/Strong-500` | `var(--umc-color-fill-warning-strong-500)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Warning/Strong-Hover(Pressed)` | `var(--umc-color-fill-warning-strong-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Success/Weak-50` | `var(--umc-color-fill-success-weak-50)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Success/Weak-Hover(Pressed)` | `var(--umc-color-fill-success-weak-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Success/Medium-100` | `var(--umc-color-fill-success-medium-100)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Success/Medium-Hover(Pressed)` | `var(--umc-color-fill-success-medium-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Fill/Success/Strong-500` | `var(--umc-color-fill-success-strong-500)` | `var(--color-action-primary-default)` |
| `Semantic/Fill/Success/Strong-Hover(Pressed)` | `var(--umc-color-fill-success-strong-hover-pressed)` | `var(--color-action-primary-pressed)` |
| `Semantic/Background/Default` | `var(--umc-color-background-default)` | `var(--color-bg-default)` |
| `Semantic/Background/Neutral-Weak` | `var(--umc-color-background-neutral-weak)` | `var(--color-bg-subtle)` |
| `Semantic/Background/Neutral-Medium` | `var(--umc-color-background-neutral-medium)` | `var(--color-bg-subtle)` |
| `Semantic/Background/Brand-Weak` | `var(--umc-color-background-brand-weak)` | `var(--color-bg-brand-subtle)` |
| `Semantic/Background/Brand-Medium` | `var(--umc-color-background-brand-medium)` | `var(--color-bg-brand-subtle)` |
| `Semantic/Surface/Default` | `var(--umc-color-surface-default)` | `var(--color-surface-default)` |
| `Semantic/Surface/Neutral-Weak` | `var(--umc-color-surface-neutral-weak)` | `var(--color-surface-subtle)` |
| `Semantic/Surface/Neutral-Medium` | `var(--umc-color-surface-neutral-medium)` | `var(--color-surface-subtle)` |
| `Semantic/Surface/Neutral-Inverse` | `var(--umc-color-surface-neutral-inverse)` | `var(--color-surface-subtle)` |
| `Semantic/Surface/Brand-Weak` | `var(--umc-color-surface-brand-weak)` | `var(--color-surface-inverse)` |
| `Semantic/Surface/Brand-Medium` | `var(--umc-color-surface-brand-medium)` | `var(--color-surface-inverse)` |
| `Semantic/Surface/Brand-Inverse` | `var(--umc-color-surface-brand-inverse)` | `var(--color-surface-inverse)` |
| `Semantic/Text/Inverse` | `var(--umc-color-text-inverse)` | `var(--color-text-inverse)` |
| `Semantic/Text/Disabled` | `var(--umc-color-text-disabled)` | `var(--color-text-disabled)` |
| `Semantic/Text/Placeholder` | `var(--umc-color-text-placeholder)` | `var(--color-text-disabled)` |
| `Semantic/Text/Neutral-Weak-500` | `var(--umc-color-text-neutral-weak-500)` | `var(--color-text-subtle)` |
| `Semantic/Text/Neutral-Medium-600` | `var(--umc-color-text-neutral-medium-600)` | `var(--color-text-subtle)` |
| `Semantic/Text/Neutral-Strong-800` | `var(--umc-color-text-neutral-strong-800)` | `var(--color-text-subtle)` |
| `Semantic/Text/Neutral-Default-900` | `var(--umc-color-text-neutral-default-900)` | `var(--color-text-default)` |
| `Semantic/Text/Brand-Disabled-300` | `var(--umc-color-text-brand-disabled-300)` | `var(--color-text-brand)` |
| `Semantic/Text/Brand-Default-600` | `var(--umc-color-text-brand-default-600)` | `var(--color-text-brand)` |
| `Semantic/Text/Brand-Strong-800` | `var(--umc-color-text-brand-strong-800)` | `var(--color-text-brand)` |
| `Semantic/Text/Success` | `var(--umc-color-text-success)` | `var(--color-text-link)` |
| `Semantic/Text/Error` | `var(--umc-color-text-error)` | `var(--color-text-link)` |
| `Semantic/Text/Warning` | `var(--umc-color-text-warning)` | `var(--color-text-link)` |
| `Semantic/Border/Neutral/Disabled` | `var(--umc-color-border-neutral-disabled)` | 없음 |
| `Semantic/Border/Neutral/Weaker-100` | `var(--umc-color-border-neutral-weaker-100)` | `var(--color-border-subtle)` |
| `Semantic/Border/Neutral/Weak-200` | `var(--umc-color-border-neutral-weak-200)` | `var(--color-border-subtle)` |
| `Semantic/Border/Neutral/Medium-300` | `var(--umc-color-border-neutral-medium-300)` | `var(--color-border-default)` |
| `Semantic/Border/Neutral/Strong-400` | `var(--umc-color-border-neutral-strong-400)` | `var(--color-border-strong)` |
| `Semantic/Border/Neutral/Stronger-600` | `var(--umc-color-border-neutral-stronger-600)` | `var(--color-border-strong)` |
| `Semantic/Border/Neutral/Default` | `var(--umc-color-border-neutral-default)` | `var(--color-action-primary-default)` |
| `Semantic/Border/Primary/Weaker-100` | `var(--umc-color-border-primary-weaker-100)` | `var(--color-border-subtle)` |
| `Semantic/Border/Primary/Weak-200` | `var(--umc-color-border-primary-weak-200)` | `var(--color-border-default)` |
| `Semantic/Border/Primary/Medium-300` | `var(--umc-color-border-primary-medium-300)` | `var(--color-border-strong)` |
| `Semantic/Border/Primary/Strong-500` | `var(--umc-color-border-primary-strong-500)` | `var(--color-border-strong)` |
| `Semantic/Border/Error/Weaker-100` | `var(--umc-color-border-error-weaker-100)` | `var(--color-border-subtle)` |
| `Semantic/Border/Error/Weak-200` | `var(--umc-color-border-error-weak-200)` | `var(--color-border-default)` |
| `Semantic/Border/Error/Medium-300` | `var(--umc-color-border-error-medium-300)` | `var(--color-border-strong)` |
| `Semantic/Border/Error/Strong-500` | `var(--umc-color-border-error-strong-500)` | `var(--color-border-strong)` |
| `Semantic/Border/Warning/Weaker-100` | `var(--umc-color-border-warning-weaker-100)` | `var(--color-border-subtle)` |
| `Semantic/Border/Warning/Weak-200` | `var(--umc-color-border-warning-weak-200)` | `var(--color-border-default)` |
| `Semantic/Border/Warning/Medium-300` | `var(--umc-color-border-warning-medium-300)` | `var(--color-border-strong)` |
| `Semantic/Border/Warning/Strong-500` | `var(--umc-color-border-warning-strong-500)` | `var(--color-border-strong)` |
| `Semantic/Border/Success/Weaker-100` | `var(--umc-color-border-success-weaker-100)` | `var(--color-border-subtle)` |
| `Semantic/Border/Success/Weak-200` | `var(--umc-color-border-success-weak-200)` | `var(--color-border-default)` |
| `Semantic/Border/Success/Medium-300` | `var(--umc-color-border-success-medium-300)` | `var(--color-border-strong)` |
| `Semantic/Border/Success/Strong-500` | `var(--umc-color-border-success-strong-500)` | `var(--color-border-strong)` |
| `Semantic/Tag/Part/PM/Weaker-50` | `var(--umc-color-tag-part-pm-weaker-50)` | `var(--color-tag-part-pm-bg)` |
| `Semantic/Tag/Part/PM/Weak-200` | `var(--umc-color-tag-part-pm-weak-200)` | `var(--color-tag-part-pm-bg)` |
| `Semantic/Tag/Part/PM/Medium-300` | `var(--umc-color-tag-part-pm-medium-300)` | `var(--color-tag-part-pm-border)` |
| `Semantic/Tag/Part/PM/Strong-400` | `var(--umc-color-tag-part-pm-strong-400)` | `var(--color-tag-part-pm-text)` |
| `Semantic/Tag/Part/Design/Weaker-50` | `var(--umc-color-tag-part-design-weaker-50)` | `var(--color-tag-part-design-bg)` |
| `Semantic/Tag/Part/Design/Weak-200` | `var(--umc-color-tag-part-design-weak-200)` | `var(--color-tag-part-design-bg)` |
| `Semantic/Tag/Part/Design/Medium-300` | `var(--umc-color-tag-part-design-medium-300)` | `var(--color-tag-part-design-border)` |
| `Semantic/Tag/Part/Design/Strong-400` | `var(--umc-color-tag-part-design-strong-400)` | `var(--color-tag-part-design-text)` |
| `Semantic/Tag/Part/Mobile-PE/Weaker-50` | `var(--umc-color-tag-part-mobile-pe-weaker-50)` | `var(--color-tag-part-mobile-pe-bg)` |
| `Semantic/Tag/Part/Mobile-PE/Weak-200` | `var(--umc-color-tag-part-mobile-pe-weak-200)` | `var(--color-tag-part-mobile-pe-bg)` |
| `Semantic/Tag/Part/Mobile-PE/Medium-300` | `var(--umc-color-tag-part-mobile-pe-medium-300)` | `var(--color-tag-part-mobile-pe-border)` |
| `Semantic/Tag/Part/Mobile-PE/Strong-400` | `var(--umc-color-tag-part-mobile-pe-strong-400)` | `var(--color-tag-part-mobile-pe-text)` |
| `Semantic/Tag/Part/Web-PE/Weaker-50` | `var(--umc-color-tag-part-web-pe-weaker-50)` | `var(--color-tag-part-web-pe-bg)` |
| `Semantic/Tag/Part/Web-PE/Weak-100` | `var(--umc-color-tag-part-web-pe-weak-100)` | `var(--color-tag-part-web-pe-bg)` |
| `Semantic/Tag/Part/Web-PE/Medium-500` | `var(--umc-color-tag-part-web-pe-medium-500)` | `var(--color-tag-part-web-pe-border)` |
| `Semantic/Tag/Part/Web-PE/Strong-600` | `var(--umc-color-tag-part-web-pe-strong-600)` | `var(--color-tag-part-web-pe-text)` |
| `Semantic/Tag/Role/Central/Weaker` | `var(--umc-color-tag-role-central-weaker)` | `var(--color-tag-role-central-bg)` |
| `Semantic/Tag/Role/Central/Weak` | `var(--umc-color-tag-role-central-weak)` | `var(--color-tag-role-central-border)` |
| `Semantic/Tag/Role/Central/Medium` | `var(--umc-color-tag-role-central-medium)` | `var(--color-tag-role-central-border)` |
| `Semantic/Tag/Role/Central/Strong` | `var(--umc-color-tag-role-central-strong)` | `var(--color-tag-role-central-text)` |
| `Semantic/Tag/Role/Chapter/Weaker` | `var(--umc-color-tag-role-chapter-weaker)` | `var(--color-tag-role-chapter-bg)` |
| `Semantic/Tag/Role/Chapter/Weak` | `var(--umc-color-tag-role-chapter-weak)` | `var(--color-tag-role-chapter-border)` |
| `Semantic/Tag/Role/Chapter/Medium` | `var(--umc-color-tag-role-chapter-medium)` | `var(--color-tag-role-chapter-border)` |
| `Semantic/Tag/Role/Chapter/Strong` | `var(--umc-color-tag-role-chapter-strong)` | `var(--color-tag-role-chapter-text)` |
| `Semantic/Tag/Role/Campus/Weaker` | `var(--umc-color-tag-role-campus-weaker)` | `var(--color-tag-role-campus-bg)` |
| `Semantic/Tag/Role/Campus/Weak` | `var(--umc-color-tag-role-campus-weak)` | `var(--color-tag-role-campus-bg)` |
| `Semantic/Tag/Role/Campus/Medium` | `var(--umc-color-tag-role-campus-medium)` | `var(--color-tag-role-campus-border)` |
| `Semantic/Tag/Role/Campus/Strong` | `var(--umc-color-tag-role-campus-strong)` | `var(--color-tag-role-campus-text)` |
| `Semantic/Tag/Role/Challenger&Super-Admin/Weaker` | `var(--umc-color-tag-role-challenger-super-admin-weaker)` | `var(--color-tag-role-super-admin-bg)` |
| `Semantic/Tag/Role/Challenger&Super-Admin/Weak` | `var(--umc-color-tag-role-challenger-super-admin-weak)` | `var(--color-tag-role-super-admin-bg)` |
| `Semantic/Tag/Role/Challenger&Super-Admin/Medium` | `var(--umc-color-tag-role-challenger-super-admin-medium)` | `var(--color-tag-role-super-admin-border)` |
| `Semantic/Tag/Role/Challenger&Super-Admin/Strong` | `var(--umc-color-tag-role-challenger-super-admin-strong)` | `var(--color-tag-role-super-admin-text)` |
| `Semantic/Tag/Role/Product/Weaker` | `var(--umc-color-tag-role-product-weaker)` | `var(--color-tag-role-product-bg)` |
| `Semantic/Tag/Role/Product/Weak` | `var(--umc-color-tag-role-product-weak)` | `var(--color-tag-role-product-border)` |
| `Semantic/Tag/Role/Product/Medium` | `var(--umc-color-tag-role-product-medium)` | `var(--color-tag-role-product-border)` |
| `Semantic/Tag/Role/Product/Strong` | `var(--umc-color-tag-role-product-strong)` | `var(--color-tag-role-product-text)` |
| `Semantic/Dimmed/Weak` | `var(--umc-color-dimmed-weak)` | 없음 |
| `Semantic/Dimmed/Medium` | `var(--umc-color-dimmed-medium)` | 없음 |
| `Semantic/Dimmed/Strong` | `var(--umc-color-dimmed-strong)` | 없음 |
| `Primitives/Base/White` | `var(--umc-color-white)` | 없음 |
| `Primitives/Base/Black` | `var(--umc-color-black)` | 없음 |
| `Primitives/Grey/TealGrey-50` | `var(--umc-color-teal-grey-50)` | 없음 |
| `Primitives/Grey/TealGrey-75` | `var(--umc-color-teal-grey-75)` | 없음 |
| `Primitives/Grey/TealGrey-100` | `var(--umc-color-teal-grey-100)` | 없음 |
| `Primitives/Grey/TealGrey-200` | `var(--umc-color-teal-grey-200)` | 없음 |
| `Primitives/Grey/TealGrey-300` | `var(--umc-color-teal-grey-300)` | 없음 |
| `Primitives/Grey/TealGrey-400` | `var(--umc-color-teal-grey-400)` | 없음 |
| `Primitives/Grey/TealGrey-500` | `var(--umc-color-teal-grey-500)` | 없음 |
| `Primitives/Grey/TealGrey-600` | `var(--umc-color-teal-grey-600)` | 없음 |
| `Primitives/Grey/TealGrey-700` | `var(--umc-color-teal-grey-700)` | 없음 |
| `Primitives/Grey/TealGrey-800` | `var(--umc-color-teal-grey-800)` | 없음 |
| `Primitives/Grey/TealGrey-900` | `var(--umc-color-teal-grey-900)` | 없음 |
| `Primitives/Teal/Teal-50` | `var(--umc-color-teal-50)` | 없음 |
| `Primitives/Teal/Teal-75` | `var(--umc-color-teal-75)` | 없음 |
| `Primitives/Teal/Teal-100` | `var(--umc-color-teal-100)` | 없음 |
| `Primitives/Teal/Teal-200` | `var(--umc-color-teal-200)` | 없음 |
| `Primitives/Teal/Teal-300` | `var(--umc-color-teal-300)` | 없음 |
| `Primitives/Teal/Teal-400` | `var(--umc-color-teal-400)` | 없음 |
| `Primitives/Teal/Teal-500` | `var(--umc-color-teal-500)` | 없음 |
| `Primitives/Teal/Teal-600` | `var(--umc-color-teal-600)` | 없음 |
| `Primitives/Teal/Teal-700` | `var(--umc-color-teal-700)` | 없음 |
| `Primitives/Teal/Teal-800` | `var(--umc-color-teal-800)` | 없음 |
| `Primitives/Teal/Teal-900` | `var(--umc-color-teal-900)` | 없음 |
| `Primitives/Red/Red-50` | `var(--umc-color-red-50)` | 없음 |
| `Primitives/Red/Red-100` | `var(--umc-color-red-100)` | 없음 |
| `Primitives/Red/Red-200` | `var(--umc-color-red-200)` | 없음 |
| `Primitives/Red/Red-300` | `var(--umc-color-red-300)` | 없음 |
| `Primitives/Red/Red-400` | `var(--umc-color-red-400)` | 없음 |
| `Primitives/Red/Red-500` | `var(--umc-color-red-500)` | 없음 |
| `Primitives/Red/Red-600` | `var(--umc-color-red-600)` | 없음 |
| `Primitives/Red/Red-700` | `var(--umc-color-red-700)` | 없음 |
| `Primitives/Red/Red-800` | `var(--umc-color-red-800)` | 없음 |
| `Primitives/Red/Red-900` | `var(--umc-color-red-900)` | 없음 |
| `Primitives/Yellow/Yellow-50` | `var(--umc-color-yellow-50)` | 없음 |
| `Primitives/Yellow/Yellow-100` | `var(--umc-color-yellow-100)` | 없음 |
| `Primitives/Yellow/Yellow-200` | `var(--umc-color-yellow-200)` | 없음 |
| `Primitives/Yellow/Yellow-300` | `var(--umc-color-yellow-300)` | 없음 |
| `Primitives/Yellow/Yellow-400` | `var(--umc-color-yellow-400)` | 없음 |
| `Primitives/Yellow/Yellow-500` | `var(--umc-color-yellow-500)` | 없음 |
| `Primitives/Yellow/Yellow-600` | `var(--umc-color-yellow-600)` | 없음 |
| `Primitives/Yellow/Yellow-700` | `var(--umc-color-yellow-700)` | 없음 |
| `Primitives/Yellow/Yellow-800` | `var(--umc-color-yellow-800)` | 없음 |
| `Primitives/Yellow/Yellow-900` | `var(--umc-color-yellow-900)` | 없음 |
| `Primitives/Green/Green-50` | `var(--umc-color-green-50)` | 없음 |
| `Primitives/Green/Green-100` | `var(--umc-color-green-100)` | 없음 |
| `Primitives/Green/Green-200` | `var(--umc-color-green-200)` | 없음 |
| `Primitives/Green/Green-300` | `var(--umc-color-green-300)` | 없음 |
| `Primitives/Green/Green-400` | `var(--umc-color-green-400)` | 없음 |
| `Primitives/Green/Green-500` | `var(--umc-color-green-500)` | 없음 |
| `Primitives/Green/Green-600` | `var(--umc-color-green-600)` | 없음 |
| `Primitives/Green/Green-700` | `var(--umc-color-green-700)` | 없음 |
| `Primitives/Green/Green-800` | `var(--umc-color-green-800)` | 없음 |
| `Primitives/Green/Green-900` | `var(--umc-color-green-900)` | 없음 |
| `Primitives/Violet/Violet-50` | `var(--umc-color-violet-50)` | 없음 |
| `Primitives/Violet/Violet-100` | `var(--umc-color-violet-100)` | 없음 |
| `Primitives/Violet/Violet-500` | `var(--umc-color-violet-500)` | 없음 |
| `Primitives/Violet/Violet-600` | `var(--umc-color-violet-600)` | 없음 |
| `Primitives/Purple/Purple-50` | `var(--umc-color-purple-50)` | 없음 |
| `Primitives/Purple/Purple-100` | `var(--umc-color-purple-100)` | 없음 |
| `Primitives/Purple/Purple-500` | `var(--umc-color-purple-500)` | 없음 |
| `Primitives/Purple/Purple-600` | `var(--umc-color-purple-600)` | 없음 |
| `Primitives/Pink/Pink-50` | `var(--umc-color-pink-50)` | 없음 |
| `Primitives/Pink/Pink-100` | `var(--umc-color-pink-100)` | 없음 |
| `Primitives/Pink/Pink-500` | `var(--umc-color-pink-500)` | 없음 |
| `Primitives/Pink/Pink-600` | `var(--umc-color-pink-600)` | 없음 |
| `Primitives/Cobalt/Cobalt-50` | `var(--umc-color-cobalt-50)` | 없음 |
| `Primitives/Cobalt/Cobalt-100` | `var(--umc-color-cobalt-100)` | 없음 |
| `Primitives/Cobalt/Cobalt-500` | `var(--umc-color-cobalt-500)` | 없음 |
| `Primitives/Cobalt/Cobalt-600` | `var(--umc-color-cobalt-600)` | 없음 |
| `Primitives/Blue/Blue-50` | `var(--umc-color-blue-50)` | 없음 |
| `Primitives/Blue/Blue-100` | `var(--umc-color-blue-100)` | 없음 |
| `Primitives/Blue/Blue-500` | `var(--umc-color-blue-500)` | 없음 |
| `Primitives/Blue/Blue-600` | `var(--umc-color-blue-600)` | 없음 |
| `Primitives/Brown/Brown-50` | `var(--umc-color-brown-50)` | 없음 |
| `Primitives/Brown/Brown-100` | `var(--umc-color-brown-100)` | 없음 |
| `Primitives/Brown/Brown-500` | `var(--umc-color-brown-500)` | 없음 |
| `Primitives/Brown/Brown-600` | `var(--umc-color-brown-600)` | 없음 |
| `Typography/Base/FontSize/48px` | `var(--umc-font-size-48)` | 없음 |
| `Typography/Base/FontSize/40px` | `var(--umc-font-size-40)` | 없음 |
| `Typography/Base/FontSize/36px` | `var(--umc-font-size-36)` | 없음 |
| `Typography/Base/FontSize/32px` | `var(--umc-font-size-32)` | 없음 |
| `Typography/Base/FontSize/28px` | `var(--umc-font-size-28)` | 없음 |
| `Typography/Base/FontSize/24px` | `var(--umc-font-size-24)` | 없음 |
| `Typography/Base/FontSize/22px` | `var(--umc-font-size-22)` | 없음 |
| `Typography/Base/FontSize/20px` | `var(--umc-font-size-20)` | 없음 |
| `Typography/Base/FontSize/18px` | `var(--umc-font-size-18)` | 없음 |
| `Typography/Base/FontSize/16px` | `var(--umc-font-size-16)` | 없음 |
| `Typography/Base/FontSize/15px` | `var(--umc-font-size-15)` | 없음 |
| `Typography/Base/FontSize/14px` | `var(--umc-font-size-14)` | 없음 |
| `Typography/Base/FontSize/13px` | `var(--umc-font-size-13)` | 없음 |
| `Typography/Base/FontSize/12px` | `var(--umc-font-size-12)` | 없음 |
| `Typography/Base/FontSize/11px` | `var(--umc-font-size-11)` | 없음 |
| `Typography/Base/FontFamily/Brand` | `var(--umc-font-family-brand)` | 없음 |
| `Typography/Base/FontWeight/Regular` | `var(--umc-font-weight-regular)` | 없음 |
| `Typography/Base/FontWeight/Medium` | `var(--umc-font-weight-medium)` | 없음 |
| `Typography/Base/FontWeight/Semibold` | `var(--umc-font-weight-semibold)` | 없음 |
| `Typography/Base/FontWeight/Bold` | `var(--umc-font-weight-bold)` | 없음 |
| `Spacing/Primitive/0` | `var(--umc-spacing-0)` | 없음 |
| `Spacing/Primitive/2` | `var(--umc-spacing-2)` | 없음 |
| `Spacing/Primitive/4` | `var(--umc-spacing-4)` | 없음 |
| `Spacing/Primitive/6` | `var(--umc-spacing-6)` | 없음 |
| `Spacing/Primitive/8` | `var(--umc-spacing-8)` | 없음 |
| `Spacing/Primitive/10` | `var(--umc-spacing-10)` | 없음 |
| `Spacing/Primitive/12` | `var(--umc-spacing-12)` | 없음 |
| `Spacing/Primitive/16` | `var(--umc-spacing-16)` | 없음 |
| `Spacing/Primitive/20` | `var(--umc-spacing-20)` | 없음 |
| `Spacing/Primitive/24` | `var(--umc-spacing-24)` | 없음 |
| `Spacing/Primitive/28` | `var(--umc-spacing-28)` | 없음 |
| `Spacing/Primitive/32` | `var(--umc-spacing-32)` | 없음 |
| `Spacing/Primitive/40` | `var(--umc-spacing-40)` | 없음 |
| `Spacing/Primitive/48` | `var(--umc-spacing-48)` | 없음 |
| `Spacing/Primitive/64` | `var(--umc-spacing-64)` | 없음 |
| `Spacing/Primitive/80` | `var(--umc-spacing-80)` | 없음 |
| `Spacing/Semantic/Padding/Padding 0` | `var(--umc-spacing-padding-0)` | 없음 |
| `Spacing/Semantic/Padding/Padding 4` | `var(--umc-spacing-padding-4)` | 없음 |
| `Spacing/Semantic/Padding/Padding 6` | `var(--umc-spacing-padding-6)` | 없음 |
| `Spacing/Semantic/Padding/Padding 8` | `var(--umc-spacing-padding-8)` | 없음 |
| `Spacing/Semantic/Padding/Padding 10` | `var(--umc-spacing-padding-10)` | 없음 |
| `Spacing/Semantic/Padding/Padding 12` | `var(--umc-spacing-padding-12)` | 없음 |
| `Spacing/Semantic/Padding/Padding 16` | `var(--umc-spacing-padding-16)` | 없음 |
| `Spacing/Semantic/Padding/Padding 20` | `var(--umc-spacing-padding-20)` | 없음 |
| `Spacing/Semantic/Padding/Padding 24` | `var(--umc-spacing-padding-24)` | 없음 |
| `Spacing/Semantic/Padding/Padding 28` | `var(--umc-spacing-padding-28)` | 없음 |
| `Spacing/Semantic/Padding/Padding 32` | `var(--umc-spacing-padding-32)` | 없음 |
| `Spacing/Semantic/Padding/Padding 40` | `var(--umc-spacing-padding-40)` | 없음 |
| `Spacing/Semantic/Padding/Padding 48` | `var(--umc-spacing-padding-48)` | 없음 |
| `Spacing/Semantic/Gap/Gap 0` | `var(--umc-spacing-gap-0)` | 없음 |
| `Spacing/Semantic/Gap/Gap 4` | `var(--umc-spacing-gap-4)` | 없음 |
| `Spacing/Semantic/Gap/Gap 6` | `var(--umc-spacing-gap-6)` | 없음 |
| `Spacing/Semantic/Gap/Gap 8` | `var(--umc-spacing-gap-8)` | 없음 |
| `Spacing/Semantic/Gap/Gap 10` | `var(--umc-spacing-gap-10)` | 없음 |
| `Spacing/Semantic/Gap/Gap 12` | `var(--umc-spacing-gap-12)` | 없음 |
| `Spacing/Semantic/Gap/Gap 16` | `var(--umc-spacing-gap-16)` | 없음 |
| `Spacing/Semantic/Gap/Gap 20` | `var(--umc-spacing-gap-20)` | 없음 |
| `Spacing/Semantic/Gap/Gap 24` | `var(--umc-spacing-gap-24)` | 없음 |
| `Spacing/Semantic/Gap/Gap 28` | `var(--umc-spacing-gap-28)` | 없음 |
| `Spacing/Semantic/Gap/Gap 32` | `var(--umc-spacing-gap-32)` | 없음 |
| `Spacing/Semantic/Gap/Gap 40` | `var(--umc-spacing-gap-40)` | 없음 |
| `Spacing/Semantic/Margin/Margin 0` | `var(--umc-spacing-margin-0)` | 없음 |
| `Spacing/Semantic/Margin/Margin 16` | `var(--umc-spacing-margin-16)` | 없음 |
| `Spacing/Semantic/Margin/Margin 20` | `var(--umc-spacing-margin-20)` | 없음 |
| `Spacing/Semantic/Margin/Margin 24` | `var(--umc-spacing-margin-24)` | 없음 |
| `Spacing/Semantic/Margin/Margin 32` | `var(--umc-spacing-margin-32)` | 없음 |
| `Spacing/Semantic/Margin/Margin 40` | `var(--umc-spacing-margin-40)` | 없음 |
| `Spacing/Semantic/Margin/Margin 48` | `var(--umc-spacing-margin-48)` | 없음 |
| `Spacing/Semantic/Margin/Margin 64` | `var(--umc-spacing-margin-64)` | 없음 |
| `Spacing/Semantic/Margin/Margin 80` | `var(--umc-spacing-margin-80)` | 없음 |
| `Radius/Primitive/6` | `var(--umc-radius-6)` | 없음 |
| `Radius/Primitive/8` | `var(--umc-radius-8)` | 없음 |
| `Radius/Primitive/10` | `var(--umc-radius-10)` | 없음 |
| `Radius/Primitive/12` | `var(--umc-radius-12)` | 없음 |
| `Radius/Primitive/14` | `var(--umc-radius-14)` | 없음 |
| `Radius/Primitive/16` | `var(--umc-radius-16)` | 없음 |
| `Radius/Primitive/18` | `var(--umc-radius-18)` | 없음 |
| `Radius/Primitive/20` | `var(--umc-radius-20)` | 없음 |
| `Radius/Primitive/24` | `var(--umc-radius-24)` | 없음 |
| `Radius/Primitive/Full` | `var(--umc-radius-full)` | 없음 |
| `Radius/Semantic/Text Field/Box` | `var(--umc-radius-text-field-box)` | 없음 |
| `Radius/Semantic/Button/R Button 8` | `var(--umc-radius-button-8)` | 없음 |
| `Radius/Semantic/Button/R Button 10` | `var(--umc-radius-button-10)` | 없음 |
| `Radius/Semantic/Button/R Button 12` | `var(--umc-radius-button-12)` | 없음 |
| `Radius/Semantic/Button/R Button 14` | `var(--umc-radius-button-14)` | 없음 |
| `Radius/Semantic/Button/R Button 16` | `var(--umc-radius-button-16)` | 없음 |
| `Radius/Semantic/Toast/Toast` | `var(--umc-radius-toast)` | 없음 |
| `Radius/Semantic/Segmented Control/XS` | `var(--umc-radius-segmented-control-xs)` | 없음 |
