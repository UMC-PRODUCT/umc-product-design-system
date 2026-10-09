# @umc-product/design-tokens

UMC 3기 피그마 파운데이션을 코드로 옮긴 디자인 토큰 패키지입니다. 피그마 값은 `tokens/`의 JSON 하나에만 있고, CSS 변수와 Tailwind, vanilla-extract 산출물은 모두 그 JSON에서 생성합니다.

- 기준일: 2026-10-09
- 상태: 컬러(primitive 78, semantic 152), 타이포그래피(기본 변수 20, 텍스트 스타일 48), spacing 44, radius 17, 그림자 5, 그리드와 레이아웃을 옮겼습니다. 브레이크포인트만 디자인 팀 합의를 기다립니다
- 배포: GitHub Packages(비공개). 설치와 토큰 설정은 [문서](https://umc-product.github.io/umc-product-design-system/getting-started/installation/)에 있습니다

## 사용법

### CSS 불러오기

순서가 중요합니다. `base.css`를 빠뜨리면 유틸리티가 빈 변수를 참조해 오류 없이 스타일만 사라집니다.

```css
@import "tailwindcss";
@import "@umc-product/design-tokens/fonts.css";
@import "@umc-product/design-tokens/base.css";
@import "@umc-product/design-tokens/tailwind.css";
```

vanilla-extract만 쓰는 앱은 `tailwind.css`를 빼고 `fonts.css`, `base.css`만 전역에서 한 번 불러오면 됩니다.

### Tailwind

```html
<h1 class="text-display-1-bold text-neutral-default-900">UMC</h1>
<main class="grid grid-cols-12 gap-x-grid-gutter px-grid-margin-desktop">
  <article class="border border-neutral-weak-200 bg-surface-default">…</article>
</main>
<aside class="w-sidebar bg-background-neutral-weak"></aside>
<header class="h-header"></header>
```

| 유틸리티                                                      | 토큰                                              |
| ------------------------------------------------------------- | ------------------------------------------------- |
| `text-<이름>` (예: `text-neutral-medium-600`)                 | `Semantic/Text` 글자색                            |
| `border-<이름>`, `border-t-<이름>` 등                         | `Semantic/Border` 테두리 색                       |
| `text-icon-<이름>` (예: `text-icon-brand-medium-500`)         | `Semantic/Icon` 아이콘 색(`currentColor`)         |
| `bg-fill-…`, `bg-background-…`, `bg-surface-…`, `bg-dimmed-…` | 같은 이름의 semantic 그룹                         |
| `bg-tag-…`, `text-tag-…`, `border-tag-…`                      | `Semantic/Tag`                                    |
| `bg-teal-300`, `text-teal-grey-900` 등                        | primitive 78개(피그마 값)                         |
| `text-<스타일>` (48개, 예: `text-body-1-regular`)             | 텍스트 스타일 한 벌(서체, 크기, 굵기, 행간, 자간) |
| `shadow-drop-neutral-1` 등 5개                                | 피그마 effect 스타일 그림자                       |
| `gap-x-grid-gutter`                                           | 거터 16px                                         |
| `px-grid-margin-desktop`, `px-grid-margin-mobile`             | 좌우 마진 32px, 16px                              |
| `h-header`                                                    | 헤더 높이 80px                                    |
| `w-sidebar`                                                   | 사이드바 폭 216px                                 |

- 이름은 피그마 변수 경로를 kebab-case로 바꾼 것이고 단계 숫자도 남깁니다(`Fill/Neutral/Weak-75` → `bg-fill-neutral-weak-75`)
- Text와 Border는 `text-`, `border-` 속성 클래스로만 만듭니다. `text-text-…`, `border-border-…`는 없고, 불투명도 수식어(`/50`)도 붙지 않습니다. 다른 속성에는 `outline-(--umc-color-border-primary-strong-500)`처럼 CSS 변수로 씁니다
- 나머지 semantic과 primitive는 Tailwind 색(`--color-*`)으로 등록해 `bg-`, `text-`, `border-`, `ring-` 어디에나 붙습니다
- spacing과 radius는 유틸리티 대신 CSS 변수로 씁니다(예: `p-(--umc-spacing-padding-16)`, `rounded-(--umc-radius-button-12)`)
- 토큰마다 추천 클래스와 Tailwind 이름은 `@umc-product/design-tokens/manifest`의 `utility`, `tailwindName`에 있습니다

### vanilla-extract

`@vanilla-extract/css`에 의존하지 않는 일반 객체라서 그대로 `style()`에 넘길 수 있습니다.

```ts
import { style } from "@vanilla-extract/css"
import { typography, vars } from "@umc-product/design-tokens/vanilla-extract"

export const title = style({
  ...typography.display1Bold,
  color: vars.color.text.neutralDefault900,
})

export const content = style({
  display: "grid",
  gridTemplateColumns: `repeat(${vars.grid.columns}, minmax(0, 1fr))`,
  columnGap: vars.grid.gutter,
  paddingInline: vars.grid.margin.desktop,
})
```

### tailwind-merge 등록

텍스트 스타일과 그림자 유틸리티는 Tailwind 기본 이름이 아니라서, 등록하지 않으면 `cn()`이 다른 그룹의 클래스로 오인해 지울 수 있습니다. tailwind-merge v3 이상(Tailwind v4용)에서 아래처럼 등록합니다.

```ts
import { shadowUtilities, textStyleUtilities } from "@umc-product/design-tokens"
import { extendTailwindMerge } from "tailwind-merge"

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [...textStyleUtilities],
      shadow: [...shadowUtilities],
    },
  },
})
```

## 주의할 점

- **Tailwind 기본 팔레트를 지웁니다.** `tailwind.css`가 `--color-*: initial`로 기본 색을 지우고 피그마 색만 등록합니다. 그래서 `bg-teal-500`은 UMC `Teal-500`이고 `bg-indigo-500`은 생기지 않습니다. 앱에만 필요한 색은 `tailwind.css`를 불러온 뒤의 `@theme`에 더합니다. 앞에 두면 함께 지워집니다
- **덮어쓰기는 레이어 밖에서 합니다.** 토큰은 `@layer umc.tokens`에 선언되어 있어서 `@layer base` 안에서 `--umc-*`를 바꾸면 적용되지 않습니다
- **브레이크포인트는 아직 없습니다.** 디자인 팀과 경계값을 정한 뒤 추가합니다. 그때까지는 앱의 기존 브레이크포인트를 씁니다

## 토큰 갱신 흐름

1. 디자이너가 피그마를 고치고 변경 내용(무엇을, 왜, 영향 화면)을 알립니다
2. 원문을 교체하고 `figma/manifest.json`의 sha256을 갱신합니다. 피그마 파일은 읽기만 합니다
   - 변수: Variables 패널에서 `Color`, `Token` 컬렉션을 Export modes로 받아 `figma/export/`에 같은 이름으로 덮어씁니다
   - 텍스트 스타일: 피그마 MCP `get_variable_defs`(노드 2268:1706) 결과를 `figma/mcp/`에 그대로 저장합니다
3. 아래 명령을 실행합니다

```bash
pnpm figma:inspect      # export 형식, 개수, 참조가 정상인지 먼저 확인
pnpm tokens:normalize   # figma/ 원문 → tokens/*.json, reports/figma-normalization.md
pnpm tokens:build       # tokens/*.json → src/generated/*
pnpm tokens:check       # 다시 만든 결과와 저장된 파일이 같은지 검사
pnpm test
```

4. `reports/figma-normalization.md`의 이름 변경과 경고를 디자인 팀과 확인합니다

## 디렉터리

| 경로                         | 내용                       | 손으로 고치는가      |
| ---------------------------- | -------------------------- | -------------------- |
| `figma/`                     | 피그마 원문과 manifest     | 원문은 교체만 합니다 |
| `tokens/layout.json`         | 그리드와 레이아웃 값       | 예                   |
| `tokens/` 나머지             | 정규화 결과                | 아니요               |
| `scripts/normalize/rules.ts` | 이름 변경, 제외, 확인 질문 | 예                   |
| `src/generated/`             | 생성물                     | 아니요               |
| `reports/`                   | 디자인 팀 확인용 리포트    | 아니요               |
