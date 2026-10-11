# @umc-product/react

UMC 디자인 시스템의 React 컴포넌트입니다. 포커스 이동, 키보드, ARIA는 Base UI가 맡고, 모양은 미리 빌드한 CSS가 그립니다. 컴포넌트마다 쓰는 법과 props, 피그마 변형 전체는 [문서](https://umc-product.github.io/umc-product-design-system/components/actions/button/)에 있습니다.

## 설치

GitHub Packages 비공개 패키지라 토큰 설정이 먼저 필요합니다. 방법은 [설치와 불러오기](https://umc-product.github.io/umc-product-design-system/getting-started/installation/)를 보세요.

```bash
pnpm add @umc-product/react @umc-product/icons @umc-product/design-tokens
```

- peer 의존성: `react`, `react-dom` 19
- ESM 전용입니다. CommonJS에서는 `import()`로 불러옵니다
- 클라이언트 컴포넌트에는 `"use client"`가 붙어 있어 Next.js App Router의 서버 컴포넌트 안에 그대로 놓을 수 있습니다

## CSS 불러오기

앱 전역 CSS에서 한 번 불러옵니다. `styles.css`가 토큰 CSS와 서체를 함께 불러옵니다.

```css
@import "tailwindcss";
@import "@umc-product/react/styles.css";
@import "@umc-product/design-tokens/tailwind.css";
```

컴포넌트 스타일은 `@layer components`에 있어서, 앱의 Tailwind 유틸리티를 `className`에 주면 그대로 덮어씁니다.

## 예시

```tsx
import { SearchIcon } from "@umc-product/icons"
import { Button, Checkbox, TextField } from "@umc-product/react"

export function SignUpForm() {
  return (
    <form>
      <TextField label="이름" placeholder="이름을 입력하세요" />
      <Checkbox>개인정보 수집 동의</Checkbox>
      <Button leadingIcon={<SearchIcon />}>검색</Button>
    </form>
  )
}
```

## Vite 빌드 경고

Vite는 패키지 안의 `"use client"`를 무시한다는 경고를 컴포넌트마다 냅니다. 동작에는 영향이 없습니다. 경고를 끄려면 `vite.config.ts`에 아래를 더합니다.

```ts
build: {
  rollupOptions: {
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
      warn(warning)
    },
  },
},
```

## 라이선스

UMC PRODUCT Design Chapter가 소유하고 관리합니다. UMC-PRODUCT 조직이나 Design Chapter가 승인한 팀의 구성원이 UMC PRODUCT 프로젝트에서만 쓸 수 있습니다. 조건은 패키지에 들어 있는 `LICENSE`에 있습니다.
