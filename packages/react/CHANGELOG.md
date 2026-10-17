# @umc-product/react

## 0.5.0

### Minor Changes

- 9d17e64: `Divider`를 더합니다. 피그마 `Divider`와 `Divider_Vertical`을 옮긴 구분선입니다. `variant`로 얇은 선(`line`, 0.5px)과 두꺼운 띠(`solid`, 8px, 투명도 30%)를 고르고, `orientation="vertical"`로 1px 세로선을 그립니다. Base UI Separator로 `role="separator"`가 붙습니다.
- 3474eeb: `GuidanceMessage`를 더합니다. 피그마 `Guidance Message`를 옮긴 한 줄 안내 문구로, 버튼이나 카드 아래에서 지금 상태를 알려 줍니다. `color`로 `neutral`, `success`, `warning`(피그마 `Yellow`), `error`를 고르고, 문구 앞 16px 체크 아이콘은 `showIcon={false}`로 끌 수 있습니다.

### Patch Changes

- 7ddace7: **화면 변화** `TextArea`의 기본 최소 높이를 198px에서 120px로 줄이고, 오른쪽 여백을 12px에서 16px로 바꿉니다. 피그마 `Text Area`가 바뀐 것을 따릅니다. 피그마 설명대로 최소·최대 높이는 페이지마다 달라질 수 있어서, `className`으로 `--umc-text-area-min-height`와 `--umc-text-area-max-height` 변수를 넘겨 바꿀 수 있게 했습니다. 내용이 늘면 상자가 최대 높이까지 함께 늘어나고, 그보다 긴 내용은 상자 안에서 스크롤됩니다(CSS `field-sizing`을 지원하는 브라우저 기준).
- Updated dependencies [08a21f3]
  - @umc-product/icons@0.5.0
  - @umc-product/design-tokens@0.5.0

## 0.4.0

### Minor Changes

- 9c69524: 장문형 `TextArea`를 더합니다. 피그마 `Text Area`를 옮긴 컴포넌트로, 공지 작성처럼 긴 글을 쓰는 칸입니다. 최소 높이는 198px이고 내용이 넘치면 상자 안에서 스크롤됩니다. `maxLength`를 넘기면 오른쪽 아래에 "현재/최대" 글자 수가 나오고, 비활성 상태에서는 숨깁니다. 레이블과 도움말, 오류 문구는 다른 입력처럼 `label`, `caption`, `errorMessage`로 받습니다.
- 20831c2: **깨지는 변경** 피그마 `Text Field/ Input Box`의 `Type=Text Area`를 옮긴 단문형 `TextArea`의 이름을 `TextFieldArea`로 바꿉니다. `TextArea`라는 이름은 이번 배포에서 피그마 `Text Area`를 옮긴 장문형 컴포넌트가 씁니다. 단문형의 동작과 모양은 그대로입니다.

  | 이전                                        | 이후                                                  |
  | ------------------------------------------- | ----------------------------------------------------- |
  | `TextArea`                                  | `TextFieldArea`                                       |
  | `TextAreaProps`                             | `TextFieldAreaProps`                                  |
  | `.umc-text-area`, `.umc-text-area__input`   | `.umc-text-field-area`, `.umc-text-field-area__input` |
  | 문서 `/components/forms/text-area/`(단문형) | `/components/forms/text-field-area/`                  |

  `TextArea` 이름은 새 장문형으로 그대로 컴파일되므로 타입 오류 없이 모양이 바뀔 수 있습니다. 장문형이 새로 받는 props는 없고 `size`만 사라지므로, `size`를 넘긴 곳은 타입 오류로 드러납니다. 주소처럼 짧은 글을 받던 곳을 아래 명령으로 찾아 `TextFieldArea`로 바꾸세요.

  ```bash
  rg -n "\bTextArea(Props)?\b" -g "*.{ts,tsx}"
  rg -n "umc-text-area"
  ```

### Patch Changes

- e350664: **화면 변화** `AppDialog` Confirm 타입(`cancelLabel` 없음)의 확인 텍스트 버튼에 좌우 8px, 상하 4px 여백을 더합니다. 피그마 `App/Dialog` Button Area의 Weak 타입이 확인 버튼을 터치 영역으로 감싼 것을 따릅니다. 확인 글자가 오른쪽 끝에서 8px 안쪽으로 들어오고, 버튼 영역 높이가 약 54px에서 62px로 늘어 피그마와 같아집니다. 여백까지 눌리는 영역이라 터치하기 쉬워집니다.
- 28faa69: **화면 변화** `Toast` 본문 글자의 자간을 `-0.02em`(16px에서 -0.32px)에서 `Label/3-Medium` 토큰 값 `-0.03em`(-0.48px)으로 바꿉니다. 피그마 Toast Top과 Toast Bottom의 본문이 2기 서체 설정을 벗고 `Label/3-Medium`(16px, 줄 높이 140%, 자간 -3%)으로 바뀐 것을 따릅니다. 글자 크기와 줄 높이는 그대로입니다. 텍스트 버튼(`action`)은 피그마에서 아직 2기 설정이라 자간 -0.32px을 유지합니다.
- Updated dependencies [ac1b822]
  - @umc-product/icons@0.4.0
  - @umc-product/design-tokens@0.4.0

## 0.3.0

### Minor Changes

- e4a33c6: **깨지는 변경** 앱용 `Dialog`의 이름을 `AppDialog`로 바꿉니다. 피그마 `App/Dialog`를 옮긴 컴포넌트이고, `Dialog`라는 이름은 이번 배포에서 피그마 `Web/Dialog`를 옮긴 웹 다이얼로그가 씁니다. 동작과 모양은 그대로입니다.

  | 이전                                                                                      | 이후                                  |
  | ----------------------------------------------------------------------------------------- | ------------------------------------- |
  | `Dialog`                                                                                  | `AppDialog`                           |
  | `DialogProps`                                                                             | `AppDialogProps`                      |
  | `.umc-dialog__backdrop`, `__popup`, `__text`, `__title`, `__description`, `__button-area` | `.umc-app-dialog__…` (같은 부품 이름) |
  | `--umc-dialog-*` 변수                                                                     | `--umc-app-dialog-*`                  |
  | 문서 `/components/overlay/dialog/`                                                        | `/components/overlay/app-dialog/`     |

  `Dialog` 이름은 새 웹 다이얼로그로 그대로 컴파일되므로 타입 오류 없이 모양이 바뀔 수 있습니다. 앱 화면에서 쓰던 곳을 아래 명령으로 찾아 `AppDialog`로 바꾸세요.

  ```bash
  rg -n "\bDialog(Props)?\b" -g "*.{ts,tsx}"
  rg -n "umc-dialog|--umc-dialog-"
  ```

- 97c386d: 웹 화면용 `Dialog`를 더합니다. 피그마 `Web/Dialog`를 옮긴 컴포넌트이고, 앱 화면용은 `AppDialog`입니다. `cancelLabel`을 넘기면 취소와 확인 버튼 두 개(Fill)를, 생략하면 확인 텍스트 버튼 하나(Weak)를 그립니다. `color`(`primary`, `neutral`, `error`)로 확인 버튼과 제목 색을 고르고, `icon`은 제목 앞에, `children`은 설명과 버튼 사이에 놓입니다. 폭은 430px(최소 420px)이며 좁은 화면에서는 화면 폭에 맞춥니다. Esc로 닫히고, 바깥을 눌러도 닫히지 않습니다.
- 2e11e7c: 웹 화면용 `Panel`을 더합니다. 피그마 `Web/Panel`을 옮긴 컴포넌트로, 모바일의 `BottomSheet`가 하는 일을 웹 화면 가운데에서 맡습니다. `title`과 `description` 아래에 스크롤되는 본문(`children`)을 두고, 본문 아래에는 스크롤되지 않는 조작 영역(`control`)과 버튼 영역(`actions`, `BottomSheetActions`를 넘김)을 둡니다. 기본 폭은 512px이고 `className`으로 넓힙니다. 높이가 화면을 넘으면 본문만 스크롤됩니다. Esc나 바깥을 누르면 닫힙니다.

### Patch Changes

- 1230499: **화면 변화** `BottomSheetActions`를 피그마 Button Area 값에 맞춥니다. 버튼 글자가 18px(`label-1-medium`)에서 md 기본값 17px(`label-2-medium`)로 줄어듭니다. `emphasis`는 위 여백이 16px에서 32px로, 아래 여백이 16px에서 0으로 바뀌고, 보조 버튼 110px 고정 대신 3칸 중 보조 1칸·주요 2칸을 차지합니다. `primary-top`의 보조 버튼은 텍스트 버튼에서 흰 48px 버튼(`Button variant="weak" color="white" size="md"`)으로 바뀌어 가운데에 놓입니다. 버튼 최소 폭은 0에서 Button md의 80px로 돌아갑니다.
- a5dcc12: **화면 변화** `Checkbox`가 라벨 높이를 따라 늘어나고 상자를 라벨의 세로 가운데에 맞춥니다. 피그마가 Check Box 높이를 24px 고정에서 최소 24px, 내용에 맞춤으로 바꾼 것을 반영했습니다. 24px를 전제로 계산하던 라벨 위아래 여백을 지워서, 라벨 글자 크기를 키워도 상자가 가운데에 남습니다. 한 줄 라벨의 모양은 그대로이고, 여러 줄 라벨은 상자가 첫 줄 대신 라벨 전체의 가운데에 옵니다.
- fd0b11a: **화면 변화** 모달 안에서 연 목록과 툴팁이 모달 뒤에 깔리던 문제를 고칩니다. 쌓임 순서를 아래부터 딤(`--umc-z-dimmed` 1000), 다이얼로그(`--umc-z-dialog` 1100), 시트(`--umc-z-sheet` 1200), 목록(`--umc-z-dropdown` 1300), 툴팁(`--umc-z-tooltip` 1400), 토스트(`--umc-z-toast` 1500)로 바꿉니다. 이제 `Panel`, `Dialog`, `AppDialog`, `BottomSheet` 안의 `Select`, `Menu`, `ContextSwitcher` 목록과 `Tooltip`이 모달 위에 뜨고, 모달이 열려 있어도 토스트가 딤 위에 보입니다. 앱에서 이 변수 값을 직접 비교하거나 덮어썼다면 새 순서를 확인하세요.
- Updated dependencies [53776ec]
  - @umc-product/icons@0.3.0
  - @umc-product/design-tokens@0.3.0

## 0.2.0

### Minor Changes

- d7433fd: **화면 변화** `Menu` 목록이 피그마 완성형 `Meue List` 모양으로 바뀝니다. 안쪽 여백이 2px에서 4px로, 모서리가 8px에서 12px로 커지고, 테두리와 항목 사이 간격이 없어집니다. 목록 최소 폭은 트리거 폭 대신 크기별 고정값(Xs와 Sm 100px, Md 140px)을 씁니다. 같은 목록 CSS를 쓰는 `Select`는 그대로입니다.

  `Menu`에 `title` prop이 생겼습니다. 넘기면 항목 위에 회색 타이틀이 붙고, 화면 낭독기는 타이틀을 항목 묶음의 이름으로 읽습니다.

- b39e5bf: `Skeleton`을 더합니다. 피그마 `Skeleton/Line`을 옮긴 회색 막대로, 내용을 불러오는 동안 자리를 잡아 둡니다. 기본 모양은 부모 폭을 채우는 14px 높이이고 `width`, `height`로 크기를 바꿉니다. 화면 낭독기에서 숨겨지므로 불러오는 상태는 감싸는 영역에 `aria-busy`로 알립니다. 투명도가 천천히 바뀌는 깜빡임이 있고, 움직임 줄이기 설정에서는 멈춥니다.

### Patch Changes

- 330f500: **화면 변화** `SegmentedControl`에서 선택하지 않은 항목의 글자색이 브랜드 청록(`text-brand-default-600`, `#02746c`)에서 `text-neutral-strong-800`(`#282a2a`)으로 바뀝니다. 마우스를 올렸을 때도 같은 색입니다. 이제 선택한 항목과 글자색이 같고, 선택 여부는 흰 배경과 그림자로 구분합니다.
- @umc-product/design-tokens@0.2.0
  - @umc-product/icons@0.2.0

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
