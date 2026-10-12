# @umc-product/react

## 0.1.1

### Patch Changes

- 2793718: **화면 변화** `BottomNavigationItem`이 하위 경로에서도 탭을 선택합니다. 지금까지는 `currentPath`와 `href`가 정확히 같을 때만 선택되어 `/projects/12`에서 `/projects` 탭이 선택되지 않았고, 반대로 `/settings`에서 `/settings/profile` 탭이 선택되었습니다. 이제 `Header`와 같은 규칙(같거나 하위 경로)을 따릅니다.
- de9b52e: `BottomSheet`가 Base UI `Drawer.Viewport` 안에 시트를 그립니다. 지금까지는 Viewport가 없어 꺼져 있던 동작이 켜집니다. 시트를 아래로 쓸어 내려 닫을 수 있고, 열려 있는 동안 뒤 화면이 터치로 스크롤되지 않으며, 입력칸에 포커스가 가면 가상 키보드 높이만큼 시트가 올라갑니다. 시트 바깥을 누르면 닫히는 동작과 겉모습은 그대로입니다.
- b099feb: 단일 선택 `OptionButtonGroup`이 `value={null}`을 "선택 없음" 제어 상태로 다룹니다. 지금까지는 `null`이 `undefined`로 바뀌어 비제어가 되었습니다. 그래서 `null`로 시작하면 나중에 넘긴 `value`를 무시했고, 누르면 부모 상태와 상관없이 선택이 바뀌었습니다.
- 0eb970c: `useToast()`가 `ToastProvider`마다 고정된 객체를 돌려줍니다. 지금까지는 토스트가 열리고 닫힐 때마다(토스트 1건에 4번 이상) `useToast()`를 부른 컴포넌트가 다시 렌더되고 반환값도 바뀌어서, 반환값을 effect 의존성에 넣으면 effect가 다시 실행되었습니다. `show()`와 `close()`의 동작은 그대로입니다.
- @umc-product/design-tokens@0.1.1
  - @umc-product/icons@0.1.1

## 0.1.0

### Minor Changes

- fa621e0: 첫 배포입니다.

  - `@umc-product/design-tokens`: 피그마 3기 변수를 옮긴 토큰입니다. 컬러(semantic 152, primitive 78), 텍스트 스타일 48, 그림자 5, spacing 44, radius 17, 그리드와 레이아웃을 CSS 변수, Tailwind v4 유틸리티, vanilla-extract 객체로 냅니다. `tailwind.css`는 Tailwind 기본 팔레트를 지웁니다.
  - `@umc-product/icons`: 아이콘 65종(thin, regular, fill), 픽토그램 11종, UMC 로고입니다.
  - `@umc-product/react`: Base UI 기반 컴포넌트 47종입니다(버튼 2, 폼 입력 11, 선택 10, 표시 9, 오버레이와 피드백 6, 앱 셸 9).

### Patch Changes

- Updated dependencies [fa621e0]
  - @umc-product/design-tokens@0.1.0
  - @umc-product/icons@0.1.0
