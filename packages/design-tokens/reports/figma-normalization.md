# 피그마 정규화 리포트

`pnpm tokens:normalize`가 만드는 파일이다. 손으로 고치지 않는다. 규칙은 `scripts/normalize/rules.ts`에서 바꾼다.

## 입력

| 파일 | 출처 | 노드 또는 원래 이름 | 받은 날 |
| --- | --- | --- | --- |
| `mcp/get-variable-defs.2268-1706.json` | get_variable_defs | 2268:1706 | 2026-10-06 |
| `export/color.mode-1.tokens.json` | Figma Variables Export modes (Color 컬렉션) | Mode 1.tokens.json | 2026-10-06 |
| `export/token.mode-1.tokens.json` | Figma Variables Export modes (Token 컬렉션) | Mode 1.tokens 2.json | 2026-10-06 |

## 변수 개수

| export 파일 | 변수 | 이전 스냅샷 |
| --- | --- | --- |
| `color.mode-1.tokens.json` | 229 | 196 |
| `token.mode-1.tokens.json` | 83 | 75 |

## 디자인 팀 확인 요청

1. codeSyntax(WEB)가 여러 변수에 중복으로 붙어 있습니다. 예를 들어 `var(--color-border-default)`는 `Border/Neutral/Medium-300`(회색)과 `Border/Primary/Weak-200`(틸)에 함께 붙어 있습니다. 코드는 변수 이름을 기준으로 삼았습니다. codeSyntax를 정리할지, 이 리포트의 이름 대응표를 기준으로 확정할지 정해 주세요.
2. semantic 이름 끝의 primitive 단계 숫자(`Neutral-Weak-400`, `Weak-200`)를 코드 이름에서 뺐습니다(`neutral-weak`, `weak`). 단계 숫자는 색 값이 바뀌면 거짓이 되기 때문입니다. 이대로 확정해도 될까요?
3. `Fill/Disabled/Disalbed`, `Border/Disabled/Disalbed`의 오타를 빼고 `fill.disabled`, `border.disabled`로 읽었습니다. 피그마 이름도 고칠 수 있나요?
4. 같은 틸 역할을 Fill과 Border는 `Primary`, Background, Surface, Text, Icon은 `Brand`로 부릅니다. 한 이름으로 맞출 수 있나요?
5. `Display/3-Bold`가 Token 컬렉션에 없는 `Typography/Base/Fontfamily/Brand`, `Fontweight/Bold`를 참조합니다(다른 라이브러리 변수로 보입니다). `FontFamily`, `FontWeight`로 다시 연결해 주세요.
6. Primitive 컬러 문서 프레임에 쓰인 `primitives/orange/*`, `Base/Grey/Grey 900`, `Grey 800`, `Medium/H1`(PingFang SC)은 Color 컬렉션 export에 없습니다. 다른 라이브러리 것인지, 정리 대상인지 알려 주세요.
7. Violet, Purple, Pink, Cobalt, Blue, Brown 팔레트에는 50, 100, 500, 600 단계만 있습니다. 의도인가요?
8. `Body/4-Semibold`(13px), `Label/2`(17px), `Caption/3`(11px)의 크기가 변수에 연결되어 있지 않습니다. 17px은 `FontSize` 변수가 없으니 추가가 필요합니다. 반대로 `FontSize/22px`, `32px`은 어떤 텍스트 스타일에도 쓰이지 않습니다.
9. `Heading/Heading3-Semibold`(22px), `Mobile Web/Body/4-Regular`(행간 20px)는 폐기 대상인가요? 노드 2268:1706에 쓰인 텍스트 스타일이 전체 목록인지도 알려 주세요.
10. Display 3 문서 표에는 자간이 -2%로 적혀 있지만 실제 스타일 `Display/3-Bold`는 -1.5%입니다. 어느 쪽이 맞나요?
11. `Tag/Role/Challenger&Super-Admin`과 `Tag/Role/Product`는 Weak와 Medium이 같은 색입니다(Teal-100, TealGrey-100). 의도인가요?
12. `Label`(문자열 변수)과 `Radius/Primitive/48`(문자열 타입에 FONT_FAMILY scope)은 용도가 무엇인가요? 코드에서는 제외했습니다.
13. scope 정리가 필요해 보입니다. `Border/Neutral/Default`에는 채우기 scope가, `Border/Disabled/Disalbed`에는 ALL_SCOPES가 붙어 있고, primitive 대부분이 ALL_SCOPES입니다. 모드 이름 `Mode 1`도 `Default`로 바꿀 수 있나요?
14. 그리드: 브레이크포인트 경계값, 모바일 컬럼 수와 거터, 1440px 초과 시 최대 폭, Layout No.2의 컬럼 폭 문구를 확인해 주세요. 콘텐츠 폭은 1224px(1440 - 사이드바 216)이어야 문서의 컬럼 폭 82px과 맞습니다. 1220px이면 81.67px이 됩니다.

## 변수 이름 규칙

| 피그마 이름 | 방식 | 토큰 경로 | 이유 | 상태 |
| --- | --- | --- | --- | --- |
| `Semantic/Fill/Disabled/Disalbed` | 정확 일치 | `color.fill.disabled` | 오타 Disalbed를 뺀 Disabled 한 단계로 읽음 | 확인 대기 |
| `Semantic/Border/Disabled/Disalbed` | 정확 일치 | `color.border.disabled` | 오타 Disalbed를 뺀 Disabled 한 단계로 읽음 | 확인 대기 |
| `Primitives/Base/` | 접두사 | `color` | 흰색과 검은색은 color 바로 아래에 둠 | 확정 |
| `Primitives/Grey/TealGrey-` | 접두사 | `color.teal-grey` | Grey 그룹의 TealGrey 팔레트를 teal-grey로 둠 | 확정 |
| `Primitives/` | 접두사 | `color` | 팔레트 이름 반복 제거(Teal/Teal-500 → teal.500) | 확정 |
| `Semantic/` | 접두사 | `color` | 이름 끝의 primitive 단계 숫자 제거(Neutral-Weak-400 → neutral-weak) | 확인 대기 |
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
| `var(--color-action-primary-default)` | 31 | `Semantic/Fill/Neutral/Weaker-50`, `Semantic/Fill/Neutral/Weak-75`, `Semantic/Fill/Neutral/Medium-100`, `Semantic/Fill/Neutral/Strong-200`, `Semantic/Fill/Neutral/Default`, `Semantic/Fill/Neutral-Inverse/Weak-400`, `Semantic/Fill/Neutral-Inverse/Medium-500`, `Semantic/Fill/Neutral-Inverse/Strong-600`, `Semantic/Fill/Neutral-Inverse/Stronger-700`, `Semantic/Fill/Primary/Weaker-50`, `Semantic/Fill/Primary/Weaker-Hover(Pressed)`, `Semantic/Fill/Primary/Weak-75`, `Semantic/Fill/Primary/Weak-Hover(Pressed)`, `Semantic/Fill/Primary/Medium-100`, `Semantic/Fill/Primary/Strong-200`, `Semantic/Fill/Primary/Stronger-300`, `Semantic/Fill/Primary-Inverse/Medium-400`, `Semantic/Fill/Primary-Inverse/Medium-Hover(Pressed)`, `Semantic/Fill/Primary-Inverse/Strong-500`, `Semantic/Fill/Primary-Inverse/Stronger-600`, `Semantic/Fill/Primary-Inverse/Stronger-Hover(Pressed)`, `Semantic/Fill/Error/Weak-50`, `Semantic/Fill/Error/Medium-100`, `Semantic/Fill/Error/Strong-500`, `Semantic/Fill/Warning/Weak`, `Semantic/Fill/Warning/Medium`, `Semantic/Fill/Warning/Strong`, `Semantic/Fill/Success/Weak`, `Semantic/Fill/Success/Medium`, `Semantic/Fill/Success/Strong`, `Semantic/Border/Neutral/Default` |
| `var(--color-action-primary-pressed)` | 18 | `Semantic/Fill/Neutral/Weak-Hover(Pressed)`, `Semantic/Fill/Neutral/Medium-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Weak-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Medium-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Strong-Hover(Pressed)`, `Semantic/Fill/Neutral-Inverse/Stronger-Hover(Pressed)`, `Semantic/Fill/Primary/Medium-Hover(Pressed)`, `Semantic/Fill/Primary/Strong-Hover(Pressed)`, `Semantic/Fill/Primary/Stronger-Hover(Pressed)-400`, `Semantic/Fill/Primary-Inverse/Strong-Hover(Pressed)`, `Semantic/Fill/Error/Medium-Hover(Pressed)`, `Semantic/Fill/Error/Strong-Hover(Pressed)`, `Semantic/Fill/Warning/Weak-Hover(Pressed)`, `Semantic/Fill/Warning/Medium-Hover(Pressed)`, `Semantic/Fill/Warning/Strong-Hover(Pressed)`, `Semantic/Fill/Success/Weak-Hover(Pressed)`, `Semantic/Fill/Success/Medium-Hover(Pressed)`, `Semantic/Fill/Success/Strong-Hover(Pressed)` |
| `var(--color-border-strong)` | 10 | `Semantic/Border/Neutral/Strong-400`, `Semantic/Border/Neutral/Stronger-600`, `Semantic/Border/Primary/Medium-300`, `Semantic/Border/Primary/Strong-500`, `Semantic/Border/Error/Medium-300`, `Semantic/Border/Error/Strong-500`, `Semantic/Border/Warning/Medium-300`, `Semantic/Border/Warning/Strong-500`, `Semantic/Border/Success/Medium`, `Semantic/Border/Success/Strong` |
| `var(--color-border-subtle)` | 6 | `Semantic/Border/Neutral/Weaker-100`, `Semantic/Border/Neutral/Weak-200`, `Semantic/Border/Primary/Weaker-100`, `Semantic/Border/Error/Weaker-100`, `Semantic/Border/Warning/Weaker-100`, `Semantic/Border/Success/Weaker` |
| `var(--color-border-default)` | 5 | `Semantic/Border/Neutral/Medium-300`, `Semantic/Border/Primary/Weak-200`, `Semantic/Border/Error/Weak-200`, `Semantic/Border/Warning/Weak-200`, `Semantic/Border/Success/Weak` |
| `var(--color-icon-brand)` | 5 | `Semantic/Icon/Brand-Medium-500`, `Semantic/Icon/Brand-Strong-600`, `Semantic/Icon/Success`, `Semantic/Icon/Error`, `Semantic/Icon/Warning` |
| `var(--color-action-primary-hover)` | 3 | `Semantic/Fill/Neutral/Weaker-Hover(Pressed)`, `Semantic/Fill/Neutral/Strong-Hover(Pressed)`, `Semantic/Fill/Error/Weak-Hover(Pressed)` |
| `var(--color-surface-inverse)` | 3 | `Semantic/Surface/Brand-Weak`, `Semantic/Surface/Brand-Medium`, `Semantic/Surface/Brand-Inverse` |
| `var(--color-surface-subtle)` | 3 | `Semantic/Surface/Neutral-Weak`, `Semantic/Surface/Neutral-Medium`, `Semantic/Surface/Neutral-Inverse` |
| `var(--color-text-brand)` | 3 | `Semantic/Text/Brand-Disabled`, `Semantic/Text/Brand-Default`, `Semantic/Text/Brand-Strong` |
| `var(--color-text-link)` | 3 | `Semantic/Text/Success`, `Semantic/Text/Error`, `Semantic/Text/Warning` |
| `var(--color-text-subtle)` | 3 | `Semantic/Text/Neutral-Weak-500`, `Semantic/Text/Neutral-Medium-600`, `Semantic/Text/Neutral-Strong-800` |
| `var(--color-bg-brand-subtle)` | 2 | `Semantic/Background/Brand-Weak`, `Semantic/Background/Brand-Medium` |
| `var(--color-bg-subtle)` | 2 | `Semantic/Background/Neutral-Weak`, `Semantic/Background/Neutral-Medium` |
| `var(--color-icon-subtle)` | 2 | `Semantic/Icon/Neutral-Weak-400`, `Semantic/Icon/Neutral-Medium-500` |
| `var(--color-tag-part-design-bg)` | 2 | `Semantic/Tag/Part/Design/Weaker`, `Semantic/Tag/Part/Design/Weak` |
| `var(--color-tag-part-mobile-pe-bg)` | 2 | `Semantic/Tag/Part/Mobile-PE/Weaker`, `Semantic/Tag/Part/Mobile-PE/Weak` |
| `var(--color-tag-part-pm-bg)` | 2 | `Semantic/Tag/Part/PM/Weaker`, `Semantic/Tag/Part/PM/Weak` |
| `var(--color-tag-part-web-pe-bg)` | 2 | `Semantic/Tag/Part/Web-PE/Weaker`, `Semantic/Tag/Part/Web-PE/Weak` |
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
| `Semantic/Border/Disabled/Disalbed` | Border인데 STROKE scope가 없습니다 (ALL_SCOPES) |
| `Semantic/Border/Neutral/Default` | Border인데 STROKE scope가 없습니다 (FRAME_FILL, SHAPE_FILL) |

## 참조가 아닌 semantic

primitive를 참조하지 않고 값을 직접 가진 semantic이다. 투명도가 있으면 8자리 hex로 옮겼다.

- `Semantic/Dimmed/Weak`
- `Semantic/Dimmed/Medium`
- `Semantic/Dimmed/Strong`

## 타이포 교차 확인

텍스트 스타일 원문(MCP)이 참조하는 변수 값은 export 값과 모두 같다.

- export에 없는 변수 이름: `Typography/Base/Fontweight/Bold`, `Typography/Base/Fontfamily/Brand`
- 어떤 텍스트 스타일도 쓰지 않는 토큰: `font-size.22`, `font-size.32`

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
| `Caption/3-Medium` | 크기 11px가 변수에 연결되지 않았습니다 |
| `Caption/3-Regular` | 크기 11px가 변수에 연결되지 않았습니다 |

## 이름 대응표

| 피그마 변수 | 코드 토큰 | 토큰 파일 |
| --- | --- | --- |
| `Semantic/Icon/Disabled` | `color.icon.disabled` | color.semantic.json |
| `Semantic/Icon/Inverse` | `color.icon.inverse` | color.semantic.json |
| `Semantic/Icon/Neutral-Weak-400` | `color.icon.neutral-weak` | color.semantic.json |
| `Semantic/Icon/Neutral-Medium-500` | `color.icon.neutral-medium` | color.semantic.json |
| `Semantic/Icon/Neutral-Strong-600` | `color.icon.neutral-strong` | color.semantic.json |
| `Semantic/Icon/Neutral-Stronger-700` | `color.icon.neutral-stronger` | color.semantic.json |
| `Semantic/Icon/Brand-Medium-500` | `color.icon.brand-medium` | color.semantic.json |
| `Semantic/Icon/Brand-Strong-600` | `color.icon.brand-strong` | color.semantic.json |
| `Semantic/Icon/Success` | `color.icon.success` | color.semantic.json |
| `Semantic/Icon/Error` | `color.icon.error` | color.semantic.json |
| `Semantic/Icon/Warning` | `color.icon.warning` | color.semantic.json |
| `Semantic/Fill/Disabled/Disalbed` | `color.fill.disabled` | color.semantic.json |
| `Semantic/Fill/Neutral/Weaker-50` | `color.fill.neutral.weaker` | color.semantic.json |
| `Semantic/Fill/Neutral/Weaker-Hover(Pressed)` | `color.fill.neutral.weaker-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral/Weak-75` | `color.fill.neutral.weak` | color.semantic.json |
| `Semantic/Fill/Neutral/Weak-Hover(Pressed)` | `color.fill.neutral.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral/Medium-100` | `color.fill.neutral.medium` | color.semantic.json |
| `Semantic/Fill/Neutral/Medium-Hover(Pressed)` | `color.fill.neutral.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral/Strong-200` | `color.fill.neutral.strong` | color.semantic.json |
| `Semantic/Fill/Neutral/Strong-Hover(Pressed)` | `color.fill.neutral.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral/Default` | `color.fill.neutral.default` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Weak-400` | `color.fill.neutral-inverse.weak` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Weak-Hover(Pressed)` | `color.fill.neutral-inverse.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Medium-500` | `color.fill.neutral-inverse.medium` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Medium-Hover(Pressed)` | `color.fill.neutral-inverse.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Strong-600` | `color.fill.neutral-inverse.strong` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Strong-Hover(Pressed)` | `color.fill.neutral-inverse.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Stronger-700` | `color.fill.neutral-inverse.stronger` | color.semantic.json |
| `Semantic/Fill/Neutral-Inverse/Stronger-Hover(Pressed)` | `color.fill.neutral-inverse.stronger-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary/Weaker-50` | `color.fill.primary.weaker` | color.semantic.json |
| `Semantic/Fill/Primary/Weaker-Hover(Pressed)` | `color.fill.primary.weaker-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary/Weak-75` | `color.fill.primary.weak` | color.semantic.json |
| `Semantic/Fill/Primary/Weak-Hover(Pressed)` | `color.fill.primary.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary/Medium-100` | `color.fill.primary.medium` | color.semantic.json |
| `Semantic/Fill/Primary/Medium-Hover(Pressed)` | `color.fill.primary.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary/Strong-200` | `color.fill.primary.strong` | color.semantic.json |
| `Semantic/Fill/Primary/Strong-Hover(Pressed)` | `color.fill.primary.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary/Stronger-300` | `color.fill.primary.stronger` | color.semantic.json |
| `Semantic/Fill/Primary/Stronger-Hover(Pressed)-400` | `color.fill.primary.stronger-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Medium-400` | `color.fill.primary-inverse.medium` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Medium-Hover(Pressed)` | `color.fill.primary-inverse.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Strong-500` | `color.fill.primary-inverse.strong` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Strong-Hover(Pressed)` | `color.fill.primary-inverse.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Stronger-600` | `color.fill.primary-inverse.stronger` | color.semantic.json |
| `Semantic/Fill/Primary-Inverse/Stronger-Hover(Pressed)` | `color.fill.primary-inverse.stronger-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Error/Weak-50` | `color.fill.error.weak` | color.semantic.json |
| `Semantic/Fill/Error/Weak-Hover(Pressed)` | `color.fill.error.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Error/Medium-100` | `color.fill.error.medium` | color.semantic.json |
| `Semantic/Fill/Error/Medium-Hover(Pressed)` | `color.fill.error.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Error/Strong-500` | `color.fill.error.strong` | color.semantic.json |
| `Semantic/Fill/Error/Strong-Hover(Pressed)` | `color.fill.error.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Warning/Weak` | `color.fill.warning.weak` | color.semantic.json |
| `Semantic/Fill/Warning/Weak-Hover(Pressed)` | `color.fill.warning.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Warning/Medium` | `color.fill.warning.medium` | color.semantic.json |
| `Semantic/Fill/Warning/Medium-Hover(Pressed)` | `color.fill.warning.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Warning/Strong` | `color.fill.warning.strong` | color.semantic.json |
| `Semantic/Fill/Warning/Strong-Hover(Pressed)` | `color.fill.warning.strong-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Success/Weak` | `color.fill.success.weak` | color.semantic.json |
| `Semantic/Fill/Success/Weak-Hover(Pressed)` | `color.fill.success.weak-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Success/Medium` | `color.fill.success.medium` | color.semantic.json |
| `Semantic/Fill/Success/Medium-Hover(Pressed)` | `color.fill.success.medium-hover-pressed` | color.semantic.json |
| `Semantic/Fill/Success/Strong` | `color.fill.success.strong` | color.semantic.json |
| `Semantic/Fill/Success/Strong-Hover(Pressed)` | `color.fill.success.strong-hover-pressed` | color.semantic.json |
| `Semantic/Background/Default` | `color.background.default` | color.semantic.json |
| `Semantic/Background/Neutral-Weak` | `color.background.neutral-weak` | color.semantic.json |
| `Semantic/Background/Neutral-Medium` | `color.background.neutral-medium` | color.semantic.json |
| `Semantic/Background/Brand-Weak` | `color.background.brand-weak` | color.semantic.json |
| `Semantic/Background/Brand-Medium` | `color.background.brand-medium` | color.semantic.json |
| `Semantic/Surface/Default` | `color.surface.default` | color.semantic.json |
| `Semantic/Surface/Disabled` | `color.surface.disabled` | color.semantic.json |
| `Semantic/Surface/Neutral-Weak` | `color.surface.neutral-weak` | color.semantic.json |
| `Semantic/Surface/Neutral-Medium` | `color.surface.neutral-medium` | color.semantic.json |
| `Semantic/Surface/Neutral-Inverse` | `color.surface.neutral-inverse` | color.semantic.json |
| `Semantic/Surface/Brand-Weak` | `color.surface.brand-weak` | color.semantic.json |
| `Semantic/Surface/Brand-Medium` | `color.surface.brand-medium` | color.semantic.json |
| `Semantic/Surface/Brand-Inverse` | `color.surface.brand-inverse` | color.semantic.json |
| `Semantic/Text/Inverse` | `color.text.inverse` | color.semantic.json |
| `Semantic/Text/Disabled` | `color.text.disabled` | color.semantic.json |
| `Semantic/Text/Placeholder` | `color.text.placeholder` | color.semantic.json |
| `Semantic/Text/Neutral-Weak-500` | `color.text.neutral-weak` | color.semantic.json |
| `Semantic/Text/Neutral-Medium-600` | `color.text.neutral-medium` | color.semantic.json |
| `Semantic/Text/Neutral-Strong-800` | `color.text.neutral-strong` | color.semantic.json |
| `Semantic/Text/Neutral-Default` | `color.text.neutral-default` | color.semantic.json |
| `Semantic/Text/Brand-Disabled` | `color.text.brand-disabled` | color.semantic.json |
| `Semantic/Text/Brand-Default` | `color.text.brand-default` | color.semantic.json |
| `Semantic/Text/Brand-Strong` | `color.text.brand-strong` | color.semantic.json |
| `Semantic/Text/Success` | `color.text.success` | color.semantic.json |
| `Semantic/Text/Error` | `color.text.error` | color.semantic.json |
| `Semantic/Text/Warning` | `color.text.warning` | color.semantic.json |
| `Semantic/Border/Disabled/Disalbed` | `color.border.disabled` | color.semantic.json |
| `Semantic/Border/Neutral/Weaker-100` | `color.border.neutral.weaker` | color.semantic.json |
| `Semantic/Border/Neutral/Weak-200` | `color.border.neutral.weak` | color.semantic.json |
| `Semantic/Border/Neutral/Medium-300` | `color.border.neutral.medium` | color.semantic.json |
| `Semantic/Border/Neutral/Strong-400` | `color.border.neutral.strong` | color.semantic.json |
| `Semantic/Border/Neutral/Stronger-600` | `color.border.neutral.stronger` | color.semantic.json |
| `Semantic/Border/Neutral/Default` | `color.border.neutral.default` | color.semantic.json |
| `Semantic/Border/Primary/Weaker-100` | `color.border.primary.weaker` | color.semantic.json |
| `Semantic/Border/Primary/Weak-200` | `color.border.primary.weak` | color.semantic.json |
| `Semantic/Border/Primary/Medium-300` | `color.border.primary.medium` | color.semantic.json |
| `Semantic/Border/Primary/Strong-500` | `color.border.primary.strong` | color.semantic.json |
| `Semantic/Border/Error/Weaker-100` | `color.border.error.weaker` | color.semantic.json |
| `Semantic/Border/Error/Weak-200` | `color.border.error.weak` | color.semantic.json |
| `Semantic/Border/Error/Medium-300` | `color.border.error.medium` | color.semantic.json |
| `Semantic/Border/Error/Strong-500` | `color.border.error.strong` | color.semantic.json |
| `Semantic/Border/Warning/Weaker-100` | `color.border.warning.weaker` | color.semantic.json |
| `Semantic/Border/Warning/Weak-200` | `color.border.warning.weak` | color.semantic.json |
| `Semantic/Border/Warning/Medium-300` | `color.border.warning.medium` | color.semantic.json |
| `Semantic/Border/Warning/Strong-500` | `color.border.warning.strong` | color.semantic.json |
| `Semantic/Border/Success/Weaker` | `color.border.success.weaker` | color.semantic.json |
| `Semantic/Border/Success/Weak` | `color.border.success.weak` | color.semantic.json |
| `Semantic/Border/Success/Medium` | `color.border.success.medium` | color.semantic.json |
| `Semantic/Border/Success/Strong` | `color.border.success.strong` | color.semantic.json |
| `Semantic/Tag/Part/PM/Weaker` | `color.tag.part.pm.weaker` | color.semantic.json |
| `Semantic/Tag/Part/PM/Weak` | `color.tag.part.pm.weak` | color.semantic.json |
| `Semantic/Tag/Part/PM/Medium` | `color.tag.part.pm.medium` | color.semantic.json |
| `Semantic/Tag/Part/PM/Strong` | `color.tag.part.pm.strong` | color.semantic.json |
| `Semantic/Tag/Part/Design/Weaker` | `color.tag.part.design.weaker` | color.semantic.json |
| `Semantic/Tag/Part/Design/Weak` | `color.tag.part.design.weak` | color.semantic.json |
| `Semantic/Tag/Part/Design/Medium` | `color.tag.part.design.medium` | color.semantic.json |
| `Semantic/Tag/Part/Design/Strong` | `color.tag.part.design.strong` | color.semantic.json |
| `Semantic/Tag/Part/Mobile-PE/Weaker` | `color.tag.part.mobile-pe.weaker` | color.semantic.json |
| `Semantic/Tag/Part/Mobile-PE/Weak` | `color.tag.part.mobile-pe.weak` | color.semantic.json |
| `Semantic/Tag/Part/Mobile-PE/Medium` | `color.tag.part.mobile-pe.medium` | color.semantic.json |
| `Semantic/Tag/Part/Mobile-PE/Strong` | `color.tag.part.mobile-pe.strong` | color.semantic.json |
| `Semantic/Tag/Part/Web-PE/Weaker` | `color.tag.part.web-pe.weaker` | color.semantic.json |
| `Semantic/Tag/Part/Web-PE/Weak` | `color.tag.part.web-pe.weak` | color.semantic.json |
| `Semantic/Tag/Part/Web-PE/Medium` | `color.tag.part.web-pe.medium` | color.semantic.json |
| `Semantic/Tag/Part/Web-PE/Strong` | `color.tag.part.web-pe.strong` | color.semantic.json |
| `Semantic/Tag/Role/Central/Weaker` | `color.tag.role.central.weaker` | color.semantic.json |
| `Semantic/Tag/Role/Central/Weak` | `color.tag.role.central.weak` | color.semantic.json |
| `Semantic/Tag/Role/Central/Medium` | `color.tag.role.central.medium` | color.semantic.json |
| `Semantic/Tag/Role/Central/Strong` | `color.tag.role.central.strong` | color.semantic.json |
| `Semantic/Tag/Role/Chapter/Weaker` | `color.tag.role.chapter.weaker` | color.semantic.json |
| `Semantic/Tag/Role/Chapter/Weak` | `color.tag.role.chapter.weak` | color.semantic.json |
| `Semantic/Tag/Role/Chapter/Medium` | `color.tag.role.chapter.medium` | color.semantic.json |
| `Semantic/Tag/Role/Chapter/Strong` | `color.tag.role.chapter.strong` | color.semantic.json |
| `Semantic/Tag/Role/Campus/Weaker` | `color.tag.role.campus.weaker` | color.semantic.json |
| `Semantic/Tag/Role/Campus/Weak` | `color.tag.role.campus.weak` | color.semantic.json |
| `Semantic/Tag/Role/Campus/Medium` | `color.tag.role.campus.medium` | color.semantic.json |
| `Semantic/Tag/Role/Campus/Strong` | `color.tag.role.campus.strong` | color.semantic.json |
| `Semantic/Tag/Role/Challenger&Super-Admin/Weaker` | `color.tag.role.challenger-super-admin.weaker` | color.semantic.json |
| `Semantic/Tag/Role/Challenger&Super-Admin/Weak` | `color.tag.role.challenger-super-admin.weak` | color.semantic.json |
| `Semantic/Tag/Role/Challenger&Super-Admin/Medium` | `color.tag.role.challenger-super-admin.medium` | color.semantic.json |
| `Semantic/Tag/Role/Challenger&Super-Admin/Strong` | `color.tag.role.challenger-super-admin.strong` | color.semantic.json |
| `Semantic/Tag/Role/Product/Weaker` | `color.tag.role.product.weaker` | color.semantic.json |
| `Semantic/Tag/Role/Product/Weak` | `color.tag.role.product.weak` | color.semantic.json |
| `Semantic/Tag/Role/Product/Medium` | `color.tag.role.product.medium` | color.semantic.json |
| `Semantic/Tag/Role/Product/Strong` | `color.tag.role.product.strong` | color.semantic.json |
| `Semantic/Dimmed/Weak` | `color.dimmed.weak` | color.semantic.json |
| `Semantic/Dimmed/Medium` | `color.dimmed.medium` | color.semantic.json |
| `Semantic/Dimmed/Strong` | `color.dimmed.strong` | color.semantic.json |
| `Primitives/Base/White` | `color.white` | color.primitive.json |
| `Primitives/Base/Black` | `color.black` | color.primitive.json |
| `Primitives/Grey/TealGrey-50` | `color.teal-grey.50` | color.primitive.json |
| `Primitives/Grey/TealGrey-75` | `color.teal-grey.75` | color.primitive.json |
| `Primitives/Grey/TealGrey-100` | `color.teal-grey.100` | color.primitive.json |
| `Primitives/Grey/TealGrey-200` | `color.teal-grey.200` | color.primitive.json |
| `Primitives/Grey/TealGrey-300` | `color.teal-grey.300` | color.primitive.json |
| `Primitives/Grey/TealGrey-400` | `color.teal-grey.400` | color.primitive.json |
| `Primitives/Grey/TealGrey-500` | `color.teal-grey.500` | color.primitive.json |
| `Primitives/Grey/TealGrey-600` | `color.teal-grey.600` | color.primitive.json |
| `Primitives/Grey/TealGrey-700` | `color.teal-grey.700` | color.primitive.json |
| `Primitives/Grey/TealGrey-800` | `color.teal-grey.800` | color.primitive.json |
| `Primitives/Grey/TealGrey-900` | `color.teal-grey.900` | color.primitive.json |
| `Primitives/Teal/Teal-50` | `color.teal.50` | color.primitive.json |
| `Primitives/Teal/Teal-75` | `color.teal.75` | color.primitive.json |
| `Primitives/Teal/Teal-100` | `color.teal.100` | color.primitive.json |
| `Primitives/Teal/Teal-200` | `color.teal.200` | color.primitive.json |
| `Primitives/Teal/Teal-300` | `color.teal.300` | color.primitive.json |
| `Primitives/Teal/Teal-400` | `color.teal.400` | color.primitive.json |
| `Primitives/Teal/Teal-500` | `color.teal.500` | color.primitive.json |
| `Primitives/Teal/Teal-600` | `color.teal.600` | color.primitive.json |
| `Primitives/Teal/Teal-700` | `color.teal.700` | color.primitive.json |
| `Primitives/Teal/Teal-800` | `color.teal.800` | color.primitive.json |
| `Primitives/Teal/Teal-900` | `color.teal.900` | color.primitive.json |
| `Primitives/Red/Red-50` | `color.red.50` | color.primitive.json |
| `Primitives/Red/Red-100` | `color.red.100` | color.primitive.json |
| `Primitives/Red/Red-200` | `color.red.200` | color.primitive.json |
| `Primitives/Red/Red-300` | `color.red.300` | color.primitive.json |
| `Primitives/Red/Red-400` | `color.red.400` | color.primitive.json |
| `Primitives/Red/Red-500` | `color.red.500` | color.primitive.json |
| `Primitives/Red/Red-600` | `color.red.600` | color.primitive.json |
| `Primitives/Red/Red-700` | `color.red.700` | color.primitive.json |
| `Primitives/Red/Red-800` | `color.red.800` | color.primitive.json |
| `Primitives/Red/Red-900` | `color.red.900` | color.primitive.json |
| `Primitives/Yellow/Yellow-50` | `color.yellow.50` | color.primitive.json |
| `Primitives/Yellow/Yellow-100` | `color.yellow.100` | color.primitive.json |
| `Primitives/Yellow/Yellow-200` | `color.yellow.200` | color.primitive.json |
| `Primitives/Yellow/Yellow-300` | `color.yellow.300` | color.primitive.json |
| `Primitives/Yellow/Yellow-400` | `color.yellow.400` | color.primitive.json |
| `Primitives/Yellow/Yellow-500` | `color.yellow.500` | color.primitive.json |
| `Primitives/Yellow/Yellow-600` | `color.yellow.600` | color.primitive.json |
| `Primitives/Yellow/Yellow-700` | `color.yellow.700` | color.primitive.json |
| `Primitives/Yellow/Yellow-800` | `color.yellow.800` | color.primitive.json |
| `Primitives/Yellow/Yellow-900` | `color.yellow.900` | color.primitive.json |
| `Primitives/Green/Green-50` | `color.green.50` | color.primitive.json |
| `Primitives/Green/Green-100` | `color.green.100` | color.primitive.json |
| `Primitives/Green/Green-200` | `color.green.200` | color.primitive.json |
| `Primitives/Green/Green-300` | `color.green.300` | color.primitive.json |
| `Primitives/Green/Green-400` | `color.green.400` | color.primitive.json |
| `Primitives/Green/Green-500` | `color.green.500` | color.primitive.json |
| `Primitives/Green/Green-600` | `color.green.600` | color.primitive.json |
| `Primitives/Green/Green-700` | `color.green.700` | color.primitive.json |
| `Primitives/Green/Green-800` | `color.green.800` | color.primitive.json |
| `Primitives/Green/Green-900` | `color.green.900` | color.primitive.json |
| `Primitives/Violet/Violet-50` | `color.violet.50` | color.primitive.json |
| `Primitives/Violet/Violet-100` | `color.violet.100` | color.primitive.json |
| `Primitives/Violet/Violet-500` | `color.violet.500` | color.primitive.json |
| `Primitives/Violet/Violet-600` | `color.violet.600` | color.primitive.json |
| `Primitives/Purple/Purple-50` | `color.purple.50` | color.primitive.json |
| `Primitives/Purple/Purple-100` | `color.purple.100` | color.primitive.json |
| `Primitives/Purple/Purple-500` | `color.purple.500` | color.primitive.json |
| `Primitives/Purple/Purple-600` | `color.purple.600` | color.primitive.json |
| `Primitives/Pink/Pink-50` | `color.pink.50` | color.primitive.json |
| `Primitives/Pink/Pink-100` | `color.pink.100` | color.primitive.json |
| `Primitives/Pink/Pink-500` | `color.pink.500` | color.primitive.json |
| `Primitives/Pink/Pink-600` | `color.pink.600` | color.primitive.json |
| `Primitives/Cobalt/Cobalt-50` | `color.cobalt.50` | color.primitive.json |
| `Primitives/Cobalt/Cobalt-100` | `color.cobalt.100` | color.primitive.json |
| `Primitives/Cobalt/Cobalt-500` | `color.cobalt.500` | color.primitive.json |
| `Primitives/Cobalt/Cobalt-600` | `color.cobalt.600` | color.primitive.json |
| `Primitives/Blue/Blue-50` | `color.blue.50` | color.primitive.json |
| `Primitives/Blue/Blue-100` | `color.blue.100` | color.primitive.json |
| `Primitives/Blue/Blue-500` | `color.blue.500` | color.primitive.json |
| `Primitives/Blue/Blue-600` | `color.blue.600` | color.primitive.json |
| `Primitives/Brown/Brown-50` | `color.brown.50` | color.primitive.json |
| `Primitives/Brown/Brown-100` | `color.brown.100` | color.primitive.json |
| `Primitives/Brown/Brown-500` | `color.brown.500` | color.primitive.json |
| `Primitives/Brown/Brown-600` | `color.brown.600` | color.primitive.json |
| `Typography/Base/FontSize/48px` | `font-size.48` | font.json |
| `Typography/Base/FontSize/40px` | `font-size.40` | font.json |
| `Typography/Base/FontSize/36px` | `font-size.36` | font.json |
| `Typography/Base/FontSize/32px` | `font-size.32` | font.json |
| `Typography/Base/FontSize/28px` | `font-size.28` | font.json |
| `Typography/Base/FontSize/24px` | `font-size.24` | font.json |
| `Typography/Base/FontSize/22px` | `font-size.22` | font.json |
| `Typography/Base/FontSize/20px` | `font-size.20` | font.json |
| `Typography/Base/FontSize/18px` | `font-size.18` | font.json |
| `Typography/Base/FontSize/16px` | `font-size.16` | font.json |
| `Typography/Base/FontSize/15px` | `font-size.15` | font.json |
| `Typography/Base/FontSize/14px` | `font-size.14` | font.json |
| `Typography/Base/FontSize/13px` | `font-size.13` | font.json |
| `Typography/Base/FontSize/12px` | `font-size.12` | font.json |
| `Typography/Base/FontSize/11px` | `font-size.11` | font.json |
| `Typography/Base/FontFamily/Brand` | `font-family.brand` | font.json |
| `Typography/Base/FontWeight/Regular` | `font-weight.regular` | font.json |
| `Typography/Base/FontWeight/Medium` | `font-weight.medium` | font.json |
| `Typography/Base/FontWeight/Semibold` | `font-weight.semibold` | font.json |
| `Typography/Base/FontWeight/Bold` | `font-weight.bold` | font.json |
| `Spacing/Primitive/0` | `spacing.0` | spacing.json |
| `Spacing/Primitive/2` | `spacing.2` | spacing.json |
| `Spacing/Primitive/4` | `spacing.4` | spacing.json |
| `Spacing/Primitive/6` | `spacing.6` | spacing.json |
| `Spacing/Primitive/8` | `spacing.8` | spacing.json |
| `Spacing/Primitive/10` | `spacing.10` | spacing.json |
| `Spacing/Primitive/12` | `spacing.12` | spacing.json |
| `Spacing/Primitive/16` | `spacing.16` | spacing.json |
| `Spacing/Primitive/20` | `spacing.20` | spacing.json |
| `Spacing/Primitive/24` | `spacing.24` | spacing.json |
| `Spacing/Primitive/28` | `spacing.28` | spacing.json |
| `Spacing/Primitive/32` | `spacing.32` | spacing.json |
| `Spacing/Primitive/48` | `spacing.48` | spacing.json |
| `Spacing/Primitive/64` | `spacing.64` | spacing.json |
| `Spacing/Primitive/80` | `spacing.80` | spacing.json |
| `Spacing/Semantic/Padding/Padding 0` | `spacing.padding.0` | spacing.json |
| `Spacing/Semantic/Padding/Padding 4` | `spacing.padding.4` | spacing.json |
| `Spacing/Semantic/Padding/Padding 6` | `spacing.padding.6` | spacing.json |
| `Spacing/Semantic/Padding/Padding 8` | `spacing.padding.8` | spacing.json |
| `Spacing/Semantic/Padding/Padding 10` | `spacing.padding.10` | spacing.json |
| `Spacing/Semantic/Padding/Padding 12` | `spacing.padding.12` | spacing.json |
| `Spacing/Semantic/Padding/Padding 16` | `spacing.padding.16` | spacing.json |
| `Spacing/Semantic/Padding/Padding 20` | `spacing.padding.20` | spacing.json |
| `Spacing/Semantic/Padding/Padding 24` | `spacing.padding.24` | spacing.json |
| `Spacing/Semantic/Padding/Padding 28` | `spacing.padding.28` | spacing.json |
| `Spacing/Semantic/Padding/Padding 32` | `spacing.padding.32` | spacing.json |
| `Spacing/Semantic/Gap/Gap 0` | `spacing.gap.0` | spacing.json |
| `Spacing/Semantic/Gap/Gap 4` | `spacing.gap.4` | spacing.json |
| `Spacing/Semantic/Gap/Gap 6` | `spacing.gap.6` | spacing.json |
| `Spacing/Semantic/Gap/Gap 8` | `spacing.gap.8` | spacing.json |
| `Spacing/Semantic/Gap/Gap 10` | `spacing.gap.10` | spacing.json |
| `Spacing/Semantic/Gap/Gap 12` | `spacing.gap.12` | spacing.json |
| `Spacing/Semantic/Gap/Gap 16` | `spacing.gap.16` | spacing.json |
| `Spacing/Semantic/Gap/Gap 20` | `spacing.gap.20` | spacing.json |
| `Spacing/Semantic/Gap/Gap 24` | `spacing.gap.24` | spacing.json |
| `Spacing/Semantic/Gap/Gap 28` | `spacing.gap.28` | spacing.json |
| `Spacing/Semantic/Gap/Gap 32` | `spacing.gap.32` | spacing.json |
| `Spacing/Semantic/Margin/Margin 0` | `spacing.margin.0` | spacing.json |
| `Spacing/Semantic/Margin/Margin 16` | `spacing.margin.16` | spacing.json |
| `Spacing/Semantic/Margin/Margin 24` | `spacing.margin.24` | spacing.json |
| `Spacing/Semantic/Margin/Margin 32` | `spacing.margin.32` | spacing.json |
| `Spacing/Semantic/Margin/Margin 48` | `spacing.margin.48` | spacing.json |
| `Spacing/Semantic/Margin/Margin 64` | `spacing.margin.64` | spacing.json |
| `Spacing/Semantic/Margin/Margin 80` | `spacing.margin.80` | spacing.json |
| `Radius/Primitive/6` | `radius.6` | radius.json |
| `Radius/Primitive/8` | `radius.8` | radius.json |
| `Radius/Primitive/10` | `radius.10` | radius.json |
| `Radius/Primitive/12` | `radius.12` | radius.json |
| `Radius/Primitive/14` | `radius.14` | radius.json |
| `Radius/Primitive/16` | `radius.16` | radius.json |
| `Radius/Primitive/18` | `radius.18` | radius.json |
| `Radius/Primitive/20` | `radius.20` | radius.json |
| `Radius/Primitive/24` | `radius.24` | radius.json |
| `Radius/Primitive/Full` | `radius.full` | radius.json |
| `Radius/Semantic/Text Field/Box` | `radius.text-field.box` | radius.json |
| `Radius/Semantic/Button/R Button 10` | `radius.button.10` | radius.json |
| `Radius/Semantic/Button/R Button 12` | `radius.button.12` | radius.json |
| `Radius/Semantic/Button/R Button 14` | `radius.button.14` | radius.json |
| `Radius/Semantic/Button/R Button 16` | `radius.button.16` | radius.json |
| `Radius/Semantic/Toast/Toast` | `radius.toast` | radius.json |
| `Radius/Semantic/Segmented Control/XS` | `radius.segmented-control.xs` | radius.json |
