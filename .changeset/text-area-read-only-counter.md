---
"@umc-product/react": patch
---

**화면 변화** 피그마 `Form/Question`의 Read Only 모드에서 글자 수가 빠진 것에 맞춰 `TextArea`가 `readOnly`이면 `maxLength`가 있어도 글자 수를 그리지 않습니다. 높이도 글자 수 한 줄만큼(77px에서 50px로) 줄어듭니다. `FormTextAnswer`와 읽기 전용 `FormQuestion` 안의 답 칸도 같습니다. 비활성(`disabled`)에서는 전처럼 글자 수를 보여 줍니다.
