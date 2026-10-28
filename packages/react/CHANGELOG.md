# @umc-product/react

## 0.11.0 (2026-10-28)

### Minor Changes

- d69b813: 모바일 앱 화면의 머리 `AppPageHeader`를 추가합니다. 피그마 `App/Page Header`를 옮긴 것으로, 위에 `TopNavigation` 줄(뒤로 가기, 오른쪽 버튼)을 두고 32px 아래에 28px 제목(`h1`)과 16px 부제를 쌓습니다. `back`과 `actions`가 모두 없으면 내비게이션 줄을 그리지 않고, `margin`으로 글의 좌우 여백 16px(기본)과 20px을 고릅니다.
- 8cb6561: **깨지는 변경** 웹 헤더(Web/Header/Desktop): 이름이 피그마를 따라 `HeaderDesktop`이 됩니다 (`Header` → `HeaderDesktop`). 피그마가 `Web/Header`를 `Web/Header/Desktop`과 `Web/Header/Mobile`로 나눠, 데스크톱 헤더의 컴포넌트, 타입, 클래스, 컴포넌트 변수 이름을 함께 바꿉니다. 모양과 props는 같고, 메뉴 항목 타입 `NavItem`은 이름을 유지해 모바일 헤더와 함께 씁니다.

  | 전                                          | 후                                                          |
  | ------------------------------------------- | ----------------------------------------------------------- |
  | `<Header>`                                  | `<HeaderDesktop>`                                           |
  | `HeaderProps`                               | `HeaderDesktopProps`                                        |
  | `.umc-header`, `.umc-header__logo` 등       | `.umc-header-desktop`, `.umc-header-desktop__logo` 등       |
  | `--umc-header-bg`, `--umc-header-nav-bg` 등 | `--umc-header-desktop-bg`, `--umc-header-desktop-nav-bg` 등 |

- 5df4b4a: 모바일 웹 헤더 `HeaderMobile`을 추가합니다. 피그마 `Web/Header/Mobile`과 primitive `Actions-Mobile`, `Menu Container`, `Menu Item`을 옮긴 것으로, 80px 줄에 홈 링크와 메뉴 버튼을 두고 버튼을 누르면 헤더 아래에 메뉴를 겹쳐 펼칩니다. 메뉴에는 데스크톱 헤더와 같은 `navItems`(20px 항목)와 `actions`(CTA 버튼 자리)가 들어가고, 항목을 누르거나 `Esc`, 바깥을 누르면 닫힙니다. 열림 상태는 `open`, `defaultOpen`, `onOpenChange`로 다루고, 다크 모드는 피그마대로 투명한 줄과 `#0d1a19` 메뉴 배경을 씁니다.
- eca2783: 앱 상단 내비게이션(App/Top Navigation)에 부제 `subtitle`이 생깁니다. 피그마 `Subtitle` 스위치를 옮긴 것으로, `TopNavigation`에 `titleAlign="center"`와 `subtitle`을 넘기면 제목 아래에 12px 부제(`Caption/3-Regular`, teal-grey-500)를 그립니다. 피그마의 왼쪽 정렬 변형에는 부제가 없어 `titleAlign="start"`에서는 타입이 `subtitle`을 받지 않습니다. `title`은 선택 값이 되어, 제목 없이 뒤로 가기 버튼만 둔 줄도 그릴 수 있습니다.

### Patch Changes

- 33e3e27: **화면 변화** 바텀 시트의 버튼 영역(App/Bottom Sheet): 아래 여백이 생깁니다 (0 → 10px). 피그마 `App/Bottom Sheet` 안 `Button Area` 인스턴스의 아래 여백이 컴포넌트와 같은 10px로 바뀐 것을 따라 `BottomSheet` 안 `BottomSheetActions`의 아래 여백을 10px로 둡니다. 시트 안 좌우 20px과 안전 영역(`safe-area-inset-bottom`)은 그대로이고, 패널(`Panel`) 안 버튼 영역도 피그마대로 아래 0을 유지합니다.
- dd513e5: **화면 변화** 바텀 시트의 제목과 설명(App/Bottom Sheet): 둘 사이가 좁아집니다 (6px → 4px). 피그마 `App/Bottom Sheet`의 `Text Container` 간격이 4px로 바뀐 것을 따라 `BottomSheet`의 `.umc-bottom-sheet__header` 간격을 바꿉니다.
- 5a4d36c: **화면 변화** 웹 헤더 다크 모드의 그림자(Web/Header/Desktop): 색이 짙어집니다 (`#eff0f0` 30% → `#414645` 30%). 피그마 다크 모드 헤더의 그림자가 바뀐 것을 따라 `HeaderDesktop`의 `mode="dark"` 그림자를 `0 4px 16px 0 #4146454d`로 바꿉니다. 맞는 토큰이 없어 컴포넌트 변수로 둡니다.
- 5a4c04d: **화면 변화** 밑줄 입력의 레이블과 입력 칸(Text Field/Line): 둘 사이 간격이 사라져 레이블이 입력 칸에 바로 붙습니다 (6px → 0). 피그마 `Text Field/Line`이 레이블과 입력 칸을 `Label+Text Field` 묶음으로 바꾸고 묶음 안 간격을 0으로 둔 것을 따라 `TextFieldLine`의 루트 간격을 0으로 두고 도움말과 오류 문구 위에만 6px을 줍니다. 입력 칸과 도움말 사이 6px은 그대로입니다.
- 7cd28e7: **화면 변화** 앱 상단 내비게이션의 뒤로 가기 아이콘(App/Top Navigation): 아래 화살표가 왼쪽 화살표로 바뀝니다 (`ExpandMoreIcon` → `ChevronLeftIcon`). 피그마 `App/Top Navigation`의 뒤로 가기 버튼이 `Icon/Chevron_Left`(Fill)를 쓰게 바뀐 것을 따라 `TopNavigation`의 `back` 버튼 아이콘을 바꿉니다. 버튼 이름 "뒤로 가기"와 크기는 바뀌지 않습니다.
- a23cb8a: **화면 변화** 앱 상단 내비게이션의 가운데 제목(App/Top Navigation): 글자색이 짙어집니다 (`#606262` → `#0f1010`). 피그마 가운데 정렬 변형의 제목 색이 `color/text/default`로 바뀐 것을 따라 `TopNavigation`의 가운데 제목이 왼쪽 정렬 제목과 같은 색을 씁니다. 가운데 제목에만 쓰던 컴포넌트 변수 `--umc-top-navigation-sub-title-color`는 `--umc-top-navigation-subtitle-color`로 이름을 바꿔 부제 색(teal-grey-500)에 씁니다.
- @umc-product/design-tokens@0.11.0
  - @umc-product/icons@0.11.0

## 0.10.0 (2026-10-26)

### Minor Changes

- 924c5a0: **깨지는 변경** 아이콘 버튼, 토스트, 대화상자(Icon Button, Toast, Web/Dialog): 기본 색 이름이 Button과 같은 Brand가 됩니다 (`primary` → `brand`). 디자인 팀이 Button에 이어 세 컴포넌트의 Primary도 Brand로 부르기로 해, `IconButton`과 `Dialog`의 `color="primary"`, `Toast`의 `color: "primary"`를 `brand`로 바꿉니다. 기본값도 `brand`이고 색 값은 그대로입니다. `Radio`와 `TopNavigationButton`의 `color="primary"`는 그대로입니다.

  | 전                                                                                                                       | 후                               |
  | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
  | `<IconButton color="primary">`                                                                                           | `<IconButton color="brand">`     |
  | `<Dialog color="primary">`                                                                                               | `<Dialog color="brand">`         |
  | `toast.show({ color: "primary" })`                                                                                       | `toast.show({ color: "brand" })` |
  | `IconButtonColor`, `DialogColor`, `ToastOptions["color"]`의 `"primary"`                                                  | `"brand"`                        |
  | `.umc-icon-button[data-color="primary"]`, `.umc-toast[data-color="primary"]`, `.umc-dialog__popup[data-color="primary"]` | `[data-color="brand"]`           |

### Patch Changes

- 3aea012: **화면 변화** 밑줄 입력의 레이블과 도움말(Text Field/Line): 왼쪽 여백이 사라져 밑줄 왼쪽 끝에 맞춰집니다 (4px → 0). 피그마 `Text Field/Line`에서 `Text Field/ Label`과 `Help Text`의 왼쪽 패딩을 0으로 바꾼 것을 따라 `TextFieldLine` 안의 `.umc-field__label`, `.umc-field__caption`만 `padding-inline: 0`을 씁니다. `TextFieldBox`를 비롯한 다른 필드는 그대로 4px입니다.
- @umc-product/design-tokens@0.10.0
  - @umc-product/icons@0.10.0

## 0.9.0 (2026-10-25)

### Minor Changes

- 9049532: 코드 입력 칸(Code Input): 작은 크기가 생깁니다 (52px 칸 한 가지 → 42px 칸 추가). 피그마 `Text Field/ Code Input`에 `Size=Md`가 더해진 것을 옮긴 것으로, `CodeField`에 `size="md"`를 넘기면 칸이 52px에서 42px, 모서리가 16px에서 12px, 글자가 26px에서 22px(`Title/1-Semibold`), 칸 사이가 10px에서 6px로 줄어듭니다. 기본값 `lg`는 그대로입니다.

### Patch Changes

- 7fdf0a8: **화면 변화** 바텀 시트와 패널의 버튼 영역(Button Area): 버튼 위 여백이 줄고 패널에서는 버튼이 양옆으로 조금 넓어집니다 (위 여백 32px → 16px, 패널 좌우 여백 20px → 16px). 피그마 `Button Area` 컴포넌트 여백이 위 16px·아래 10px·좌우 16px로 바뀌어 `BottomSheetActions` 다섯 레이아웃이 그 값을 기본으로 쓰고(`primary-top`의 아래 4px도 10px), `BottomSheet` 안에서는 피그마 `App/Bottom Sheet`대로 좌우 20px·아래 0, `Panel` 안에서는 `Web/Panel`대로 좌우 16px·아래 0을 씁니다. 패널 아래 여백은 24px에서 20px로 바뀝니다.
- 28c0db7: **화면 변화** 입력 상자의 오류 상태(Text Field/Box): 분홍 배경이 옅어집니다 (Red-50 → Red-50 30%). 피그마 `Text Field/Box/Field`의 오류 배경이 Red-50 100%에서 Red-50 30%(`rgba(254, 242, 241, 0.3)`)로 바뀐 것을 따라 `TextFieldBoxField`, `TextFieldBox`, `TextFieldArea`, `VerificationCodeField`, `Select`의 `invalid` 배경을 `#fef2f1`에서 `#fef2f14d`로 바꿉니다. 투명도 토큰이 아직 없어 값은 컴포넌트 변수 `--umc-text-field-box-field-error-bg`, `--umc-select-error-bg`에 두었습니다. `CodeField` 칸과 `IconButton`의 오류 배경은 그대로입니다.
- @umc-product/design-tokens@0.9.0
  - @umc-product/icons@0.9.0

## 0.8.0 (2026-10-25)

### Minor Changes

- 158265e: **깨지는 변경** 피그마 `Button`의 `Color=Primary`가 `Color=Brand`가 되어 `Button`의 `color="primary"`를 `color="brand"`로 바꿉니다. 기본값도 `brand`입니다. 색 값은 그대로이고, 피그마가 바뀌지 않은 `IconButton`, `Toast`, `Dialog`의 `primary`는 그대로 둡니다.

  | 전                          | 후                       |
  | --------------------------- | ------------------------ |
  | `<Button color="primary">`  | `<Button color="brand">` |
  | `ButtonColor`의 `"primary"` | `"brand"`                |
  | `[data-color="primary"]`    | `[data-color="brand"]`   |

- 3b57692: 질문지 그룹에 `FormSheet`와 `FormHeader`를 추가합니다. 피그마 `Web/Form/Sheet`와 `Form/Header`를 옮긴 것으로, `FormHeader`는 썸네일, 제목, 부제목을 탭 모양 머리로 보여 주고 오른쪽에 `caption`(제출 시각, 상태 태그)을 둘 수 있습니다. `FormSheet`는 `header`, `action`(오른쪽 위 아이콘 버튼), `description`, 본문(`children`), `control`(아래 버튼)을 순서대로 놓는 틀입니다. 작성 화면과 조회 화면 모두 같은 틀을 쓰고, 안에 넣는 질문의 모드만 다릅니다.
- 0364345: **깨지는 변경** 피그마가 `Text Field/ Input Box`를 `Text Field/Box/Field`로, 완성형을 `Text Field/Box`로 바꾸면서 코드 이름도 따라갑니다. `TextField`는 `TextFieldBox`, `InputBox`는 `TextFieldBoxField`가 되고, CSS 클래스 `umc-input-box*`와 변수 `--umc-input-box-*`도 `umc-text-field-box-field*`, `--umc-text-field-box-field-*`로 바뀝니다. props와 동작은 그대로입니다. `TextFieldArea`, `Select`, `VerificationCodeField`, `CodeField`의 이름은 바뀌지 않습니다.

  | 전                                                  | 후                                                                       |
  | --------------------------------------------------- | ------------------------------------------------------------------------ |
  | `TextField`, `TextFieldProps`                       | `TextFieldBox`, `TextFieldBoxProps`                                      |
  | `InputBox`, `InputBoxProps`                         | `TextFieldBoxField`, `TextFieldBoxFieldProps`                            |
  | `.umc-input-box`, `.umc-input-box__input` 등        | `.umc-text-field-box-field`, `.umc-text-field-box-field__input` 등       |
  | `--umc-input-box-*`                                 | `--umc-text-field-box-field-*`                                           |
  | 문서 `/components/forms/text-field/`, `/input-box/` | `/components/forms/text-field-box/`, `/text-field-box-field/`(자동 이동) |

- fa334a8: `TextFieldLine`과 `TextFieldLineField`를 추가합니다. 피그마 `Text Field/Line`(레이블, 밑줄 입력, 도움말)과 `Text Field/Line/Field`(Text, Password, Selector)를 옮겼습니다. 테두리 상자 대신 2px 밑줄과 22px Semibold 글자를 쓰고, 위아래 16px 여백이 컴포넌트에 들어 있습니다. 크기가 한 가지라 `size`와 `unit`이 없습니다. `Select`에는 `shape="line"`을 더해 `Type=Selector`를 같은 모양으로 그립니다.

### Patch Changes

- cbf0b5d: **화면 변화** 피그마 `Button`의 Fill 스타일 비활성 색이 바뀐 것에 맞춰 `variant="fill"`의 비활성 색이 바뀝니다. Brand는 배경 Teal-300(#7ac7c1)에서 Teal-200(#b3e5e1)으로, 글자 Teal-100(#ddf4f1)에서 Teal-50(#f4fbfa)으로 바뀝니다. Red는 배경 Red-300(#f88c8c)에서 Red-200(#fdb4b4)으로, 글자 Red-200(#fdb4b4)에서 Red-100(#ffe7e5)으로 바뀝니다. Weak 스타일과 Neutral, White는 그대로입니다.
- dfeadd0: **화면 변화** 피그마 `Form/Question`의 Read Only 모드에서 글자 수가 빠진 것에 맞춰 `TextArea`가 `readOnly`이면 `maxLength`가 있어도 글자 수를 그리지 않습니다. 높이도 글자 수 한 줄만큼(77px에서 50px로) 줄어듭니다. `FormTextAnswer`와 읽기 전용 `FormQuestion` 안의 답 칸도 같습니다. 비활성(`disabled`)에서는 전처럼 글자 수를 보여 줍니다.
- @umc-product/design-tokens@0.8.0
  - @umc-product/icons@0.8.0

## 0.7.0 (2026-10-24)

### Minor Changes

- 69f4a29: `Calendar`와 `CalendarScheduleCard`를 추가합니다. 피그마 `Calendar`와 `Calendar/Schedule Card`를 옮겼고, 두 컴포넌트는 서로 이어지지 않아 앱이 함께 놓고 연결합니다.

  - `Calendar`: 월요일에 시작하는 한 달 격자와 이전·다음 달 버튼을 그립니다. 날짜 하나를 고르고(`value`, `onValueChange`), 기간을 띠로(`ranges`), 일정이 있는 날을 점으로(`markedDates`) 보여 줍니다. 앞뒤 달 날짜는 흐리게 채우고, 누르면 그 달로 옮깁니다. 화살표, Home, End, PageUp, PageDown으로 날짜를 옮길 수 있습니다.
  - `CalendarScheduleCard`: 회차, 일정 이름, 기간을 한 장에 담는 카드입니다. `status`로 예정, 진행 중, 지난 일정을 나눕니다.

- b2edf62: `Chip`에 `size="lg"`를 추가합니다. 피그마 `Chip`의 `Size=Lg`로, 높이는 42px이고 글자는 `Title/2-Medium`(20px), 아이콘은 20px입니다. 좌우 여백은 아이콘이 없으면 16px씩이고, 앞 아이콘이면 12px·18px, 뒤 아이콘이면 18px·12px입니다. 색과 상태는 다른 크기와 같습니다.
- c969f3a: `Field`에 도움말 크기 `captionSize`(`"md"`, `"lg"`)를 더합니다. 피그마 `Help Text`에 새로 생긴 `Size=14px`가 `lg`(14px, `caption-1-regular`)이고, 기본값 `md`는 지금까지와 같은 13px입니다. 오류 메시지도 같은 크기를 따릅니다. `TextField`, `TextFieldArea`, `TextArea`, `Select`, `CodeField`, `VerificationCodeField`, `NumericStepper`도 같은 prop을 받아 `Field`에 넘깁니다.
- a29250b: **깨지는 변경** 피그마 `Help Text`의 `Type=Primary`가 `Type=Success`가 되어 `Field`의 `captionColor="primary"`도 `captionColor="success"`로 바꿉니다. 초록 글자색(#06844c, `text-success`)은 그대로이고 `StatusTag`와 `GuidanceMessage`가 쓰는 `success`와 이름이 같아집니다. `Field`를 감싼 `TextField`, `TextFieldArea`, `TextArea`, `Select`, `CodeField`, `VerificationCodeField`, `NumericStepper`도 같은 이름을 받습니다.

  | 전                                         | 후                                         |
  | ------------------------------------------ | ------------------------------------------ |
  | `captionColor="primary"`                   | `captionColor="success"`                   |
  | `.umc-field__caption[data-tone="primary"]` | `.umc-field__caption[data-tone="success"]` |

- ce9b9ee: `FormAttachmentField`에 `invalid`와 `errorMessage`를 추가합니다. 피그마 `Form/Question`에 생긴 Help Text에 맞춰, 오류이면 칸 테두리를 Red-300으로 바꾸고 칸 아래에 빨간 도움말을 보여 줍니다. 도움말은 링크 입력의 설명으로 이어집니다. 글 답변(`FormTextAnswer`)은 전처럼 `TextArea`의 `invalid`와 `errorMessage`를 씁니다.

  칸과 버튼은 루트 안의 새 요소(`.umc-form-attachment-field__row`)로 묶였습니다. 루트에 `className`으로 칸과 버튼 사이 간격을 주던 앱은 확인해 주세요.

- aa1a2a6: `FormQuestionEditor`에 `dragPlaceholder`를 더합니다. 켜면 끄는 동안 목록에 남은 원래 질문이 점선 상자가 되어 놓일 자리로 따라 움직이고, 손을 따라다니는 카드는 `dragging`으로 그립니다. @dnd-kit은 패키지에 들어 있지 않으니 앱에서 설치합니다.
- aa1a2a6: `FormQuestionEditor`에 `dragging`을 더합니다. 손잡이를 잡고 순서를 옮기는 동안 켜면 회색 강조선과 떠 있는 그림자가 생기고 활성 질문이어도 필수 항목, 삭제, 툴바가 숨겨집니다. 끌어서 옮기는 기능은 앱이 붙이며 @dnd-kit을 쓴다면 `useSortable`의 `isDragging`을 그대로 넘기면 됩니다.
- 7c50f8a: 질문지 그룹에 `FormSectionEmpty`를 더합니다. 질문이 없는 섹션 본문에 넣는 안내이며, 질문을 끄는 동안 이 섹션에 놓을 수 있으면 `dropTarget`으로 `dragPlaceholder`와 같은 점선을 그립니다.
- f65c4a6: `IconButton`에 `size="sm"`을 추가합니다. 피그마 `Icon Button`의 `Size=Sm`으로, 칸은 24×24px, 모서리는 `radius-6`, 아이콘은 20px입니다. 색과 눌림 모양은 다른 크기와 같습니다.
- f946d1a: `Panel`에 머리 슬롯 `headSlot`과 닫기 버튼 `PanelCloseButton`을 더합니다. 피그마 `Web/Panel`에 생긴 `Head Slot` 자리로 제목 오른쪽 위(패널 위 20px, 오른쪽 16px)에 놓입니다. `PanelCloseButton`은 Head Slot의 기본 내용인 24px 닫기 아이콘 버튼이고 누르면 패널을 닫으며 `onOpenChange(false)`를 부릅니다. `headSlot`을 넘기지 않으면 머리 모양과 구조는 그대로입니다.
- 1cb3569: `StatusTag`에 `color="success"`를 더합니다. 피그마 `Tag/Status`의 `Color=Green`이고, 점과 글자가 `text-success`(#06844c)입니다.

### Patch Changes

- 2076ef8: **화면 변화** 피그마 `Chart/Tooltip`이 3기 색과 글자 스타일로 바뀐 것에 맞춰 `ChartTooltip`이 바뀝니다. `CategoryGroupChart`와 `RankedBarChart`가 띄우는 툴팁도 같이 바뀝니다. 그림자는 그대로입니다.

  | 항목                          | 전                               | 후                                                                    |
  | ----------------------------- | -------------------------------- | --------------------------------------------------------------------- |
  | 제목                          | #9ca3a3, 600, 행간 150%          | #7e7f7f(TealGrey-500), 700, 행간 130%                                 |
  | 합계                          | 11px, 행간 160%, 자간 0          | 12px, 행간 150%, 자간 -2%(`caption-3-bold`)                           |
  | 합계 비교값                   | #9ca3a3, 11px, 행간 160%         | #adadad(TealGrey-400), 12px, 행간 150%(`caption-3-medium`)            |
  | 항목                          | #404443, 11px, 행간 160%, 자간 0 | #282a2a(TealGrey-800), 12px, 행간 150%, 자간 -2%(`caption-3-regular`) |
  | 항목 비교값                   | #9ca3a3                          | #adadad                                                               |
  | 보조 설명                     | #9ca3a3, 행간 160%, 자간 -2%     | #adadad, 행간 150%, 자간 0(`caption-4-medium`)                        |
  | 위 여백                       | 8px                              | 10px                                                                  |
  | 제목과 합계 사이              | 0(비교 모양 1px)                 | 3px                                                                   |
  | 제목 묶음·항목·보조 설명 사이 | 2px(비교 모양 8px)               | 8px                                                                   |
  | 항목 사이                     | 2px                              | 4px                                                                   |

- f32a63a: **화면 변화** 피그마 `Check Box Option Item`의 편집 모드가 보기 글과 닫기 아이콘을 줄 양 끝으로 벌린 것에 맞춰 `FormChoiceListEditor`의 삭제 버튼이 줄 오른쪽 끝으로 옮겨 갑니다. 라디오 보기도 같은 모양이라 단일 선택과 복수 선택이 모두 바뀝니다.

  | 항목           | 전                         | 후                           |
  | -------------- | -------------------------- | ---------------------------- |
  | 삭제 버튼 위치 | 보기 글 바로 뒤(간격 12px) | 줄 오른쪽 끝(안쪽 여백 10px) |

- f6712ab: **화면 변화** 피그마 `Help Text`가 텍스트 스타일 `Caption/2-Regular`에 연결된 것에 맞춰 도움말과 오류 메시지의 행간이 바뀝니다. `Field`를 쓰는 `TextField`, `TextFieldArea`, `TextArea`, `Select`, `CodeField`, `VerificationCodeField`, `NumericStepper`와 `FormAttachmentField`의 오류 메시지가 같이 바뀝니다. 도움말 한 줄이 1.85px 높아집니다.

  | 항목 | 전         | 후                                 |
  | ---- | ---------- | ---------------------------------- |
  | 행간 | 17px(고정) | 145%(18.85px, `caption-2-regular`) |
  | 크기 | 13px       | 13px(그대로)                       |

- 89b686f: **화면 변화** 피그마 `Tag/Status`가 점과 간격을 줄인 것에 맞춰 `StatusTag`가 바뀝니다. 모든 색에 같이 적용됩니다.

  | 항목           | 전   | 후   |
  | -------------- | ---- | ---- |
  | 점 지름        | 12px | 10px |
  | 점과 글자 사이 | 6px  | 4px  |

- efd52af: **화면 변화** 피그마 `Text Area`에 생긴 오류 변형(`Error=True`)에 맞춰 `TextArea`의 오류 모양이 바뀝니다. 오류이면 상태와 관계없이 테두리만 빨간색이고 배경은 그대로입니다. 오류를 켜고 끄는 흐름은 그대로 앱이 `invalid`로 정합니다.

  | 항목                       | 전                            | 후                                          |
  | -------------------------- | ----------------------------- | ------------------------------------------- |
  | 오류 배경                  | #fef2f1(`fill-error-weak-50`) | 오류가 아닐 때와 같음(흰색, 비활성 #fbfcfc) |
  | 오류 + hover·포커스 테두리 | #ed6464(Red-400)              | #f88c8c(Red-300)                            |
  | 오류 + 비활성 테두리       | #f88c8c                       | #f88c8c(그대로)                             |

- 9b2c216: **화면 변화** 피그마 `Text Info Button`의 글자가 커지고 굵어진 것에 맞춰 `TextInfoButton`도 바뀝니다. 아이콘 크기와 색, 아이콘과 글자 사이 간격은 그대로입니다.

  | 항목 | 전           | 후            |
  | ---- | ------------ | ------------- |
  | 크기 | 12px         | 13px          |
  | 굵기 | 400(Regular) | 500(Medium)   |
  | 행간 | 150%(18px)   | 145%(18.85px) |
  | 자간 | -2%          | -2%(그대로)   |

- Updated dependencies [c5001c6]
- Updated dependencies [b0b4317]
  - @umc-product/design-tokens@0.7.0
  - @umc-product/icons@0.7.0

## 0.6.0 (2026-10-20)

### Minor Changes

- 8b4eee4: `Button`에 아이콘만 있는 버튼을 더합니다. `icon`에 아이콘을 넘기고 라벨을 비우면 md 54×48, sm 40×40, xs 36×36 크기로 그리고, 글자가 없는 대신 `aria-label`이나 `aria-labelledby`를 빠뜨리면 타입 검사에서 걸립니다.
- 63f885e: `CategoryGroupChart`를 더합니다. 피그마 `Bar Chart/Category Group`을 옮긴 막대 차트로, 학교나 프로젝트 같은 묶음마다 계열(`series`)의 값을 가는 막대로 나란히 그립니다. 묶음에 비교값(`references`)을 넘기면 회색 비교 막대를 겹쳐 그리고, 묶음에 마우스를 올리거나 키보드로 가거나 누르면 `ChartTooltip` 모양의 요약이 뜹니다. 묶음은 버튼이며 화살표 키로 옮겨 다닙니다.
- ddcee51: 새 문서 그룹 "차트"에 `ChartLegend`를 더합니다. 피그마 `Chart/Legend Item`을 옮긴 범례로, 계열 목록(`series`)을 받아 색 점과 이름을 늘어놓습니다. 색은 파트 4종(`pm`, `design`, `web-pe`, `mobile-pe`), 청록 4단계(`teal-500`~`teal-200`), 비교값(`reference`) 중에서 고릅니다.
- ddcee51: `ChartTooltip`을 더합니다. 피그마 `Chart/Tooltip`을 옮긴 요약 상자로, 제목, 합계, 항목(색 점, 이름, 값)과 보조 설명을 그립니다. 항목에 비교값(`reference`)이나 합계 비교값(`referenceSummary`)을 넘기면 "10명 / 16명"처럼 값과 비교값을 나란히 보여 줍니다.
- f84b4a5: `Checkbox`에 `readOnly`를 더합니다. 읽기 전용이면 눌러도 체크 상태가 바뀌지 않고, 화면 낭독기에는 `aria-readonly`로 알립니다. 모양은 그대로이고 커서만 기본 화살표로 바뀝니다. 작성된 지원서를 조회하는 화면처럼 선택 결과를 보여 주기만 할 때 씁니다.
- 010dafb: `ColumnChart`를 더합니다. 피그마 `Bar Chart/Column`을 옮긴 세로 막대 차트로, 항목마다 막대 위에 값을, 아래에 이름을 적습니다. 막대 높이는 값을 가장 큰 값으로 나눈 비율이고, 정해진 기준이 있으면 `max`로 넘깁니다. 막대 모양은 항목의 `mode`(`neutral`, `primary-weak`, `primary-strong`)로 고릅니다.
- 010dafb: `DateNavigator`를 더합니다. 피그마 `Date Navigator`를 옮긴 컴포넌트로, 가운데 날짜(`children`) 양옆에 이전, 다음 화살표 버튼을 둡니다. 콜백(`onPrevious`, `onNext`)을 넘기지 않은 쪽 화살표는 비활성이 되고, 바뀐 날짜는 화면 낭독기가 읽습니다.
- edece37: 피그마 `Floating Action Button`을 옮긴 `FloatingActionButton`을 더합니다. 54px 원 안에 30px 아이콘(`icon`) 하나만 두는 버튼이고, 마우스를 올리면 배경과 테두리, 아이콘이 브랜드색으로 바뀝니다. 글자가 없어 `aria-label`이 타입에서 필수입니다.
- 53a47c7: 질문지에서 링크나 파일을 붙이는 `FormAttachmentField`를 더합니다. 피그마 `Form/Attachment Field`의 응답 모드로, 비어 있으면 링크 입력과 "파일 업로드" 버튼을, 첨부(`attachment`)가 있으면 클립 아이콘과 링크, "삭제" 버튼을 보여 줍니다. 파일은 기본으로 200MB 이하 PDF만 받아 `onFileSelect`로 넘기고, 맞지 않으면 `onReject`로 이유를 넘깁니다. 업로드와 링크를 첨부로 확정하는 일은 앱이 맡습니다. 질문지 편집 화면에서는 `preview`를 주면 입력 칸과 버튼을 누를 수 없는 미리보기로 그립니다.
- edece37: 선택 질문의 보기를 편집하는 `FormChoiceListEditor`를 더합니다. 피그마 `Form/Radio Button Option List`와 `Form/Check Box Option List`의 편집 모드로, 보기마다 입력 칸을 두고 "옵션 추가" 줄과 삭제 버튼을 그립니다. 보기 목록은 앱이 들고 있고 `onOptionChange`, `onOptionAdd`, `onOptionRemove`로 바뀐 내용을 받습니다. 추가와 삭제 콜백을 넘기지 않으면 그 버튼도 그리지 않습니다.
- 53a47c7: 질문지에서 보기를 고르는 `FormChoiceList`를 더합니다. 피그마 `Form/Radio Button Option List`와 `Form/Check Box Option List`의 응답 모드로, `type="single"`이면 라디오로 하나를, `type="multiple"`이면 체크박스로 여러 개를 고릅니다. 고른 줄은 연한 청록 배경에 브랜드색 글자로 바뀌고, 보기마다 `disabled`를 줄 수 있습니다.
- edece37: 질문지 편집 화면의 `FormQuestionEditor`와 `FormEditableQuestion`을 더합니다. 피그마 `Form/Question Editor`를 옮긴 `FormQuestionEditor`는 질문을 감싸 Hover 강조선과 활성(`active`) 상태의 필수 항목, 삭제, 질문 사용 스위치, `toolbar`를 그립니다. 필수 항목 체크와 제목 뒤 `*`는 `required` 하나를 따르고, `disabled`를 주면 안쪽 제목·설명 칸과 보기 편집, 첨부 미리보기도 함께 막힙니다. `onDelete`를 넘기지 않으면 삭제 버튼을 그리지 않습니다. 이동 손잡이는 `dragHandleProps`를 넘길 때만 그려서 끌어 옮기기 라이브러리와 연결합니다. `FormEditableQuestion`은 `Form/Question`의 편집 모드로, 제목과 설명이 입력 칸이고 답 칸 자리에 미리보기를 받습니다.
- edece37: 질문지 편집 화면에서 질문을 더하는 `FormQuestionToolbar`와 `FormQuestionTypeList`를 더합니다. 피그마 `Form/Question Toolbar`를 옮긴 툴바는 더하기 버튼으로 질문 유형 버튼을 열고 닫으며, 누른 유형을 `onTypeSelect`로 넘깁니다. `FormQuestionTypeList`는 유형 목록만 따로 쓰는 컴포넌트로, 편집 중인 질문의 유형을 고른 표시로 보여 주고 바꿉니다. 유형 목록(`items`)은 앱이 값, 라벨, 아이콘으로 넘깁니다.
- 53a47c7: 새 문서 그룹 "질문지"에 `FormQuestion`과 `FormTextAnswer`를 더합니다. 피그마 `Form/Question`의 응답과 읽기 전용 모드를 옮긴 것으로, `FormQuestion`은 번호, 제목, 필수 별표, 설명(`SectionHeader` md)과 20px 들여 쓴 답 칸을 그립니다. 질문 제목과 설명이 안쪽 답 칸의 이름과 설명이 되고, `required`, `readOnly`, `disabled`가 답 칸에 전해집니다. `FormTextAnswer`는 `TextArea`에 이 연결만 더한 글 답 칸입니다.
- edece37: 질문을 묶는 `FormSection`을 더합니다. 피그마 `Form/Question Section`과 `Section Control`을 옮긴 것으로, `variant="static"`은 탭 모양 제목을, `variant="toggle"`은 "섹션 사용" 스위치가 있는 머리를 그립니다. 스위치를 끄면 본문을 지우지 않고 숨겨서 다시 켜도 쓰던 내용이 남습니다.
- e21c7f4: `IconButton`을 더합니다. 피그마 `Icon Button`을 옮긴 26px, 30px 아이콘 버튼으로, 닫기나 표 머리 설정처럼 화면 안에 작게 놓는 버튼에 씁니다. 색은 `primary`, `white`, `neutral`, `error`이고 스타일은 `weak`, `fill`입니다. `aria-label`이나 `aria-labelledby`를 빠뜨리면 타입 검사에서 걸립니다.
- d060a78: `ImageThumbnailEditor`를 더합니다. 피그마 `Image Thumbnail Editor`를 옮긴 업로드 칸입니다. 칸을 눌러 이미지 파일을 고르면 미리보기를 보여 주고 `onValueChange`로 `File`을 넘깁니다. 기본으로 PNG, SVG, 5MB 이하 파일만 받고(`accept`, `maxSize`로 변경), 맞지 않는 파일은 받지 않고 `onReject`로 파일과 이유(`"type"`, `"size"`)를 넘깁니다. 서버 업로드는 앱이 합니다. 기본 크기는 120px이고 `className`으로 바꾸며, 칸 안 문구는 `label`과 `description`으로 바꿉니다.
- 679bb10: `ImageThumbnail`을 더합니다. 피그마 `Image Thumbnail`을 옮긴 정사각형 이미지 칸으로, 학교 로고처럼 작은 이미지를 보여 줍니다. 기본 50px, 모서리 8px이고 `size`로 키우면 모서리와 대체 로고도 같은 비율로 커집니다. `src`가 없거나 이미지를 불러오지 못하면 회색 UMC 로고를 보여 주고, 이때 칸 전체가 `alt`를 이름으로 가진 이미지가 됩니다.
- 3ccd317: `Pagination`을 더합니다. 피그마 `Pagination`을 옮긴 페이지 이동 번호 묶음으로 `totalPages`, `page`(또는 `defaultPage`), `onPageChange`를 받습니다. 번호는 `visibleCount`(기본 4)개씩 묶어 보여 주고, 넘어갈 페이지가 없는 쪽 화살표는 지웁니다. 화살표가 사라질 때 포커스는 현재 번호로 옮깁니다.
- d28bc66: `ProgressSummary`를 더합니다. 피그마 `Progress Summary`를 옮긴 진행 요약으로, 라벨, 개수(`value`/`max`), 퍼센트, 그라데이션 막대를 한 묶음으로 보여 줍니다. 퍼센트는 반올림하지만 끝나지 않았으면 99%, 하나라도 마쳤으면 1%에서 멈춥니다. 폭은 부모를 채웁니다.
- 802eff4: `RankedBarChart`를 더합니다. 피그마 `Web/Bar Chart/Ranked Bar`와 `Fixed Ranked Bar`를 옮긴 순위 막대 차트로, 항목을 값이 큰 순서로 늘어놓고 1~3위를 진한 청록에서 옅은 청록으로, 4위부터는 같은 색으로 칠합니다. 같은 값은 같은 순위입니다. `heightBy="value"`(기본)는 가장 큰 값을 200px로 두고 비례하며, `heightBy="rank"`는 순위마다 정해진 높이를 씁니다. 비교값(`reference`)을 넘기면 회색 비교 막대를 겹쳐 그리고, 막대에 마우스를 올리거나 키보드로 가거나 누르면 요약 툴팁이 뜹니다.
- 5ce4533: `SectionHeader`를 더합니다. 피그마 `Web/Section Header`를 옮긴 구획 머리말로, 번호(`number`), 제목, 필수 별표(`required`), 설명(`description`), 제목 줄 오른쪽 슬롯(`slot`)을 보여 줍니다. 크기는 `lg`, `md`, `sm`이고, 제목은 기본 `h2`라 `level`로 단계를 바꿉니다.
- a14786a: **깨지는 변경** `SideNavigation`이 216px 고정 폭 대신 부모 폭을 채웁니다. 피그마 `Web/Side Navigation`의 너비가 Fill이라, 사이드바 칸의 폭은 레이아웃이 정합니다.

  | 이전                                                                   | 이후                                 |
  | ---------------------------------------------------------------------- | ------------------------------------ |
  | `width: var(--umc-layout-sidebar-width)`(216px), 넓은 부모에서도 216px | `width: 100%`, 부모 폭을 그대로 채움 |

  본문과 같은 flex 행에 바로 놓았다면 내비게이션이 행 전체로 늘어나 본문이 밀려납니다. 사이드바 칸 폭을 정하고 줄어들지 않게 합니다.

  ```tsx
  <SideNavigation
    className="w-(--umc-layout-sidebar-width) shrink-0"
    items={items}
    currentPath={pathname}
  />
  ```

  Tailwind를 쓰지 않는 앱은 감싸는 요소에 `width: var(--umc-layout-sidebar-width)`와 `flex-shrink: 0`을 줍니다. 쓰는 곳은 아래 명령으로 찾습니다.

  ```bash
  rg -n "<SideNavigation" -g "*.{ts,tsx}"
  ```

### Patch Changes

- 8b4eee4: **화면 변화** `white` 버튼의 아이콘 색을 피그마에 맞춥니다. 글자색은 그대로입니다.

  | 항목                | 전                     | 후                                 |
  | ------------------- | ---------------------- | ---------------------------------- |
  | `white` 버튼 아이콘 | #606262(글자색과 같음) | #7e7f7f(`icon-neutral-medium-500`) |

- 5e40667: **화면 변화** 피그마 `Text Area`가 최소 높이를 빼고 Disabled 변형에 글자 수를 더한 것에 맞춰 `TextArea`가 바뀝니다.

  | 항목                | 전    | 후                            |
  | ------------------- | ----- | ----------------------------- |
  | 최소 높이           | 120px | 없음(한 줄과 글자 수 약 79px) |
  | 입력과 글자 수 사이 | 0px   | 4px                           |
  | 비활성일 때 글자 수 | 숨김  | 보임                          |

  전처럼 120px에서 시작하려면 `className="[--umc-text-area-min-height:120px]"`를 넘깁니다.

- 27d0067: 읽기 전용(`readOnly`) `TextArea`에 마우스를 올려도 테두리 색이 바뀌지 않습니다. 고칠 수 없는 칸이 고칠 수 있는 것처럼 보이던 문제입니다. 키보드 포커스 표시는 그대로 둡니다.
- Updated dependencies [ab5413a]
  - @umc-product/icons@0.6.0
  - @umc-product/design-tokens@0.6.0

## 0.5.0 (2026-10-18)

### Minor Changes

- 9d17e64: `Divider`를 더합니다. 피그마 `Divider`와 `Divider_Vertical`을 옮긴 구분선입니다. `variant`로 얇은 선(`line`, 0.5px)과 두꺼운 띠(`solid`, 8px, 투명도 30%)를 고르고, `orientation="vertical"`로 1px 세로선을 그립니다. Base UI Separator로 `role="separator"`가 붙습니다.
- 3474eeb: `GuidanceMessage`를 더합니다. 피그마 `Guidance Message`를 옮긴 한 줄 안내 문구로, 버튼이나 카드 아래에서 지금 상태를 알려 줍니다. `color`로 `neutral`, `success`, `warning`(피그마 `Yellow`), `error`를 고르고, 문구 앞 16px 체크 아이콘은 `showIcon={false}`로 끌 수 있습니다.

### Patch Changes

- 7ddace7: **화면 변화** `TextArea`의 기본 최소 높이를 198px에서 120px로 줄이고, 오른쪽 여백을 12px에서 16px로 바꿉니다. 피그마 `Text Area`가 바뀐 것을 따릅니다. 피그마 설명대로 최소·최대 높이는 페이지마다 달라질 수 있어서, `className`으로 `--umc-text-area-min-height`와 `--umc-text-area-max-height` 변수를 넘겨 바꿀 수 있게 했습니다. 내용이 늘면 상자가 최대 높이까지 함께 늘어나고, 그보다 긴 내용은 상자 안에서 스크롤됩니다(CSS `field-sizing`을 지원하는 브라우저 기준).
- Updated dependencies [08a21f3]
  - @umc-product/icons@0.5.0
  - @umc-product/design-tokens@0.5.0

## 0.4.0 (2026-10-17)

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

## 0.3.0 (2026-10-15)

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

## 0.2.0 (2026-10-13)

### Minor Changes

- d7433fd: **화면 변화** `Menu` 목록이 피그마 완성형 `Meue List` 모양으로 바뀝니다. 안쪽 여백이 2px에서 4px로, 모서리가 8px에서 12px로 커지고, 테두리와 항목 사이 간격이 없어집니다. 목록 최소 폭은 트리거 폭 대신 크기별 고정값(Xs와 Sm 100px, Md 140px)을 씁니다. 같은 목록 CSS를 쓰는 `Select`는 그대로입니다.

  `Menu`에 `title` prop이 생겼습니다. 넘기면 항목 위에 회색 타이틀이 붙고, 화면 낭독기는 타이틀을 항목 묶음의 이름으로 읽습니다.

- b39e5bf: `Skeleton`을 더합니다. 피그마 `Skeleton/Line`을 옮긴 회색 막대로, 내용을 불러오는 동안 자리를 잡아 둡니다. 기본 모양은 부모 폭을 채우는 14px 높이이고 `width`, `height`로 크기를 바꿉니다. 화면 낭독기에서 숨겨지므로 불러오는 상태는 감싸는 영역에 `aria-busy`로 알립니다. 투명도가 천천히 바뀌는 깜빡임이 있고, 움직임 줄이기 설정에서는 멈춥니다.

### Patch Changes

- 330f500: **화면 변화** `SegmentedControl`에서 선택하지 않은 항목의 글자색이 브랜드 청록(`text-brand-default-600`, `#02746c`)에서 `text-neutral-strong-800`(`#282a2a`)으로 바뀝니다. 마우스를 올렸을 때도 같은 색입니다. 이제 선택한 항목과 글자색이 같고, 선택 여부는 흰 배경과 그림자로 구분합니다.
- @umc-product/design-tokens@0.2.0
  - @umc-product/icons@0.2.0

## 0.1.1 (2026-10-13)

### Patch Changes

- 2793718: **화면 변화** `BottomNavigationItem`이 하위 경로에서도 탭을 선택합니다. 지금까지는 `currentPath`와 `href`가 정확히 같을 때만 선택되어 `/projects/12`에서 `/projects` 탭이 선택되지 않았고, 반대로 `/settings`에서 `/settings/profile` 탭이 선택되었습니다. 이제 `Header`와 같은 규칙(같거나 하위 경로)을 따릅니다.
- de9b52e: `BottomSheet`가 Base UI `Drawer.Viewport` 안에 시트를 그립니다. 지금까지는 Viewport가 없어 꺼져 있던 동작이 켜집니다. 시트를 아래로 쓸어 내려 닫을 수 있고, 열려 있는 동안 뒤 화면이 터치로 스크롤되지 않으며, 입력칸에 포커스가 가면 가상 키보드 높이만큼 시트가 올라갑니다. 시트 바깥을 누르면 닫히는 동작과 겉모습은 그대로입니다.
- b099feb: 단일 선택 `OptionButtonGroup`이 `value={null}`을 "선택 없음" 제어 상태로 다룹니다. 지금까지는 `null`이 `undefined`로 바뀌어 비제어가 되었습니다. 그래서 `null`로 시작하면 나중에 넘긴 `value`를 무시했고, 누르면 부모 상태와 상관없이 선택이 바뀌었습니다.
- 0eb970c: `useToast()`가 `ToastProvider`마다 고정된 객체를 돌려줍니다. 지금까지는 토스트가 열리고 닫힐 때마다(토스트 1건에 4번 이상) `useToast()`를 부른 컴포넌트가 다시 렌더되고 반환값도 바뀌어서, 반환값을 effect 의존성에 넣으면 effect가 다시 실행되었습니다. `show()`와 `close()`의 동작은 그대로입니다.
- @umc-product/design-tokens@0.1.1
  - @umc-product/icons@0.1.1

## 0.1.0 (2026-10-12)

### Minor Changes

- fa621e0: 첫 배포입니다.

  - `@umc-product/design-tokens`: 피그마 3기 변수를 옮긴 토큰입니다. 컬러(semantic 152, primitive 78), 텍스트 스타일 48, 그림자 5, spacing 44, radius 17, 그리드와 레이아웃을 CSS 변수, Tailwind v4 유틸리티, vanilla-extract 객체로 냅니다. `tailwind.css`는 Tailwind 기본 팔레트를 지웁니다.
  - `@umc-product/icons`: 아이콘 65종(thin, regular, fill), 픽토그램 11종, UMC 로고입니다.
  - `@umc-product/react`: Base UI 기반 컴포넌트 47종입니다(버튼 2, 폼 입력 11, 선택 10, 표시 9, 오버레이와 피드백 6, 앱 셸 9).

### Patch Changes

- Updated dependencies [fa621e0]
  - @umc-product/design-tokens@0.1.0
  - @umc-product/icons@0.1.0
