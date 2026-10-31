---
"@umc-product/react": patch
---

**화면 변화** 입력 칸의 오류 레이블(Text Field/Box, Text Field/Line): 레이블이 빨강에서 기본 회색으로 바뀝니다 (`#dc3d3d` → `#606262`). 피그마 `Text Field/Box`와 `Text Field/Line`의 `Error=True` 레이블이 Default 색으로 바뀐 것을 따라 `Field`가 `invalid`일 때 레이블 색을 바꾸지 않습니다. `Field`를 쓰는 입력(`TextFieldBox`, `TextFieldLine`, `Select` 등)이 함께 바뀌고, 도움말, 오류 메시지, 필수 표시(`*`)는 그대로 빨강입니다.
