---
"@umc-product/react": minor
---

**깨지는 변경** 피그마 `Help Text`의 `Type=Primary`가 `Type=Success`가 되어 `Field`의 `captionColor="primary"`도 `captionColor="success"`로 바꿉니다. 초록 글자색(#06844c, `text-success`)은 그대로이고 `StatusTag`와 `GuidanceMessage`가 쓰는 `success`와 이름이 같아집니다. `Field`를 감싼 `TextField`, `TextFieldArea`, `TextArea`, `Select`, `CodeField`, `VerificationCodeField`, `NumericStepper`도 같은 이름을 받습니다.

| 전                                         | 후                                         |
| ------------------------------------------ | ------------------------------------------ |
| `captionColor="primary"`                   | `captionColor="success"`                   |
| `.umc-field__caption[data-tone="primary"]` | `.umc-field__caption[data-tone="success"]` |
