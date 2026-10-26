---
"@umc-product/react": patch
---

**화면 변화** 밑줄 입력의 레이블과 도움말(Text Field/Line): 왼쪽 여백이 사라져 밑줄 왼쪽 끝에 맞춰집니다 (4px → 0). 피그마 `Text Field/Line`에서 `Text Field/ Label`과 `Help Text`의 왼쪽 패딩을 0으로 바꾼 것을 따라 `TextFieldLine` 안의 `.umc-field__label`, `.umc-field__caption`만 `padding-inline: 0`을 씁니다. `TextFieldBox`를 비롯한 다른 필드는 그대로 4px입니다.
