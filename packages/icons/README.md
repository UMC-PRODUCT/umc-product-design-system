# @umc-product/icons

UMC 디자인 시스템의 아이콘 65종, 픽토그램 11종, UMC 로고 React 컴포넌트입니다. 전체 목록과 이름 찾기는 [문서의 아이콘 페이지](https://umc-product.github.io/umc-product-design-system/foundations/icons/)에 있습니다.

## 설치

GitHub Packages 비공개 패키지라 토큰 설정이 먼저 필요합니다. 방법은 [설치와 불러오기](https://umc-product.github.io/umc-product-design-system/getting-started/installation/)를 보세요.

```bash
pnpm add @umc-product/icons
```

React 19가 필요하고 ESM으로만 배포합니다. 아이콘마다 별도 모듈이고 `sideEffects: false`라서, 번들러가 쓰지 않는 아이콘을 뺍니다.

## 쓰기

```tsx
import { AddIcon, SearchIcon } from "@umc-product/icons"

<SearchIcon />
<AddIcon weight="fill" size={20} className="text-icon-brand-medium-500" />
```

- `weight`: `thin`, `regular`, `fill` 중 아이콘이 가진 굵기
- `size`: 가로세로 크기(기본 24)
- 색은 `currentColor`라 감싼 요소의 글자색을 따릅니다. `className`이나 `style={{ color }}`로 바꿉니다
- `aria-label`이나 `aria-labelledby`가 없으면 장식으로 보고 `aria-hidden`을 붙입니다. 이름을 주면 `role="img"`로 읽힙니다

## 라이선스

UMC PRODUCT 팀이 사용 권한을 준 사람과 팀만 쓸 수 있습니다. 조건은 패키지에 들어 있는 `LICENSE`에 있습니다.
