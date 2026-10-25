---
"@umc-product/react": patch
---

**화면 변화** 바텀 시트와 패널의 버튼 영역 위 여백이 32px에서 16px로 줄고, 패널의 버튼이 양옆으로 4px씩 넓어집니다. 피그마 `Button Area` 컴포넌트 여백이 위 16px·아래 10px·좌우 16px로 바뀌어 `BottomSheetActions` 다섯 레이아웃이 그 값을 기본으로 쓰고(`primary-top`의 아래 4px도 10px), `BottomSheet` 안에서는 피그마 `App/Bottom Sheet`대로 좌우 20px·아래 0, `Panel` 안에서는 `Web/Panel`대로 좌우 16px·아래 0을 씁니다. 패널 아래 여백은 24px에서 20px로 바뀝니다.
