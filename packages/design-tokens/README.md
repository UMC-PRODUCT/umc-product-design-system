# @umc-product/design-tokens

UMC 3기 피그마 파운데이션을 코드로 옮긴 디자인 토큰 패키지입니다. 피그마 값은 `tokens/`의 JSON 하나에만 있고, CSS 변수와 Tailwind, vanilla-extract 산출물은 모두 그 JSON에서 생성합니다.

- 기준일: 2026-10-06
- 상태: 컬러(primitive 78, semantic 151), 타이포그래피(기본 변수 20, 텍스트 스타일 42), spacing 44, radius 17, 그리드와 레이아웃을 옮겼습니다. 브레이크포인트만 디자인 팀 합의를 기다립니다
- 배포: 아직 배포하지 않았습니다(`private: true`). GitHub Packages 배포는 별도 작업입니다

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
<h1 class="text-display-1-bold text-fg-neutral-default">UMC</h1>
<main class="grid grid-cols-12 gap-x-grid-gutter px-grid-margin-desktop">
  <article class="border border-border-neutral-weak bg-surface-default">
    …
  </article>
</main>
<aside class="w-sidebar bg-background-neutral-weak"></aside>
<header class="h-header"></header>
```

| 유틸리티                                          | 토큰                                                                                |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `text-<스타일>` (42개, 예: `text-body-1-regular`) | 텍스트 스타일 한 벌(서체, 크기, 굵기, 행간, 자간)                                   |
| `bg-`, `text-`, `border-` + semantic 컬러 151개   | 예: `bg-surface-default`, `text-fg-neutral-default`, `border-border-primary-strong` |
| `gap-x-grid-gutter`                               | 거터 16px                                                                           |
| `px-grid-margin-desktop`, `px-grid-margin-mobile` | 좌우 마진 32px, 16px                                                                |
| `h-header`                                        | 헤더 높이 80px                                                                      |
| `w-sidebar`                                       | 사이드바 폭 216px                                                                   |

- 컬러는 semantic만 유틸리티로 만듭니다. primitive(`teal-500` 등)는 CSS 변수로만 있습니다
- Text 그룹은 `text-text-…`가 되지 않도록 `fg`로 바꿉니다(예: `text-fg-neutral-default`). 전체 대응은 `semanticColors`로 내보냅니다
- spacing과 radius는 유틸리티 대신 CSS 변수로 씁니다(예: `p-(--umc-spacing-padding-16)`, `rounded-(--umc-radius-button-12)`)

### vanilla-extract

`@vanilla-extract/css`에 의존하지 않는 일반 객체라서 그대로 `style()`에 넘길 수 있습니다.

```ts
import { style } from "@vanilla-extract/css"
import { typography, vars } from "@umc-product/design-tokens/vanilla-extract"

export const title = style({
  ...typography.display1Bold,
  color: vars.color.text.neutralDefault,
})

export const content = style({
  display: "grid",
  gridTemplateColumns: `repeat(${vars.grid.columns}, minmax(0, 1fr))`,
  columnGap: vars.grid.gutter,
  paddingInline: vars.grid.margin.desktop,
})
```

### tailwind-merge 등록

텍스트 스타일 유틸리티는 Tailwind 기본 이름이 아니라서, 등록하지 않으면 `cn()`이 색상 클래스로 오인해 지울 수 있습니다. tailwind-merge v3 이상(Tailwind v4용)에서 아래처럼 등록합니다.

```ts
import { textStyleUtilities } from "@umc-product/design-tokens"
import { extendTailwindMerge } from "tailwind-merge"

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [...textStyleUtilities],
    },
  },
})
```

## 주의할 점

- **Tailwind 기본 팔레트가 남습니다.** `bg-teal-500`은 UMC teal이 아니라 Tailwind 기본 teal입니다. 팔레트를 비우려면 앱의 CSS에서 `@theme { --color-*: initial; }`를 쓰되, 결과가 import 순서에 좌우되므로 패키지가 강제하지 않습니다
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
