---
"@umc-product/react": minor
---

**깨지는 변경** 피그마가 `Text Field/ Input Box`를 `Text Field/Box/Field`로, 완성형을 `Text Field/Box`로 바꾸면서 코드 이름도 따라갑니다. `TextField`는 `TextFieldBox`, `InputBox`는 `TextFieldBoxField`가 되고, CSS 클래스 `umc-input-box*`와 변수 `--umc-input-box-*`도 `umc-text-field-box-field*`, `--umc-text-field-box-field-*`로 바뀝니다. props와 동작은 그대로입니다. `TextFieldArea`, `Select`, `VerificationCodeField`, `CodeField`의 이름은 바뀌지 않습니다.

| 전                                                  | 후                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `TextField`, `TextFieldProps`                       | `TextFieldBox`, `TextFieldBoxProps`                                      |
| `InputBox`, `InputBoxProps`                         | `TextFieldBoxField`, `TextFieldBoxFieldProps`                            |
| `.umc-input-box`, `.umc-input-box__input` 등        | `.umc-text-field-box-field`, `.umc-text-field-box-field__input` 등       |
| `--umc-input-box-*`                                 | `--umc-text-field-box-field-*`                                           |
| 문서 `/components/forms/text-field/`, `/input-box/` | `/components/forms/text-field-box/`, `/text-field-box-field/`(자동 이동) |
