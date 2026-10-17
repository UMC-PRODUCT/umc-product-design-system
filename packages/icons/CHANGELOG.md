# @umc-product/icons

## 0.5.0

### Minor Changes

- 08a21f3: 픽토그램 `BlankDocumentPictogram`을 더합니다. 피그마 `Pictogram/Blank Document`를 옮긴 빈 문서 그림입니다. 다른 픽토그램처럼 `currentColor`로 그리고, 기본 색은 TealGrey-300(`#cccccc`)입니다.

## 0.4.0

### Patch Changes

- ac1b822: `@umc-product/icons` 패키지의 `LICENSE`에 Ionicons의 저작권 표시와 MIT License 고지를 더합니다. 일부 아이콘을 Ionicons에서 가져왔기 때문입니다. 아이콘 모양과 코드는 바뀌지 않습니다.

## 0.3.0

### Patch Changes

- 53776ec: **화면 변화** `ResetIcon`의 화살표가 시계 방향에서 시계 반대 방향으로 바뀝니다(Thin, Regular, Fill 모두). 피그마가 되돌리기 뜻에 맞게 그림을 바꿨습니다.

  **화면 변화** `LocationIcon` Fill의 피그마 프레임이 19×24.51에서 24×24로 바로잡혀, 비율을 지켜 줄여 넣던 보정을 뺐습니다. 같은 `size`에서 Regular, Thin과 같은 크기로 보입니다.

## 0.2.0

No changes in this release.

## 0.1.1

No changes in this release.

## 0.1.0

### Minor Changes

- fa621e0: 첫 배포입니다.

  - `@umc-product/design-tokens`: 피그마 3기 변수를 옮긴 토큰입니다. 컬러(semantic 152, primitive 78), 텍스트 스타일 48, 그림자 5, spacing 44, radius 17, 그리드와 레이아웃을 CSS 변수, Tailwind v4 유틸리티, vanilla-extract 객체로 냅니다. `tailwind.css`는 Tailwind 기본 팔레트를 지웁니다.
  - `@umc-product/icons`: 아이콘 65종(thin, regular, fill), 픽토그램 11종, UMC 로고입니다.
  - `@umc-product/react`: Base UI 기반 컴포넌트 47종입니다(버튼 2, 폼 입력 11, 선택 10, 표시 9, 오버레이와 피드백 6, 앱 셸 9).
