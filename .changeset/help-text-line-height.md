---
"@umc-product/react": patch
---

**화면 변화** 피그마 `Help Text`가 텍스트 스타일 `Caption/2-Regular`에 연결된 것에 맞춰 도움말과 오류 메시지의 행간이 바뀝니다. `Field`를 쓰는 `TextField`, `TextFieldArea`, `TextArea`, `Select`, `CodeField`, `VerificationCodeField`, `NumericStepper`와 `FormAttachmentField`의 오류 메시지가 같이 바뀝니다. 도움말 한 줄이 1.85px 높아집니다.

| 항목 | 전         | 후                                 |
| ---- | ---------- | ---------------------------------- |
| 행간 | 17px(고정) | 145%(18.85px, `caption-2-regular`) |
| 크기 | 13px       | 13px(그대로)                       |
