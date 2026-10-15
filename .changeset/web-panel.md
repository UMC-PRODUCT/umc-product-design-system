---
"@umc-product/react": minor
---

웹 화면용 `Panel`을 더합니다. 피그마 `Web/Panel`을 옮긴 컴포넌트로, 모바일의 `BottomSheet`가 하는 일을 웹 화면 가운데에서 맡습니다. `title`과 `description` 아래에 스크롤되는 본문(`children`)을 두고, 본문 아래에는 스크롤되지 않는 조작 영역(`control`)과 버튼 영역(`actions`, `BottomSheetActions`를 넘김)을 둡니다. 기본 폭은 512px이고 `className`으로 넓힙니다. 높이가 화면을 넘으면 본문만 스크롤됩니다. Esc나 바깥을 누르면 닫힙니다.
