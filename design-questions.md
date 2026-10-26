# 디자인 팀 확인 목록

- 독자: 3기 디자인 팀, 웹 파트
- 소유자: UMC PRODUCT Design Chapter
- 기준일: 2026-10-24

문서 사이트에는 싣지 않는 작업 목록입니다.

피그마를 코드로 옮기다가 값이나 규칙을 정할 수 없었던 곳을 모았습니다. 항목마다 지금 코드가 쓰는 값을 적었으니, 답을 주시면 해당 코드를 고치고 이 목록에서 지웁니다. 토큰과 아이콘은 생성 리포트에 전체 목록이 있어 요약만 둡니다.

## 공통

1. 3기 변수가 아닌 2기 변수와 연결 안 된 값이 남아 있습니다. 이름이 같은 단계의 3기 토큰이 있으면 그 토큰으로 바꿨고(`teal-gray-200`→`--umc-color-border-neutral-weak-200`, `teal-gray-400`→`--umc-color-text-placeholder`, `teal-gray-900`→`--umc-color-text-neutral-default-900`, `warmgray-150`→`--umc-color-border-neutral-weaker-100`, `warmgray-600`→`--umc-color-text-neutral-medium-600`), 없으면 피그마 값을 컴포넌트 변수에 그대로 담았습니다(`#0b6b64`, `#fed7d7`, `#e2e4e3`, `#f4fbfa99`, `#fef2f199`). 이 대응이 맞는지, 남은 값을 어떤 3기 변수로 연결할지 알려 주세요.
2. 이름은 같은데 정의가 다른 스타일이 있습니다. 코드는 이름이 같으면 파운데이션 정의(토큰)를 따릅니다.
   - `Shadow/Inner/Neutral_1`: 파운데이션은 청록 2겹인데, Side Navigation hover와 Segmented Control hover는 같은 이름으로 `#D3D8D833` 1겹(1, 1, 2)을 씁니다. 코드는 토큰 정의를 씁니다.
   - 같은 `#D3D8D833` 1겹이 이름 없이 붙은 곳도 있습니다(Context Switcher 눌림, Dropdown/Item Active). 이름이 없어 피그마 값을 컴포넌트 변수로 썼습니다. 어느 스타일에 연결할지 알려 주세요.
   - `Shadow/Inner/Neutral_2`: Segmented Control 컨테이너만 `#E4E4E433`(-1, 2.5, 4)입니다.
3. 스타일 이름과 실제 값이 다른 곳이 있습니다. Code Input 칸 `Heading/4-Semibold`가 26px, Numeric Stepper `Label/1-Semibold`가 16px입니다. Numeric Stepper는 값이 같은 다른 토큰을 쓰고, Code Input은 피그마 값을 씁니다.
   - 2026-10-16에 Toast 본문은 `Label/3-Medium`(16px, 자간 -3%)으로 바뀌어 코드도 토큰을 씁니다. 그런데 Toast의 텍스트 버튼(2621:33510)은 아직 2기 `Label/1-Medium`(16px, 자간 -2%)입니다. 코드는 텍스트 버튼만 피그마 값(-2%)을 씁니다. 텍스트 버튼도 `Label/3-Medium`으로 바꿀지 알려 주세요.
4. (일부 해결 2026-10-24) 도움말은 `Caption/2-Regular`(13px, 행간 145%)로 바뀌어 코드도 토큰을 씁니다. 3기 파운데이션에 없는 `Mobile Web/*` 텍스트 스타일은 Text Field 레이블(15px/23px, -3%)과 단위(18px/24px, -3%)에 아직 남아 있습니다. 3기 스타일로 바꿀지 알려 주세요. 지금은 피그마 값을 그대로 씁니다.
5. 16px 아이콘 세트는 따로 없고, 최근 컴포넌트는 24px 아이콘을 줄여 씁니다(`Icon/Expand_more`·`Icon/Add`·`Icon/Subtraction`은 Fill, `Icon/Info`는 Regular). 코드도 같은 아이콘과 굵기를 따릅니다. 원본 컴포넌트가 파일에서 지워진 인스턴스 세 개는 피그마 그림을 그대로 그렸습니다. 라이브러리 아이콘으로 바꿀지, 바꾼다면 어떤 굵기로 바꿀지 알려 주세요.
   - Dropdown/Item 선택 체크: `16 icon`
   - Context Switcher 체크와 화살표: `icon/Check/16 icon/Regular`, `icon/Expand_more/16 icon/Regular`
6. Hover와 Focus 상태가 없는 컴포넌트가 많습니다. 포커스 표시는 2px `border-primary-strong-500` 외곽선으로 통일했습니다.
7. 나타나고 사라지는 움직임 정의가 없습니다. 150ms 투명도 전환을 기본으로 넣었고, 움직임 줄이기 설정에서는 끕니다.
8. 노션 명명 규칙과 다른 이름이 있습니다: `Pressed(Hover)`, `Focused & Hover`, Tooltip의 `Appearance`, Option Button의 `Direction`, 오타 `Disalbed`, `Defalut`, `Numberic`, `Varient`, `Meue`, `Sub Meue`, `.primitve`(Menu 항목), `Eye_visable`, `Solt`, `Waring`(Web/Dialog Action Button Area), `Pannel`(Web/Panel 섹션), `Positon`(Web/Panel 예시 프레임). Web/Dialog의 상태 속성 이름은 `State 이거 변경 필요`입니다.
9. 파비콘 에셋이 없습니다. 문서 사이트는 `Logo/UMC`의 U 글자 모양과 색(`#3F4141`)을 그대로 떼어 임시로 씁니다. 정사각형 파비콘이나 앱 아이콘을 주시면 바꾸겠습니다.

## 토큰

변수 이름, codeSyntax 중복, 그림자와 텍스트 스타일의 중복 정의 등 16개 항목은 [피그마 정규화 리포트](packages/design-tokens/reports/figma-normalization.md)의 "디자인 팀 확인 요청"에 있습니다.

가장 먼저 부탁드리는 것은 codeSyntax(WEB) 정리입니다. Dev Mode 코드 패널과 피그마 MCP가 보여 주는 `var(--color-…)`는 코드의 CSS 변수(`--umc-color-…`)와 다른 이름이고, 변수 여러 개가 같은 이름을 나눠 씁니다. 리포트의 "이름 대응표와 codeSyntax 제안"에 변수마다 넣을 값(`var(--umc-color-fill-neutral-weak-75)` 등)을 적어 두었습니다.

2026-10-08에 `Label/3-Medium` 자간이 -3%로 바뀐 것을 반영했습니다. 같은 날 `Color` 컬렉션을 Export modes로 다시 받아 바뀐 이름 38개를 코드 이름에 맞췄습니다. `Fill/Neutral/Stronger-300`과 `Stronger-Hover(Pressed)`는 새로 넣었고, 빠진 `Surface/Disabled`는 토큰에서도 뺐습니다(코드에서 쓰는 곳 없음). 값이 바뀐 변수는 없습니다. `Token` 컬렉션은 이전 스냅샷과 같습니다.

2026-10-24에 캡션 스타일 번호가 한 칸씩 밀린 것을 반영해 코드 토큰 이름도 피그마를 따라 바꿨습니다. 14px `Caption/1-Regular`가 새로 생겼고, 13px·12px·11px 스타일은 `Caption/2`·`Caption/3`·`Caption/4`가 되었습니다. `Caption/1-Regular`는 타이포그래피 문서 프레임에 아직 없어 `Help Text`에서 읽었습니다. 문서 프레임 표의 이름표도 예전 번호인 Caption 1·2·3 그대로입니다.

상태 글자색 세 개가 작은 글자의 대비 기준(WCAG AA 4.5:1)에 못 미칩니다.

- `--umc-color-text-warning`(`#ed8002`): 흰 배경 2.73:1, `yellow-100` 배경 2.41:1
- `--umc-color-text-error`(`#dc3d3d`): 흰 배경 4.40:1, `red-100` 배경 3.73:1
- `--umc-color-text-success`(`#06844c`): `green-100` 배경 4.16:1

Tag와 Number Badge의 Weak 변형, Status Tag, 폼 오류 문구가 이 조합을 씁니다. 코드는 피그마 값을 그대로 따르고, 문서 사이트 안내 상자만 제목을 중립색으로 바꿔 피했습니다. 글자색을 한 단계 진한 값으로 바꿀지 알려 주세요.

## 아이콘

정사각형이 아닌 프레임, 고정된 흰 부분, 토큰에 없는 픽토그램 색 등 12개 항목은 [아이콘 정규화 리포트](packages/icons/reports/icon-normalization.md)에 있습니다.

2026-10-10에 고쳐 주신 내용을 반영했습니다. `Icon/warning` Fill 프레임이 24×24가 되어 비율 보정을 뺐고, 새 `Icon/warning-Triangle`(Thin, Regular, Fill)은 `WarningTriangleIcon`으로 더했습니다. Search 변형 이름이 `Weight=Regular`로 바로잡혀 코드의 변형 이름 보정 규칙을 지웠습니다. `_`로 나눴던 이름 5개(`Icon/warning`, `Icon/Location` 등)도 `/`로 바뀌어 원문 이름을 맞췄고, 코드의 컴포넌트 이름은 그대로입니다. 새 `Pictogram/Check`는 `CheckPictogram`으로 더했습니다. 같은 날 아이콘 전체를 다시 받아 대조했는데, `Icon/Checkbox`의 Thin과 Regular 그림이 서로 바뀌어 있어 코드는 섹션 설명(Thin 1.2px, Regular 1.6px)대로 두었습니다.

2026-10-15에 고쳐 주신 내용을 반영했습니다. `Icon/Reset` 세 굵기를 시계 반대 방향 그림으로 바꿨고, `Icon/Location` Fill 프레임이 24×24가 되어 비율 보정을 뺐습니다. 아직 24×24가 아닌 프레임은 Bold, Italic, Strikethrough, Underline, Time의 Fill과 ThumbsUp 전체(23.85×25), Link 전체(24×25), Person Regular와 Fill(22×24)입니다. 같은 방식으로 맞춰 주시면 코드의 보정 규칙을 지우겠습니다.

2026-10-24에 새로 생긴 `Logo`의 `Type=도형 마크`를 `UmcSymbolLogo`로 더했습니다. 원래 로고도 같은 세트의 `Type=워터마크`가 되어 원문 이름을 맞췄고, 그림과 코드의 `UmcLogo`는 그대로입니다. 겹친 색은 리포트의 12번에 적었습니다. 도형 마크를 어디에 쓰는지(예: 푸터, `UmcLogoLockup`)는 정의가 없어 아이콘 패키지에만 넣었으니 쓰임을 알려 주세요.

## Button

노드 2621:33584. 코드가 쓰는 값은 [Button figma-spec](packages/react/src/button/figma-spec.json)에 있습니다.

1. Hover가 없어 마우스가 있는 기기에서 Pressed 모양을 함께 씁니다. 같은 모양이어도 되는지 알려 주세요.
2. Primary Fill 아이콘 변형의 색(`#02746c`)이 아이콘 없는 변형과 다릅니다. 코드는 아이콘 없는 변형으로 통일했습니다.
3. (해결 2026-10-10) Neutral Fill Default 배경을 아이콘 유무와 관계없이 `#606262`(`fill-neutral-inverse-strong-600`)로 맞췄습니다. Disabled(`#adadad`)와 구분됩니다.
4. Lg에는 아이콘 변형이 없어 Md와 같은 16px 아이콘, 14px 아이콘 쪽 여백으로 가정했습니다.
5. Xs에서 Neutral Weak Disabled만 글자 16px, White Weak Disabled만 좌우 여백 16px입니다. 파일 실수로 보고 Xs 공통값(15px, 14px)을 썼습니다.
6. 로딩 점 3개의 움직임 정의가 없습니다. 1초 주기 투명도 변화를 넣었습니다.
7. Weak 비활성의 흰색 70% 덧칠이 내보낸 컬렉션 밖의 변수(`Static/White/Opacity-70`)를 참조합니다. 눌림 덧칠 색은 변수에 연결되지 않았습니다.
8. Red Weak 글자색(`red-600`)에 맞는 semantic 토큰이 없어 primitive를 바로 씁니다.
9. Neutral Weak Default 배경은 아이콘 없는 변형이 `#eff0f0`(`action-primary-default`), 아이콘 있는 변형과 아이콘만 있는 변형이 `#f7f8f8`(`TealGrey-75`)입니다. 코드는 아이콘 없는 변형 값(`fill-neutral-medium-100`)으로 통일했습니다. Neutral Fill처럼 하나로 맞춰 주세요.
10. (해결 2026-10-20) 아이콘만 있는 버튼은 Sm 40×40, XS 36×36으로 정사각형인데 Md만 54×48입니다. 의도한 크기로 확인했고 코드도 54×48입니다.
11. 아이콘만 있는 변형에도 `Icon Position=Right`가 붙어 있습니다. 코드는 이 값을 쓰지 않습니다. 문서 라벨의 Weak 아이콘 전용 첫 줄은 Default 줄인데 Pressed로 적혀 있습니다.
12. 아이콘만 있는 변형은 Neutral과 White, Md·Sm·XS, Default·Pressed·Disabled뿐입니다. 코드는 Lg를 받지 않고, Primary·Red와 로딩은 라벨 버튼 규칙으로 그립니다. 필요한 조합을 알려 주세요.
13. White 버튼만 아이콘이 글자(#606262)보다 옅은 #7E7F7F(`icon-subtle`)이고, 다른 색은 아이콘과 글자가 같습니다. 코드는 피그마대로 White 아이콘만 따로 칠합니다.
14. 2026-10-25에 `Color=Primary`가 `Color=Brand`로 바뀌어 코드도 `color="brand"`로 바꿨습니다(깨지는 변경). `Icon Button`의 `Color=Primary`, `Toast`의 `Type=Primary`, `Web/Dialog`의 `Color=Primary`는 그대로라 코드도 `primary`로 남겼습니다. 함께 바꿀지 알려 주세요. (해결 2026-10-25) 셋 모두 Brand로 바꾼다는 답을 받아 코드의 `IconButton`, `Toast`, `Dialog`도 `brand`로 바꿨습니다(깨지는 변경). 피그마 변형 이름은 아직 `Color=Primary`, `Type=Primary`라 변형 스냅샷은 그대로 두고, 바뀌면 맞춥니다. `Radio`의 `Color=Primary`는 답에 없어 그대로입니다(선택 21). Fill 비활성 색도 따라 바꿨습니다(Brand 배경 Teal-300→Teal-200, 글자 Teal-100→Teal-50, Red 배경 Red-300→Red-200, 글자 Red-200→Red-100). Weak 비활성은 그대로입니다.

## Text Button

노드 3573:95925. 코드가 쓰는 값은 [TextButton figma-spec](packages/react/src/text-button/figma-spec.json)에 있습니다.

1. Hover·Pressed에서 글자와 아이콘 색이 다릅니다. Brand는 글자 `#01423d`(teal-800), 아이콘 `#015a54`(teal-700)이고, Neutral은 글자 `#282a2a`, 아이콘 `#3f4141`입니다. 의도인지 알려 주세요. 코드는 피그마대로 따로 칠합니다.
2. Brand 비활성과 아이콘 Hover 색이 semantic이 아닌 primitive(`Teal-300`, `Teal-700`)에 연결되어 있습니다. 글자 비활성은 같은 값의 `text-brand-disabled-300`로 옮겼고, 아이콘은 primitive를 그대로 씁니다.
3. Underline 변형은 Brand 기본을 빼고 글자색이 변수에 연결되어 있지 않습니다. Plain과 값이 같아 같은 토큰을 씁니다.
4. `Type` 하나에 아이콘 자리(Leading Acc, Tailling Acc)와 글자 모양(Plain, Underline)이 섞여 있습니다. 코드는 아이콘 props와 `variant`로 나눴습니다. `Tailling`은 `Trailing`의 오타로 보입니다.

## Icon Button

노드 4626:81117. 코드가 쓰는 값은 [IconButton figma-spec](packages/react/src/icon-button/figma-spec.json)에 있습니다.

1. 비활성 상태가 없어 코드는 투명도 40%로 흐리게 합니다. 비활성 모양을 알려 주세요.
2. Error Fill만 Hover&Pressed 배경이 Default와 같은 #DC3D3D이고, 다른 색은 배경이 바뀝니다. 의도인지 알려 주세요.
3. Focus 상태가 없어 다른 버튼처럼 2px `border-primary-strong-500` 외곽선을 씁니다.
4. Md 모서리 8px은 변수에 연결되어 있지 않습니다(Lg는 `R Button 10`). 코드는 `radius-8`을 씁니다.
5. Primary Weak 아이콘은 Neutral Weak와 같은 #3F4141입니다. 청록 아이콘을 쓰지 않은 것이 의도인지 알려 주세요.
6. 색 이름이 Button은 `Red`, Icon Button은 `Error`입니다. 코드는 피그마대로 `error`를 씁니다.
7. Sm(24px)과 Md(26px)는 터치 화면 권장 크기(44px)보다 작은데, 코드는 누르는 영역을 넓히지 않았습니다. 터치 화면에서 쓸 때의 기준을 알려 주세요.
8. 섹션 설명 "일반 Button 컴포넌트의 Icon Only 버튼보다 작고 CTA 성격이 약한 성격의 버튼이에요"가 Pagination 섹션에도 똑같이 들어가 있습니다.

## Pagination

노드 4649:83804. 코드가 쓰는 값은 [Pagination figma-spec](packages/react/src/pagination/figma-spec.json)에 있습니다.

1. (해결 2026-10-20) 페이지가 4개보다 많을 때의 번호 규칙이 없어 웹 파트에서 4개씩 묶음(1~4, 5~8)으로 정했습니다. 피그마 예시처럼 현재 번호는 묶음 안에서 자리를 옮기고, 화살표는 한 페이지씩 옮기다가 묶음 끝에서 다음 묶음으로 넘어갑니다. 끝 페이지로 바로 가는 말줄임(…)이 필요해지면 그 항목을 그려 주세요.
2. 1페이지뿐일 때와 페이지가 없을 때의 모양이 없습니다. 코드는 1페이지면 번호 하나만 그리고, 0이면 아무것도 그리지 않습니다.
3. `primitive/Pagination Item`은 Arrow-Left, Arrow-Right에도 Selected 상태가 있지만 화살표는 현재 페이지가 될 수 없어 코드는 그리지 않습니다. 어디에 쓰는지 알려 주세요.
4. 번호 글자색 #161919는 3기 토큰에 없는 2기 `teal-gray-900` 값입니다. 코드는 피그마 값을 그대로 씁니다.
5. 번호 칸은 30px 고정에 좌우 여백 8px이라 두 자리 번호면 칸을 넘습니다. 코드는 최소 폭 30px에 좌우 4px을 두어 세 자리 번호부터 칸이 넓어집니다. 폭 규칙을 알려 주세요.
6. Focus 상태가 없어 다른 버튼처럼 2px 외곽선을 씁니다. 화살표로 끝 페이지에 닿으면 그 화살표가 사라지므로 코드는 포커스를 현재 번호로 옮깁니다.
7. 섹션 설명이 Icon Button과 같습니다("일반 Button 컴포넌트의 Icon Only 버튼보다 작고 CTA 성격이 약한 성격의 버튼이에요"). Pagination 설명으로 바꿔 주세요.

## 선택

1. Option Button Xl의 선택하지 않은 글자는 `Title/2-Medium`을 Regular로 바꾼 값(20px, 400)이라 텍스트 스타일이 없습니다.
2. Option Button에 Strong이면서 Disabled인 변형이 없습니다. Button Fill Primary 비활성 색(배경 Teal-300, 글자 Teal-100)으로 가정했습니다.
3. Option Button 체크는 `.primitive/Check-icon`(2026-10-10에 `.primitive/Segmented Control/Check-icon`에서 이름이 바뀜)의 두 크기를 그대로 그립니다. 16px(Sm, Xs)은 선 두께 1.5로 따로 그린 그림이고, 20px(Xl)은 `Icon/Check` Fill인데 선이 살아 있어 20px로 줄여도 두께가 2로 남습니다. 메모에는 "20 없애고 17 넣기"가 있지만 피그마에는 아직 16px과 20px만 있어, 17px 변형이 생기면 Xl 체크를 바꾸겠습니다. 두 크기를 같은 아이콘으로 맞출지, 체크 색(Weak `#008a80`, Strong `#f4fbfa`)이 글자색과 다른 것이 의도인지 알려 주세요.
4. Option Button 문서의 배경 "Teal Gray 150"은 3기 팔레트에 없고, 컴포넌트에는 `#eff0f0`이 칠해져 있습니다.
5. Segmented Control 선택 항목과 Step Navigation 현재 단계의 그림자(`0 1px 2px #63c4b833`, `0 0 10px #9ca3a34d`)가 이름 없는 값입니다. 그림자 스타일로 등록할지 알려 주세요.
6. Step Navigation에서 완료한 단계와 남은 단계의 모양 차이가 없습니다. 완료 표시가 필요한지 알려 주세요. 피그마 번호형 버튼에는 Hover가 있지만, 코드는 누를 수 없는 진행 표시로 만들어 hover를 넣지 않았습니다. 단계를 눌러 이동해야 하는지도 알려 주세요.
7. Tabs 활성 밑줄 색 `#0b6b64`가 2기 변수입니다. 3기 Teal-600(`#02746c`)으로 바꿔도 되는지 알려 주세요.
8. Tabs에 아이콘 탭 + 선택 조합이 없어 `--umc-color-icon-neutral-stronger-700`를 임시로 씁니다.
9. Check Box의 Error 변형 일부가 이름은 `Disabled=True`인데 그림은 활성 오류 상태입니다(`Check Box` 네 개, `Control`의 `Color=Error, Size=Lg, Selected=True`). 코드는 그림을 따랐습니다. 이름을 `Disabled=False`로 고칠 수 있나요?
10. Check Box 비활성은 Lg가 `Color=Brand`, Md가 `Color=Neutral` 이름으로만 있고 모양은 같습니다. 비활성에는 색 구분이 없다고 보고 `disabled`가 색과 오류보다 앞서게 했습니다.
11. Check Box 오류 선택 채움은 `Red-400`(`#ed6464`), 오류 테두리는 `Red-500`(`#dc3d3d`)입니다. 단계가 다른 것이 의도인지 알려 주세요. `Red-400`에 맞는 semantic 토큰이 없어 primitive를 씁니다.
12. (해결 2026-10-24) Check Box 비활성 체크 선을 피그마도 3기 `TealGrey-50`(`#fbfcfc`)으로 바꿨습니다. 코드와 같은 값이고 Md와 Lg 모두 같습니다.
13. 체크 그림이 세 가지입니다. Check Box는 Md 20px(선 1.8)과 Lg 24px(선 2)을 따로 그렸고, Check Button은 옛 16px 체크를 24px로 키운 그림(선 2.4)입니다. 셋 다 라이브러리 `Icon/Check`와 다릅니다. 한 아이콘으로 맞출지 알려 주세요.
14. Check Button에 비활성과 Hover 모양이 없습니다. 지금은 비활성이어도 색이 그대로라 활성과 구분되지 않습니다(커서만 바뀜). 비활성 색을 알려 주세요.
15. Switch 트랙 색 두 개가 변수에 연결되어 있지 않습니다. 꺼짐은 내보낸 값이 `#e2e4e3`이고 켜짐은 `#39a9a1`입니다. 코드는 꺼짐에 가장 가까운 `fill-neutral-strong-200`(`#e2e3e3`), 켜짐에 값이 같은 `fill-primary-inverse-weak-400`(`#39a9a1`)을 씁니다.
16. Switch Sm 켜짐에만 안쪽 그림자(`#D3D8D833`, 0.8 0.8 1.6)가 있습니다. Md에도 필요한지, `Shadow/Inner/Neutral_1`을 줄인 것이라면 이름 있는 그림자로 연결할지 알려 주세요.
17. 라벨 스타일이 컨트롤마다 다릅니다. Check Box는 `Label`(굵기 500, `#282a2a`), Switch는 `Body`(굵기 400, `#0f1010`)입니다. 같은 폼에 함께 놓일 때도 다르게 보이는 것이 의도인지 알려 주세요.
18. Radio의 `Color=Primary, Selected=False`(틸 테두리)를 언제 쓰는지 알려 주세요. Hover인지 강조인지에 따라 코드가 달라집니다. Neutral 선택 변형이 없어, 선택하면 색과 관계없이 Primary 선택 모양을 씁니다.
19. Radio 테두리는 `Teal-400`, Check Box Brand 테두리는 `Teal-300`(`border-primary-medium-300`)입니다. 단계가 다른 것이 의도인지 알려 주세요.
20. 라벨이 붙은 Radio 본체와 목록 간격은 "Form 형태와 함께 제작 예정"이라 컨트롤만 만들었습니다. 그룹은 임시로 세로 목록, 간격 8px입니다.
21. 같은 틸 강조를 컴포넌트마다 `Color=Brand`(Check Box, Text Button)와 `Color=Primary`(Radio, Button)로 다르게 부릅니다. 코드는 피그마 이름대로 `brand`와 `primary`를 씁니다. 하나로 맞출지 알려 주세요.
22. Chip에 비활성과 포커스 모양이 없습니다. 코드는 다른 컴포넌트처럼 비활성 토큰과 2px `border-primary-strong-500` 외곽선을 씁니다.
23. Chip 아이콘 없는 변형만 폭이 52px로 고정되어 있습니다. 코드는 글자 길이를 따릅니다.
24. Chip 아이콘 색에 2기 `WarmGray-700`이 남아 있습니다. 코드는 3기 `icon-neutral-strong-600`을 씁니다.
25. Chip/Draggable은 토큰에 없는 `Subtitle/2-Medium`(18px, 줄 높이 1.5, 자간 -1%)과 이름 없는 여백 9px, 간격 3px을 씁니다. 코드는 피그마 값을 컴포넌트 변수로 옮겼습니다.
26. (해결 2026-10-13) Segmented Control의 선택하지 않은 항목과 Hover 글자색을 TealGray-800(`text-neutral-strong-800`, `#282a2a`)으로 바꿨습니다. 완성형 Segmented Control도 같은 항목을 쓰므로 함께 바뀝니다. 피그마 수정이 저장되지 않아 `Web/ Segmented Control / Button`(2281:6404)과 완성형은 아직 `#02746c`입니다. 피그마에도 다시 반영해 주세요.

## 표시

2026-10-10에 새로 올라온 Tag 계열과 Bubble을 옮기면서 찾은 내용입니다.

1. Tag/Basic Md 글자가 2기 `Label/2-Medium`(14px, 줄 높이 1.45)입니다. 3기의 같은 이름은 17px이라 코드는 피그마 값을 컴포넌트 변수로 씁니다.
2. Tag/Basic 반지름이 변수에 연결되지 않았고, Neutral 글자가 primitive에 바로 연결되어 있습니다.
3. Tag/Number Neutral Tertiary 글자가 2기 `teal-gray-600`(`#656b6b`)이고, 반지름 4px에 맞는 토큰이 없습니다. 둘 다 피그마 값을 컴포넌트 변수로 씁니다.
4. Tag/Status 색 이름(Default, Neutral, Yellow, Red)이 Tag/Basic(Brand, Neutral, Warning, Error)과 다릅니다. 코드는 `brand`, `neutral`, `warning`, `error`로 맞췄습니다. 2026-10-24에 생긴 Green은 `success`로 옮겼습니다.
5. Tag/Part의 PM, Sm, Outlined 변형 이름이 `Part=Tag, Size=Part, Style=PM`으로 깨져 있습니다(3385:25514). 문서는 이 변형을 PM, Sm, Outlined 칸에 그립니다.
6. Tag/Part Design Lg Outlined 테두리가 태그 변수 대신 `Pink-100`에 연결되어 있습니다. 값은 같아서 코드는 태그 변수를 씁니다.
7. Tag/Part와 Tag/Role의 `Shadow/Drop/Neutral_2`가 `#EFF0F080`으로 정의되어 파운데이션 토큰(`#eceeee85`)과 다릅니다. 이름 있는 스타일은 토큰을 따르는 규칙대로 토큰을 씁니다.
8. Tag/Role Product 글자색이 피그마 변수 `tag-role-product-text`에서 `#3f4141`인데, 2026-10-08에 받은 토큰은 `#282a2a`입니다. 변수가 바뀌었다면 Export modes를 다시 받아 토큰부터 고치겠습니다. 지금은 피그마 값을 컴포넌트 변수로 씁니다.
9. Tag/Role 라벨에 `⚙ Product`처럼 기호가 붙은 역할이 있습니다. 코드는 라벨을 앱이 넘기게 했습니다. 기호도 라벨의 일부로 쓰는지 알려 주세요.
10. Bubble Incoming은 흰 말풍선에 경계가 없어 흰 화면 위에서는 보이지 않습니다. 말풍선을 놓을 배경색을 알려 주세요.
11. Progress Bar Neutral 표시 막대가 `Component/Progress Bar/Indicator/Fill`(`#6b7684`) 변수를 씁니다. 이 Component 컬렉션은 받은 Export modes에 없어 코드는 피그마 값을 컴포넌트 변수로 씁니다.
12. Skeleton 색 `#e9ecec`이 변수에 연결되어 있지 않고 3기 팔레트에도 없습니다(`TealGrey-100` `#eff0f0`과 `TealGrey-200` `#e2e3e3` 사이). 반지름 4px에 맞는 토큰도 없어 둘 다 피그마 값을 컴포넌트 변수로 씁니다. 어느 변수로 연결할지 알려 주세요.
13. Skeleton 움직임 정의가 없습니다. 1.5초 주기로 투명도가 1과 0.5 사이를 오가는 깜빡임을 넣었고, 움직임 줄이기 설정에서는 끕니다. 원하는 움직임(깜빡임, 빛이 지나가는 모양, 움직임 없음)을 알려 주세요.
14. 2026-10-17에 새로 올라온 Divider의 가로 얇은 선(`Type=Line`)은 0.5px이고, 세로선(`Divider_Vertical`)은 1px입니다. 0.5px은 일반 해상도 화면에서 1px로 그려지거나 흐리게 보일 수 있습니다. 두 선의 두께를 맞출지 알려 주세요.
15. Divider `Type=Solid`는 `#eff0f0`에 레이어 투명도 30%를 줘서 그립니다. 코드도 같은 색에 투명도를 씁니다. 이름 있는 색으로 연결할지 알려 주세요.
16. Guidance Message는 Error와 Yellow에도 체크 아이콘(`Icon/Check` Fill)을 씁니다. 오류나 경고에도 체크 표시가 맞는지, `Icon/warning` 같은 다른 아이콘을 쓸지 알려 주세요.
17. Guidance Message `Type=Yellow`는 주황 경고 색(`#ed8002`)입니다. 코드는 다른 컴포넌트처럼 `color="warning"`으로 부릅니다. 이름을 Warning으로 맞출지 알려 주세요.
18. Image Thumbnail의 배경(`#e9ecec`)과 Fallback 로고 색(`#d3d8d8`)은 3기 변수에 없는 값입니다. 배경은 Skeleton과 같은 값이니 같은 이름 있는 색으로 연결할지 알려 주세요.
19. Image Thumbnail은 50px만 있고, 설명에 "다른 사이즈는 Scale 변경"이라고 되어 있습니다. 그래서 코드는 크기를 바꾸면 모서리(8px)와 로고(34px)도 같은 비율로 키웁니다. 큰 크기에서도 모서리를 8px로 둘지 알려 주세요.
20. Progress Summary 채움 막대는 그라데이션을 PNG 이미지로 칠했습니다. 코드는 이미지의 다섯 지점(0, 25, 50, 75, 100%)에서 투명도(100, 97, 87, 72, 50%)를 읽어 CSS 그라데이션으로 옮겼습니다. 이미지 색 `#0e8179`는 컴포넌트에 연결된 변수 `--color-teal-500`의 값인데, 3기 Teal-500은 `#008a80`이라 코드는 피그마 값을 컴포넌트 변수로 둡니다. 3기 Teal-500으로 바꿀지, 막대를 그라데이션 채움으로 다시 그려 주실 수 있는지 알려 주세요.
21. Progress Summary 퍼센트 글자에 붙은 스타일 이름은 `Label/1-Semibold`인데, 값(16px, 줄 높이 1.4, 자간 -2%)은 3기 `Label/3-Semibold`와 같습니다. 3기 `Label/1-Semibold`는 18px입니다. 코드는 값을 따라 `Label/3-Semibold`를 씁니다. 윗줄과 막대 사이 간격 5px은 이름 없는 값이라 컴포넌트 변수로 둡니다.
22. Progress Summary 변형 속성 이름이 기본값 `Property 1`이고, 막대 자리가 Slot입니다. 코드는 개수를 받아 막대를 직접 그립니다. 막대 말고 다른 내용을 넣는 화면이 있는지 알려 주세요.
23. Progress Summary 퍼센트 규칙은 코드에서 정했습니다. 반올림하되 끝나지 않았으면 99%에서 멈추고, 하나라도 마쳤으면 1%부터 보여 줍니다. 피그마 예시는 `(16/42)` 옆에 32%를 적었는데, 코드는 개수로 계산한 38%를 씁니다. 긴 라벨은 말줄임표로 자르고 퍼센트와 최소 8px을 띄웠습니다(피그마에는 규칙 없음). 다른 규칙을 원하면 알려 주세요.

## 오버레이와 피드백

1. Tooltip 라벨 색이 2기 `teal-600`(`#0b6b64`)입니다. 3기 Teal-600은 `#02746c`입니다.
2. Tooltip 라벨은 Light Md에만 있습니다. Dark나 다른 크기에서도 쓸 수 있는지 알려 주세요.
3. Tooltip Md의 최대 폭이 없어 240px로 가정했습니다. 트리거와의 간격은 8px로 두었습니다.
4. Toast Error 배경이 2기 `error-200`(`#fed7d7`)이고, Neutral 배경 `rgba(63, 65, 65, 0.8)`은 이름 없는 값입니다.
5. Toast 앞 아이콘의 체크 색이 `#fbfcfc`인데 아이콘 패키지는 흰색으로 고정합니다.
6. Toast Service Notice 타입의 양옆 그래픽 에셋은 컴포넌트에 넣지 않았습니다. 에셋과 사용처를 알려 주세요.
7. `Toast Top` 변형은 닫기 버튼 없이 내용 폭이라 코드도 상단 토스트를 그렇게 그립니다. 그런데 `Toast Top`의 설명은 하단 설명과 같습니다(하단 96px, X로 닫기). 상단 토스트에도 닫기 버튼이 필요한지 알려 주세요. 하단 위치는 캔버스 메모(아래 여백 40px, 48px 토스트의 윗변 -88px)대로 바꿨습니다(2026-10-10). `Toast Bottom` 설명에는 아직 -86px로 적혀 있어 고쳐 주세요.
8. Error 토스트와 입력 필드(CodeField 포함) 오류의 흔들림은 주석만 있어 400ms 동안 6px씩 두 번 흔들리게 가정했습니다.
9. Scroll Fog는 아래쪽(74px)만 있어 다른 세 방향은 같은 값을 돌려 썼고, 끝 색을 흰 배경으로 가정했습니다. 회색 배경용 안개가 필요한지 알려 주세요.

## 웹 오버레이

2026-10-15에 새로 올라온 Web/Dialog와 Web/Panel을 옮기면서 찾은 내용입니다.

1. Web/Dialog의 `Warning` 상태는 빨간 에러 색입니다(제목 `#dc3d3d`, 확인 버튼 Weak Red). 코드는 주황 경고와 헷갈리지 않게 `color="error"`로 부릅니다. 주황 경고 다이얼로그가 따로 필요한지 알려 주세요.
2. Action Button Area의 `Neutral` 타입(확인 버튼 Fill Neutral)은 Web/Dialog 변형에 쓰인 곳이 없습니다. 코드는 `color="neutral"`로 열어 두었습니다. 어느 화면에 쓰는지 알려 주세요.
3. Fill 버튼 영역은 Button Xs(36px)를 40px 높이로 늘려 씁니다. 코드도 Xs의 글자와 여백에 높이만 40px로 둡니다. Button에 40px 크기를 따로 둘지 알려 주세요.
4. Weak 텍스트 버튼은 hover 모양이 없습니다. 기본 색은 Text Button hover를, 에러 색은 `Red-700`(`#c21f14`)을 hover에 가정했습니다.
5. Slot Content 변형만 글과 버튼 사이 간격(32→24px), 글 사이 간격(12→10px), 제목(Title/2 20px→Title/1 22px)이 다릅니다. 코드는 콘텐츠를 넘기면 이 값으로 바꿉니다. 콘텐츠가 있으면 늘 이렇게 바뀌는 규칙인지 알려 주세요.
6. Slot Content에 Weak 버튼을 둔 변형은 버튼 줄 높이가 68px로, 다른 Weak 변형의 40px과 다릅니다. 코드는 모든 Weak 버튼 줄을 40px로 둡니다.
7. Web/Dialog와 Web/Panel의 `Shadow/Drop/Neutral_2`도 `#EFF0F080`으로 정의되어 파운데이션 토큰(`#eceeee85`)과 다릅니다(표시 7과 같음). 코드는 토큰을 씁니다.
8. (해결 2026-10-24) Web/Panel 머리에 Head Slot이 생기고 기본 내용이 닫기 아이콘 버튼이라 코드도 `headSlot`과 `PanelCloseButton`을 더했습니다. Esc와 바깥 누르기로 닫히는 동작은 그대로입니다.
9. Control Slot은 컴포넌트에서 높이 64px 고정인데, 예시 인스턴스에서는 내용에 맞춰 42px과 74px로 바뀝니다. 코드는 위 여백 20px에 내용 높이를 따릅니다.
10. 560px 예시 인스턴스(4152:74197)는 아래쪽 영역만 560px로 늘고, 제목과 본문 영역은 512px에 머물러 있습니다. 코드는 폭을 바꾸면 모든 영역이 함께 늘어납니다.
11. 버튼 영역의 좌우 여백은 16px(2026-10-25 전에는 20px)이고 본문과 Control Slot은 32px이라, 버튼이 본문보다 양쪽으로 16px씩 넓습니다. 의도한 정렬인지 알려 주세요.
12. Web/Panel 예시의 왼쪽 지부 목록(`Side Meue`)은 라이브러리 컴포넌트가 아니고 2기 색(`#e5f5f2`, `#0b6b64`, `#656b6b`)을 씁니다. 문서 예시는 3기 토큰으로 비슷하게 그렸습니다. 컴포넌트로 만들 계획인지 알려 주세요.
13. Head Slot을 끈 예시가 없습니다. 슬롯을 끄면 제목 오른쪽 여백이 제목 칸 여백 16px만 남는지 지금처럼 32px인지 알려 주세요. 코드는 `headSlot`을 넘기지 않으면 32px을 유지합니다.
14. 2026-10-25에 `Button Area` 다섯 변형의 여백이 위 32px·아래 0·좌우 20px(PrimaryTop은 위 16px·아래 4px)에서 모두 위 16px·아래 10px·좌우 16px로 바뀌었고, Web/Panel 안의 Button Area는 아래 여백 0에 Panel 아래 여백 20px(전 24px)을 둡니다. 코드는 `BottomSheetActions` 기본값을 컴포넌트대로 두고, Panel 안에서는 좌우 16px·아래 0으로 맞췄습니다.

## 모바일 앱 컴포넌트

2026-10-11에 `App/` 컴포넌트를 웹 모바일 레이아웃용으로 옮기면서 찾은 내용입니다.

1. App/Top Navigation Sub 페이지의 왼쪽 아이콘이 `Icon/Expand_more`(아래 화살표)입니다. 뒤로 가기라면 `Icon/Chevron_Left`가 맞는지, 아래로 내려 닫는 화면의 닫기인지 알려 주세요. 코드는 피그마대로 아래 화살표를 그리고 이름은 "뒤로 가기"로 둡니다.
2. App/Dialog와 App/Bottom Sheet 제목 색이 `grey950`(`#0d121c`)입니다. 3기 토큰에 없는 색이라 컴포넌트 변수로 씁니다.
3. App/Bottom navigation과 App/Bottom Sheet의 iOS, Android 차이는 홈 인디케이터 영역입니다. 웹에서는 운영체제가 주는 안전 영역(`safe-area-inset-bottom`)으로 처리하고 인디케이터는 그리지 않습니다.
4. 2026-10-15에 App/Bottom navigation의 iOS 변형이 Apple `Tab Bar - iPhone`(리퀴드 글래스) 인스턴스로 바뀌었습니다. iOS 앱은 시스템 탭 바를 쓰는 것으로 보고, 문서의 iOS 칸은 미구현으로 두고 Android 칸만 그립니다. iPhone 브라우저로 여는 모바일 웹 화면에서는 이 컴포넌트를 써도 되는지 알려 주세요.
5. 2026-10-17에 App/Dialog Confirm 타입의 확인 버튼에 좌우 8px, 상하 4px 여백을 더했습니다. 피그마 `area` 프레임(3928:63088)은 높이가 44px 고정이라 버튼 영역(62px)의 위아래 여백으로 7px씩 넘칩니다. 코드는 요청한 여백대로 버튼 높이를 30px로 두었고, 버튼 영역 높이 62px은 피그마와 같습니다. 눌리는 영역을 44px로 키워야 하면 알려 주세요.
6. 2026-10-25에 `Button Area` 컴포넌트 여백이 위 16px·아래 10px·좌우 16px로 바뀌었는데, App/Bottom Sheet 안의 Button Area 인스턴스는 Keyboard=Off(2536:12118, 3253:48866)가 위 16px·아래 0·좌우 20px, Keyboard=On(2536:12135)이 위 16px·아래 10px·좌우 20px에 시트 아래 8px입니다. 코드는 시트 안에서 좌우 20px·아래 0을 쓰고(아래는 안전 영역이 대신함) 키보드 상태는 나누지 않습니다. 시트 안 좌우 20px이 의도인지(컴포넌트는 16px), 키보드가 올라왔을 때 아래 18px이 필요한지 알려 주세요.

## 앱 셸

1. Header 다크 모드 hover 글자색 `#02746c`는 어두운 배경 위에서 대비가 낮습니다. 랜딩 배경 이미지 위에서 읽히는지 확인해 주세요.
2. Header 다크 모드 선택 항목은 1px 테두리와 좌우 16px입니다. 선택이 바뀔 때 폭이 흔들리지 않도록 코드는 18px 패딩과 inset 그림자를 씁니다.
3. Header의 `Profile`(원형 아바타)은 기본 아바타 이미지가 정해지지 않아 아직 컴포넌트로 만들지 않았습니다. 기본 이미지를 패키지에 넣을지 알려 주세요. `Action Button`은 `HeaderActionButton`, `Home Link`는 `HeaderHomeLink`로 만들었습니다. 2026-10-12에 기수 선택을 프로필 드롭다운으로 옮긴다고 들었습니다. 문서 예시에서는 사이드 내비게이션 슬롯의 기수 전환을 뺐습니다. 드롭다운을 만들려면 펼친 목록의 항목, 열림 모양, 기본 아바타 디자인이 필요합니다.
4. Side Navigation 그룹은 피그마 설명대로라면 누르면 첫 하위 페이지로 이동합니다. 코드는 펼침과 접힘만 맡습니다. 접으려고 누를 때도 페이지가 바뀌는 문제 때문입니다. 이동이 꼭 필요한지 알려 주세요.
5. Side Navigation 그룹에 펼침 여부를 알리는 표시(화살표 등)가 없습니다. 그대로 둘지 알려 주세요. 하위 메뉴의 hover 상태도 없습니다.
6. Side Navigation 오른쪽 경계선이 `Type=Default`는 `#e9ecec`, `Type=With Slot`은 `#e2e3e3`입니다. `#e2e3e3`으로 통일했습니다.
7. Context Switcher 목록에는 바깥 그림자가 없어 흰 페이지 위에서 경계가 거의 보이지 않습니다. 일반 `Dropdown_List`는 `Shadow/Drop/Neutral_1`을 씁니다. 같은 그림자를 써도 되는지 알려 주세요.
8. Context Switcher는 172px인데 Side Navigation 슬롯 안쪽 폭은 168px입니다. 코드는 슬롯 안에서 168px로 줄입니다.
9. Page Header 브레드크럼 구분자 색 `#cccccc`가 변수에 연결되어 있지 않고, 마지막(현재) 항목도 같은 색입니다. hover하면 굵기가 바뀌어 글자 폭이 조금 늘어납니다.
10. 라벨 있는 Home Link(Operation, Study, ProductTech)에 "가제" 주석이 있습니다. 맥락 이름과 `11th` 같은 기수 표기가 확정되면 알려 주세요. 코드는 기수를 영어 서수(1st, 2nd, 3rd, 11th)로 만듭니다.
11. 라벨 있는 Home Link의 로고는 `Logo/UMC` 인스턴스가 아닙니다. 떼어 낸 그림을 73.76×21.93으로 줄였고, 라이브러리 로고는 74×22입니다. 코드는 피그마 크기를 따랐습니다. 인스턴스로 바꿀지 알려 주세요.
12. Home Link 라벨의 Orbitron Bold와 글자 크기 13.487px, 11.689px은 텍스트 스타일에도 변수에도 없습니다. 로고와 함께 비율로 줄인 값으로 보고 그대로 옮겼습니다. Orbitron을 브랜드 글꼴 토큰으로 등록할지 알려 주세요.
13. Home Link 색 변수의 codeSyntax `--color-action-primary-default` 하나가 `#3f4141`(라이트), `#02746c`(라이트 hover), `#f4fbfa`(다크) 세 값을 가리킵니다. 어느 변수인지 알 수 없어 코드는 값이 같은 `icon-neutral-stronger-700`, `icon-brand-strong-600`, `teal-50`, `teal-200`을 씁니다.
14. `Web/Header/Home Link`의 왼쪽 여백은 Main이 60px, 라벨 있는 맥락이 34px입니다. 라벨 칸 200px 안에서 내용을 가운데 두므로 로고 시작 위치가 맥락마다 다릅니다(헤더 왼쪽에서 Main 76px, Operation 51.5px, Study 68.5px, Product Tech 57.8px). 맥락이 바뀌어도 로고 위치가 같아야 하는지 알려 주세요.
15. 좁은 화면용 Header가 없습니다. 라벨 있는 홈 링크는 로고 칸이 250px(여백 34px과 16px, 링크 200px)이라, 375px 화면에서 액션 버튼과 함께 두면 가로로 넘칩니다. 모바일 헤더 규칙과 브레이크포인트를 알려 주세요.
16. Section Header Md의 제목(`Title/3-Semibold`, 18px)과 Sm의 설명(`Body/4-Regular`, 13px)은 2026-10-08에 받은 3기 텍스트 스타일에 없습니다. 코드는 피그마 값을 컴포넌트 변수로 둡니다. Export modes를 다시 주시면 토큰으로 바꾸겠습니다.
17. Section Header Sm은 번호가 18px, 제목이 16px로 크기가 다릅니다. Lg와 Md는 번호와 제목이 같은 크기입니다. 의도한 것인지 알려 주세요.
18. Section Header 필수 별표 색이 `--color-text-link`(`#dc3d3d`)에 연결되어 있습니다. 이름은 링크인데 값은 빨강이라, 코드는 같은 값의 `text-error`를 씁니다.
19. Section Header의 Caption Slot은 200px 고정 칸이고 번호는 늘 보입니다. 코드는 슬롯을 내용 폭으로 두고, 번호를 넘기지 않으면 번호 칸을 그리지 않습니다. 번호 없이 쓰는 화면이 있는지, 슬롯에 시간 표기 말고 무엇을 넣는지 알려 주세요.

## 폼

1. Input Box 비활성 테두리가 `Input Box`는 `#efedeb`, `Text Field/ Box`는 `#eff0f0`입니다. `#eff0f0`으로 통일했습니다.
2. Lg 기본 상태의 placeholder만 16px이고 다른 상태는 18px입니다. 상태가 바뀔 때 크기가 튀지 않도록 18px로 맞췄습니다.
3. Md 비밀번호와 Md Select의 오른쪽 패딩이 4px로 다른 Md 필드(8px)와 다릅니다. Text Field는 8px로 맞췄고 Select는 피그마대로 4px입니다.
4. Text Field Label의 `Caption=True`(레이블 옆 회색 보조 문구)는 아직 넣지 않았습니다. 쓰임새를 알려 주세요.
5. 지우기 아이콘 색 `#e2e4e3`이 3기 토큰에 없습니다(`#e2e3e3`과 1단계 차이).
6. Select 목록이 열린 상태가 따로 없어 hover 배경(`#fbfcfc`)을 유지하고 화살표를 180도 돌립니다.
7. Dropdown에 위험한 동작(삭제) 항목 스타일과 아이콘 자리가 없습니다. Menu의 `tone`, `icon`은 확인 전까지 뺐습니다. 2026-10-13 `Meue List` 예시에 빨간 글자 "삭제" 항목이 생겼습니다. 이 모양을 항목 변형으로 만들지 알려 주세요.
8. Code Input의 Hover 설명 "Focus 중, Error 중 Success 중, 디폴트 미포함"의 뜻을 알려 주세요. 지금은 비활성이 아니면 모든 칸에 hover를 적용합니다. Success 상태도 피그마에 없습니다.
9. Numeric Stepper 숫자 칸의 좌우 패딩 20px은 106px 너비 안에 들어가지 않아(34px 칸) 패딩 없이 가운데 정렬했습니다. 기본 범위는 설명대로 0부터 999입니다.
10. Menu 완성형 `Meue List`의 타이틀 글자색이 2기 변수 `Color/Neutrals/WarmGray-400`(`#98938f`)입니다. 3기에 같은 값이 없어 피그마 값을 컴포넌트 변수로 씁니다. 가까운 3기 값은 `TealGrey-400`(`#adadad`)과 `TealGrey-500`(`#7e7f7f`)입니다. 어느 변수로 연결할지 알려 주세요.
11. `Meue List`에는 Sm과 Md만 있고, 항목 `.primitve/Meue Item/Text Only`에는 Xs가 남아 있습니다. 코드 Menu는 `xs`를 유지하고, Xs 목록은 Sm과 같은 모양(최소 폭 100px, 타이틀 좌우 여백 12px)으로 가정했습니다. Xs 목록을 계속 쓸지 알려 주세요.
12. Select 목록도 `Meue List` 모양(여백 4px, 모서리 12px, 테두리 없음, 항목 간격 0)을 따르는지 알려 주세요. 예시의 Select 목록은 아직 `Dropdown_List`(여백 2px, 모서리 8px, 테두리 1px, 항목 간격 2px)라 코드는 Menu만 바꿨습니다.
13. 2026-10-17에 새로 올라온 `Text Area`(장문형)를 `TextArea`로 옮기고, 기존 `Text Field/ Input Box`의 `Type=Text Area`(단문형)는 `TextFieldArea`로 이름을 바꿨습니다. 피그마 이름도 장문형은 `Text Area`, 단문형은 Text Field의 한 타입으로 계속 나뉘어 있으면 좋겠습니다.
14. (해결 2026-10-24) `Text Area`에 `Error=True` 변형이 생겨 코드도 따랐습니다. 오류이면 상태와 관계없이 테두리만 Red-300(`#f88c8c`)이고 배경은 그대로입니다. 전에는 `TextField`처럼 분홍 배경을 깔고 hover와 포커스에서 Red-400으로 진하게 했는데 둘 다 뺐습니다. 비활성이면서 오류일 때도 빨간 테두리가 남습니다.
15. `Text Area`의 hover와 포커스 테두리는 Teal-300(`#7ac7c1`)이고, Input Box는 Teal-500입니다. Input Box의 Typing은 옅은 청록 배경이지만 `Text Area`는 흰색 그대로입니다. 의도한 차이인지 알려 주세요.
16. `Text Area`의 글자 수는 모든 변형에 `0/0`으로 그려져 있습니다. 코드는 최대 글자 수(`maxLength`)를 정한 칸에만 "현재/최대"로 보여 줍니다. 2026-10-19에 Disabled 변형에도 글자 수가 생겨, 비활성 상태에서도 보여 줍니다. 최대 글자 수에 닿았을 때 모양이 따로 필요한지 알려 주세요. (2026-10-25) `Form/Question`의 Read Only에서 글자 수가 빠져, 코드도 `readOnly`이면 글자 수를 숨깁니다.
17. `Text Area` 설명의 `Place Hoder`는 `Placeholder`의 오타입니다.
18. Image Thumbnail Editor의 배경(`#9ca3a3`, Default는 투명도 70%)은 3기 변수에 없는 값입니다. 이름 있는 색으로 연결할지 알려 주세요.
19. Image Thumbnail Editor 안의 간격이 4.8px(아이콘과 문구)과 2.4px(두 문구 사이)입니다. 150px 칸을 0.8배로 줄인 값으로 보입니다. 정수 값으로 맞출지 알려 주세요.
20. Image Thumbnail Editor에는 오류와 비활성 상태가 없습니다. 코드는 형식이나 용량이 맞지 않는 파일을 받지 않고 `onReject`로 앱에 알릴 뿐, 칸 모양은 바꾸지 않습니다. 비활성이면 hover를 끄고 커서만 바꿉니다. 오류와 비활성 모양이 필요한지 알려 주세요.
21. Filled 상태에 이미지를 지우거나 바꾸는 표시가 없습니다. 코드는 칸을 다시 누르면 다른 이미지로 바꾸고, 지우는 동작은 앱에 맡깁니다. 삭제 버튼이나 hover 표시가 필요한지 알려 주세요.
22. Image Thumbnail Editor는 눌러서 고르기만 합니다. 파일을 끌어다 놓아 올리는 동작이 필요한지 알려 주세요.
23. 2026-10-19에 `Text Area`의 최소 높이를 빼면서, Disabled 변형만 입력과 글자 수 사이 간격 4px이 없어 높이가 73px입니다(다른 상태는 77px). 코드는 모든 상태에 4px을 둡니다.
24. `Help Text`에 14px 크기(`Size=14px`)가 생겨 `Field`의 `captionSize="lg"`로 옮겼습니다. 기본값은 13px이고, 14px을 쓰는 화면은 아직 찾지 못했습니다. 어느 입력에서 14px 도움말을 쓰는지 알려 주세요.
25. `Text Info Button` 글자가 12px에서 13px로 커지면서 굵기도 Regular에서 Medium으로 바뀌었습니다. 코드는 피그마대로 Medium을 씁니다. 텍스트 스타일에는 연결되어 있지 않고, 크기·굵기·행간이 같은 `Caption/2-Medium`과는 자간(-2%와 0)만 다릅니다. 굵기가 의도인지, 스타일에 연결할지 알려 주세요.
26. 2026-10-25에 `Text Field/Line`과 `Text Field/Line/Field`가 생겨 `TextFieldLine`, `TextFieldLineField`로 옮겼습니다. 이름을 맞추느라 `Text Field/Box`는 `TextFieldBox`(옛 `TextField`), `Text Field/Box/Field`는 `TextFieldBoxField`(옛 `InputBox`)가 되었습니다(깨지는 변경).
27. `Text Field/Line`의 `Error=True` 변형은 레이블과 Help Text가 Default 색이고, 밑줄만 Focused & Hover와 Typing에서 Red-500입니다. Default, Typed, Disabled의 밑줄은 Error=False와 같은 회색입니다. 코드는 밑줄은 피그마대로 두고 레이블과 도움말은 `Field` 규칙대로 빨갛게 바꿉니다. 오류를 포커스 전에도 밑줄로 보여 줄지 알려 주세요. (2026-10-25) 레이블과 Help Text가 `text/error`(#dc3d3d)로 바뀌어 코드와 같아졌습니다. 밑줄 질문은 남아 있습니다.
28. `Text Field/Line/Field`의 Typed 글자색은 다른 파일 변수(`semantic/text/primary`, rgba(0,12,30,0.8))를 가리키고, Password의 Typed는 `text-default`(#0f1010)입니다. 코드는 #0f1010을 썼습니다. 캐럿은 Box가 Teal-500, Line이 Teal-400이라 코드도 다르게 두었습니다.
29. 같은 상태를 `Text Field/Line/Field`는 `Typed`, `Text Field/Box/Field`는 `Filled`로 부르고, 같은 종류를 `Selector`와 `Select`로 부릅니다. 코드는 Selector를 `Select`의 `shape="line"`으로 옮겼습니다. 이름을 한쪽으로 맞출지 알려 주세요. Line의 Disabled 레이블은 Default 색(#544f4b)인데 Box는 비활성 색이라, 코드는 Box와 같게 두었습니다.
30. 2026-10-25에 `Text Field/Box/Field`의 오류 배경이 Red-50 100%에서 30%(`rgba(254, 242, 241, 0.3)`)로 바뀌었습니다. 투명도 색 체계가 아직 없어 코드는 `#fef2f14d`를 컴포넌트 변수(`--umc-text-field-box-field-error-bg`, `--umc-select-error-bg`)로 둡니다. Opacity Color System이 정해지면 토큰으로 바꾸겠습니다. `Select`, `TextFieldArea`, `VerificationCodeField`는 같은 상자라 함께 바뀌었고, `Input Box/Code Input/ Cell`의 오류 배경(60%)과 Icon Button Weak Error 배경(100%)은 그대로입니다.
31. 2026-10-25에 `Text Field/ Code Input`에 `Size=Md`(칸 42px, 모서리 12px, 글자 `Title/1-Semibold` 22px, 칸 간격 6px)가 생겨 `CodeField`에 `size="md"`를 더했습니다. 칸 컴포넌트 `Input Box/Code Input/ Cell`에는 아직 Lg만 있고, Md 칸은 인스턴스에서 크기를 덮어쓴 것입니다. 칸 컴포넌트에도 Md 변형을 둘지 알려 주세요.

## 질문지

2026-10-19에 새로 올라온 `Form`을 옮기면서 찾은 내용입니다. 1번부터 7번은 응답과 읽기 전용 모드, 8번부터는 편집 모드에서 나왔습니다.

1. 질문 제목과 답 칸 사이 간격이 답 종류마다 다릅니다(주관식, 장문형, 파일 12px, 단일·복수 선택 16px). 코드는 피그마대로 나눴습니다. 하나로 맞출지 알려 주세요.
2. `Form/Attachment Field`는 빈 칸에 포커스만 해도 버튼이 "삭제"로 바뀝니다(Respond, Focus). 코드는 글자를 입력했거나 첨부가 있을 때만 "삭제"로 바꾸고, 빈 칸에서는 "파일 업로드"를 둡니다.
3. `Form/Attachment Field` 안내 문구에 온점이 있어 Text Field 설명(안내 문구에 온점을 쓰지 않음)과 다릅니다. 코드 기본값은 마지막 온점만 뺐습니다. 문구를 정해 주세요.
4. `Form/Attachment Field`의 입력 칸 글자는 17px(`Label/2-Medium`)로, 코드 `InputBox` Lg의 18px과 다릅니다. 코드는 첨부 칸에서만 17px을 씁니다.
5. 응답이 없는 읽기 전용 질문(Read Only, Empty) 모양이 없습니다. 코드는 빈 칸(글 칸은 빈 상자, 선택은 아무것도 고르지 않은 목록, 첨부는 빈 입력 칸)으로 그립니다.
6. (일부 해결 2026-10-24) 첨부 칸 아래에 Help Text 자리가 생겨, 받지 않은 파일·업로드 실패·형식이 맞지 않는 링크 문구는 `errorMessage`로 칸 아래에 보여 줍니다. 업로드 중 모양은 아직 없습니다. 링크를 첨부로 확정하는 시점은 전처럼 앱이 정합니다.
7. 보기 항목은 고른 줄만 오른쪽 여백이 8px이고 나머지는 10px입니다. 줄이 목록 폭을 채워 차이가 보이지 않으므로 코드는 10px로 맞췄습니다.
8. 주관식과 장문형 유형 항목이 같은 `Icon/Text_Line` 아이콘을 씁니다. 장문형에 다른 아이콘을 쓸지 알려 주세요.
9. 유형 항목의 단일 선택 아이콘과 펼친 툴바의 닫기 아이콘이 팔레트에 없는 #544F4B입니다. 코드는 단일 선택 아이콘을 다른 항목과 같은 #3F4141(`icon-neutral-stronger-700`)로, 닫기 아이콘을 더하기 아이콘과 같은 #7E7F7F(`icon-neutral-medium-500`)로 칠했습니다.
10. 유형 항목 라벨의 띄어쓰기가 섞여 있습니다("단일선택", "파일업로드"와 "복수 선택"). 라벨은 앱이 넘겨서 코드에는 영향이 없고, 문서 예시는 "단일 선택", "파일 업로드"로 띄어 썼습니다.
11. 유형 항목은 64px 칸에 11px(`Label/7-Medium`) 라벨이라 다섯 글자 남짓만 들어갑니다. 더 긴 라벨을 줄바꿈할지 말줄임할지 정해 주세요.
12. 이동 손잡이 색 #D9D9D9(Hover)와 #BFBFBF(Focus), `Form/Question Editor` 기본 상태의 아래 여백 38px은 3기 변수에 없습니다. 코드는 피그마 값을 역할 변수에 그대로 담았습니다.
13. 피그마는 Hover와 Focus에서 늘 이동 손잡이를 그립니다. 코드는 순서를 바꿀 수 있는 화면(`dragHandleProps`를 넘김)에서만 그립니다. 옮길 수 없는데 손잡이가 보이면 누를 수 있는 것처럼 보이기 때문입니다.
14. "필수 항목" 체크박스 글자는 변수 이름이 15px인데 값이 16px이고, "섹션 사용" 스위치 글자는 변수 이름이 15px인데 값이 14px입니다. 코드는 값을 따랐습니다.
15. 같은 스위치인데 "질문 사용"은 16px Medium(#606262), "섹션 사용"은 14px Regular(#7E7F7F)입니다. 의도한 차이인지 알려 주세요.
16. "질문 사용" 스위치를 끈 질문이 편집 화면과 응답 화면에서 어떻게 보이는지 정의가 없습니다. 코드는 스위치 값만 앱에 넘깁니다.
17. 활성 질문의 유형을 바꿀 때(예: 단일 선택에서 주관식으로) 이미 쓴 보기를 지울지 정의가 없습니다. 문서 예시는 보기를 남겨 두어, 다시 선택 유형으로 바꾸면 되살아납니다.
18. 첨부 칸의 생성 중(Form Create) 모드는 Default, Hover, Focus만 있습니다. 코드는 질문지 편집 화면의 미리보기로 보고 글자를 받지 않으며 버튼도 누를 수 없게 했습니다.
19. `Form/Question Section`의 `Use Section=False`는 Custom과 Question Editing 조합 하나뿐입니다. 꺼진 섹션은 머리만 남으므로 상태와 상관없이 같은 모양으로 그립니다. 다시 켰을 때 질문을 되살릴지 정의가 없어, 코드는 본문을 숨기기만 하고 쓰던 내용을 남깁니다.
20. 편집 모드 보기 줄의 닫기 아이콘은 Hover 줄에만 있습니다. 코드는 키보드로도 지울 수 있게 줄 안에 포커스가 있을 때도 보여 줍니다.
21. `Floating Action Button`에 비활성 변형이 없습니다. 코드는 아이콘만 비활성 색(#CCCCCC)으로 바꿉니다.
22. Floating Action Button과 유형 목록의 그림자 `Shadow/Drop/Neutral_2`는 스타일 정의(#EFF0F080, 0 4 16)와 3기 토큰(#eceeee85)이 다릅니다. 코드는 토큰을 씁니다.
23. 질문지 편집 화면은 900px 폭으로만 그려져 있습니다. 좁은 화면에서 긴 질문 제목과 보기는 한 줄 입력 칸 안에서 잘립니다. 편집 화면을 모바일에서도 쓸지, 쓴다면 제목을 여러 줄로 받을지 알려 주세요.
24. `Form/Question Editor`에 끄는 중 상태가 없어 코드에 먼저 넣었습니다. Hover&Pressed 모양(회색 강조선 #ADADAD, 배경 #F7F8F8)에 `Shadow/Drop/Neutral_2` 그림자를 더하고 필수 항목, 삭제, 툴바를 숨깁니다. 같은 모양으로 `State=Dragging` 변형을 추가해 주세요. 이 모습은 손을 따라다니는 카드에 쓰고, 놓일 자리는 25번의 자리 표시로 보여 줍니다.
25. 끄는 동안 목록에 남는 원래 질문의 모양이 없어 자리 표시(`dragPlaceholder`)를 먼저 넣었습니다. 질문이 차지하던 자리에 그리는 점선 상자이고 내용은 숨깁니다. 다른 질문이 비켜 주는 동안 놓일 자리로 따라 움직여서, 이 상자 하나가 놓일 자리 표시와 원래 자리 모양을 함께 맡습니다. 임시 값은 2px 점선 `border-primary-medium-300`(#7AC7C1)과 배경 `fill-primary-weak-75`(#E9F7F5)입니다. 점선 색, 두께, 배경을 정해 주세요.
26. 질문이 없는 섹션의 모양이 없어 `FormSectionEmpty`를 먼저 만들었습니다. 평소에는 높이 120px 이상의 칸 가운데에 안내 문구("질문을 추가하거나 다른 섹션에서 옮겨 오세요", `body-3-regular`, #7E7F7F)만 둡니다. 질문을 끄는 동안 놓을 수 있으면 25번과 같은 점선과 배경을 더합니다. 문구와 두 모습을 정해 주세요.
27. 마지막 질문을 다른 섹션으로 옮겨 섹션을 비울 수 있게 할지 알려 주세요. 문서 예시는 비울 수 있게 했습니다. 꺼진 섹션으로는 옮길 수 없게 막았습니다.
28. 파일 업로드의 Help Text만 왼쪽 여백이 20px이라 칸 왼쪽 끝에서 시작하고, 글 답변의 Help Text는 칸보다 4px 안쪽에서 시작합니다. 코드는 두 곳 모두 칸보다 4px 안쪽에 둡니다. 첨부 칸에는 오류 모양이 없어, Help Text를 켤 때 Text Area 오류처럼 테두리만 Red-300으로 바꿨습니다. 둘 다 맞는지 알려 주세요.
29. 2026-10-25에 `Web/Form/Sheet`와 `Form/Header`가 생겨 `FormSheet`, `FormHeader`로 옮겼습니다. 부제목 색 #656b6b는 토큰에 없어 `text-neutral-medium-600`(#606262)을 썼고, 아래 띠 높이 9.917px은 10px으로 올렸습니다.
30. `Web/Form/Sheet`의 오른쪽 위 아이콘 버튼 줄(24px)은 항상 있습니다. 코드는 `action`을 넘길 때만 그립니다. 버튼이 없는 화면에서도 24px을 비워 둘지 알려 주세요.
31. `Form/Header`의 썸네일(50px) 자리는 회색 상자뿐입니다. 코드는 `thumbnail`을 넘기지 않으면 회색 상자를 그립니다. 이미지가 없을 때 어떤 모양인지(로고, 이니셜 등) 알려 주세요.

## 차트

2026-10-20에 `Chart/Legend Item`, `Chart/Tooltip`, `Bar Chart`를 옮기면서 찾은 내용입니다. 토큰에 없는 색은 가까운 토큰으로 바꾸지 않고 피그마 hex를 역할 변수에 그대로 담았습니다.

1. `Chart/Legend Item`의 `Purple-500` 점은 Violet-500(#AD6FEB), `Blue-500` 점은 Cobalt-500(#5E7FF2)으로 칠해져 있어 변형 이름과 색이 다릅니다. 두 색은 PM, Mobile PE 파트 색과 같아서 코드는 실제 색을 따르고 색 이름을 `pm`, `mobile-pe`로 붙였습니다. 변형 이름을 바꿀지 알려 주세요.
2. 범례 `Teal-200` 점(#B3E6E1)과 `Gray-200` 점(#E2E4E3)은 이름이 같은 토큰(#B3E5E1, #E2E3E3)과 값이 한 단계씩 다릅니다. 코드는 피그마 값을 씁니다. 토큰으로 연결할지 알려 주세요.
3. 범례 사이 간격이 예시마다 다릅니다(학교별 지원·평가 현황 8px, 프로젝트별 지원 현황 10px). 코드는 8px입니다.
4. (해결 2026-10-24) 툴팁 글자색이 모두 3기 팔레트 값으로 바뀌어, 제목은 TealGrey-500(#7E7F7F), 항목은 TealGrey-800(#282A2A), 비교값과 보조 설명은 TealGrey-400(#ADADAD)입니다. 코드도 같은 값의 3기 토큰을 씁니다. 피그마의 `text-subtle`은 제목과 항목에서 값이 달라, 위의 codeSyntax 정리 전까지는 값으로 맞춥니다.
5. (해결 2026-10-24) 툴팁 글자 스타일이 토큰에 있는 스타일로 바뀌었습니다. 합계는 `Caption/3-Bold`, 합계 비교값은 `Caption/3-Medium`, 항목은 `Caption/3-Regular`, 보조 설명은 `Caption/4-Medium`이고 코드도 같은 토큰을 씁니다. 제목(11px, 700, 130%)만 텍스트 스타일 없이 그려져 있어 피그마 값을 그대로 씁니다.
6. (해결 2026-10-24) `Chart/Tooltip/Part`도 합계 비교값("/ 000명 지원")을 기본 툴팁과 같은 회색(#ADADAD)으로 칠해, 두 툴팁의 색 차이가 없어졌습니다.
7. `Bar Chart/Column` 막대는 한 가지 높이로만 그려져 있고, 값과 높이의 관계가 없습니다. 코드는 값을 가장 큰 값(또는 앱이 넘긴 기준)으로 나눈 비율로 높이를 정하고, 가장 큰 값의 막대를 피그마 높이(122px)로 그립니다. 0명인 날은 막대 없이 값만 둡니다.
8. `Primary Weak` 막대를 언제 쓰는지 정의가 없습니다(예시 화면은 `Neutral`과 `Primary Strong`만 씀). 코드는 앱이 항목마다 고르게 했습니다.
9. `Date Navigator`의 삼각형 화살표는 아이콘 세트에 없어 피그마 모양을 컴포넌트 안에 그대로 그렸습니다. 아이콘으로 등록할지 알려 주세요. 비활성 모양도 없어서, 옮길 수 없는 쪽 화살표를 `icon-disabled`(#CCCCCC)로 칠합니다.
10. `Bar Chart/Category Group`은 "한 줄에 학교 15곳까지, 넘치면 아래로 늘어나 2줄"이라고만 적혀 있습니다. 코드는 부모 폭에 들어가는 만큼 한 줄에 두고(988px에 15곳), 줄 사이를 24px 띄우며 줄마다 기준선을 다시 그립니다. 줄 사이 간격을 알려 주세요.
11. `Related Series` 변형만 라벨(`Label/5-Medium` #282A2A), 기준선(#EFF0F0), 묶음 간격(10px)이 다른 변형(`Body/2-Medium` #161919, #F6F7F7, 6px)과 다릅니다. 코드는 다른 변형 쪽으로 맞췄습니다.
12. 라벨은 띄어쓰기에서 두 줄로 바꿉니다. 띄어쓰기 없이 긴 이름은 글자 단위로 넘기고, 세 줄부터는 말줄임으로 자릅니다(툴팁 제목에는 전체 이름). 이 처리가 맞는지 알려 주세요.
13. 0명은 2px이라고 정해져 있지만, 0보다 크고 아주 작은 값의 막대 높이는 정의가 없습니다. 코드는 2px보다 낮아지지 않게 합니다.
14. (위치 확인 2026-10-24) 예시 화면 `3. 그래프 호버`는 툴팁을 묶음 아래에 두고 화살표가 위를 향하게 그려, 코드 위치와 같습니다. 뜨고 닫히는 조건은 아직 정의가 없습니다. 코드는 마우스를 올리면 바로 띄우고 키보드 초점과 터치 탭에서도 띄우며, 툴팁 위로 마우스를 옮겨도 닫지 않고(WCAG 1.4.13) 아래 자리가 없으면 위로 뒤집습니다.

15. `Ranked Bar`에서 값이 같을 때 순위를 어떻게 매길지 정의가 없습니다(예시 화면은 4위 둘). 코드는 같은 값을 같은 순위로 두고 다음 순위를 건너뜁니다(1, 2, 2, 4위). 1위끼리 같으면 둘 다 1위 색이고 2위 색은 쓰지 않습니다.
16. `Ranked Bar`가 10개를 넘을 때의 처리가 없습니다. 코드는 자르지 않고 그리며, 좁은 화면과 함께 가로 스크롤로 보여 줍니다.
17. 예시 화면의 순위 막대는 이전 버전 컴포넌트(`순위 그래프 막대 2.0`, 색 #0E8179·#63C4B8·#9FDCD4·#C7EBE6)를 써서 `Web/Bar Chart/Ranked Bar`(Teal-600·400·200·100)와 색이 다릅니다. 코드는 컴포넌트 쪽을 따릅니다.
18. `Fixed Ranked Bar`는 5위까지만 있습니다. 코드는 6위부터 5위와 같은 모양으로 그립니다. `Fixed Ranked Bar`의 단위 색 #0B6B64는 3기 토큰에 없어 그대로 씁니다.
19. `Reference Bar`(#F6F7F7)는 최소 높이 32px로 정해져 있어, 비교값이 0이어도 32px로 보입니다. 의도한 것인지 알려 주세요.
20. 툴팁 제목 색이 TealGrey-500(#7E7F7F)으로 바뀌어 흰 배경 대비가 4.02:1로 올랐지만, 작은 글자 기준(WCAG AA 4.5:1)에는 아직 못 미칩니다. 비교값과 보조 설명 색 TealGrey-400(#ADADAD)은 2.24:1로, 전 색(#9CA3A3, 2.57:1)보다 낮아졌습니다. 코드는 피그마 값을 그대로 쓰니, 더 진한 색으로 바꿀지 알려 주세요.
21. `Ranked Bar` 2위 막대(Teal-400 #39A9A1) 안의 흰 이름은 대비가 2.85:1로 12px 굵은 글자 기준(4.5:1)에 못 미칩니다(1위 Teal-600은 5.65:1). 코드는 피그마 값을 그대로 씁니다. 2위의 글자색이나 막대색을 바꿀지 알려 주세요.

## 캘린더

2026-10-24에 `Calendar`, `Calendar/Schedule Card`, `.primitive/Calendar/Day`를 옮기면서 찾은 내용입니다.

1. 날짜 칸 주석 "클릭하면 해당 달로 이동 후 → 청록 300"이 무엇을 가리키는지 알 수 없습니다. 코드는 앞뒤 달 날짜를 누르면 그 달로 옮기면서 그 날짜를 고르고, 고른 날짜를 Selected 모양(Teal-500)으로 그립니다. "청록 300"을 어디에 쓰는지 알려 주세요.
2. 앞뒤 달 날짜와 고를 수 없는 날짜가 Disabled 모양 하나뿐입니다. 코드는 둘을 같은 모양으로 그리되 앞뒤 달 날짜만 누를 수 있게 했습니다. 구분이 필요하면 모양을 알려 주세요.
3. 캘린더가 5주로만 그려져 있습니다. 6주가 걸치는 달(예: 2026년 3월)은 코드에서 한 줄이 늘어 48px 길어집니다. 날짜 열 높이가 272px로 고정되어 5주인 달에 아래 8px이 비는데, 코드는 주 수만큼만 높이를 씁니다. 높이를 늘 같게 둘지 알려 주세요.
4. 오늘 날짜를 표시하는 모양이 없어 코드는 따로 표시하지 않습니다.
5. Hover 원 #F6F7F7(2기 `teal-gray-100`), 일요일 글자 #F64C4C, 비활성 날짜의 일정 점 #E2E4E3은 3기 변수에 없어 피그마 값을 그대로 씁니다. 토요일 글자는 역할 태그 변수(`tag-role-campus-border`)에 묶여 있어, 코드는 같은 값의 Blue-500을 씁니다. 어느 변수로 연결할지 알려 주세요.
6. 기간 안의 날짜에 마우스를 올린 모양과, 기간 안에 고를 수 없는 날짜가 낀 모양이 정의되어 있지 않습니다. 코드는 기간 안 날짜에는 Hover를 그리지 않고, 고를 수 없는 날짜는 띠 위에 흐린 글자로 그립니다.
7. 달 제목은 자리 표시 "0000년 00월"을 따라 "2026년 03월"처럼 두 자리 달로 씁니다. "3월"이 맞으면 알려 주세요.
8. 캘린더 테두리가 피그마에서는 레이아웃에 들어가지 않아 폭이 376px입니다. 코드는 1px 테두리가 바깥에 더해져 378px입니다.
9. 일정 카드의 회차 칸이 28px로 고정되어 "10차"처럼 긴 회차가 잘립니다. 코드는 28px을 최소 폭으로 두고 글자만큼 늘립니다.
10. 지난 일정의 체크 표시가 완료 표시인지, 누를 수 있는지 정의가 없습니다. 코드는 누를 수 없는 꾸밈으로 그립니다.
11. `Calendar`의 `*피그마용` 속성은 피그마 견본용이라 코드로 옮기지 않았습니다.

## 부록: 문서에서 옮겨 온 '피그마와 다른 점'

문서 사이트에서 지운 기록입니다. 값을 바꿀 때 근거로 씁니다.

### text-button

- `Type` 하나를 `variant`와 아이콘 props 두 가지로 나눴습니다. 그래서 피그마에 없는 조합(밑줄과 아이콘을 함께)도 만들 수 있습니다.
- 포커스 상태가 없어 다른 버튼과 같은 2px `border-primary-strong-500` 외곽선을 넣었습니다.
- Brand 비활성 색은 피그마가 primitive `Teal-300`을 바로 씁니다. 같은 값의 semantic 토큰 `text-brand-disabled-300`로 옮겼습니다.

### code-field

칸 글자는 피그마 스타일 이름이 `Heading/4-Semibold`지만 크기가 26px로 파운데이션 정의(18px)와 다릅니다. 피그마 값(26px, 행간 1.3)을 컴포넌트 변수로 썼습니다. Md 칸은 `Title/1-Semibold`(22px, 행간 1.4) 토큰을 씁니다.

### field

- 레이블 색: `Text Field/ Label` 원본은 2기 변수 `warmgray-600`(#544f4b)이고, `Text Field/ Box` 안에서는 `TealGrey-600`(#606262)으로 덮어씁니다. 3기 토큰인 #606262(`--umc-color-text-neutral-medium-600`)를 씁니다.
- 레이블(15px/23px, -3%)과 도움말(13px/17px)은 3기 파운데이션에 없는 `Mobile Web/*` 텍스트 스타일입니다. 토큰에 없는 값이라 피그마 값을 그대로 썼습니다.

### text-field-box-field

- 비활성 테두리: `Input Box`는 2기 변수 `warmgray-150`(#efedeb), `Text Field/ Box`는 `TealGrey-100`(#eff0f0)을 씁니다. 3기 토큰 `--umc-color-border-neutral-weaker-100`로 통일했습니다.
- Lg 기본 상태의 placeholder만 16px이고 나머지 상태는 18px입니다. 상태가 바뀔 때 글자 크기가 튀지 않도록 Lg는 모두 18px(`Label/1-Medium`)로 맞췄습니다.

### menu

피그마 `Dropdown`에는 삭제처럼 위험한 동작을 구분하는 항목 스타일과 아이콘 자리가 없습니다. 이전 구현에 있던 `tone="danger"`와 `icon`은 디자인 확인 전까지 뺐습니다.

### numeric-stepper

- 숫자 글자는 피그마 스타일 이름이 `Label/1-Semibold`지만 값(16px, -2%)은 `Label/3-Semibold`와 같습니다. 보이는 크기를 지키려고 `Label/3-Semibold` 토큰을 썼습니다.
- 피그마 숫자 칸의 좌우 패딩 20px은 106px 너비 안에 들어가지 않아(34px 칸) 패딩 없이 가운데 정렬했습니다.

### search-field

placeholder(#9ca3a3)와 입력 글자(#161919)는 2기 변수 `teal-gray-400`, `teal-gray-900`입니다. 같은 단계의 3기 토큰 `--umc-color-text-placeholder`(#adadad), `--umc-color-text-neutral-default-900`(#0f1010)로 바꿨습니다.

### select

- 목록이 열리면 아래 화살표를 180도 돌립니다. 피그마는 `Up Chevron` 아이콘을 따로 둡니다.
- 버튼 hover 배경 #fbfcfc는 피그마 `State=Hover`와 같습니다. 피그마에 열린 상태가 따로 없어 열려 있는 동안 hover 배경을 유지합니다.

### text-field-box

- Md 비밀번호 필드의 오른쪽 패딩: 피그마는 4px, 일반 Md 필드는 8px입니다. 같은 크기 안에서 오른쪽 여백이 달라지지 않도록 8px로 맞췄습니다.
- 지우기 아이콘 색 #e2e4e3은 토큰에 없어 컴포넌트 변수로 썼습니다. 오류 상태에서는 피그마대로 #cccccc입니다.
- Lg 단위 텍스트는 `Mobile Web/Label/1-Medium`(18px/24px, -3%)이라 토큰 대신 피그마 값을 썼습니다.

### checkbox

- 피그마의 `Selected`는 `checked`로 옮겼습니다. 체크박스는 네이티브 `<input>`과 Base UI가 모두 `checked`를 쓰기 때문입니다.
- 피그마의 `Left Label`, `Right Label` 두 토글은 `labelPlacement` 하나로 옮겼습니다. 라벨을 양쪽에 동시에 두는 경우는 없다고 보았습니다.
- 비활성 체크 선은 2기 변수 `WarmGray-50`(`#fcfbfa`)입니다. 3기에 같은 색이 없어 `teal-grey-50`(`#fbfcfc`)을 씁니다.
- 테두리는 `border` 대신 inset 그림자로 그립니다. 브라우저는 1.5px, 1.8px 같은 테두리 두께를 장치 픽셀 단위로 내려서 피그마보다 얇게 그리기 때문입니다(1배율 화면에서 1px).
- 포커스 상태가 없어 다른 컨트롤과 같은 2px `border-primary-strong-500` 외곽선을 넣었습니다.
- `CheckButton`은 비활성 모양이 없습니다. 비활성이어도 색은 체크 여부를 그대로 따르고 커서만 바뀝니다.

### radio

- 피그마에는 Neutral 선택 변형이 없습니다. 선택하면 `color`와 관계없이 Primary 선택 모양을 씁니다.
- 원 모서리는 피그마 9999px 리터럴 대신 모양이 같은 `radius-full` 토큰을 씁니다.
- 테두리는 `border` 대신 inset 그림자로 그립니다. 브라우저는 1.5px, 1.8px 같은 테두리 두께를 장치 픽셀 단위로 내려서 피그마보다 얇게 그리기 때문입니다(1배율 화면에서 1px).
- 포커스 상태가 없어 다른 컨트롤과 같은 2px `border-primary-strong-500` 외곽선을 넣었습니다.

### switch

- 피그마의 `State=On/Off`는 `checked`로 옮겼습니다.
- 트랙 색 두 개(꺼짐, 켜짐)가 변수에 연결되어 있지 않습니다. 켜짐 `#39a9a1`은 같은 값의 `fill-primary-inverse-weak-400`을 씁니다. 꺼짐은 내보낸 값이 `#e2e4e3`이고, 가장 가까운 `fill-neutral-strong-200`(`#e2e3e3`)을 씁니다.
- Sm 켜짐에만 안쪽 그림자(`#d3d8d833`, 0.8 0.8 1.6)가 있어 그대로 옮겼습니다. Md 켜짐에는 그림자가 없습니다.
- 포커스 상태가 없어 다른 컨트롤과 같은 2px `border-primary-strong-500` 외곽선을 넣었습니다.
- 켜고 끌 때 손잡이가 150ms 동안 움직입니다. 움직임 줄이기 설정에서는 바로 바뀝니다.

### context-switcher

- 너비: 피그마는 172px이지만 사이드 내비게이션 슬롯의 안쪽 폭은 168px입니다. `max-width: 100%`를 함께 걸어 슬롯 안에서는 168px로 줄어듭니다.
- 눌림 그림자와 선택 항목 그림자: 피그마 값(#D3D8D833, 1, 1, 2)이 이름 있는 스타일과 달라 컴포넌트 변수로 썼습니다.

### header

- 다크 모드 선택 항목: 피그마는 1px 테두리와 좌우 패딩 16px을 씁니다. 선택이 바뀔 때 폭이 흔들리지 않도록 패딩 18px을 유지하고 inset 그림자로 테두리를 그립니다.
- 내비게이션 알약 radius: 피그마 컨테이너는 9999px 리터럴, 항목은 999px 토큰입니다. 모양이 같으므로 `--umc-radius-full`로 통일했습니다.
- 홈 링크 모드: 피그마 primitive에는 `Mode` 속성이 있지만 `HeaderHomeLink`에는 `mode` prop을 두지 않았습니다. 홈 링크는 언제나 헤더 안에 있으므로 감싼 `Header`의 `mode`를 따릅니다. 두 곳에 모드를 따로 넘기다 어긋나는 일을 막기 위해서입니다.
- 홈 링크 포커스: 피그마에 포커스 상태가 없어 다른 헤더 항목과 같은 2px `border-primary-strong-500` 외곽선을 씁니다.

### page-header

- 구분자 색 #cccccc는 피그마에서 변수에 연결되지 않은 값입니다. 같은 값의 primitive `--umc-color-teal-grey-300`을 썼습니다.
- 마지막 항목도 다른 항목과 같은 색입니다. 피그마가 현재 페이지를 따로 구분하지 않기 때문입니다.

### side-navigation

- 그룹 동작: 피그마 설명은 "선택 시 최상단 서브 메뉴도 함께 Active되며 그 페이지가 열림"입니다. 이 컴포넌트의 그룹 버튼은 펼침과 접힘만 맡고 이동하지 않습니다. 한 버튼이 이동과 접기를 함께 하면 접으려고 누를 때도 페이지가 바뀌기 때문입니다. 그룹을 열 때 첫 하위 페이지로 보내려면 앱 라우팅에서 처리합니다.
- 오른쪽 경계선: `Type=Default`는 2기 변수 `teal-gray-200`(#e9ecec), `Type=With Slot`은 `Border/Neutral/Weak-200`(#e2e3e3)을 씁니다. 3기 토큰 `--umc-color-border-neutral-weak-200`로 통일했습니다.
- hover 그림자: 피그마 스타일 이름은 `Shadow/Inner/Neutral_1`이지만 값이 파운데이션 정의와 다릅니다(#D3D8D833, 1, 1, 2). 이름 있는 스타일은 토큰을 따르는 규칙대로 `--umc-shadow-inner-neutral-1`을 씁니다.
- 긴 메뉴 이름은 한 줄을 넘으면 말줄임표로 자릅니다. 피그마에는 넘치는 경우가 없습니다.

### icons

- Chevron, Person, Setting, Under-construction은 피그마가 프레임 대신 안쪽 도형만 내보내서 원래 위치로 옮겼습니다.
- 23.85×25처럼 정사각형이 아닌 프레임은 viewBox를 피그마 값 그대로 두고, 정사각형 안에 비율을 지켜 넣었습니다.
- `Pictogram/Person`은 SVG가 아니라 PNG 마스크라서 패키지에서 뺐습니다.
- 피그마 아이콘 섹션은 24px이 아닌 크기를 Scale(K)로 쓰라고 안내합니다. 패키지 아이콘의 `size`도 같은 방식으로 선 두께까지 비례해 바꿉니다. Scale 없이 크기만 줄인 인스턴스(예: Option Button 20px의 `Icon/Check`)는 선 두께가 그대로라 코드와 다르게 보입니다.
