---
"@umc-product/react": patch
---

**화면 변화** 입력 칸의 비활성 레이블과 도움말(Text Field/Box, Text Field/Line): 흐린 회색에서 기본 색으로 바뀝니다 (레이블 `#adadad` → `#606262`, 도움말 `#adadad` → `#7e7f7f`). 피그마 `Text Field/Box`와 `Text Field/Line`의 `State=Disabled` 변형이 Default 레이블과 Default 도움말을 쓰는 것을 따라 `Field`가 비활성일 때 레이블과 도움말 색을 바꾸지 않습니다. `Field`를 쓰는 입력(`TextFieldBox`, `TextFieldLine`, `Select` 등)이 함께 바뀌고, 입력 칸 자체의 비활성 모습과 오류 도움말의 빨강은 그대로입니다.
