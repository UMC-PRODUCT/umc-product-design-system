---
"@umc-product/react": patch
---

**화면 변화** 바텀 시트의 버튼 영역(App/Bottom Sheet): 아래 여백이 생깁니다 (0 → 10px). 피그마 `App/Bottom Sheet` 안 `Button Area` 인스턴스의 아래 여백이 컴포넌트와 같은 10px로 바뀐 것을 따라 `BottomSheet` 안 `BottomSheetActions`의 아래 여백을 10px로 둡니다. 시트 안 좌우 20px과 안전 영역(`safe-area-inset-bottom`)은 그대로이고, 패널(`Panel`) 안 버튼 영역도 피그마대로 아래 0을 유지합니다.
